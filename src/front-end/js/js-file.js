// Dados mockados para simulação
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
                data_inicio_separacao: "14/03/2025 11:15",
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
                data_inicio_separacao: "13/03/2025 10:30",
                data_inicio_revisao: "13/03/2025 13:45",
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
                data_inicio_separacao: "12/03/2025 09:15",
                data_inicio_revisao: "12/03/2025 10:50",
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
        { id: 1, mensagem: "Nova prescrição de Maria Silva aguardando avaliação", data: "18/03/2025 10:15" },
        { id: 2, mensagem: "Pedido #1001 pronto para separação", data: "18/03/2025 09:30" },
        { id: 3, mensagem: "Prescrição de Carlos Lima foi avaliada", data: "17/03/2025 16:45" },
        { id: 4, mensagem: "Pedido #995 em separação", data: "17/03/2025 14:20" },
        { id: 5, mensagem: "Pedido #990 em revisão", data: "17/03/2025 11:10" },
        { id: 6, mensagem: "Pedido #985 concluído", data: "16/03/2025 12:30" },
        { id: 7, mensagem: "Nova prescrição de João Santos aguardando avaliação", data: "16/03/2025 10:15" },
        { id: 8, mensagem: "Nova prescrição de Ana Oliveira aguardando avaliação", data: "16/03/2025 09:45" }
    ],
    statusPrescricao: [
        { id: 1, status_prescricao: "Aguardando Avaliação" },
        { id: 2, status_prescricao: "Avaliada" }
    ],
    statusPedido: [
        { id: 1, status_pedido: "Aguardando Separação" },
        { id: 2, status_pedido: "Em Separação" },
        { id: 3, status_pedido: "Em Revisão" },
        { id: 4, status_pedido: "Concluído" }
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
    
    // Inicializa os filtros de workflow para pedidos
    inicializarFiltrosWorkflow();
    
    // Inicializa os filtros de workflow para prescrições
    inicializarFiltrosPrescricoes();
    
    // Inicializa o painel de notificações expansível
    inicializarNotificacoesExpansiveis();
    
    // Inicializa os modais
    inicializarModais();
});

// Função para atualizar os contadores nas caixas de fluxo de trabalho
function atualizarContadores() {
    // Contadores para prescrições
    const countAguardando = document.getElementById('count-aguardando');
    const countAvaliadas = document.getElementById('count-avaliadas');
    
    if (countAguardando) {
        countAguardando.textContent = dadosMockados.prescricoes.aguardandoAvaliacao.length;
    }
    
    if (countAvaliadas) {
        countAvaliadas.textContent = dadosMockados.prescricoes.avaliadas.length;
    }
    
    // Contadores para pedidos
    const pedidosBoxes = document.querySelectorAll('.pedidos-section .workflow-step .step-count');
    
    if (pedidosBoxes.length >= 4) {
        pedidosBoxes[0].textContent = dadosMockados.pedidos.aguardandoSeparacao.length;
        pedidosBoxes[1].textContent = dadosMockados.pedidos.emSeparacao.length;
        pedidosBoxes[2].textContent = dadosMockados.pedidos.emRevisao.length;
        pedidosBoxes[3].textContent = dadosMockados.pedidos.concluidos.length;
    }
}

// Função para carregar dados mockados na interface
function carregarDadosMockados() {
    // Inicialmente carrega as prescrições aguardando avaliação
    carregarPrescricoesAguardando();
    
    // Carrega os pedidos na tabela (baseado no filtro ativo)
    const activeBox = document.querySelector('.pedidos-section .workflow-box.active-filter');
    const activeIndex = Array.from(document.querySelectorAll('.pedidos-section .workflow-box')).indexOf(activeBox);
    filtrarPedidosPorStatus(activeIndex + 1); // +1 porque os IDs começam em 1
    
    // Carrega as notificações
    carregarResumoNotificacoes();
}

// Função para adicionar event listeners aos elementos da página
function adicionarEventListeners() {
    // Event listeners já são adicionados nas funções específicas de cada componente
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
        return status ? status.status_pedido : 'Desconhecido';
    } else if (tipo === 'prescricao') {
        const status = dadosMockados.statusPrescricao.find(s => s.id === idStatus);
        return status ? status.status_prescricao : 'Desconhecido';
    }
    return 'Desconhecido';
}

// ================ FUNÇÕES PARA OS FILTROS DE WORKFLOW ================

// Função para inicializar os filtros de workflow para pedidos
function inicializarFiltrosWorkflow() {
    // Seleciona todos os boxes de workflow na seção de pedidos
    const workflowBoxes = document.querySelectorAll('.pedidos-section .workflow-box');
    
    // Adiciona destaque inicial ao primeiro box (Aguardando Separação)
    workflowBoxes[0].classList.add('active-filter');
    
    // Adiciona event listener para cada box
    workflowBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            // Remove a classe 'active-filter' de todos os boxes
            workflowBoxes.forEach(b => b.classList.remove('active-filter'));
            
            // Adiciona a classe ao box clicado
            this.classList.add('active-filter');
            
            // Filtra a tabela de acordo com o status
            filtrarPedidosPorStatus(index + 1); // +1 porque os IDs começam em 1
            
            // Atualiza o texto do subtítulo
            const statusTexto = this.querySelector('.step-title').textContent;
            document.querySelector('.pedidos-section .section-subtitle').textContent = statusTexto;
        });
    });
}

