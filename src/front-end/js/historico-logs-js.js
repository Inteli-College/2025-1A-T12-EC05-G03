// Dados mockados para simular o banco de dados
// Quando integrado com o back-end, estas variáveis serão substituídas por chamadas à API

// Array de logs (simula a tabela 'logs')
const logs = [
    { 
        id: 1, 
        id_pedido: 101, 
        id_remedio: 201, 
        descricao: "Medicamento adicionado ao pedido", 
        hora: "2023-05-10T08:30:45" 
    },
    { 
        id: 2, 
        id_pedido: 102, 
        id_remedio: 203, 
        descricao: "Quantidade do medicamento alterada de 2 para 3 unidades", 
        hora: "2023-05-10T09:15:22" 
    },
    { 
        id: 3, 
        id_pedido: 101, 
        id_remedio: 205, 
        descricao: "Medicamento removido do pedido", 
        hora: "2023-05-10T10:05:18" 
    },
    { 
        id: 4, 
        id_pedido: 103, 
        id_remedio: 202, 
        descricao: "Pedido finalizado com sucesso", 
        hora: "2023-05-11T14:22:37" 
    },
    { 
        id: 5, 
        id_pedido: 104, 
        id_remedio: 204, 
        descricao: "Medicamento em falta no estoque", 
        hora: "2023-05-11T16:45:12" 
    }
];

// Array de medicamentos (simula a tabela 'remedio')
const medicamentos = [
    { id: 201, principio_ativo: "Paracetamol" },
    { id: 202, principio_ativo: "Ibuprofeno" },
    { id: 203, principio_ativo: "Dipirona" },
    { id: 204, principio_ativo: "Amoxicilina" },
    { id: 205, principio_ativo: "Omeprazol" }
];

// Variáveis para armazenar os filtros ativos
let filtrosAtivos = {
    idPedido: "",
    idRemedio: "",
    dataInicio: "",
    dataFim: ""
};

// Função para inicializar a página
function inicializarPagina() {
    try {
        // Carrega os dados na tabela
        carregarTabelaLogs();
        
        // Adiciona listeners para os botões
        setupEventListeners();
    } catch (error) {
        console.error('Erro ao inicializar página:', error);
        alert('Não foi possível carregar os dados');
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarPagina);

// Carrega a tabela de logs com os dados mockados
function carregarTabelaLogs() {
    atualizarTabelaLogs(logs);
}

// Configura todos os event listeners necessários
function setupEventListeners() {
    // Botão de filtros
    document.getElementById('btnFiltros').addEventListener('click', () => {
        document.getElementById('modalFiltros').style.display = 'block';
    });
    
    // Botões para fechar modais
    document.getElementById('closeFiltros').addEventListener('click', () => {
        document.getElementById('modalFiltros').style.display = 'none';
    });
    
    document.getElementById('closeDetalhesLog').addEventListener('click', () => {
        document.getElementById('modalDetalhesLog').style.display = 'none';
    });
    
    // Botão limpar filtros
    document.getElementById('limparFiltros').addEventListener('click', limparFiltros);
    
    // Formulários
    document.getElementById('formFiltros').addEventListener('submit', aplicarFiltros);
    
    // Campo de busca
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        buscarLogs(this.value);
    });
}

// Função para aplicar filtros
function aplicarFiltros(event) {
    event.preventDefault();
    
    // Obtém os valores dos filtros
    filtrosAtivos.idPedido = document.getElementById('filtroIdPedido').value;
    filtrosAtivos.idRemedio = document.getElementById('filtroIdRemedio').value;
    filtrosAtivos.dataInicio = document.getElementById('dataInicio').value;
    filtrosAtivos.dataFim = document.getElementById('dataFim').value;
    
    // Fecha o modal
    document.getElementById('modalFiltros').style.display = 'none';
    
    // Aplica os filtros na tabela
    atualizarTabelaComFiltros();
    
    // Atualiza a aparência do botão de filtros para indicar que há filtros ativos
    atualizarEstadoBotaoFiltros();
}

// Função para limpar todos os filtros
function limparFiltros() {
    // Resetar formulário
    document.getElementById('formFiltros').reset();
    
    // Limpar objeto de filtros ativos
    filtrosAtivos = {
        idPedido: "",
        idRemedio: "",
        dataInicio: "",
        dataFim: ""
    };
    
    // Atualizar a tabela mostrando todos os logs
    carregarTabelaLogs();
    
    // Atualiza a aparência do botão de filtros
    atualizarEstadoBotaoFiltros();
}

// Função para atualizar a aparência do botão de filtros
function atualizarEstadoBotaoFiltros() {
    const btnFiltros = document.getElementById('btnFiltros');
    
    // Verifica se há algum filtro ativo
    const temFiltroAtivo = 
        filtrosAtivos.idPedido !== "" || 
        filtrosAtivos.idRemedio !== "" || 
        filtrosAtivos.dataInicio !== "" || 
        filtrosAtivos.dataFim !== "";
    
    // Altera a aparência do botão se houver algum filtro ativo
    if (temFiltroAtivo) {
        btnFiltros.classList.add('filtro-ativo');
        btnFiltros.textContent = "Filtros Ativos";
    } else {
        btnFiltros.classList.remove('filtro-ativo');
        btnFiltros.textContent = "Filtros";
    }
}

