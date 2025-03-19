// Função para adicionar event listeners aos elementos da página
function adicionarEventListeners() {
    // Event listeners para botões "Avaliar"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-avaliar')) {
            // Pega o ID da prescrição do botão
            const idPrescricao = parseInt(e.target.dataset.id);
            
            // Simula a avaliação (movendo da lista "aguardando" para "avaliadas")
            const index = dadosMockados.prescricoes.aguardandoAvaliacao.findIndex(p => p.id === idPrescricao);
            
            if (index !== -1) {
                // Move a prescrição para a lista de avaliadas
                const prescricaoAvaliada = dadosMockados.prescricoes.aguardandoAvaliacao.splice(index, 1)[0];
                
                // Adiciona informações de avaliação
                prescricaoAvaliada.status_prescricao = 2; // Avaliada
                prescricaoAvaliada.data_avaliacao = new Date().toLocaleString('pt-BR').replace(',', '');
                prescricaoAvaliada.id_user_aprovacao = 1;
                prescricaoAvaliada.user_nome = "Dr. Roberto Silva";
                
                dadosMockados.prescricoes.avaliadas.push(prescricaoAvaliada);
                
                // Atualiza a interface
                atualizarContadores();
                carregarDadosMockados();
                
                // Feedback visual (alerta simples)
                alert(`Prescrição de ${prescricaoAvaliada.paciente_nome} avaliada com sucesso!`);
            }
        }
    });
    
    // Event listeners para botões "Visualizar pedido"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-visualizar') || e.target.parentElement.classList.contains('btn-visualizar')) {
            const botao = e.target.classList.contains('btn-visualizar') ? e.target : e.target.parentElement;
            const idPedido = parseInt(botao.dataset.id);
            
            // Busca o pedido para exibir detalhes
            const pedido = encontrarPedidoPorId(idPedido);
            
            if (pedido) {
                // Monta a mensagem com os detalhes do pedido
                let detalhesPedido = `Detalhes do Pedido #${pedido.id}\n\n`;
                detalhesPedido += `Paciente: ${pedido.paciente} (HC: ${pedido.hc_paciente})\n`;
                detalhesPedido += `Quarto: ${pedido.quarto}\n`;
                detalhesPedido += `Data de entrada: ${pedido.data_entrada}\n\n`;
                detalhesPedido += `Remédios:\n`;
                
                pedido.remedios.forEach((remedio, index) => {
                    detalhesPedido += `${index + 1}. ${remedio.nome} - ${remedio.dosagem} - ${remedio.via} - Qtd: ${remedio.quantidade}\n`;
                });
                
                detalhesPedido += `\nStatus: ${obterNomeStatus(pedido.status_pedido, 'pedido')}`;
                
                // Exibe os detalhes (apenas um alerta para o mockup)
                alert(detalhesPedido);
            } else {
                alert(`Pedido #${idPedido} não encontrado.`);
            }
        }
    });
    
    // Simulação de cliques nos itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe 'active' de todos os itens
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');
            
            // Aqui poderia ter lógica para mudar de página
            // Como é apenas mockup, vamos apenas mostrar uma mensagem
            if (!this.classList.contains('active')) {
                alert('Esta funcionalidade será implementada em uma versão futura.');
            }
        });
    });
    
    // Simulação de cliques nas caixas de workflow
    document.querySelectorAll('.workflow-box').forEach(box => {
        box.addEventListener('click', function() {
            // Aqui poderia filtrar os dados para mostrar apenas os da categoria selecionada
            const statusTexto = this.querySelector('.step-title').textContent;
            alert(`Exibindo todos os itens com status: ${statusTexto}. Esta funcionalidade será implementada em uma versão futura.`);
        });
    });
}

// Função auxiliar para encontrar um pedido pelo ID
function encontrarPedidoPorId(id) {
    // Busca em todas as categorias de pedidos
    for (const categoria in dadosMockados.pedidos) {
        const pedido = dadosMockados.pedidos[categoria].find(p => p.id === id);
        if (pedido) return pedido;
    }
    return null;
}

