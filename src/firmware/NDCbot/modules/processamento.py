"""
Funções para processar as ilhas e fita de medicamentos.
"""

import time
from modules.qrcode import validar_qrcode, QRCodeV
from modules.comApi import enviar_log
from modules.posicoes import locais, locais_fita
from modules.sensor_distancia import objeto_detectado

# Constantes de log
LOG_SUCESSO = 0
LOG_QR_NAO_CORRESPONDE = 1
LOG_QR_NAO_RECONHECIDO = 2
LOG_REMEDIO_NAO_COLETADO = 3
LOG_REMEDIO_CAIU = 4
LOG_ERRO_DOBOT = 5

# ----- Funções auxiliares de movimento -----
def safe_move(device, ilha, id_pedido=None, id_remedio=None, contador_erros=None):
    try:
        device.movel_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
    except Exception as e:
        print(f"Não consegui me mover de forma segura: {e}")
        if id_pedido and id_remedio and contador_erros:
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            
def safe_movej(device, ilha, id_pedido=None, id_remedio=None, contador_erros=None):
    try:
        device.movej_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
    except Exception as e:
        print(f"Não consegui me mover de forma segura: {e}")
        if id_pedido and id_remedio and contador_erros:
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1

# ----- Função para processar ilha -----
def processa_ilha(ilha_num, id_pedido, id_remedio, device, contador_erros, contador_sucessos):
    try:
        print(id_remedio)
        ilha = locais(ilha_num)

        # Move para posição de leitura
        try:
            safe_movej(device, ilha, id_pedido, id_remedio, contador_erros)
            print(f"Estou me movendo para a posição de leitura da ilha {ilha_num}...")
            safe_movej(device, ilha, id_pedido, id_remedio, contador_erros)
            time.sleep(2)
            
        except Exception as e:
            print(f"Não consegui me mover para a posição de leitura: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
        
        # Move para ler o código QR
        try:
            device.movej_to(ilha[0]["x"], ilha[0]["y"], 130, ilha[0]["r"], wait=True)
            time.sleep(1)
            
        except Exception as e:
            print(f"Não consegui me mover para ler o QR code: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
        
        # Lê e valida o código QR
        try:
            print("Estou lendo o QR Code do medicamento...")
            
            # Aguarda um tempo para o QR code ser detectado
            print("Aguardando leitura estável do QR code...")
            time.sleep(2)  # Dá tempo para a câmera capturar o QR code
            qrcode_lido = "n/a"
            while qrcode_lido == "n/a":
                device.movej_to(ilha[0]["x"], ilha[0]["y"], 80, ilha[0]["r"], wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                print(f"QR code lido: '{qrcode_lido}'")
                if qrcode_lido != "n/a":
                    break

                device.movej_to(ilha[0]["x"], ilha[0]["y"], 130, ilha[0]["r"], wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                print(f"QR code lido: '{qrcode_lido}'")
                if qrcode_lido != "n/a":
                    break

                device.movej_to(ilha[0]["x"] + 5, ilha[0]["y"], 80, ilha[0]["r"] + 5, wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                if qrcode_lido != "n/a":
                    break

                device.movej_to(ilha[0]["x"] - 5, ilha[0]["y"], 80, ilha[0]["r"] - 5, wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                if qrcode_lido != "n/a":
                    break

                device.movej_to(ilha[0]["x"] + 5, ilha[0]["y"], 130, ilha[0]["r"] + 5, wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                if qrcode_lido != "n/a":
                    break

                device.movej_to(ilha[0]["x"] - 5, ilha[0]["y"], 130, ilha[0]["r"] - 5, wait=False)
                qrcode_lido = QRCodeV(id_remedio)
                if qrcode_lido != "n/a":
                    break

            
            if qrcode_lido == "n/a" or not qrcode_lido or qrcode_lido == 0:
                print(f"Não consegui enxergar o QR-code na ilha {ilha_num}")
                enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                return False
            
            # Valida o QR code com a API - execução sincronizada
            print(f"Validando o QR code '{qrcode_lido}' com a API para o remédio ID: {id_remedio}...")
            qrcode_valid = validar_qrcode(id_remedio, qrcode_lido)  # Assuming id_remedio is what you're comparing against
            print(f"Resultado da validação: {'Válido' if qrcode_valid else 'Inválido'}")
            
            if not qrcode_valid:
                print(f"O QR code lido não corresponde ao medicamento da ilha {ilha_num}")
                enviar_log(id_pedido, id_remedio, LOG_QR_NAO_CORRESPONDE)
                contador_erros[LOG_QR_NAO_CORRESPONDE] += 1
                return False
            
            print("QR Code validado com sucesso pela API! Prosseguindo com a coleta...")
            time.sleep(1)  # Pausa antes de prosseguir para garantir sincronização

        except Exception as e:
            print(f"Tive um problema ao ler/verificar o QR Code: {e}")
            enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
            contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
            return False
            
        # Coleta o medicamento
        try:
            print(f"Estou ativando a sucção para coletar o medicamento da ilha {ilha_num}...")
            device.suck(True)
            time.sleep(0.5)  # Aguarda para a sucção estabilizar
        except Exception as e:
            print(f"Não consegui coletar o medicamento: {e}")
            enviar_log(id_pedido, id_remedio, LOG_REMEDIO_NAO_COLETADO)
            contador_erros[LOG_REMEDIO_NAO_COLETADO] += 1
            device.suck(False)  # Desativa sucção por segurança
            return False
        
        # Movimento com o medicamento
        try:
            safe_movej(device, ilha, id_pedido, id_remedio, contador_erros)
            time.sleep(1)
            device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"], ilha[1]["r"], wait=True)
            time.sleep(1)
            safe_move(device, ilha, id_pedido, id_remedio, contador_erros)
            
            # Verifica se o medicamento ainda está sendo segurado
            print("Estou verificando se o medicamento continua coletado após movimento...")
            time.sleep(3)
            medicamento_no_trajeto = objeto_detectado()
            
            if not medicamento_no_trajeto:
                print(f"Oh não! O medicamento caiu durante o percurso da ilha {ilha_num}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                contador_erros[LOG_REMEDIO_CAIU] += 1
                device.suck(False)  # Desativa sucção
                return False
            
            print("Ótimo! O medicamento continua seguro após o movimento!")
            
        except Exception as e:
            print(f"Tive um problema durante a movimentação com o medicamento: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            device.suck(False)  # Desativa sucção por segurança
            return False
                
        print("Estou me movendo para uma posição à direita da ilha...")
        time.sleep(1)
        
        # Concluído com sucesso
        print(f"Consegui coletar o medicamento da ilha {ilha_num} com sucesso!")
        enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
        contador_sucessos[0] += 1  # Incrementa o contador usando um objeto mutável
        return True
        
    except Exception as e:
        print(f"Tive um problema inesperado ao processar a ilha {ilha_num}: {e}")
        enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
        contador_erros[LOG_ERRO_DOBOT] += 1
        return False

# ----- Função para processar fita de medicamentos -----
def processa_fita(id_pedido, id_remedio, device, contador_sucessos, contador_erros):
    # Variável estática para manter o contador entre chamadas da função
    if not hasattr(processa_fita, "fita_contador"):
        processa_fita.fita_contador = 0
    
    try:
        # Obtém posições da fita
        posicoes_fita = locais_fita(processa_fita.fita_contador)
        
        print(f"Estou depositando o medicamento na fita, etapa {processa_fita.fita_contador}...")

        # Movimento inicial para a posição da fita
        try:
            if processa_fita.fita_contador == 0:
                # Obtém ângulos atuais das juntas
                _, _, _, _, current_j1, current_j2, current_j3, current_j4 = device.pose()
                
                # Define o ângulo desejado para J1
                desired_j1 = 45  # Substitua pelo ângulo correto para sua aplicação
                
                # Move apenas J1, mantendo outras juntas iguais
                device.movej_angles(desired_j1, current_j2, current_j3, current_j4, wait=True)
            else:
                safe_movej(device, posicoes_fita, id_pedido, id_remedio, contador_erros)
            
            safe_movej(device, posicoes_fita, id_pedido, id_remedio, contador_erros)
            time.sleep(2)
            
        except Exception as e:
            print(f"Não consegui me mover para a posição inicial da fita: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False

        # Verifica se o medicamento ainda está sendo segurado antes da deposição
        try:
            print("Estou verificando se o medicamento ainda está presente...")
            time.sleep(3)
            medicamento_presente = objeto_detectado()
            
            if not medicamento_presente:
                print("Oh não! O medicamento caiu antes de chegar à posição de deposição")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                contador_erros[LOG_REMEDIO_CAIU] += 1
                device.suck(False)  # Desativa sucção por segurança
                return False
            
            print("Medicamento detectado! Vou prosseguir com a deposição.")
        except Exception as e:
            print(f"Tive um problema ao verificar o medicamento antes da deposição: {e}")
            enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
            contador_erros[LOG_REMEDIO_CAIU] += 1
            device.suck(False)  # Desativa sucção por segurança
            return False

        # Movimento para a posição de deposição
        try:
            device.movel_to(
                posicoes_fita[1]["x"],
                posicoes_fita[1]["y"],
                posicoes_fita[1]["z"],
                posicoes_fita[1]["r"],
                wait=True
            )
            time.sleep(1)
        except Exception as e:
            print(f"Não consegui me mover para a posição de deposição: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
        
        # Deposição do medicamento
        try:
            print("Estou desativando a sucção para depositar o medicamento...")
            device.suck(False)
            time.sleep(0.5)  # Aguarda para estabilização
            
            # Verifica se o medicamento foi depositado corretamente
            time.sleep(3)
            medicamento_depositado = not objeto_detectado()  # True se NÃO detectar objeto
            
            if not medicamento_depositado:
                print(f"Não consegui depositar o medicamento na fita, etapa {processa_fita.fita_contador}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                contador_erros[LOG_REMEDIO_CAIU] += 1
                return False
            
            print("Consegui depositar o medicamento com sucesso na fita!")
            enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
            contador_sucessos[0] += 1  # Incrementa o contador usando um objeto mutável
        except Exception as e:
            print(f"Tive um problema ao depositar o medicamento: {e}")
            enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
            contador_erros[LOG_REMEDIO_CAIU] += 1
            return False
        
        # Retorno à posição segura após depositar
        try:
            if processa_fita.fita_contador == 0:
                safe_movej(device, posicoes_fita, id_pedido, id_remedio, contador_erros)
                device.GoHomeInteli()
            else:
                device.GoHomeInteli()
                time.sleep(1)
                safe_movej(device, posicoes_fita, id_pedido, id_remedio, contador_erros)
                time.sleep(1)
            
            device.GoHomeInteli()
        except Exception as e:
            print(f"Não consegui retornar à posição segura: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
        
        # Incrementa o contador e reinicia se atingir o valor máximo (4)
        if processa_fita.fita_contador == 4:
            processa_fita.fita_contador = 0
        else:
            processa_fita.fita_contador += 1
            
        return True
        
    except Exception as e:
        print(f"Tive um problema inesperado ao processar a fita: {e}")
        enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
        contador_erros[LOG_ERRO_DOBOT] += 1
        return False


# def mapear_ilhas_qrcodes(device, num_ilhas=2):
#     """
#     Função para mapear os QR codes presentes em cada ilha.
    
#     Args:
#         device: Instância do controlador Dobot
#         num_ilhas: Número de ilhas a serem mapeadas
        
#     Returns:
#         dict: Dicionário mapeando valores de QR code para números de ilha
#     """
#     print("\n===== INICIANDO MAPEAMENTO DE ILHAS E QR CODES =====")
#     qrcode_para_ilha = {}  # Dicionário para armazenar o mapeamento
#     # Percorre cada ilha e lê seu QR code
#     for ilha_num in range(num_ilhas):
#         print(f"\nMapeando ilha {ilha_num}...")
        
#         try:
#             # Obtém posições da ilha
#             ilha = locais(ilha_num)
            
#             # Inicializa a variável que guardará o QR code lido
#             qrcode_procurado = None
#             tentativas = 4
            
#             # Loop para tentar diferentes posições para leitura do QR code
#             for i in range(tentativas):
#                 # Tentativa 1: altura baixa, posição central
#                 device.movej_to(ilha[0]["x"], ilha[0]["y"], 80, ilha[0]["r"], wait=True)
#                 time.sleep(0.5)  # Aguarda estabilização
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.1: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 2: altura alta, posição central
#                 device.movej_to(ilha[0]["x"], ilha[0]["y"], 130, ilha[0]["r"], wait=True)
#                 time.sleep(0.5)
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.2: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 3: altura baixa, deslocado para direita e rotação +
#                 device.movej_to(ilha[0]["x"] + 5, ilha[0]["y"], 80, ilha[0]["r"] + 5, wait=True)
#                 time.sleep(0.5)
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.3: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 4: altura baixa, deslocado para esquerda e rotação -
#                 device.movej_to(ilha[0]["x"] - 5, ilha[0]["y"], 80, ilha[0]["r"] - 5, wait=True)
#                 time.sleep(0.5)
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.4: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 5: altura alta, deslocado para direita e rotação +
#                 device.movej_to(ilha[0]["x"] + 5, ilha[0]["y"], 130, ilha[0]["r"] + 5, wait=True)
#                 time.sleep(0.5)
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.5: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 6: altura alta, deslocado para esquerda e rotação -
#                 device.movej_to(ilha[0]["x"] - 5, ilha[0]["y"], 130, ilha[0]["r"] - 5, wait=True)
#                 time.sleep(0.5)
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.6: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Tentativa 7: posição original com tempo de espera
#                 device.movej_to(ilha[0]["x"], ilha[0]["y"], 130, ilha[0]["r"], wait=True)
#                 time.sleep(1.0)  # Espera mais tempo
#                 qrcode_lido = QRCodeV(id_remedio)
#                 print(f"Tentativa {i+1}.7: QR code lido: '{qrcode_lido}'")
#                 if qrcode_lido != "n/a" and qrcode_lido != qrcode_anterior:
#                     qrcode_procurado = qrcode_lido
#                     break
                
#                 # Se chegou aqui, tenta novamente com o próximo conjunto de tentativas
#                 print(f"Conjunto de tentativas {i+1} falhou. Tentando novamente...")
            
#             # Verifica se conseguiu ler um QR code válido
#             if qrcode_procurado:
#                 print(f"QR code da ilha {ilha_num}: {qrcode_procurado}")
#                 # Adiciona o mapeamento: valor do QR code -> número da ilha
#                 qrcode_para_ilha[qrcode_procurado] = ilha_num
#                 qrcode_procurado = QRCodeV(id_remedio)
#             else:
#                 print(f"Não consegui ler o QR code da ilha {ilha_num} após todas as tentativas.")
                
#         except Exception as e:
#             print(f"Erro ao mapear ilha {ilha_num}: {e}")
        
#         finally:
#             # Volta para a posição segura
#             try:
#                 device.GoHomeInteli()
#                 time.sleep(1)
#             except Exception as e:
#                 print(f"Erro ao retornar para posição Home: {e}")
    
    print("\n===== MAPEAMENTO DE ILHAS CONCLUÍDO =====")
    print(f"Mapeamento encontrado: {qrcode_para_ilha}")
    return qrcode_para_ilha