// Função para atualizar a tabela com os filtros aplicados
function atualizarTabelaComFiltros() {
    // Filtra os logs de acordo com os filtros selecionados
    let logsFiltrados = logs.filter(log => {
        // Filtro por ID do pedido
        if (filtrosAtivos.idPedido && log.id_pedido.toString() !== filtrosAtivos.idPedido) {
            return false;
        }
        
        // Filtro por ID do remédio
        if (filtrosAtivos.idRemedio && log.id_remedio.toString() !== filtrosAtivos.idRemedio) {
            return false;
        }
        
        // Filtro por data (início)
        if (filtrosAtivos.dataInicio) {
            const dataInicio = new Date(filtrosAtivos.dataInicio);
            const dataLog = new Date(log.hora);
            if (dataLog < dataInicio) {
                return false;
            }
        }
        
        // Filtro por data (fim)
        if (filtrosAtivos.dataFim) {
            const dataFim = new Date(filtrosAtivos.dataFim);
            dataFim.setHours(23, 59, 59); // Define para o final do dia
            const dataLog = new Date(log.hora);
            if (dataLog > dataFim) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados filtrados
    atualizarTabelaLogs(logsFiltrados);
}

// Função para atualizar a tabela de logs com logs específicos
function atualizarTabelaLogs(logsList) {
    const tableBody = document.getElementById('logsTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela
    
    // Se não houver logs para mostrar
    if (logsList.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="6" style="text-align: center;">Nenhum log encontrado</td>
        `;
        tableBody.appendChild(row);
        return;
    }
    
    // Para cada log, adiciona uma linha na tabela
    logsList.forEach(log => {
        // Formata a data e hora
        const dataHora = new Date(log.hora);
        const dataHoraFormatada = dataHora.toLocaleDateString('pt-BR') + ' ' + 
                              dataHora.toLocaleTimeString('pt-BR');
        
        // Cria a nova linha da tabela
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.id}</td>
            <td>${log.id_pedido}</td>
            <td>${log.id_remedio}</td>
            <td>${truncateText(log.descricao, 50)}</td>
            <td>${dataHoraFormatada}</td>
            <td>
                <button class="btn-visualizar" data-log-id="${log.id}">
                    <i class="fas fa-eye"></i> Visualizar
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adiciona listener para os botões de visualizar
    const visualizarButtons = document.querySelectorAll('.btn-visualizar');
    visualizarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const logId = parseInt(this.getAttribute('data-log-id'));
            abrirModalDetalhesLog(logId);
        });
    });
}

// Função para truncar texto longo
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Função para abrir o modal de detalhes do log
function abrirModalDetalhesLog(logId) {
    // Encontra o log
    const log = logs.find(l => l.id === logId);
    if (!log) return;
    
    // Encontra o medicamento correspondente
    const medicamento = medicamentos.find(m => m.id === log.id_remedio);
    
    // Formata a data e hora
    const dataHora = new Date(log.hora);
    const dataHoraFormatada = dataHora.toLocaleDateString('pt-BR') + ' ' + 
                          dataHora.toLocaleTimeString('pt-BR');
    
    // Preenche os dados no modal
    document.getElementById('log-id').textContent = log.id;
    document.getElementById('log-id-pedido').textContent = log.id_pedido;
    document.getElementById('log-id-remedio').textContent = `${log.id_remedio} - ${medicamento ? medicamento.principio_ativo : 'Desconhecido'}`;
    document.getElementById('log-hora').textContent = dataHoraFormatada;
    document.getElementById('log-descricao').textContent = log.descricao;
    
    // Exibe o modal
    document.getElementById('modalDetalhesLog').style.display = 'block';
}

// Função para buscar logs
function buscarLogs(termo) {
    // Se o termo estiver vazio, mostra todos os logs considerando os filtros ativos
    if (!termo.trim()) {
        atualizarTabelaComFiltros();
        return;
    }
    
    // Filtra os logs que correspondem ao termo de busca
    const logsFiltrados = logs.filter(log => {
        // Busca por ID, ID do pedido, ID do remédio ou descrição
        const correspondeTermoBusca = 
            log.id.toString().includes(termo) ||
            log.id_pedido.toString().includes(termo) ||
            log.id_remedio.toString().includes(termo) ||
            log.descricao.toLowerCase().includes(termo.toLowerCase());
        
        if (!correspondeTermoBusca) return false;
        
        // Aplica os filtros adicionais se estiverem ativos
        
        // Filtro por ID do pedido
        if (filtrosAtivos.idPedido && log.id_pedido.toString() !== filtrosAtivos.idPedido) {
            return false;
        }
        
        // Filtro por ID do remédio
        if (filtrosAtivos.idRemedio && log.id_remedio.toString() !== filtrosAtivos.idRemedio) {
            return false;
        }
        
        // Filtro por data (início)
        if (filtrosAtivos.dataInicio) {
            const dataInicio = new Date(filtrosAtivos.dataInicio);
            const dataLog = new Date(log.hora);
            if (dataLog < dataInicio) {
                return false;
            }
        }
        
        // Filtro por data (fim)
        if (filtrosAtivos.dataFim) {
            const dataFim = new Date(filtrosAtivos.dataFim);
            dataFim.setHours(23, 59, 59); // Define para o final do dia
            const dataLog = new Date(log.hora);
            if (dataLog > dataFim) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados
    atualizarTabelaLogs(logsFiltrados);
}

// Função para buscar logs do servidor (simulada)
async function buscarLogsDoServidor() {
    try {
        // Simulação de uma chamada à API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(logs);
            }, 500);
        });
    } catch (error) {
        console.error('Erro ao buscar logs:', error);
        throw error;
    }
}

// Função para atualizar logs (simulada)
async function atualizarLogs() {
    try {
        const logsAtualizados = await buscarLogsDoServidor();
        // Atualiza a variável global
        Object.assign(logs, logsAtualizados);
        // Atualiza a tabela
        carregarTabelaLogs();
        return logsAtualizados;
    } catch (error) {
        console.error('Erro ao atualizar logs:', error);
        alert('Não foi possível atualizar os logs');
        throw error;
    }
}