// Função auxiliar para obter o nome do status pelo ID
function obterNomeStatus(idStatus, tipo) {
    if (tipo === 'pedido') {
        const status = dadosMockados.statusPedido.find(s => s.id === idStatus);
        return status ? status.status : 'Desconhecido';
    } else if (tipo === 'prescricao') {
        const status = dadosMockados.statusPrescricao.find(s => s.id === idStatus);
        return status ? status.status : 'Desconhecido';
    }
    return 'Desconhecido';
}// Dados mockados para simular a resposta da API no futuro
const dadosMockados = {
    prescricoes: {
        aguardandoAvaliacao: [
            { 
                id: 1, 
                hc_paciente: "12345678",
                paciente_nome: "Maria Silva", 
                remedios: [
                    {nome: "Paracetamol", dosagem: "500mg", via: "Via oral", quantidade: 10},
                    {nome: "Dipirona", dosagem: "1g", via: "Via oral", quantidade: 5}
                ],
                data_entrada: "15/03/2025 08:30",
                status_prescricao: 1
            },
            { 
                id: 2, 
                hc_paciente: "87654321",
                paciente_nome: "João Santos", 
                remedios: [
                    {nome: "Amoxicilina", dosagem: "250mg", via: "Via oral", quantidade: 21},
                    {nome: "Ibuprofeno", dosagem: "400mg", via: "Via oral", quantidade: 10}
                ],
                data_entrada: "15/03/2025 10:15",
                status_prescricao: 1
            },
            { 
                id: 3, 
                hc_paciente: "23456789",
                paciente_nome: "Ana Oliveira", 
                remedios: [
                    {nome: "Omeprazol", dosagem: "20mg", via: "Via oral", quantidade: 30},
                    {nome: "Metformina", dosagem: "850mg", via: "Via oral", quantidade: 60}
                ],
                data_entrada: "16/03/2025 09:45",
                status_prescricao: 1
            }
        ],
        avaliadas: [
            { 
                id: 4, 
                hc_paciente: "34567890",
                paciente_nome: "Carlos Lima", 
                remedios: [
                    {nome: "Atenolol", dosagem: "50mg", via: "Via oral", quantidade: 30},
                    {nome: "Hidroclorotiazida", dosagem: "25mg", via: "Via oral", quantidade: 30}
                ],
                data_entrada: "14/03/2025 11:20",
                data_avaliacao: "14/03/2025 15:45",
                status_prescricao: 2,
                id_user_aprovacao: 1,
                user_nome: "Dr. Roberto Silva"
            }
        ]
    },
    pedidos: {
        aguardandoSeparacao: [
            { 
                id: 1001, 
                id_prescricao: 4,
                paciente: "Carlos Lima", 
                hc_paciente: "34567890",
                quarto: "Quarto 302", 
                data_entrada: "15/03/2025 14:10",
                remedios: [
                    {nome: "Atenolol", dosagem: "50mg", via: "Via oral", quantidade: 30},
                    {nome: "Hidroclorotiazida", dosagem: "25mg", via: "Via oral", quantidade: 30}
                ],
                status_pedido: 1
            },
            { 
                id: 1002, 
                id_prescricao: 5,
                paciente: "Ana Oliveira", 
                hc_paciente: "45678901",
                quarto: "Quarto 205", 
                data_entrada: "15/03/2025 15:25",
                remedios: [
                    {nome: "Losartana", dosagem: "50mg", via: "Via oral", quantidade: 30},
                    {nome: "Pantoprazol", dosagem: "40mg", via: "Via oral", quantidade: 15}
                ],
                status_pedido: 1
            }
        ],
        emSeparacao: [
            { 
                id: 995, 
                id_prescricao: 3,
                paciente: "Carlos Mendes", 
                hc_paciente: "56789012",
                quarto: "Quarto 301", 
                data_entrada: "14/03/2025 10:00",
                remedios: [
                    {nome: "Enalapril", dosagem: "10mg", via: "Via oral", quantidade: 30},
                    {nome: "Sinvastatina", dosagem: "20mg", via: "Via oral", quantidade: 30},
                    {nome: "AAS", dosagem: "100mg", via: "Via oral", quantidade: 30}
                ],
                status_pedido: 2
            }
        ],
        emRevisao: [
            { 
                id: 990, 
                id_prescricao: 2,
                paciente: "Roberto Alves", 
                hc_paciente: "67890123",
                quarto: "Quarto 115", 
                data_entrada: "13/03/2025 09:15",
                remedios: [
                    {nome: "Dexametasona", dosagem: "4mg", via: "Via oral", quantidade: 20},
                    {nome: "Metronidazol", dosagem: "400mg", via: "Via oral", quantidade: 21}
                ],
                status_pedido: 3
            }
        ],
        concluidos: [
            { 
                id: 985, 
                id_prescricao: 1,
                paciente: "Juliana Lima", 
                hc_paciente: "78901234",
                quarto: "Quarto 402", 
                data_entrada: "12/03/2025 08:30",
                data_finalizacao: "12/03/2025 11:45",
                remedios: [
                    {nome: "Azitromicina", dosagem: "500mg", via: "Via oral", quantidade: 5},
                    {nome: "Salbutamol", dosagem: "100mcg", via: "Inalatória", quantidade: 1}
                ],
                status_pedido: 4,
                id_user_revisao: 2,
                user_nome: "Farmacêutico Pedro Santos"
            }
        ]
    },
    notificacoes: [
        { id: 1, mensagem: "Nova prescrição aguardando avaliação", data: "18/03/2025 10:15" },
        { id: 2, mensagem: "Pedido #1001 pronto para separação", data: "18/03/2025 09:30" },
        { id: 3, mensagem: "Prescrição de João Silva foi avaliada", data: "17/03/2025 16:45" },
        { id: 4, mensagem: "Pedido #995 em separação", data: "17/03/2025 14:20" }
    ],
    statusPrescricao: [
        { id: 1, status: "Aguardando Avaliação" },
        { id: 2, status: "Avaliada" }
    ],
    statusPedido: [
        { id: 1, status: "Aguardando Separação" },
        { id: 2, status: "Em Separação" },
        { id: 3, status: "Em Revisão" },
        { id: 4, status: "Concluído" }
    ]
};

