// Dados mockados para simular o banco de dados
// Quando integrado com o back-end, estas variáveis serão substituídas por chamadas à API

// Array de status de prescrição (simula a tabela 'statusPrescricao')
const statusPrescricao = [
    { id: 1, status_prescricao: "Pendente" },
    { id: 2, status_prescricao: "Avaliado" },
    { id: 3, status_prescricao: "Rejeitado" }
];

// Array de pacientes (seria obtido do banco de dados)
const pacientes = [
    { hc: "HC12345", nome: "Maria Silva" },
    { hc: "HC23456", nome: "João Santos" },
    { hc: "HC34567", nome: "Ana Oliveira" },
    { hc: "HC45678", nome: "Carlos Pereira" },
    { hc: "HC56789", nome: "Juliana Costa" }
];

// Array de usuários (seria obtido do banco de dados)
const usuarios = [
    { id: 1, nome: "Dr. Roberto Almeida" },
    { id: 2, nome: "Dra. Fernanda Santos" },
    { id: 3, nome: "Dr. Marcelo Lima" }
];

// Array de medicamentos (simula a tabela 'remedio')
const medicamentos = [
    { id: 1, principio_ativo: "Paracetamol" },
    { id: 2, principio_ativo: "Ibuprofeno" },
    { id: 3, principio_ativo: "Dipirona" },
    { id: 4, principio_ativo: "Amoxicilina" },
    { id: 5, principio_ativo: "Omeprazol" }
];

// Array de prescrições (simula a tabela 'prescricao')
const prescricoes = [];

async function atualiza_prescricoes() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }
        const response = await fetch('https://two025-1a-t12-ec05-g03.onrender.com/prescricoes/listar', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar medicamentos');
        }

        const data = await response.json();
        console.log('Prescrições disponiveis:', data);
        
        // Atribui diretamente como array
        Object.assign(prescricoes, data); // Armazena os dados na variável
        
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        throw error; 
    }
}

// Variáveis para armazenar os filtros ativos
let filtrosAtivos = {
    status: "",
    dataInicio: "",
    dataFim: "",
    paciente: ""
};

async function inicializarPagina() {
    try {
        await Promise.all([
            atualiza_prescricoes()
        ]);
        
        // Carrega os dados na tabela
        carregarTabelaHistorico();
        // Carrega os dados para os filtros
        carregarOpcoesParaFiltros();
        // Atualiza as tabelas quando chamado
        atualizarTabelaComFiltros()
    
        // Adiciona listeners para os botões
        setupEventListeners();
    } catch (error) {
        console.error('Erro ao inicializar página:', error);
        alert('Não foi possível carregar os dados');
    }
}

document.addEventListener('DOMContentLoaded', inicializarPagina);


// Carrega as opções de filtro
function carregarOpcoesParaFiltros() {
    const filtroStatus = document.getElementById('filtroStatus');
    
    // Limpa as opções anteriores
    while (filtroStatus.options.length > 1) {
        filtroStatus.remove(1);
    }
    
    // Adiciona cada status como opção
    statusPrescricao.forEach(status => {
        const option = document.createElement('option');
        option.value = status.id;
        option.textContent = status.status_prescricao;
        filtroStatus.appendChild(option);
    });
}

// Carrega a tabela de histórico com os dados mockados
function carregarTabelaHistorico() {
    atualizarTabelaHistorico(prescricoes);
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
    
    document.getElementById('closeDetalhesPrescricao').addEventListener('click', () => {
        document.getElementById('modalDetalhesPrescricao').style.display = 'none';
    });
    
    // Botão limpar filtros
    document.getElementById('limparFiltros').addEventListener('click', limparFiltros);
    
    // Formulários
    document.getElementById('formFiltros').addEventListener('submit', aplicarFiltros);
    
    // Campo de busca
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        buscarPrescricoes(this.value);
    });
}

// Função para aplicar filtros
function aplicarFiltros(event) {
    event.preventDefault();
    
    // Obtém os valores dos filtros
    filtrosAtivos.status = document.getElementById('filtroStatus').value;
    filtrosAtivos.dataInicio = document.getElementById('dataInicio').value;
    filtrosAtivos.dataFim = document.getElementById('dataFim').value;
    filtrosAtivos.paciente = document.getElementById('filtroPaciente').value;
    
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
        status: "",
        dataInicio: "",
        dataFim: "",
        paciente: ""
    };
    
    // Atualizar a tabela mostrando todas as prescrições
    carregarTabelaHistorico();
    
    // Atualiza a aparência do botão de filtros
    atualizarEstadoBotaoFiltros();
}