// Função para inicializar os filtros de workflow para prescrições
function inicializarFiltrosPrescricoes() {
    // Seleciona os boxes de workflow na seção de prescrições
    const boxAguardando = document.getElementById('filtro-aguardando');
    const boxAvaliadas = document.getElementById('filtro-avaliadas');
    
    if (!boxAguardando || !boxAvaliadas) return;
    
    // Adiciona destaque inicial ao primeiro box (Aguardando Avaliação)
    boxAguardando.classList.add('active-filter');
    
    // Adiciona event listener para cada box
    boxAguardando.addEventListener('click', function() {
        // Remove a classe 'active-filter' de todos os boxes
        boxAvaliadas.classList.remove('active-filter');
        
        // Adiciona a classe ao box clicado
        this.classList.add('active-filter');
        
        // Atualiza o texto do subtítulo
        document.getElementById('prescricoes-subtitulo').textContent = "Aguardando Avaliação";
        
        // Carrega as prescrições aguardando avaliação
        carregarPrescricoesAguardando();
    });
    
    boxAvaliadas.addEventListener('click', function() {
        // Remove a classe 'active-filter' de todos os boxes
        boxAguardando.classList.remove('active-filter');
        
        // Adiciona a classe ao box clicado
        this.classList.add('active-filter');
        
        // Atualiza o texto do subtítulo
        document.getElementById('prescricoes-subtitulo').textContent = "Avaliadas";
        
        // Carrega as prescrições avaliadas
        carregarPrescricoesAvaliadas();
    });
}

// Funções para carregar as prescrições filtradas
function carregarPrescricoesAguardando() {
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
    
    // Adiciona mensagem se não houver prescrições
    if (dadosMockados.prescricoes.aguardandoAvaliacao.length === 0) {
        listaPrescricoes.innerHTML = `
            <li class="list-item empty-message">
                <p>Não há prescrições aguardando avaliação.</p>
            </li>
        `;
    }
}

// Função atualizada para carregar prescrições avaliadas
function carregarPrescricoesAvaliadas() {
    const listaPrescricoes = document.getElementById('lista-prescricoes');
    
    // Limpa a lista atual
    listaPrescricoes.innerHTML = '';
    
    // Adiciona as prescrições da lista mockada
    dadosMockados.prescricoes.avaliadas.forEach(prescricao => {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-item';
        itemLista.dataset.id = prescricao.id;
        
        // Verifica se a prescrição tem remédios
        const remediosHTML = prescricao.remedios && prescricao.remedios.length > 0 ? 
            prescricao.remedios.map(remedio => 
                `<div class="remedio-item">
                    <span class="info-text">${remedio.nome}</span>
                    <span class="info-text">${remedio.dosagem}</span>
                    <span class="info-text">${remedio.via}</span>
                    <span class="info-text">Qtd: ${remedio.quantidade}</span>
                </div>`
            ).join('') : 
            `<div class="remedio-item empty">
                <span class="info-text">Nenhum medicamento avaliado para esta prescrição</span>
            </div>`;
        
        // Adiciona informações do usuário avaliador
        const avaliadorInfo = prescricao.user_nome ? 
            `<div class="avaliador-info">
                <strong>Avaliado por:</strong> ${prescricao.user_nome}
            </div>` : '';
        
        itemLista.innerHTML = `
            <div class="prescricao-header">
                <div class="paciente-info">
                    <strong>Paciente:</strong> ${prescricao.paciente_nome} (HC: ${prescricao.hc_paciente})
                </div>
                <div class="data-info">
                    <strong>Data:</strong> ${prescricao.data_entrada}
                    <br>
                    <strong>Avaliada em:</strong> ${prescricao.data_avaliacao}
                </div>
            </div>
            ${avaliadorInfo}
            <div class="prescricao-content">
                <div class="remedios-list">
                    ${remediosHTML}
                </div>
                ${prescricao.observacoes ? `<div class="observacoes"><strong>Observações:</strong> ${prescricao.observacoes}</div>` : ''}
            </div>
            <div class="prescricao-footer">
                <button class="btn btn-visualizar" data-id="${prescricao.id}">Visualizar</button>
            </div>
        `;
        
        listaPrescricoes.appendChild(itemLista);
    });
    
    // Adiciona mensagem se não houver prescrições
    if (dadosMockados.prescricoes.avaliadas.length === 0) {
        listaPrescricoes.innerHTML = `
            <li class="list-item empty-message">
                <p>Não há prescrições avaliadas.</p>
            </li>
        `;
    }
    
    // Adiciona event listener para os botões de visualizar
    document.querySelectorAll('.btn-visualizar').forEach(btn => {
        btn.addEventListener('click', function() {
            const prescricaoId = parseInt(this.dataset.id);
            const prescricao = buscarPrescricaoPorId(prescricaoId);
            if (prescricao) {
                abrirModalPrescricao(prescricao);
            }
        });
    });
}