// Função executada quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os contadores nas caixas de fluxo de trabalho
    atualizarContadores();
    
    // Carrega os dados mockados na interface
    carregarDadosMockados();
    
    // Adiciona os event listeners para os botões
    adicionarEventListeners();
    
    // Inicializa o menu hamburguer
    inicializarMenuHamburguer();
});

// Função para atualizar os contadores nas caixas de fluxo de trabalho
function atualizarContadores() {
    // Contadores para prescrições
    document.querySelector('.prescricoes-section .workflow-step:nth-child(1) .step-count').textContent = 
        dadosMockados.prescricoes.aguardandoAvaliacao.length;
    
    document.querySelector('.prescricoes-section .workflow-step:nth-child(3) .step-count').textContent = 
        dadosMockados.prescricoes.avaliadas.length;
    
    // Contadores para pedidos
    const pedidosBoxes = document.querySelectorAll('.pedidos-section .workflow-step .step-count');
    
    pedidosBoxes[0].textContent = dadosMockados.pedidos.aguardandoSeparacao.length;
    pedidosBoxes[1].textContent = dadosMockados.pedidos.emSeparacao.length;
    pedidosBoxes[2].textContent = dadosMockados.pedidos.emRevisao.length;
    pedidosBoxes[3].textContent = dadosMockados.pedidos.concluidos.length;
}

// Função para carregar dados mockados na interface
function carregarDadosMockados() {
    // Carrega as prescrições aguardando avaliação
    const listaPrescricoes = document.getElementById('lista-prescricoes');
    
    // Limpa a lista atual
    listaPrescricoes.innerHTML = '';
    
    // Adiciona as prescrições da lista mockada
    dadosMockados.prescricoes.aguardandoAvaliacao.forEach(prescricao => {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-item';
        itemLista.dataset.id = prescricao.id;
        
        // Cria o HTML para os remédios da prescrição
        const remediosHTML = prescricao.remedios.map(remedio => 
            `<div class="remedio-item">
                <span class="info-text">${remedio.nome}</span>
                <span class="info-text">${remedio.dosagem}</span>
                <span class="info-text">${remedio.via}</span>
                <span class="info-text">Qtd: ${remedio.quantidade}</span>
            </div>`
        ).join('');
        
        itemLista.innerHTML = `
            <div class="prescricao-header">
                <div class="paciente-info">
                    <strong>Paciente:</strong> ${prescricao.paciente_nome} (HC: ${prescricao.hc_paciente})
                </div>
                <div class="data-info">
                    <strong>Data:</strong> ${prescricao.data_entrada}
                </div>
            </div>
            <div class="prescricao-content">
                <div class="remedios-list">
                    ${remediosHTML}
                </div>
            </div>
            <div class="prescricao-footer">
                <button class="btn btn-avaliar" data-id="${prescricao.id}">Avaliar</button>
            </div>
        `;
        
        listaPrescricoes.appendChild(itemLista);
    });
    
    // Carrega os pedidos aguardando separação na tabela
    const tabelaPedidos = document.getElementById('tabela-pedidos');
    
    // Limpa a tabela atual
    tabelaPedidos.innerHTML = '';
    
    // Adiciona os pedidos da lista mockada à tabela
    dadosMockados.pedidos.aguardandoSeparacao.forEach(pedido => {
        const linha = document.createElement('tr');
        linha.dataset.id = pedido.id;
        
        linha.innerHTML = `
            <td>Pedido #${pedido.id}</td>
            <td>${pedido.paciente}</td>
            <td>${pedido.hc_paciente}</td>
            <td>${pedido.quarto}</td>
            <td>${pedido.data_entrada}</td>
            <td>${pedido.remedios.length} itens</td>
            <td>
                <button class="btn-visualizar" data-id="${pedido.id}">
                    <i class="fas fa-eye"></i> Visualizar pedido
                </button>
            </td>
        `;
        
        tabelaPedidos.appendChild(linha);
    });
    
    // Carrega as notificações
    const notificacoesList = document.querySelector('.notification-list');
    
    // Limpa o conteúdo atual
    notificacoesList.innerHTML = '';
    
    // Adiciona as notificações mockadas
    dadosMockados.notificacoes.forEach(notificacao => {
        const itemNotificacao = document.createElement('div');
        itemNotificacao.className = 'notification-item';
        
        itemNotificacao.innerHTML = `
            <p><strong>${notificacao.mensagem}</strong></p>
            <small>${notificacao.data}</small>
        `;
        
        notificacoesList.appendChild(itemNotificacao);
    });
}

