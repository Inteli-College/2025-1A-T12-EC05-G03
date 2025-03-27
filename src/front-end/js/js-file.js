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

const dadosAPI_Atualiza = {};

async function chamar_api_atualiza() {
    try {
        const response = await fetch('http://127.0.0.1:5000/home/atualizar', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        Object.assign(dadosAPI_Atualiza, data); // Armazena os dados na variável
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        throw error; // Repassa o erro para ser capturado na função chamadora
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await chamar_api_atualiza();
        console.log('API atualizada com sucesso.');

        // Agora que os dados estão carregados, as funções seguintes são executadas
        atualizarContadores();
        carregarDadosMockados();
        adicionarEventListeners();
        inicializarMenuHamburguer();
        inicializarFiltrosWorkflow();
        inicializarFiltrosPrescricoes();
        inicializarNotificacoesExpansiveis();
        inicializarModais();
    } catch (error) {
        console.error('Erro ao atualizar a API:', error);
    }
});


// Função para atualizar os contadores nas caixas de fluxo de trabalho
function atualizarContadores() {
    // Contadores para prescrições
    const countAguardando = document.getElementById('count-aguardando');
    const countAvaliadas = document.getElementById('count-avaliadas');
    
    if (countAguardando) {
        countAguardando.textContent = dadosAPI_Atualiza.prescricoes.aguardandoAvaliacao.length;
    }
    
    if (countAvaliadas) {
        countAvaliadas.textContent = dadosAPI_Atualiza.prescricoes.avaliadas.length;
    }
    
    // Contadores para pedidos
    const pedidosBoxes = document.querySelectorAll('.pedidos-section .workflow-step .step-count');
    
    if (pedidosBoxes.length >= 4) {
        pedidosBoxes[0].textContent = dadosAPI_Atualiza.pedidos.aguardandoSeparacao.length;
        pedidosBoxes[1].textContent = dadosAPI_Atualiza.pedidos.emSeparacao.length;
        pedidosBoxes[2].textContent = dadosAPI_Atualiza.pedidos.emRevisao.length;
        pedidosBoxes[3].textContent = dadosAPI_Atualiza.pedidos.concluidos.length;
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
    for (const categoria in dadosAPI_Atualiza.pedidos) {
        const pedido = dadosAPI_Atualiza.pedidos[categoria].find(p => p.id === id);
        if (pedido) return pedido;
    }
    return null;
}

// Função auxiliar para obter o nome do status pelo ID
function obterNomeStatus(idStatus, tipo) {
    if (tipo === 'pedido') {
        let status = ""; // Corrigido para let
        switch(idStatus) {
            case 1:
                status = "Aguardando separação";
                break;
            case 2:
                status = "Em separação";
                break;
            case 3:
                status = "Em revisão";
                break;
            case 4:
                status = "Concluído com exito";
                break;
            case 5:
                status = "Concluído com erros";
                break;
            default:
                status = "Desconhecido"; // Garante um retorno seguro
        }
        return status;
    } else if (tipo === 'prescricao') {
        let status = ""; // Corrigido para let
        switch(idStatus) {
            case 1:
                status = "Aguardando Avaliação";
                break;
            case 2:
                status = "Aprovada Total";
                break;
            case 3:
                status = "Aprovada Parcial";
                break;
            case 4:
                status = "Reprovada";
                break;
            default:
                status = "Desconhecido"; // Garante um retorno seguro
        }
        return status; // Corrigido para retornar diretamente a string
    }
    return 'Desconhecido';
}

// const status = dadosMockados.statusPrescricao.find(s => s.id === idStatus); 

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
    dadosAPI_Atualiza.prescricoes.aguardandoAvaliacao.forEach(prescricao => {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-item';
        itemLista.dataset.id = prescricao.id;
        
        itemLista.innerHTML = `
            <div class="prescricao-header">
                <div class="paciente-info">
                    <strong>Paciente:</strong> ${prescricao.paciente_nome} (HC: ${prescricao.hc_paciente})
                </div>
                <div class="data-info">
                    <strong>Data:</strong> ${prescricao.data_entrada}
                </div>
            </div>
            <div class="prescricao-footer">
                <button class="btn btn-avaliar" data-id="${prescricao.id}">Avaliar</button>
            </div>
        `;
        
        listaPrescricoes.appendChild(itemLista);
    });
    
    // Adiciona mensagem se não houver prescrições
    if (dadosAPI_Atualiza.prescricoes.aguardandoAvaliacao.length === 0) {
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
    dadosAPI_Atualiza.prescricoes.avaliadas.forEach(prescricao => {
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
            <div class="prescricao-footer">
                <button class="btn btn-visualizar" data-id="${prescricao.id}">Visualizar</button>
            </div>
        `;
        
        listaPrescricoes.appendChild(itemLista);
    });
    
    // Adiciona mensagem se não houver prescrições
    if (dadosAPI_Atualiza.prescricoes.avaliadas.length === 0) {
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
            // Rota para puxar prescricão por id!!!!
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
            pedidosFiltrados = dadosAPI_Atualiza.pedidos.aguardandoSeparacao;
            break;
        case 2:
            pedidosFiltrados = dadosAPI_Atualiza.pedidos.emSeparacao;
            break;
        case 3:
            pedidosFiltrados = dadosAPI_Atualiza.pedidos.emRevisao;
            break;
        case 4:
            pedidosFiltrados = dadosAPI_Atualiza.pedidos.concluidos;
            break;
        default:
            pedidosFiltrados = dadosAPI_Atualiza.pedidos.aguardandoSeparacao;
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
            <td>${pedido.lista_remedios.length} itens</td>
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
            avaliarPrescricao(prescricaoAtual);
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
async function puxa_prescricao_por_id(id){
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://two025-1a-t12-ec05-g03.onrender.com/prescricoes/' + id, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Erro ao puxar a prescrição');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        throw error; 
    }
}

// Função para abrir o modal de prescrição
function abrirModalPrescricao(prescricao) {
    puxa_prescricao_por_id(prescricao.id)
        .then(data => {
            prescricaoAtual = data;

            const statusPrescricao = obterNomeStatus(prescricaoAtual.prescricao.status_prescricao, 'prescricao');
            console.log(prescricaoAtual.prescricao.status_prescrica)
            const statusClass = prescricaoAtual.prescricao.status_prescricao === 1 ? 'status-aguardando' : 'status-avaliada';
            let remediosHTML = '';
            prescricaoAtual.remedios.forEach(remedio => {
                remediosHTML += `
                    <div class="remedio-card">
                        <div class="remedio-title">${remedio.principio_ativo}</div>
                        <div class="remedio-details">
                            <div class="remedio-detail"><i class="fas fa-pills"></i> ${remedio.dosagem}</div>
                            <div class="remedio-detail"><i class="fas fa-sort-amount-up"></i> Quantidade: ${remedio.quantidade}</div>
                        </div>
                    </div>
                `;
            });

            const conteudoModal = document.getElementById('prescricao-detalhes');
            conteudoModal.innerHTML = `
                <div class="prescricao-info">
                    <div class="paciente-detalhes">
                        <h4>Dados do Paciente</h4>
                        <div class="info-row">
                            <span class="info-label">Nome:</span>
                            <span>${prescricaoAtual.prescricao.paciente_nome}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">HC:</span>
                            <span>${prescricaoAtual.prescricao.hc_paciente}</span>
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
                            <span>${prescricaoAtual.prescricao.data_entrada}</span>
                        </div>
                        ${prescricaoAtual.prescricao.data_avaliacao ? `
                        <div class="info-row">
                            <span class="info-label">Avaliada em:</span>
                            <span>${prescricaoAtual.prescricao.data_avaliacao}</span>
                        </div>` : ''}
                        ${prescricaoAtual.prescricao.user_nome ? `
                        <div class="info-row">
                            <span class="info-label">Avaliado por:</span>
                            <span>${prescricaoAtual.prescricao.user_nome}</span>
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
            if (prescricaoAtual.prescricao.status_prescricao === 1) {
                btnAvaliar.style.display = 'block';
            } else {
                btnAvaliar.style.display = 'none';
            }
            
            // Exibe o modal
            document.getElementById('modal-prescricao').style.display = 'flex';
        })
        .catch(error => {
            console.error('Erro ao puxar a prescrição da API:', error);
        });
}


// Função para abrir o modal de avaliação
function abrirModalAvaliacao(prescricao) {
    // Preenche as informações do paciente no modal de avaliação
    const pacienteInfo = document.getElementById('avaliacao-paciente-info');
    pacienteInfo.innerHTML = `
        <h4>Dados do Paciente</h4>
        <div class="info-row">
            <span class="info-label">Nome:</span>
            <span>${prescricao.prescricao.paciente_nome}</span>
        </div>
        <div class="info-row">
            <span class="info-label">HC:</span>
            <span>${prescricao.prescricao.hc_paciente}</span>
        </div>
    `;
    
    // Adiciona os remédios com checkboxes
    const avaliacaoForm = document.querySelector('.avaliacao-form');
    const remediosHTML = prescricao.remedios.map((remedio, index) => `
        <div class="remedio-avaliacao">
            <div class="remedio-info">
                <div class="remedio-title">${remedio.principio_ativo} - ${remedio.dosagem}</div>
                <div class="info-text">Quantidade: ${remedio.quantidade}</div>
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
    `;
    
    // Exibe o modal
    document.getElementById('modal-avaliacao').style.display = 'flex';
}

async function pedidoPorIdAPI(id){
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://127.0.0.1:5000/pedidos' + id, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Erro ao puxar o pedido');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        throw error; 
    }    
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
    pedido.lista_remedios.forEach(remedio => {
        remediosHTML += `
            <div class="remedio-card">
                <div class="remedio-title">${remedio.nome}</div>
                <div class="remedio-details">
                    <div class="remedio-detail"><i class="fas fa-pills"></i> ${remedio.dosagem}</div>
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
    const btnRevisar = document.getElementById('btn-enviar-revisao');
    const btnConcluir = document.getElementById('btn-concluir-pedido');
    
    // Esconde todos os botões inicialmente
    btnRevisar.style.display = 'none';
    btnConcluir.style.display = 'none';
    
    // Mostra apenas o botão relevante para o status atual
    switch(pedido.status_pedido) {
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
    pedido.lista_remedios.forEach((remedio) => {
        remediosHTML += `
            <div class="remedio-separacao">
                <div class="remedio-info">
                    <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                    <div class="info-text"> Quantidade: ${remedio.quantidade}</div>
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
    pedido.lista_remedios.forEach((remedio, index) => {
        remediosHTML += `
            <div class="remedio-revisao">
                <div class="remedio-info">
                    <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                    <div class="info-text">Quantidade: ${remedio.quantidade}</div>
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
    let prescricao = dadosAPI_Atualiza.prescricoes.aguardandoAvaliacao.find(p => p.id === id);
    
    // Se não encontrar, busca na lista de avaliadas
    if (!prescricao) {
        prescricao = dadosAPI_Atualiza.prescricoes.avaliadas.find(p => p.id === id);
    }
    
    return prescricao;
}
async function puxa_prescricao_por_id(id){
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://two025-1a-t12-ec05-g03.onrender.com/prescricoes/' + id, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Erro ao puxar a prescrição');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        throw error; 
    }
}
async function avaliarPrescricaoAPI(id, remedios_aprovados, id_aprovacao){
    try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://two025-1a-t12-ec05-g03.onrender.com/prescricoes/aprovar/' + id, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'  // Adicionando o cabeçalho Content-Type
            },
            body: JSON.stringify({
                "lista_remedios": remedios_aprovados,
                "status_prescricao": id_aprovacao
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao avaliar a prescrição');
        }

        console.log('Prescricao: ', id, ' foi avaliada');
        return true;
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        return false;
    }
}

async function avaliarPrescricao(prescricao) {
    try {
        // Filtra os remédios aprovados
        const checkboxes = document.querySelectorAll('.avaliacao-checkbox');
        const remediosAprovados = [];

        checkboxes.forEach((checkbox, idx) => {
            if (checkbox.checked) {
                remediosAprovados.push(prescricao.remedios[idx]);
            }
        });

        const ids_remedios_aprovados = [];
        remediosAprovados.forEach(remedio =>{
            ids_remedios_aprovados.push(remedio.id)
        })
        console.log('Remédios Aprovados:', remediosAprovados);
        console.log('Todos Remédios:', prescricao.remedios);

        // Determina o status da aprovação
        let id_aprovacao;
        switch (true) {
            case ids_remedios_aprovados.length === prescricao.remedios.length:
                id_aprovacao = 2;
                break;
            case ids_remedios_aprovados.length === 0:
                id_aprovacao = 4;
                break;
            default:
                id_aprovacao = 3;
                break;
        }

        console.log('Status da aprovação:', id_aprovacao);

        // Chama a API de avaliação
        const resultado = await avaliarPrescricaoAPI(prescricao.prescricao.id, ids_remedios_aprovados, id_aprovacao);

        if(!resultado){     
            throw new Error("Erro ao avaliar a prescrição pela API")
        }
        await chamar_api_atualiza();
        // Atualiza a interface
        atualizarContadores();
        carregarDadosMockados();

        // Feedback visual
        alert(`Prescrição de ${prescricao.prescricao.paciente_nome} avaliada com sucesso!`);
    } catch (error) {
        alert('Erro ao enviar a requisição de avaliação da prescrição!');
        console.error(error);
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