// Função para filtrar a tabela de pedidos por status
function filtrarPedidosPorStatus(statusId) {
    // Limpa a tabela atual
    const tabelaPedidos = document.getElementById('tabela-pedidos');
    tabelaPedidos.innerHTML = '';
    
    // Determina qual categoria de pedidos mostrar
    let pedidosFiltrados;
    switch(statusId) {
        case 1:
            pedidosFiltrados = dadosMockados.pedidos.aguardandoSeparacao;
            break;
        case 2:
            pedidosFiltrados = dadosMockados.pedidos.emSeparacao;
            break;
        case 3:
            pedidosFiltrados = dadosMockados.pedidos.emRevisao;
            break;
        case 4:
            pedidosFiltrados = dadosMockados.pedidos.concluidos;
            break;
        default:
            pedidosFiltrados = dadosMockados.pedidos.aguardandoSeparacao;
    }
    
    // Popula a tabela com os pedidos filtrados
    pedidosFiltrados.forEach(pedido => {
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
                    <i class="fas fa-eye"></i> ${statusId === 1 ? 'Visualizar pedido' : statusId === 2 ? 'Continuar separação' : statusId === 3 ? 'Revisar pedido' : 'Ver detalhes'}
                </button>
            </td>
        `;
        
        tabelaPedidos.appendChild(linha);
    });
    
    // Se não houver pedidos, exibe uma mensagem
    if (pedidosFiltrados.length === 0) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td colspan="7" style="text-align: center; padding: 20px;">
                Não há pedidos neste status no momento.
            </td>
        `;
        tabelaPedidos.appendChild(linha);
    }
}

// ================ FUNÇÕES PARA NOTIFICAÇÕES EXPANSÍVEIS ================

// Função para inicializar o painel de notificações expansível
function inicializarNotificacoesExpansiveis() {
    // Adiciona o botão de toggle ao painel de notificações
    const notificationsPanel = document.querySelector('.notifications-panel');
    
    // Cria o botão de toggle
    const toggleButton = document.createElement('div');
    toggleButton.className = 'notification-toggle';
    toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
    
    // Adiciona o botão ao painel
    notificationsPanel.appendChild(toggleButton);
    
    // Adiciona event listener para expandir/recolher o painel
    toggleButton.addEventListener('click', function() {
        notificationsPanel.classList.toggle('expanded');
        
        // Se estiver expandido, mostra notificações completas
        // Se não, mostra o resumo
        if (notificationsPanel.classList.contains('expanded')) {
            carregarTodasNotificacoes();
        } else {
            carregarResumoNotificacoes();
        }
    });
    
    // Carrega o resumo inicial
    carregarResumoNotificacoes();
}

// Função para carregar apenas um resumo das notificações (atualizada com botão "Ver mais")
function carregarResumoNotificacoes() {
    const notificacoesList = document.querySelector('.notification-list');
    
    // Limpa o conteúdo atual
    notificacoesList.innerHTML = '';
    
    // Mostra apenas as 4 notificações mais recentes
    const notificacoesRecentes = dadosMockados.notificacoes.slice(0, 4);
    
    // Se não houver notificações, exibe uma mensagem
    if (notificacoesRecentes.length === 0) {
        notificacoesList.innerHTML = `
            <div class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>Nenhuma notificação</p>
            </div>
        `;
        return;
    }
    
    // Adiciona as notificações recentes
    notificacoesRecentes.forEach(notificacao => {
        const itemNotificacao = document.createElement('div');
        itemNotificacao.className = 'notification-item';
        
        // Se for uma notificação nova (menos de 1 hora), adiciona a classe 'new'
        const dataNotificacao = new Date(notificacao.data.replace(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+)/, '$3-$2-$1T$4:$5:00'));
        const agora = new Date();
        if ((agora - dataNotificacao) < 3600000) { // Menos de 1 hora (em ms)
            itemNotificacao.classList.add('new');
        }
        
        itemNotificacao.innerHTML = `
            <p><strong>${notificacao.mensagem}</strong></p>
            <small class="notification-date">${notificacao.data}</small>
        `;
        
        notificacoesList.appendChild(itemNotificacao);
    });
    
    // Adiciona o botão "Ver mais" se houver mais de 4 notificações
    if (dadosMockados.notificacoes.length > 4) {
        const btnVerMais = document.createElement('button');
        btnVerMais.className = 'btn-ver-mais';
        btnVerMais.textContent = 'Ver histórico completo';
        
        btnVerMais.addEventListener('click', function() {
            abrirModalNotificacoes();
        });
        
        notificacoesList.appendChild(btnVerMais);
    }
}

// Função para carregar todas as notificações
function carregarTodasNotificacoes() {
    const notificacoesList = document.querySelector('.notification-list');
    
    // Limpa o conteúdo atual
    notificacoesList.innerHTML = '';
    
    // Se não houver notificações, exibe uma mensagem
    if (dadosMockados.notificacoes.length === 0) {
        notificacoesList.innerHTML = `
            <div class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>Nenhuma notificação</p>
            </div>
        `;
        return;
    }
    
    // Adiciona todas as notificações
    dadosMockados.notificacoes.forEach(notificacao => {
        const itemNotificacao = document.createElement('div');
        itemNotificacao.className = 'notification-item';
        
        // Se for uma notificação nova (menos de 1 hora), adiciona a classe 'new'
        const dataNotificacao = new Date(notificacao.data.replace(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+)/, '$3-$2-$1T$4:$5:00'));
        const agora = new Date();
        if ((agora - dataNotificacao) < 3600000) { // Menos de 1 hora (em ms)
            itemNotificacao.classList.add('new');
        }
        
        itemNotificacao.innerHTML = `
            <p><strong>${notificacao.mensagem}</strong></p>
            <small class="notification-date">${notificacao.data}</small>
        `;
        
        notificacoesList.appendChild(itemNotificacao);
    });
    
    // Adiciona o botão "Ver mais" para o modal mesmo no modo expandido
    const btnVerMais = document.createElement('button');
    btnVerMais.className = 'btn-ver-mais';
    btnVerMais.textContent = 'Ver histórico completo';
    
    btnVerMais.addEventListener('click', function() {
        abrirModalNotificacoes();
    });
    
    notificacoesList.appendChild(btnVerMais);
}