// Função para adicionar event listeners aos elementos da página
function adicionarEventListeners() {
    // Event listeners para botões "Avaliar"
    document.querySelectorAll('.btn-avaliar').forEach(botao => {
        botao.addEventListener('click', function(e) {
            // Pega o ID da prescrição do elemento pai
            const idPrescricao = parseInt(this.closest('.list-item').dataset.id);
            
            // Simula a avaliação (movendo da lista "aguardando" para "avaliadas")
            const index = dadosMockados.prescricoes.aguardandoAvaliacao.findIndex(p => p.id === idPrescricao);
            
            if (index !== -1) {
                // Move a prescrição para a lista de avaliadas
                const prescricaoAvaliada = dadosMockados.prescricoes.aguardandoAvaliacao.splice(index, 1)[0];
                dadosMockados.prescricoes.avaliadas.push(prescricaoAvaliada);
                
                // Atualiza a interface
                atualizarContadores();
                carregarDadosMockados();
                
                // Feedback visual (alerta simples)
                alert(`Prescrição de ${prescricaoAvaliada.nome} avaliada com sucesso!`);
            }
        });
    });
    
    // Event listeners para botões "Visualizar pedido"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-visualizar') || e.target.parentElement.classList.contains('btn-visualizar')) {
            const botao = e.target.classList.contains('btn-visualizar') ? e.target : e.target.parentElement;
            const linha = botao.closest('tr');
            const idPedido = linha.dataset.id;
            
            // Simula a visualização do pedido (apenas um alerta para o mockup)
            alert(`Visualizando detalhes do Pedido #${idPedido}. Esta funcionalidade será implementada em uma versão futura.`);
        }
    });
    
    // Simulação de cliques nos itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe 'active' de todos os itens
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');
            
            // Aqui poderia ter lógica para mudar de página
            // Como é apenas mockup, vamos apenas mostrar uma mensagem
            if (!this.classList.contains('active')) {
                alert('Esta funcionalidade será implementada em uma versão futura.');
            }
        });
    });
    
    // Simulação de cliques nas caixas de workflow
    document.querySelectorAll('.workflow-box').forEach(box => {
        box.addEventListener('click', function() {
            // Aqui poderia filtrar os dados para mostrar apenas os da categoria selecionada
            alert('Filtragem por status será implementada em uma versão futura.');
        });
    });
}

// Função para inicializar o menu hamburguer
function inicializarMenuHamburguer() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    // Verifica se os elementos existem
    if (!menuToggle || !sidebar) {
        console.error('Elementos do menu não encontrados!');
        return;
    }
    
    // Adiciona evento de clique no botão hamburguer
    menuToggle.addEventListener('click', function() {
        // Alterna a classe 'expanded' na sidebar
        sidebar.classList.toggle('expanded');
        
        // Alterna a classe no body para ajustar o conteúdo principal
        body.classList.toggle('menu-expanded');
    });
}