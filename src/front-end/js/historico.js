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
const prescricoes = [
    {
        id: 1,
        hc_paciente: "HC12345",
        lista_remedios: JSON.stringify([
            { id_remedio: 1, dosagem: "500mg", frequencia: "8/8h", via: "Oral" },
            { id_remedio: 3, dosagem: "40 gotas", frequencia: "6/6h", via: "Oral" }
        ]),
        status_prescricao: 2,
        id_user_aprovacao: 1,
        data_entrada: "2023-11-01T10:30:00",
        data_avaliacao: "2023-11-01T14:45:00"
    },
    {
        id: 2,
        hc_paciente: "HC23456",
        lista_remedios: JSON.stringify([
            { id_remedio: 2, dosagem: "400mg", frequencia: "12/12h", via: "Oral" },
            { id_remedio: 5, dosagem: "20mg", frequencia: "1x ao dia", via: "Oral" }
        ]),
        status_prescricao: 2,
        id_user_aprovacao: 2,
        data_entrada: "2023-11-02T09:15:00",
        data_avaliacao: "2023-11-02T11:30:00"
    },
    {
        id: 3,
        hc_paciente: "HC34567",
        lista_remedios: JSON.stringify([
            { id_remedio: 4, dosagem: "500mg", frequencia: "8/8h", via: "Oral" }
        ]),
        status_prescricao: 1,
        id_user_aprovacao: null,
        data_entrada: "2023-11-03T14:20:00",
        data_avaliacao: null
    },
    {
        id: 4,
        hc_paciente: "HC45678",
        lista_remedios: JSON.stringify([
            { id_remedio: 1, dosagem: "750mg", frequencia: "6/6h", via: "Oral" },
            { id_remedio: 2, dosagem: "600mg", frequencia: "8/8h", via: "Oral" },
            { id_remedio: 5, dosagem: "40mg", frequencia: "1x ao dia", via: "Oral" }
        ]),
        status_prescricao: 3,
        id_user_aprovacao: 3,
        data_entrada: "2023-11-04T08:45:00",
        data_avaliacao: "2023-11-04T10:15:00"
    },
    {
        id: 5,
        hc_paciente: "HC56789",
        lista_remedios: JSON.stringify([
            { id_remedio: 3, dosagem: "30 gotas", frequencia: "6/6h", via: "Oral" },
            { id_remedio: 4, dosagem: "250mg", frequencia: "12/12h", via: "Oral" }
        ]),
        status_prescricao: 2,
        id_user_aprovacao: 1,
        data_entrada: "2023-11-05T16:10:00",
        data_avaliacao: "2023-11-05T17:40:00"
    }
];

// Variáveis para armazenar os filtros ativos
let filtrosAtivos = {
    status: "",
    dataInicio: "",
    dataFim: "",
    paciente: ""
};

// Função para inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // A inicialização da barra lateral agora é controlada por menu.js
    
    // Carrega os dados na tabela
    carregarTabelaHistorico();
    
    // Carrega os dados para os filtros
    carregarOpcoesParaFiltros();
    
    // Adiciona listeners para os botões
    setupEventListeners();
});

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
        // Encontra o paciente correspondente
        const paciente = pacientes.find(p => p.hc === prescricao.hc_paciente);
        
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
            <td>${paciente ? paciente.nome : 'Desconhecido'}</td>
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

// Função para abrir o modal de detalhes da prescrição
function abrirModalDetalhesPrescricao(prescricaoId) {
    // Encontra a prescrição
    const prescricao = prescricoes.find(p => p.id === prescricaoId);
    if (!prescricao) return;
    
    // Encontra o paciente correspondente
    const paciente = pacientes.find(p => p.hc === prescricao.hc_paciente);
    
    // Encontra o status correspondente
    const status = statusPrescricao.find(s => s.id === prescricao.status_prescricao);
    
    // Encontra o usuário revisor (se houver)
    const usuario = prescricao.id_user_aprovacao ? 
                    usuarios.find(u => u.id === prescricao.id_user_aprovacao) : 
                    null;
    
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
    document.getElementById('paciente-nome').textContent = paciente ? paciente.nome : 'Desconhecido';
    document.getElementById('paciente-hc').textContent = prescricao.hc_paciente;
    document.getElementById('usuario-nome').textContent = usuario ? usuario.nome : 'Não avaliado';
    
    // Preenche a tabela de medicamentos
    const medicamentosTableBody = document.getElementById('medicamentosTableBody');
    medicamentosTableBody.innerHTML = ''; // Limpa a tabela
    
    // Processa a lista de remédios (JSON)
    const listaRemedios = JSON.parse(prescricao.lista_remedios);
    
    // Para cada remédio na lista, adiciona uma linha na tabela
    listaRemedios.forEach(remedio => {
        // Encontra o medicamento correspondente
        const medicamento = medicamentos.find(m => m.id === remedio.id_remedio);
        
        // Cria a nova linha da tabela
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${medicamento ? medicamento.principio_ativo : 'Desconhecido'}</td>
            <td>${remedio.dosagem}</td>
            <td>${remedio.frequencia}</td>
            <td>${remedio.via}</td>
        `;
        
        medicamentosTableBody.appendChild(row);
    });
    
    // Exibe o modal
    document.getElementById('modalDetalhesPrescricao').style.display = 'block';
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