// Função para adicionar uma nova notificação
function adicionarNotificacao(mensagem, data) {
    // Gera um novo ID para a notificação
    const novoId = Math.max(...dadosMockados.notificacoes.map(n => n.id), 0) + 1;
    
    // Formata a data
    const dataFormatada = data.toLocaleString('pt-BR').replace(',', '');
    
    // Cria a nova notificação
    const novaNotificacao = {
        id: novoId,
        mensagem: mensagem,
        data: dataFormatada
    };
    
    // Adiciona ao início da lista de notificações
    dadosMockados.notificacoes.unshift(novaNotificacao);
    
    // Limita o número de notificações a 20 para não sobrecarregar a interface
    if (dadosMockados.notificacoes.length > 20) {
        dadosMockados.notificacoes.pop();
    }
    
    // Atualiza a exibição das notificações
    if (document.querySelector('.notifications-panel').classList.contains('expanded')) {
        carregarTodasNotificacoes();
    } else {
        carregarResumoNotificacoes();
    }
}

// Função para abrir o modal de histórico de notificações
function abrirModalNotificacoes() {
    const conteudoModal = document.getElementById('notificacoes-historico');
    
    // Agrupa notificações por data
    const notificacoesPorData = agruparNotificacoesPorData(dadosMockados.notificacoes);
    
    let html = '<div class="notificacoes-lista">';
    
    // Se não houver notificações, exibe uma mensagem
    if (Object.keys(notificacoesPorData).length === 0) {
        html += `
            <div class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>Nenhuma notificação</p>
            </div>
        `;
    } else {
        // Para cada data, exibe as notificações
        Object.keys(notificacoesPorData).sort().reverse().forEach(data => {
            html += `
                <div class="notificacao-dia">
                    <h4 class="notificacao-data-header">${formatarData(data)}</h4>
            `;
            
            notificacoesPorData[data].forEach(notificacao => {
                const horario = notificacao.data.split(' ')[1];
                html += `
                    <div class="notification-item">
                        <p><strong>${notificacao.mensagem}</strong></p>
                        <small class="notification-date">${horario}</small>
                    </div>
                `;
            });
            
            html += '</div>';
        });
    }
    
    html += '</div>';
    
    conteudoModal.innerHTML = html;
    
    // Exibe o modal
    document.getElementById('modal-notificacoes').style.display = 'flex';
}

// Função para agrupar notificações por data
function agruparNotificacoesPorData(notificacoes) {
    const grupos = {};
    
    notificacoes.forEach(notificacao => {
        // Pega apenas a parte da data (sem o horário)
        const dataCompleta = notificacao.data;
        const data = dataCompleta.split(' ')[0];
        
        if (!grupos[data]) {
            grupos[data] = [];
        }
        
        grupos[data].push(notificacao);
    });
    
    return grupos;
}

