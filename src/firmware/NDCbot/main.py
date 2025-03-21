"""
Sistema de Controle Dobot para Automação Farmacêutica
Este script controla um braço robótico Dobot para automatizar o manuseio de medicamentos.
"""

# Importações de bibliotecas padrão
import sys
import time
import json
from collections import deque

# Importações de bibliotecas de terceiros
import pandas as pd
import requests
import serial
import pydobot
from serial.tools import list_ports

# Importações locais
from modules.dobot_controller import InteliDobot
from modules.comApi import enviar_log, obter_pedidos
from modules.sensor_distancia import objeto_detectado
from modules.qrcode import QRCodeV, validar_qrcode
from modules.posicoes import locais, locais_fita
from modules.processamento import processa_ilha, processa_fita


# Constantes de log
LOG_SUCESSO = 0
LOG_QR_NAO_CORRESPONDE = 1
LOG_QR_NAO_RECONHECIDO = 2
LOG_REMEDIO_NAO_COLETADO = 3
LOG_REMEDIO_CAIU = 4
LOG_ERRO_DOBOT = 5


# ----- Função para processar pedido completo -----
def processar_pedido(pedido, device, contador_sucessos, contador_erros):
    """
    Processa um pedido completo.
    
    Argumentos:
        pedido (dict): Informações do pedido
        device: Instância do controlador Dobot
        contador_sucessos (list): Lista para contagem de sucessos
        contador_erros (dict): Dicionário para contagem de erros
    """
    print(f"\nEstou processando o pedido ID: {pedido['id']}")
    for remedio in pedido['remedios']:
        ilha_num = remedio['ilha']
        print(f"Processando remédio ID: {remedio['id']} da ilha {ilha_num}")
        
        sucesso = processa_ilha(ilha_num, pedido['id'], remedio['id'], device, contador_erros, contador_sucessos)
        
        if sucesso:
            device.GoHomeInteli()
            time.sleep(1)
            processa_fita(pedido['id'], remedio['id'], device, contador_sucessos, contador_erros)
            device.GoHomeInteli()
        else:
            print(f"Não consegui processar o remédio ID: {remedio['id']}")
            device.GoHomeInteli()  # Retorna à posição inicial mesmo em caso de falha


def main():
    """Função principal que controla o robô e processa pedidos."""
    
    # Verifica se conseguimos carregar as posições do JSON
    try:
        # Teste carregando as posições para a etapa 0 (ou a etapa inicial)
        pos_ilha_inicial = locais(0)
        pos_fita_inicial = locais_fita(0)
        print("✅ Posições dos arquivos JSON carregadas com sucesso")
    except Exception as e:
        print(f"❌ Erro ao carregar posições dos arquivos JSON: {e}")
        return  # Encerra se não conseguir carregar as posições
    
    # ----- Inicializa conexão do Dobot -----
    # Obtém portas disponíveis e tenta conectar
    available_ports = list_ports.comports()
    if not available_ports:
        print("Não encontrei nenhuma porta serial. Por favor, conecte o Dobot e tente novamente.")
        return

    print("Portas disponíveis:")
    for p in available_ports:
        print(f" - {p.device}")

    print("\nVou tentar conectar em cada porta...")
    device = None
    for p in available_ports:
        porta = p.device
        print(f"\n### Testando porta {porta} ###")
        try:
            device = InteliDobot(port=porta, verbose=False)
            (x, y, z, r, j1, j2, j3, j4) = device.pose()
            print(f"Sucesso! Consegui me conectar! Minha pose inicial é: x={x} y={y} z={z} j1={j1} j2={j2} j3={j3} j4={j4}")
            device.GoHomeInteli()
            time.sleep(1)
            break
        except Exception as e:
            print(f"Não consegui me conectar na porta {porta}: {e}")

    if device is None:
        print("Não consegui encontrar nenhuma porta válida. Vou encerrar...")
        enviar_log(1, 1, LOG_ERRO_DOBOT)  # Registra erro de conexão com o Dobot
        return

    # ----- Configura contadores para rastrear sucessos e erros -----
    contador_sucessos = [0]  # Usando uma lista para permitir modificação nas funções
    contador_erros = {
        LOG_QR_NAO_CORRESPONDE: 0,
        LOG_QR_NAO_RECONHECIDO: 0,
        LOG_REMEDIO_NAO_COLETADO: 0,
        LOG_REMEDIO_CAIU: 0,
        LOG_ERRO_DOBOT: 0
    }
    
    # ----- Seleção do modo de operação -----
    modo_operacao = input("Selecione o modo de operação (1 - Manual, 2 - API): ")
    
    if modo_operacao == "1":
        # Modo manual com entrada do usuário
        ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
        # Cria uma fila para organizar as ilhas em ordem
        fila_ilhas = deque(map(int, ilhas_input.split(',')))
        
        # Cria um pedido fictício para o modo manual
        pedido_atual = {"id": 1, "remedios": []}
        for ilha_num in fila_ilhas:
            pedido_atual["remedios"].append({"id": len(pedido_atual["remedios"]) + 1, "ilha": ilha_num})
        
        # Processa o pedido manual
        processar_pedido(pedido_atual, device, contador_sucessos, contador_erros)
    else:
        # Modo API - Verifica periodicamente por novos pedidos
        while True:
            pedidos = obter_pedidos()
            
            if not pedidos:
                print("Não encontrei nenhum pedido disponível. Vou aguardar...")
                time.sleep(10)  # Aguarda 10 segundos antes de verificar novamente
                continue
            
            # Processa um pedido por vez
            for pedido_atual in pedidos:
                processar_pedido(pedido_atual, device, contador_sucessos, contador_erros)
                
                # Marca o pedido como concluído na API
                try:
                    url = f"https://two025-1a-t12-ec05-g03.onrender.com/pedidos/status/{pedido_atual['id']}"
                    body = {
                        "status": 3,
                    }
                    requests.patch(url, json=body)
                except Exception as e:
                    print(f"Não consegui marcar o pedido como concluído: {e}")
                
                # Pergunta ao usuário se deseja continuar ou encerrar
                continuar = input("Deseja processar o próximo pedido? (s/n): ")
                if continuar.lower() != 's':
                    break
            
            # Se saiu do loop for por causa do break, também sai do loop while
            if continuar.lower() != 's':
                break
            

    # ----- Gera relatório final -----
    total_erros = sum(contador_erros.values())
    print("\n===== RELATÓRIO FINAL =====")
    print(f"Terminei o processo com {total_erros} erros e {contador_sucessos[0]} etapas concluídas com sucesso")
    print("Detalhamento dos erros:")
    print(f"- QR Code não corresponde ao pedido: {contador_erros[LOG_QR_NAO_CORRESPONDE]}")
    print(f"- QR Code não reconhecido: {contador_erros[LOG_QR_NAO_RECONHECIDO]}")
    print(f"- Remédio não coletado: {contador_erros[LOG_REMEDIO_NAO_COLETADO]}")
    print(f"- Remédio caiu durante o percurso: {contador_erros[LOG_REMEDIO_CAIU]}")
    print(f"- Erros do Dobot: {contador_erros[LOG_ERRO_DOBOT]}")
    print("===========================")

    device.close()
    print("Terminei a operação. Até a próxima!")


if __name__ == "__main__":
    main()