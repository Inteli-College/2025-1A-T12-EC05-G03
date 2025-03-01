# Importando as bibliotecas necessárias
import typer
import pyfiglet
from rich.console import Console
from rich.panel import Panel
from rich.align import Align
from rich.table import Table
from prompt_toolkit.shortcuts import prompt
import pydobot.enums
from serial.tools import list_ports
import pydobot
import time
import pandas as pd

# Inicializando o Typer e o Console
app = typer.Typer()
console = Console()

# Classe estendida para o Dobot
class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)

    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)

    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)    
    
    def GoHomeInteli(self):
        msg = pydobot.message.Message()
        msg.id = pydobot.enums.CommunicationProtocolIDs.CommunicationProtocolIDs.SET_HOME_CMD
        msg.ctrl = pydobot.enums.ControlValues.ControlValues.ONE
        msg.params = []  # Inicializa params para evitar erro de NoneType
        return super()._send_command(msg)

# Exibe as portas disponíveis
available_ports = list_ports.comports()
port_list = [x.device for x in available_ports]
console.print(f"[bold blue]Portas disponíveis:[/bold blue] {port_list}")

# Solicita ao usuário a escolha da porta
while True:
    try:
        porta_index = int(input("Escolha a porta desejada (0, 1, 2...): "))
        if 0 <= porta_index < len(port_list):
            port = port_list[porta_index]
            break
        else:
            console.print("[red]Número inválido! Tente novamente.[/red]")
    except ValueError:
        console.print("[red]Entrada inválida! Digite um número.[/red]")

# Inicializando o Dobot
device = InteliDobot(port=port, verbose=True)

# Obtendo as posições iniciais do robô
(x, y, z, r, j1, j2, j3, j4) = device.pose()

# Função para exibir o banner
def print_banner():
    banner = pyfiglet.figlet_format("NDC - NDCBot")
    panel = Panel(
        banner,
        subtitle="[bold blue]Sua Farmácia Mais Prática[/bold blue]",
        border_style="medium_spring_green",
        expand=False
    )
    console.print(panel)
    console.print(Align.center("[bold]Seja bem-vindo ao painel interativo do NDCBot[/bold]"))

# Função para criar o menu
def create_menu():
    table = Table(title="Menu do NDCBot", show_lines=True, header_style="bold magenta", expand=True)

    table.add_column("[bold]Opção[/bold]", justify="center", style="bold", no_wrap=True)
    table.add_column("[bold]Descrição[/bold]", justify="left", style="bold")
    table.add_column("[bold]Função[/bold]", justify="center", style="bold")

    menu_options = [
        ("1", "[green]Mostrar Info[/green]", "[green]Mostra informações relevantes sobre o modo de uso do programa[/green]"),
        ("2", "[yellow]Dipirona[/yellow]", "[yellow]Comando para o NDCBot pegar a Dipirona e colocá-la na fita médica[/yellow]"),
        ("3", "[orange]Mebendazol[/orange]", "[orange]Comando para o NDCBot pegar o Mebendazol e colocá-lo na fita médica[/orange]"),
        ("4", "[white]Fumarato[/white]", "[white]Comando para o NDCBot pegar o Fumarato e colocá-lo na fita médica[/white]"),
        ("5", "[purple]Rivotril[/purple]", "[purple]Comando para o NDCBot pegar o Rivotril e colocá-lo na fita médica[/purple]"),
        ("Q", "[red]Sair[/red]", "[red]Encerra e fecha o programa[/red]"),
    ]

    for option, description, case in menu_options:
        table.add_row(option, description, case)

    console.print(Align.center(table))

# Carrega os dados das posições das ilhas e da fita
ilhas = pd.read_json("posicoes_ilhas.json")
fita = pd.read_json("fita.json")

# Função para buscar posições das ilhas
def locais(ilha_num, etapa):
    ilha_data = ilhas[(ilhas['ilha'] == ilha_num) & (ilhas['etapa'] == etapa)]
    return ilha_data["position"].tolist()

# Função para buscar posições da fita
def locais_fita(etapa):
    fita_data = fita[fita['etapa'] == etapa]
    return fita_data["position"].tolist()

# Movimentação segura para uma ilha
def safe_move(posicoes):
    device.movel_to(posicoes["x"], posicoes["y"], posicoes["z"] + 70, posicoes["r"], wait=True)

# Função para processar a fita
def processa_fita():
    try:
        fita_etapa = int(input("Digite a etapa da fita para depositar o medicamento: "))
        posicoes_fita = locais_fita(fita_etapa)
        
        if not posicoes_fita:
            console.print("[red]Erro: Nenhuma posição encontrada para essa etapa.[/red]")
            return
        
        console.print(f"[green]Depositando medicamento na fita, etapa {fita_etapa}...[/green]")
        device.movej_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"] + 80, posicoes_fita[1]["r"], wait=True)
        time.sleep(1)
        
        device.movej_to(posicoes_fita[0]["x"], posicoes_fita[0]["y"], posicoes_fita[0]["z"] + 80, posicoes_fita[0]["r"], wait=True)
        time.sleep(1)
        
        # Movimento para a posição final da fita (de depósito)
        device.movel_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"], posicoes_fita[1]["r"], wait=True)
        time.sleep(1)
        device.suck(False)
        time.sleep(1)
        
        # Retorna à posição de segurança
        device.movej_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"] + 80, posicoes_fita[1]["r"], wait=True)
        time.sleep(1)

        device.GoHomeInteli()
        time.sleep(1)
    except ValueError:
        console.print("[red]Erro: Entrada inválida! Digite um número.[/red]")

# Função para processar uma ilha (recebe o número da ilha correspondente ao medicamento)
def processa_ilha(ilha_num):
    posicoes = locais(ilha_num, 0)
    if not posicoes:
        console.print(f"[red]Erro: Nenhuma posição encontrada para a ilha {ilha_num}.[/red]")
        return

    console.print(f"[blue]Movendo para a posição de leitura da ilha {ilha_num}...[/blue]")
    safe_move(posicoes[0])
    
    console.print("[yellow]Ativando sucção...[/yellow]")
    device.suck(True)
    time.sleep(1)
    
    console.print("[green]Movendo para a posição da ilha...[/green]")
    safe_move(posicoes[0])
    
    console.print("[bold cyan]Retornando para posição inicial...[/bold cyan]")
    device.GoHomeInteli()

# Loop do menu principal
def menu_loop():
    while True:
        create_menu()
        choice = prompt("Escolha uma opção: ").strip().lower()
        if choice == "1":
                console.print("\n[green]Seja bem-vindo ao CLI do NDCBot.[/green]\n"
                              "[blink][yellow]1.[/blink][/yellow] No menu, verifique qual o item desejado.\n"
                              "[blink][yellow]2.[/blink][/yellow] Digite o número do item escolhido.\n"
                              "[blink][yellow]3.[/blink][/yellow] Após digitar, pressione ENTER.\n")
                time.sleep(5)
        elif choice == "2":
            processa_ilha(0)  # Mebendazol
            processa_fita()
        elif choice == "3":
            processa_ilha(1)  # Mebendazol
            processa_fita()
        elif choice == "4":
            processa_ilha(2)  # Fumarato
            processa_fita()
        elif choice == "5":
            processa_ilha(3)  # Rivotril
            processa_fita()
        elif choice == "q":
            console.print("[red]Saindo...[/red]")
            break
        else:
            console.print("[bold red]Opção inválida![/bold red]")

@app.command()
def start():
    print_banner()
    menu_loop()

if __name__ == "__main__":
    app()