// Função para formatar a data
function formatarData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/');
    
    // Nomes dos meses em português
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const dataFormatada = `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
    
    // Verifica se é hoje, ontem ou anteontem
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);
    const anteontem = new Date(hoje);
    anteontem.setDate(hoje.getDate() - 2);
    
    const dataNotificacao = new Date(ano, mes - 1, dia);
    
    if (dataNotificacao.toDateString() === hoje.toDateString()) {
        return "Hoje";
    } else if (dataNotificacao.toDateString() === ontem.toDateString()) {
        return "Ontem";
    } else if (dataNotificacao.toDateString() === anteontem.toDateString()) {
        return "Anteontem";
    }
    
    return dataFormatada;
}

// ================ FUNÇÕES PARA OS MODAIS ================

// Variáveis globais para armazenar dados temporários
let prescricaoAtual = null;
let pedidoAtual = null;

// Função para inicializar os modais
function inicializarModais() {
    // Adiciona listeners para fechar modais
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(botao => {
        botao.addEventListener('click', fecharModal);
    });
    
    // Fechar modal ao clicar fora dele (na overlay)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            // Fecha apenas se o clique foi na overlay e não em seu conteúdo
            if (e.target === overlay) {
                fecharModal();
            }
        });
    });
    
    // Esconder modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });

    // Configurando botões específicos dos modais
    document.getElementById('btn-avaliar-modal').addEventListener('click', function() {
        // Fecha o modal de detalhes e abre o de avaliação
        document.getElementById('modal-prescricao').style.display = 'none';
        abrirModalAvaliacao(prescricaoAtual);
    });

    document.getElementById('btn-confirmar-avaliacao').addEventListener('click', function() {
        // Simulação da confirmação de avaliação
        if (prescricaoAtual) {
            avaliarPrescricao(prescricaoAtual.id);
            fecharModal();
        }
    });

    document.getElementById('btn-separar-pedido').addEventListener('click', function() {
        // Fecha o modal de detalhes e abre o de separação
        document.getElementById('modal-pedido').style.display = 'none';
        abrirModalSeparacao(pedidoAtual);
    });

    document.getElementById('btn-confirmar-separacao').addEventListener('click', function() {
        // Simulação da confirmação de separação
        if (pedidoAtual) {
            separarPedido(pedidoAtual.id);
            fecharModal();
        }
    });
    
    // Novos botões para progresso do pedido
    document.getElementById('btn-enviar-revisao').addEventListener('click', function() {
        if (pedidoAtual) {
            document.getElementById('modal-pedido').style.display = 'none';
            abrirModalRevisao(pedidoAtual);
        }
    });
    
    document.getElementById('btn-confirmar-revisao').addEventListener('click', function() {
        // Simulação da confirmação de revisão
        if (pedidoAtual) {
            concluirPedido(pedidoAtual.id);
            fecharModal();
        }
    });
    
    document.getElementById('btn-concluir-pedido').addEventListener('click', function() {
        if (pedidoAtual) {
            concluirPedido(pedidoAtual.id);
            fecharModal();
        }
    });
    
    // Adiciona event listeners para abrir modais
    adicionarEventListenersModais();
}

// Função para adicionar event listeners para abrir modais
function adicionarEventListenersModais() {
    // Para botões de avaliar prescrição na lista
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-avaliar')) {
            e.preventDefault();
            const idPrescricao = parseInt(e.target.dataset.id);
            const prescricao = buscarPrescricaoPorId(idPrescricao);
            
            if (prescricao) {
                abrirModalPrescricao(prescricao);
            }
        }
    });
    
    // Para botões de visualizar pedido na tabela
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-visualizar') || 
            (e.target.parentElement && e.target.parentElement.classList.contains('btn-visualizar'))) {
            e.preventDefault();
            const botao = e.target.classList.contains('btn-visualizar') ? e.target : e.target.parentElement;
            const idPedido = parseInt(botao.dataset.id);
            const pedido = encontrarPedidoPorId(idPedido);
            
            if (pedido) {
                abrirModalPedido(pedido);
            }
        }
    });
}

// Função para abrir o modal de prescrição
function abrirModalPrescricao(prescricao) {
    prescricaoAtual = prescricao;
    
    // Preenche os detalhes da prescrição no modal
    const conteudoModal = document.getElementById('prescricao-detalhes');
    const statusPrescricao = obterNomeStatus(prescricao.status_prescricao, 'prescricao');
    const statusClass = prescricao.status_prescricao === 1 ? 'status-aguardando' : 'status-avaliada';
    
    let remediosHTML = '';
    prescricao.remedios.forEach(remedio => {
        remediosHTML += `
            <div class="remedio-card">
                <div class="remedio-title">${remedio.nome}</div>
                <div class="remedio-details">
                    <div class="remedio-detail"><i class="fas fa-pills"></i> ${remedio.dosagem}</div>
                    <div class="remedio-detail"><i class="fas fa-route"></i> ${remedio.via}</div>
                    <div class="remedio-detail"><i class="fas fa-sort-amount-up"></i> Quantidade: ${remedio.quantidade}</div>
                </div>
            </div>
        `;
    });
    
    conteudoModal.innerHTML = `
        <div class="prescricao-info">
            <div class="paciente-detalhes">
                <h4>Dados do Paciente</h4>
                <div class="info-row">
                    <span class="info-label">Nome:</span>
                    <span>${prescricao.paciente_nome}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">HC:</span>
                    <span>${prescricao.hc_paciente}</span>
                </div>
            </div>
            
            <div class="prescricao-detalhes">
                <h4>Dados da Prescrição</h4>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span>${statusPrescricao} <span class="status-badge ${statusClass}">${statusPrescricao}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Data:</span>
                    <span>${prescricao.data_entrada}</span>
                </div>
                ${prescricao.data_avaliacao ? `
                <div class="info-row">
                    <span class="info-label">Avaliada em:</span>
                    <span>${prescricao.data_avaliacao}</span>
                </div>` : ''}
                ${prescricao.user_nome ? `
                <div class="info-row">
                    <span class="info-label">Avaliado por:</span>
                    <span>${prescricao.user_nome}</span>
                </div>` : ''}
            </div>
        </div>
        
        <h4>Medicamentos</h4>
        <div class="remedios-container">
            ${remediosHTML}
        </div>
    `;
    
    // Ajusta o botão de avaliar para estar disponível apenas para prescrições aguardando avaliação
    const btnAvaliar = document.getElementById('btn-avaliar-modal');
    if (prescricao.status_prescricao === 1) {
        btnAvaliar.style.display = 'block';
    } else {
        btnAvaliar.style.display = 'none';
    }
    
    // Exibe o modal
    document.getElementById('modal-prescricao').style.display = 'flex';
}

// Função para abrir o modal de avaliação
function abrirModalAvaliacao(prescricao) {
    // Preenche as informações do paciente no modal de avaliação
    const pacienteInfo = document.getElementById('avaliacao-paciente-info');
    pacienteInfo.innerHTML = `
        <h4>Dados do Paciente</h4>
        <div class="info-row">
            <span class="info-label">Nome:</span>
            <span>${prescricao.paciente_nome}</span>
        </div>
        <div class="info-row">
            <span class="info-label">HC:</span>
            <span>${prescricao.hc_paciente}</span>
        </div>
    `;
    
    // Adiciona os remédios com checkboxes
    const avaliacaoForm = document.querySelector('.avaliacao-form');
    const remediosHTML = prescricao.remedios.map((remedio, index) => `
        <div class="remedio-avaliacao">
            <div class="remedio-info">
                <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                <div class="info-text">${remedio.via} - Quantidade: ${remedio.quantidade}</div>
            </div>
            <div class="remedio-check">
                <label class="checkbox-container">
                    <input type="checkbox" class="avaliacao-checkbox" data-index="${index}" checked>
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
    `).join('');
    
    // Atualiza o conteúdo do formulário
    avaliacaoForm.innerHTML = `
        <div class="remedios-avaliacao">
            <h4>Medicamentos para Avaliação</h4>
            <div class="remedios-lista">
                ${remediosHTML}
            </div>
        </div>
        
        <div class="form-group">
            <label for="observacoes">Observações (opcional):</label>
            <textarea id="observacoes" class="form-control" placeholder="Adicione observações sobre esta prescrição..."></textarea>
        </div>
    `;
    
    // Exibe o modal
    document.getElementById('modal-avaliacao').style.display = 'flex';
}

// Função para abrir o modal de pedido
function abrirModalPedido(pedido) {
    pedidoAtual = pedido;
    
    // Preenche os detalhes do pedido no modal
    const conteudoModal = document.getElementById('pedido-detalhes');
    const statusPedido = obterNomeStatus(pedido.status_pedido, 'pedido');
    
    let statusClass = '';
    switch(pedido.status_pedido) {
        case 1: statusClass = 'status-aguardando'; break;
        case 2: statusClass = 'status-separacao'; break;
        case 3: statusClass = 'status-revisao'; break;
        case 4: statusClass = 'status-concluido'; break;
    }
    
    let remediosHTML = '';
    pedido.remedios.forEach(remedio => {
        remediosHTML += `
            <div class="remedio-card">
                <div class="remedio-title">${remedio.nome}</div>
                <div class="remedio-details">
                    <div class="remedio-detail"><i class="fas fa-pills"></i> ${remedio.dosagem}</div>
                    <div class="remedio-detail"><i class="fas fa-route"></i> ${remedio.via}</div>
                    <div class="remedio-detail"><i class="fas fa-sort-amount-up"></i> Quantidade: ${remedio.quantidade}</div>
                </div>
            </div>
        `;
    });
    
    conteudoModal.innerHTML = `
        <div class="prescricao-info">
            <div class="paciente-detalhes">
                <h4>Dados do Paciente</h4>
                <div class="info-row">
                    <span class="info-label">Nome:</span>
                    <span>${pedido.paciente}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">HC:</span>
                    <span>${pedido.hc_paciente}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Quarto:</span>
                    <span>${pedido.quarto}</span>
                </div>
            </div>
            
            <div class="prescricao-detalhes">
                <h4>Dados do Pedido</h4>
                <div class="info-row">
                    <span class="info-label">Número:</span>
                    <span>Pedido #${pedido.id}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span>${statusPedido} <span class="status-badge ${statusClass}">${statusPedido}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Data entrada:</span>
                    <span>${pedido.data_entrada}</span>
                </div>
                ${pedido.data_inicio_separacao ? `
                <div class="info-row">
                    <span class="info-label">Início separação:</span>
                    <span>${pedido.data_inicio_separacao}</span>
                </div>` : ''}
                ${pedido.data_inicio_revisao ? `
                <div class="info-row">
                    <span class="info-label">Início revisão:</span>
                    <span>${pedido.data_inicio_revisao}</span>
                </div>` : ''}
                ${pedido.data_finalizacao ? `
                <div class="info-row">
                    <span class="info-label">Finalizado em:</span>
                    <span>${pedido.data_finalizacao}</span>
                </div>` : ''}
                ${pedido.user_nome ? `
                <div class="info-row">
                    <span class="info-label">Revisado por:</span>
                    <span>${pedido.user_nome}</span>
                </div>` : ''}
            </div>
        </div>
        
        <h4>Medicamentos</h4>
        <div class="remedios-container">
            ${remediosHTML}
        </div>
    `;
    
    // Configura os botões de ação com base no status atual
    const btnSeparar = document.getElementById('btn-separar-pedido');
    const btnRevisar = document.getElementById('btn-enviar-revisao');
    const btnConcluir = document.getElementById('btn-concluir-pedido');
    
    // Esconde todos os botões inicialmente
    btnSeparar.style.display = 'none';
    btnRevisar.style.display = 'none';
    btnConcluir.style.display = 'none';
    
    // Mostra apenas o botão relevante para o status atual
    switch(pedido.status_pedido) {
        case 1: // Aguardando Separação
            btnSeparar.style.display = 'block';
            break;
        case 2: // Em Separação
            btnRevisar.style.display = 'block';
            break;
        case 3: // Em Revisão
            btnConcluir.style.display = 'block';
            break;
    }
    
    // Exibe o modal
    document.getElementById('modal-pedido').style.display = 'flex';
}

// Função para abrir o modal de separação
function abrirModalSeparacao(pedido) {
    // Preenche as informações do pedido no modal de separação
    const conteudoModal = document.getElementById('separacao-detalhes');
    
    let remediosHTML = '';
    pedido.remedios.forEach((remedio) => {
        remediosHTML += `
            <div class="remedio-separacao">
                <div class="remedio-info">
                    <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                    <div class="info-text">${remedio.via} - Quantidade: ${remedio.quantidade}</div>
                </div>
            </div>
        `;
    });
    
    conteudoModal.innerHTML = `
        <div class="paciente-detalhes">
            <h4>Pedido #${pedido.id} - ${pedido.paciente}</h4>
            <div class="info-row">
                <span class="info-label">Quarto:</span>
                <span>${pedido.quarto}</span>
            </div>
        </div>
        
        <div class="separacao-section">
            <div class="separacao-header">
                <div class="separacao-title">Itens para separação</div>
            </div>
            <div class="remedios-lista">
                ${remediosHTML}
            </div>
            <div class="info-text" style="margin-top: 15px;">
                <i class="fas fa-info-circle"></i> Confirme quando todos os itens estiverem separados
            </div>
        </div>
    `;
    
    // Exibe o modal
    document.getElementById('modal-separacao').style.display = 'flex';
}

// Nova função para abrir o modal de revisão
function abrirModalRevisao(pedido) {
    pedidoAtual = pedido;
    
    // Preenche as informações do pedido no modal de revisão
    const conteudoModal = document.getElementById('revisao-detalhes');
    
    let remediosHTML = '';
    pedido.remedios.forEach((remedio, index) => {
        remediosHTML += `
            <div class="remedio-revisao">
                <div class="remedio-info">
                    <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                    <div class="info-text">${remedio.via} - Quantidade: ${remedio.quantidade}</div>
                </div>
                <div class="remedio-check">
                    <label class="checkbox-container">
                        <input type="checkbox" class="revisao-checkbox" data-index="${index}" checked>
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
        `;
    });
    
    conteudoModal.innerHTML = `
        <div class="paciente-detalhes">
            <h4>Pedido #${pedido.id} - ${pedido.paciente}</h4>
            <div class="info-row">
                <span class="info-label">Quarto:</span>
                <span>${pedido.quarto}</span>
            </div>
        </div>
        
        <div class="revisao-section">
            <div class="revisao-header">
                <div class="revisao-title">Itens para revisão</div>
            </div>
            <div class="remedios-lista">
                ${remediosHTML}
            </div>
            <div class="info-text" style="margin-top: 15px;">
                <i class="fas fa-info-circle"></i> Marque os itens que foram aprovados na revisão
            </div>
        </div>
    `;
    
    // Exibe o modal
    document.getElementById('modal-revisao').style.display = 'flex';
}

// Função para fechar qualquer modal aberto
function fecharModal() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Função auxiliar para buscar uma prescrição pelo ID
function buscarPrescricaoPorId(id) {
    // Busca primeiro na lista de aguardando avaliação
    let prescricao = dadosMockados.prescricoes.aguardandoAvaliacao.find(p => p.id === id);
    
    // Se não encontrar, busca na lista de avaliadas
    if (!prescricao) {
        prescricao = dadosMockados.prescricoes.avaliadas.find(p => p.id === id);
    }
    
    return prescricao;
}

// Função para avaliar uma prescrição
function avaliarPrescricao(idPrescricao) {
    // Pega o índice da prescrição na lista de aguardando avaliação
    const index = dadosMockados.prescricoes.aguardandoAvaliacao.findIndex(p => p.id === idPrescricao);
    
    if (index !== -1) {
        // Move a prescrição para a lista de avaliadas
        const prescricaoAvaliada = dadosMockados.prescricoes.aguardandoAvaliacao.splice(index, 1)[0];
        
        // Filtra os remédios aprovados
        const checkboxes = document.querySelectorAll('.avaliacao-checkbox');
        const remediosAprovados = [];
        
        checkboxes.forEach((checkbox, idx) => {
            if (checkbox.checked) {
                remediosAprovados.push(prescricaoAvaliada.remedios[idx]);
            }
        });
        
        // Atualiza a lista de remédios da prescrição
        prescricaoAvaliada.remedios = remediosAprovados;
        
        // Adiciona informações de avaliação
        prescricaoAvaliada.status_prescricao = 2; // Avaliada
        prescricaoAvaliada.data_avaliacao = new Date().toLocaleString('pt-BR').replace(',', '');
        prescricaoAvaliada.id_user_aprovacao = 1;
        prescricaoAvaliada.user_nome = "Dr. Roberto Silva";
        
        // Adiciona observações (se houver)
        const observacoes = document.getElementById('observacoes').value;
        if (observacoes) {
            prescricaoAvaliada.observacoes = observacoes;
        }
        
        dadosMockados.prescricoes.avaliadas.push(prescricaoAvaliada);
        
        // Adiciona um pedido baseado nesta prescrição
        adicionarPedidoDePrescricao(prescricaoAvaliada);
        
        // Atualiza a interface
        atualizarContadores();
        carregarDadosMockados();
        
        // Adiciona notificação
        adicionarNotificacao(`Prescrição de ${prescricaoAvaliada.paciente_nome} foi avaliada por Dr. Roberto Silva`, new Date());
        
        // Feedback visual
        alert(`Prescrição de ${prescricaoAvaliada.paciente_nome} avaliada com sucesso!`);
    }
}

// Função para separar um pedido
function separarPedido(idPedido) {
    // Busca o pedido na lista de aguardando separação
    const index = dadosMockados.pedidos.aguardandoSeparacao.findIndex(p => p.id === idPedido);
    
    if (index !== -1) {
        // Move o pedido para a lista de em separação
        const pedidoSeparado = dadosMockados.pedidos.aguardandoSeparacao.splice(index, 1)[0];
        
        // Atualiza o status
        pedidoSeparado.status_pedido = 2; // Em Separação
        pedidoSeparado.data_inicio_separacao = new Date().toLocaleString('pt-BR').replace(',', '');
        
        dadosMockados.pedidos.emSeparacao.push(pedidoSeparado);
        
        // Atualiza a interface
        atualizarContadores();
        carregarDadosMockados();
        
        // Adiciona notificação
        adicionarNotificacao(`Pedido #${pedidoSeparado.id} em separação`, new Date());
        
        // Feedback visual
        alert(`Separação do pedido #${pedidoSeparado.id} iniciada com sucesso!`);
    }
}

