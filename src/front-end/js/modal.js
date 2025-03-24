// Script para gerenciar os modais e pop-ups da aplicação

// Variáveis globais para armazenar dados temporários
let prescricaoAtual = null;
let pedidoAtual = null;

// Função executada quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os modais
    inicializarModais();
    
    // Adiciona listeners para abrir os modais
    adicionarEventListenersModais();
});

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
    
    // Limpa o campo de observações
    document.getElementById('observacoes').value = '';
    
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
    
    // Ajusta o botão de separar para estar disponível apenas para pedidos aguardando separação
    const btnSeparar = document.getElementById('btn-separar-pedido');
    if (pedido.status_pedido === 1) {
        btnSeparar.style.display = 'block';
    } else {
        btnSeparar.style.display = 'none';
    }
    
    // Exibe o modal
    document.getElementById('modal-pedido').style.display = 'flex';
}

// Função para abrir o modal de separação
function abrirModalSeparacao(pedido) {
    // Preenche as informações do pedido no modal de separação
    const conteudoModal = document.getElementById('separacao-detalhes');
    
    let remediosHTML = '';
    pedido.remedios.forEach((remedio, index) => {
        remediosHTML += `
            <div class="remedio-separacao">
                <div class="remedio-info">
                    <div class="remedio-title">${remedio.nome} ${remedio.dosagem}</div>
                    <div class="info-text">${remedio.via} - Quantidade: ${remedio.quantidade}</div>
                </div>
                <div class="remedio-check">
                    <label class="checkbox-container">
                        <input type="checkbox" class="custom-checkbox" data-index="${index}">
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
        
        <div class="separacao-section">
            <div class="separacao-header">
                <div class="separacao-title">Itens para separação</div>
            </div>
            <div class="remedios-lista">
                ${remediosHTML}
            </div>
            <div class="info-text" style="margin-top: 15px;">
                <i class="fas fa-info-circle"></i> Marque os itens conforme forem separados
            </div>
        </div>
    `;
    
    // Exibe o modal
    document.getElementById('modal-separacao').style.display = 'flex';
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
        adicionarNotificacao(`Prescrição de ${prescricaoAvaliada.paciente_nome} foi avaliada`, new Date());
        
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
    
    // Limita o número de notificações a 10 para não sobrecarregar a interface
    if (dadosMockados.notificacoes.length > 10) {
        dadosMockados.notificacoes.pop();
    }
    
    // Atualiza a exibição das notificações
    atualizarNotificacoes();
}

// Função para atualizar a exibição das notificações
function atualizarNotificacoes() {
    const notificacoesList = document.querySelector('.notification-list');
    
    // Limpa o conteúdo atual
    notificacoesList.innerHTML = '';
    
    // Adiciona as notificações
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