// Função para atualizar a aparência do botão de filtros
function atualizarEstadoBotaoFiltros() {
    const btnFiltros = document.getElementById('btnFiltros');
    
    // Verifica se há algum filtro ativo
    const temFiltroAtivo = 
        filtrosAtivos.status !== "" || 
        filtrosAtivos.dataInicio !== "" || 
        filtrosAtivos.dataFim !== "" || 
        filtrosAtivos.paciente !== "";
    
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
    // Filtra as prescrições de acordo com os filtros selecionados
    let prescricoesFiltradas = prescricoes.filter(prescricao => {
        // Filtro por status
        if (filtrosAtivos.status && parseInt(filtrosAtivos.status) !== prescricao.status_prescricao) {
            return false;
        }
        
        // Filtro por paciente (HC)
        if (filtrosAtivos.paciente && !prescricao.hc_paciente.toLowerCase().includes(filtrosAtivos.paciente.toLowerCase())) {
            return false;
        }
        
        // Filtro por data de entrada (início)
        if (filtrosAtivos.dataInicio) {
            const dataInicio = new Date(filtrosAtivos.dataInicio);
            const dataEntrada = new Date(prescricao.data_entrada);
            if (dataEntrada < dataInicio) {
                return false;
            }
        }
        
        // Filtro por data de entrada (fim)
        if (filtrosAtivos.dataFim) {
            const dataFim = new Date(filtrosAtivos.dataFim);
            dataFim.setHours(23, 59, 59); // Define para o final do dia
            const dataEntrada = new Date(prescricao.data_entrada);
            if (dataEntrada > dataFim) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados filtrados
    atualizarTabelaHistorico(prescricoesFiltradas);
}

// Função para atualizar a tabela de histórico com prescrições específicas
function atualizarTabelaHistorico(prescricoesList) {
    const tableBody = document.getElementById('historicoTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela
    
    // Se não houver prescrições para mostrar
    if (prescricoesList.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="6" style="text-align: center;">Nenhum item encontrado</td>
        `;
        tableBody.appendChild(row);
        return;
    }
    
    // Para cada prescrição, adiciona uma linha na tabela
    prescricoesList.forEach(prescricao => {
        // Encontra o status correspondente
        const status = statusPrescricao.find(s => s.id === prescricao.status_prescricao);
        
        // Formata a data de entrada
        const dataEntrada = new Date(prescricao.data_entrada);
        const dataFormatada = dataEntrada.toLocaleDateString('pt-BR') + ' ' + 
                              dataEntrada.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
        
        // Define a classe CSS para o status
        let statusClass = '';
        switch(prescricao.status_prescricao) {
            case 1:
                statusClass = 'status-pendente';
                break;
            case 2:
                statusClass = 'status-avaliado';
                break;
            case 3:
                statusClass = 'status-rejeitado';
                break;
        }
        
        // Cria a nova linha da tabela
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${prescricao.id}</td>
            <td>${prescricao.paciente_nome ? prescricao.paciente_nome : 'Desconhecido'}</td>
            <td>${prescricao.hc_paciente}</td>
            <td>${dataFormatada}</td>
            <td><span class="status-tag ${statusClass}">${status ? status.status_prescricao : 'Desconhecido'}</span></td>
            <td>
                <button class="btn-visualizar" data-prescricao-id="${prescricao.id}">
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
            const prescricaoId = parseInt(this.getAttribute('data-prescricao-id'));
            abrirModalDetalhesPrescricao(prescricaoId);
        });
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

// Função para abrir o modal de detalhes da prescrição
function abrirModalDetalhesPrescricao(prescricaoId) {
    puxa_prescricao_por_id(prescricaoId)
    .then(data => {
        prescricao = data.prescricao;
        // Encontra o status correspondente
        const status = statusPrescricao.find(s => s.id === prescricao.status_prescricao);
        
        // Encontra o usuário revisor (se houver)
        const usuario = prescricao.user_nome
        
        // Formata as datas
        const dataEntrada = prescricao.data_entrada ? new Date(prescricao.data_entrada) : null;
        const dataEntradaFormatada = dataEntrada ? 
                                dataEntrada.toLocaleDateString('pt-BR') + ' ' + 
                                dataEntrada.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : 
                                'Não registrada';
        
        const dataAvaliacao = prescricao.data_avaliacao ? new Date(prescricao.data_avaliacao) : null;
        const dataAvaliacaoFormatada = dataAvaliacao ? 
                                    dataAvaliacao.toLocaleDateString('pt-BR') + ' ' + 
                                    dataAvaliacao.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : 
                                    'Não avaliada';
        
        // Preenche os dados no modal
        document.getElementById('prescricao-id').textContent = prescricao.id;
        document.getElementById('prescricao-status').textContent = status ? status.status_prescricao : 'Desconhecido';
        document.getElementById('prescricao-data-entrada').textContent = dataEntradaFormatada;
        document.getElementById('prescricao-data-avaliacao').textContent = dataAvaliacaoFormatada;
        document.getElementById('paciente-nome').textContent = prescricao.paciente_nome ? prescricao.paciente_nome : 'Desconhecido';
        document.getElementById('paciente-hc').textContent = prescricao.hc_paciente;
        document.getElementById('usuario-nome').textContent = usuario ? usuario : 'Não avaliado';
        
        // Preenche a tabela de medicamentos
        const medicamentosTableBody = document.getElementById('medicamentosTableBody');
        medicamentosTableBody.innerHTML = ''; // Limpa a tabela
        
        // Processa a lista de remédios (JSON)
        const listaRemedios = data.remedios
        
        // Para cada remédio na lista, adiciona uma linha na tabela
        listaRemedios.forEach(remedio => {
            
            // Cria a nova linha da tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${remedio.principio_ativo ? remedio.principio_ativo : 'Desconhecido'}</td>
                <td>${remedio.dosagem_em_mg} mg</td>
            `;
            
            medicamentosTableBody.appendChild(row);
        });
        
        // Exibe o modal
        document.getElementById('modalDetalhesPrescricao').style.display = 'block';
        
        
    })
}


// Função para buscar prescrições
function buscarPrescricoes(termo) {
    // Se o termo estiver vazio, mostra todas as prescrições considerando os filtros ativos
    if (!termo.trim()) {
        atualizarTabelaComFiltros();
        return;
    }
    
    // Filtra as prescrições que correspondem ao termo de busca
    const prescricoesFiltradas = prescricoes.filter(prescricao => {
        // Encontra o paciente correspondente
        const paciente = pacientes.find(p => p.hc === prescricao.hc_paciente);
        
        // Busca por ID, nome do paciente ou HC
        const correspondeTermoBusca = 
            prescricao.id.toString().includes(termo) ||
            (paciente && paciente.nome.toLowerCase().includes(termo.toLowerCase())) ||
            prescricao.hc_paciente.toLowerCase().includes(termo.toLowerCase());
        
        if (!correspondeTermoBusca) return false;
        
        // Aplica os filtros adicionais se estiverem ativos
        
        // Filtro por status
        if (filtrosAtivos.status && parseInt(filtrosAtivos.status) !== prescricao.status_prescricao) {
            return false;
        }
        
        // Filtro por paciente (HC)
        if (filtrosAtivos.paciente && !prescricao.hc_paciente.toLowerCase().includes(filtrosAtivos.paciente.toLowerCase())) {
            return false;
        }
        
        // Filtro por data de entrada (início)
        if (filtrosAtivos.dataInicio) {
            const dataInicio = new Date(filtrosAtivos.dataInicio);
            const dataEntrada = new Date(prescricao.data_entrada);
            if (dataEntrada < dataInicio) {
                return false;
            }
        }
        
        // Filtro por data de entrada (fim)
        if (filtrosAtivos.dataFim) {
            const dataFim = new Date(filtrosAtivos.dataFim);
            dataFim.setHours(23, 59, 59); // Define para o final do dia
            const dataEntrada = new Date(prescricao.data_entrada);
            if (dataEntrada > dataFim) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados
    atualizarTabelaHistorico(prescricoesFiltradas);
}