// Função para enviar um pedido para revisão
function enviarParaRevisao(idPedido) {
    // Busca o pedido na lista em separação
    const index = dadosMockados.pedidos.emSeparacao.findIndex(p => p.id === idPedido);
    
    if (index !== -1) {
        // Move o pedido para a lista de em revisão
        const pedidoRevisao = dadosMockados.pedidos.emSeparacao.splice(index, 1)[0];
        
        // Atualiza o status
        pedidoRevisao.status_pedido = 3; // Em Revisão
        pedidoRevisao.data_inicio_revisao = new Date().toLocaleString('pt-BR').replace(',', '');
        
        dadosMockados.pedidos.emRevisao.push(pedidoRevisao);
        
        // Atualiza a interface
        atualizarContadores();
        carregarDadosMockados();
        
        // Adiciona notificação
        adicionarNotificacao(`Pedido #${pedidoRevisao.id} enviado para revisão`, new Date());
        
        // Feedback visual
        alert(`Pedido #${pedidoRevisao.id} enviado para revisão com sucesso!`);
    }
}

// Função para concluir um pedido
function concluirPedido(idPedido) {
    // Busca o pedido na lista em revisão
    const index = dadosMockados.pedidos.emRevisao.findIndex(p => p.id === idPedido);
    
    if (index !== -1) {
        // Move o pedido para a lista de concluídos
        const pedidoConcluido = dadosMockados.pedidos.emRevisao.splice(index, 1)[0];
        
        // Filtra os remédios aprovados
        const checkboxes = document.querySelectorAll('.revisao-checkbox');
        const remediosAprovados = [];
        
        checkboxes.forEach((checkbox, idx) => {
            if (checkbox.checked) {
                remediosAprovados.push(pedidoConcluido.remedios[idx]);
            }
        });
        
        // Atualiza a lista de remédios do pedido
        pedidoConcluido.remedios = remediosAprovados;
        
        // Atualiza o status
        pedidoConcluido.status_pedido = 4; // Concluído
        pedidoConcluido.data_finalizacao = new Date().toLocaleString('pt-BR').replace(',', '');
        pedidoConcluido.id_user_revisao = 2; // ID do usuário atual (mockado)
        pedidoConcluido.user_nome = "Farmacêutico Pedro Santos"; // Nome do usuário atual (mockado)
        
        dadosMockados.pedidos.concluidos.push(pedidoConcluido);
        
        // Atualiza a interface
        atualizarContadores();
        carregarDadosMockados();
        
        // Adiciona notificação
        adicionarNotificacao(`Pedido #${pedidoConcluido.id} concluído por Farmacêutico Pedro Santos`, new Date());
        
        // Feedback visual
        alert(`Pedido #${pedidoConcluido.id} concluído com sucesso!`);
    }
}

// Função para adicionar um novo pedido a partir de uma prescrição avaliada
function adicionarPedidoDePrescricao(prescricao) {
    // Verifica se já não existe um pedido para esta prescrição
    const pedidoExistente = encontrarPedidoPorPrescricao(prescricao.id);
    
    if (!pedidoExistente) {
        // Gera um novo ID para o pedido (simulando uma sequência)
        const novoId = Math.max(...Object.values(dadosMockados.pedidos)
            .flatMap(lista => lista.map(p => p.id)), 0) + 1;
        
        // Cria o novo pedido
        const novoPedido = {
            id: novoId,
            id_prescricao: prescricao.id,
            paciente: prescricao.paciente_nome,
            hc_paciente: prescricao.hc_paciente,
            quarto: "Quarto " + Math.floor(Math.random() * 500 + 100), // Quarto aleatório para simulação
            data_entrada: new Date().toLocaleString('pt-BR').replace(',', ''),
            remedios: prescricao.remedios,
            status_pedido: 1 // Aguardando Separação
        };
        
        // Adiciona à lista de pedidos aguardando separação
        dadosMockados.pedidos.aguardandoSeparacao.push(novoPedido);
        
        // Adiciona notificação
        adicionarNotificacao(`Novo pedido #${novoPedido.id} criado para ${novoPedido.paciente}`, new Date());
    }
}

// Função para encontrar um pedido por prescrição
function encontrarPedidoPorPrescricao(idPrescricao) {
    // Busca em todas as categorias de pedidos
    for (const categoria in dadosMockados.pedidos) {
        const pedido = dadosMockados.pedidos[categoria].find(p => p.id_prescricao === idPrescricao);
        if (pedido) return pedido;
    }
    return null;
}