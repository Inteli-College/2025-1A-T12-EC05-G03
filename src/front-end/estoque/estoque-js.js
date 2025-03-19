// Dados mockados para simular o banco de dados
// Quando integrado com o back-end, estas variáveis serão substituídas por chamadas à API

// Array de medicamentos (simula a tabela 'remedio')
const medicamentos = [
    { id: 1, principio_ativo: "Paracetamol" },
    { id: 2, principio_ativo: "Ibuprofeno" },
    { id: 3, principio_ativo: "Dipirona" },
    { id: 4, principio_ativo: "Amoxicilina" },
    { id: 5, principio_ativo: "Omeprazol" }
];

// Array de lotes (simula a tabela 'lote')
let lotes = [
    { 
        id: 1, 
        num_lote: "LOT123456", 
        data_validade: "2025-12-31", 
        fabricante: "Farmacêutica ABC", 
        id_remedio: 1, 
        quantidade: 100 
    },
    { 
        id: 2, 
        num_lote: "LOT234567", 
        data_validade: "2025-10-15", 
        fabricante: "MediLab", 
        id_remedio: 2, 
        quantidade: 50 
    },
    { 
        id: 3, 
        num_lote: "LOT345678", 
        data_validade: "2026-01-20", 
        fabricante: "Farmacêutica XYZ", 
        id_remedio: 3, 
        quantidade: 75 
    },
    { 
        id: 4, 
        num_lote: "LOT456789", 
        data_validade: "2025-11-10", 
        fabricante: "MediLab", 
        id_remedio: 4, 
        quantidade: 30 
    },
    { 
        id: 5, 
        num_lote: "LOT567890", 
        data_validade: "2026-03-05", 
        fabricante: "PharmaPlus", 
        id_remedio: 5, 
        quantidade: 60 
    }
];

// Contador para gerar novos IDs
let nextLoteId = 6;
let nextMedicamentoId = 6;

// Variáveis para armazenar os filtros ativos
let filtrosAtivos = {
    medicamento: "",
    fabricante: "",
    quantidadeMin: "",
    quantidadeMax: "",
    mostrarVencidos: false,
    proximosVencer: false
};

// Função para inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a barra lateral
    initSidebar();
    
    // Carrega os dados na tabela
    carregarTabelaEstoque();
    
    // Carrega os medicamentos nos selects dos formulários
    carregarMedicamentosSelect();
    
    // Carrega os dados para os filtros
    carregarOpcoesParaFiltros();
    
    // Adiciona listeners para os botões
    setupEventListeners();
});

// Inicialização da barra lateral
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    // Evento de clique para expandir/retrair a barra lateral
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
        document.body.classList.toggle('menu-expanded');
    });
}

// Carrega a tabela de estoque com os dados mockados
function carregarTabelaEstoque() {
    atualizarTabelaEstoque(lotes);
}

// Carrega os medicamentos nos selects dos formulários
function carregarMedicamentosSelect() {
    const selectMedicamentoLote = document.getElementById('medicamentoLote');
    const selectMedicamentoRetirar = document.getElementById('medicamentoRetirar');
    
    // Limpa os selects
    selectMedicamentoLote.innerHTML = '';
    selectMedicamentoRetirar.innerHTML = '';
    
    // Opção padrão
    selectMedicamentoLote.innerHTML = '<option value="">Selecione um medicamento</option>';
    selectMedicamentoRetirar.innerHTML = '<option value="">Selecione um medicamento</option>';
    
    // Adiciona cada medicamento aos selects
    medicamentos.forEach(med => {
        const optionLote = document.createElement('option');
        optionLote.value = med.id;
        optionLote.textContent = med.principio_ativo;
        selectMedicamentoLote.appendChild(optionLote);
        
        const optionRetirar = document.createElement('option');
        optionRetirar.value = med.id;
        optionRetirar.textContent = med.principio_ativo;
        selectMedicamentoRetirar.appendChild(optionRetirar);
    });
    
    // Adiciona listener para quando o medicamento for selecionado no form de retirada
    selectMedicamentoRetirar.addEventListener('change', carregarLotesSelect);
}

// Carrega os lotes disponíveis para o medicamento selecionado
function carregarLotesSelect() {
    const medicamentoId = parseInt(document.getElementById('medicamentoRetirar').value);
    const loteSelect = document.getElementById('loteRetirar');
    
    // Limpa o select
    loteSelect.innerHTML = '';
    loteSelect.innerHTML = '<option value="">Selecione um lote</option>';
    
    // Se nenhum medicamento foi selecionado, retorna
    if (!medicamentoId) return;
    
    // Filtra os lotes pelo medicamento selecionado
    const lotesFiltrados = lotes.filter(lote => lote.id_remedio === medicamentoId);
    
    // Adiciona cada lote ao select
    lotesFiltrados.forEach(lote => {
        const option = document.createElement('option');
        option.value = lote.id;
        option.textContent = `${lote.num_lote} - Qtd: ${lote.quantidade}`;
        loteSelect.appendChild(option);
    });
}

// Função para carregar opções para filtros
function carregarOpcoesParaFiltros() {
    const filtroMedicamento = document.getElementById('filtroMedicamento');
    const filtroFabricante = document.getElementById('filtroFabricante');
    
    // Limpando as opções anteriores
    while (filtroMedicamento.options.length > 1) {
        filtroMedicamento.remove(1);
    }
    
    while (filtroFabricante.options.length > 1) {
        filtroFabricante.remove(1);
    }
    
    // Adicionando medicamentos ao filtro
    medicamentos.forEach(med => {
        const option = document.createElement('option');
        option.value = med.id;
        option.textContent = med.principio_ativo;
        filtroMedicamento.appendChild(option);
    });
    
    // Obtendo fabricantes únicos
    const fabricantesUnicos = [...new Set(lotes.map(lote => lote.fabricante))];
    
    // Adicionando fabricantes ao filtro
    fabricantesUnicos.forEach(fabricante => {
        const option = document.createElement('option');
        option.value = fabricante;
        option.textContent = fabricante;
        filtroFabricante.appendChild(option);
    });
}

// Configura todos os event listeners necessários
function setupEventListeners() {
    // Botões para abrir modais
    document.getElementById('btnCadastrarLote').addEventListener('click', () => {
        document.getElementById('modalCadastrarLote').style.display = 'block';
    });
    
    document.getElementById('btnCadastrarMedicamento').addEventListener('click', () => {
        document.getElementById('modalCadastrarMedicamento').style.display = 'block';
    });
    
    document.getElementById('btnRetirarMedicamento').addEventListener('click', () => {
        document.getElementById('modalRetirarMedicamento').style.display = 'block';
    });
    
    document.getElementById('btnFiltros').addEventListener('click', () => {
        document.getElementById('modalFiltros').style.display = 'block';
    });
    
    // Botões para fechar modais
    document.getElementById('closeCadastrarLote').addEventListener('click', () => {
        document.getElementById('modalCadastrarLote').style.display = 'none';
    });
    
    document.getElementById('closeCadastrarMedicamento').addEventListener('click', () => {
        document.getElementById('modalCadastrarMedicamento').style.display = 'none';
    });
    
    document.getElementById('closeRetirarMedicamento').addEventListener('click', () => {
        document.getElementById('modalRetirarMedicamento').style.display = 'none';
    });
    
    document.getElementById('closeVisualizarMedicamento').addEventListener('click', () => {
        document.getElementById('modalVisualizarMedicamento').style.display = 'none';
    });
    
    document.getElementById('closeFiltros').addEventListener('click', () => {
        document.getElementById('modalFiltros').style.display = 'none';
    });
    
    // Botões cancelar
    document.getElementById('cancelarCadastroLote').addEventListener('click', () => {
        document.getElementById('modalCadastrarLote').style.display = 'none';
    });
    
    document.getElementById('cancelarCadastroMedicamento').addEventListener('click', () => {
        document.getElementById('modalCadastrarMedicamento').style.display = 'none';
    });
    
    document.getElementById('cancelarRetiradaMedicamento').addEventListener('click', () => {
        document.getElementById('modalRetirarMedicamento').style.display = 'none';
    });
    
    // Botão limpar filtros
    document.getElementById('limparFiltros').addEventListener('click', limparFiltros);
    
    // Formulários
    document.getElementById('formCadastrarLote').addEventListener('submit', cadastrarLote);
    document.getElementById('formCadastrarMedicamento').addEventListener('submit', cadastrarMedicamento);
    document.getElementById('formRetirarMedicamento').addEventListener('submit', retirarMedicamento);
    document.getElementById('formFiltros').addEventListener('submit', aplicarFiltros);
    
    // Campo de busca
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        buscarMedicamentos(this.value);
    });
}

// Função para abrir o modal de visualização de medicamento
function abrirModalVisualizarMedicamento(loteId) {
    // Encontra o lote
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) return;
    
    // Encontra o medicamento correspondente
    const medicamento = medicamentos.find(med => med.id === lote.id_remedio);
    if (!medicamento) return;
    
    // Formata a data de validade
    const dataValidade = new Date(lote.data_validade);
    const dataFormatada = dataValidade.toLocaleDateString('pt-BR');
    
    // Preenche os campos do modal
    document.getElementById('medicamentoTitulo').textContent = medicamento.principio_ativo;
    document.getElementById('viewPrincipioAtivo').textContent = medicamento.principio_ativo;
    document.getElementById('viewNumLote').textContent = lote.num_lote;
    document.getElementById('viewDataValidade').textContent = dataFormatada;
    document.getElementById('viewFabricante').textContent = lote.fabricante;
    document.getElementById('viewQuantidade').textContent = lote.quantidade;
    
    // Exibe o modal
    document.getElementById('modalVisualizarMedicamento').style.display = 'block';
}

// Função para cadastrar um novo lote
function cadastrarLote(event) {
    event.preventDefault();
    
    // Obtém os valores do formulário
    const idRemedio = parseInt(document.getElementById('medicamentoLote').value);
    const numLote = document.getElementById('numLote').value;
    const dataValidade = document.getElementById('dataValidade').value;
    const fabricante = document.getElementById('fabricante').value;
    const quantidade = parseInt(document.getElementById('quantidadeLote').value);
    
    // Validação básica
    if (!idRemedio || !numLote || !dataValidade || !fabricante || !quantidade) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    // Cria o novo lote
    const novoLote = {
        id: nextLoteId++,
        num_lote: numLote,
        data_validade: dataValidade,
        fabricante: fabricante,
        id_remedio: idRemedio,
        quantidade: quantidade
    };
    
    // Adiciona o lote ao array
    lotes.push(novoLote);
    
    // Atualiza a tabela mantendo os filtros ativos
    atualizarTabelaComFiltros();
    
    // Atualiza os filtros com o novo fabricante, se necessário
    carregarOpcoesParaFiltros();
    
    // Fecha o modal
    document.getElementById('modalCadastrarLote').style.display = 'none';
    
    // Limpa o formulário
    document.getElementById('formCadastrarLote').reset();
    
    // Feedback ao usuário
    alert('Lote cadastrado com sucesso!');
    
    // Aqui seria feita a chamada à API para salvar no banco de dados
    // fetch('/api/lote', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(novoLote),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
}

// Função para cadastrar um novo medicamento
function cadastrarMedicamento(event) {
    event.preventDefault();
    
    // Obtém o princípio ativo do formulário
    const principioAtivo = document.getElementById('principioAtivo').value;
    
    // Validação básica
    if (!principioAtivo) {
        alert('Por favor, preencha o princípio ativo');
        return;
    }
    
    // Cria o novo medicamento
    const novoMedicamento = {
        id: nextMedicamentoId++,
        principio_ativo: principioAtivo
    };
    
    // Adiciona o medicamento ao array
    medicamentos.push(novoMedicamento);
    
    // Atualiza os selects dos formulários
    carregarMedicamentosSelect();
    
    // Atualiza as opções de filtro
    carregarOpcoesParaFiltros();
    
    // Fecha o modal
    document.getElementById('modalCadastrarMedicamento').style.display = 'none';
    
    // Limpa o formulário
    document.getElementById('formCadastrarMedicamento').reset();
    
    // Feedback ao usuário
    alert('Medicamento cadastrado com sucesso!');
    
    // Aqui seria feita a chamada à API para salvar no banco de dados
    // fetch('/api/remedio', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(novoMedicamento),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
}

// Função para retirar medicamento do estoque
function retirarMedicamento(event) {
    event.preventDefault();
    
    // Obtém os valores do formulário
    const loteId = parseInt(document.getElementById('loteRetirar').value);
    const quantidadeRetirar = parseInt(document.getElementById('quantidadeRetirar').value);
    
    // Validação básica
    if (!loteId || !quantidadeRetirar) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    // Encontra o lote
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) {
        alert('Lote não encontrado');
        return;
    }
    
    // Verifica se há quantidade suficiente
    if (lote.quantidade < quantidadeRetirar) {
        alert('Quantidade insuficiente no estoque');
        return;
    }
    
    // Atualiza a quantidade do lote
    lote.quantidade -= quantidadeRetirar;
    
    // Se a quantidade chegou a zero, remove o lote
    if (lote.quantidade === 0) {
        lotes = lotes.filter(l => l.id !== loteId);
    }
    
    // Atualiza a tabela mantendo os filtros ativos
    atualizarTabelaComFiltros();
    
    // Fecha o modal
    document.getElementById('modalRetirarMedicamento').style.display = 'none';
    
    // Limpa o formulário
    document.getElementById('formRetirarMedicamento').reset();
    
    // Feedback ao usuário
    alert('Medicamento retirado com sucesso!');
    
    // Aqui seria feita a chamada à API para atualizar no banco de dados
    // fetch(`/api/lote/${loteId}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ quantidade: lote.quantidade }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
}

// Função para aplicar filtros
function aplicarFiltros(event) {
    event.preventDefault();
    
    // Obtém os valores dos filtros
    filtrosAtivos.medicamento = document.getElementById('filtroMedicamento').value;
    filtrosAtivos.fabricante = document.getElementById('filtroFabricante').value;
    filtrosAtivos.quantidadeMin = document.getElementById('quantidadeMin').value;
    filtrosAtivos.quantidadeMax = document.getElementById('quantidadeMax').value;
    filtrosAtivos.mostrarVencidos = document.getElementById('filtroVencidos').checked;
    filtrosAtivos.proximosVencer = document.getElementById('filtroProximosVencer').checked;
    
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
        medicamento: "",
        fabricante: "",
        quantidadeMin: "",
        quantidadeMax: "",
        mostrarVencidos: false,
        proximosVencer: false
    };
    
    // Atualizar a tabela mostrando todos os lotes
    carregarTabelaEstoque();
    
    // Atualiza a aparência do botão de filtros
    atualizarEstadoBotaoFiltros();
}

// Função para atualizar a aparência do botão de filtros
function atualizarEstadoBotaoFiltros() {
    const btnFiltros = document.getElementById('btnFiltros');
    
    // Verifica se há algum filtro ativo
    const temFiltroAtivo = 
        filtrosAtivos.medicamento !== "" || 
        filtrosAtivos.fabricante !== "" || 
        filtrosAtivos.quantidadeMin !== "" || 
        filtrosAtivos.quantidadeMax !== "" || 
        filtrosAtivos.mostrarVencidos || 
        filtrosAtivos.proximosVencer;
    
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
    // Filtra os lotes de acordo com os filtros selecionados
    let lotesFiltrados = lotes.filter(lote => {
        // Filtro por medicamento
        if (filtrosAtivos.medicamento && parseInt(filtrosAtivos.medicamento) !== lote.id_remedio) {
            return false;
        }
        
        // Filtro por fabricante
        if (filtrosAtivos.fabricante && filtrosAtivos.fabricante !== lote.fabricante) {
            return false;
        }
        
        // Filtro por quantidade mínima
        if (filtrosAtivos.quantidadeMin && lote.quantidade < parseInt(filtrosAtivos.quantidadeMin)) {
            return false;
        }
        
        // Filtro por quantidade máxima
        if (filtrosAtivos.quantidadeMax && lote.quantidade > parseInt(filtrosAtivos.quantidadeMax)) {
            return false;
        }
        
        // Filtro por validade
        const dataAtual = new Date();
        const dataValidade = new Date(lote.data_validade);
        
        // Se não mostrar vencidos e o lote estiver vencido, não mostrar
        if (!filtrosAtivos.mostrarVencidos && dataValidade < dataAtual) {
            return false;
        }
        
        // Se mostrar próximos a vencer (3 meses)
        if (filtrosAtivos.proximosVencer) {
            const tresMesesDepois = new Date();
            tresMesesDepois.setMonth(tresMesesDepois.getMonth() + 3);
            
            // Se não estiver dentro de 3 meses para vencer, não mostrar
            if (!(dataValidade >= dataAtual && dataValidade <= tresMesesDepois)) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados filtrados
    atualizarTabelaEstoque(lotesFiltrados);
}

// Função para atualizar a tabela de estoque com lotes específicos
function atualizarTabelaEstoque(lotesList) {
    const tableBody = document.getElementById('estoqueTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela
    
    // Se não houver lotes para mostrar
    if (lotesList.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4" style="text-align: center;">Nenhum item encontrado</td>
        `;
        tableBody.appendChild(row);
        return;
    }
    
    // Para cada lote, adiciona uma linha na tabela
    lotesList.forEach(lote => {
        // Encontra o medicamento correspondente ao lote
        const medicamento = medicamentos.find(med => med.id === lote.id_remedio);
        
        // Formata a data de validade
        const dataValidade = new Date(lote.data_validade);
        const dataFormatada = dataValidade.toLocaleDateString('pt-BR');
        
        // Verifica se está vencido para aplicar classe CSS
        const dataAtual = new Date();
        const estaVencido = dataValidade < dataAtual;
        
        // Verifica se está próximo a vencer (3 meses)
        const tresMesesDepois = new Date();
        tresMesesDepois.setMonth(tresMesesDepois.getMonth() + 3);
        const proximoVencer = dataValidade >= dataAtual && dataValidade <= tresMesesDepois;
        
        // Cria a nova linha da tabela com classes CSS condicionais
        const row = document.createElement('tr');
        if (estaVencido) {
            row.classList.add('vencido');
        } else if (proximoVencer) {
            row.classList.add('proximo-vencer');
        }
        
        row.innerHTML = `
            <td>${medicamento ? medicamento.principio_ativo : 'Desconhecido'}</td>
            <td>${lote.num_lote}</td>
            <td>${lote.quantidade}</td>
            <td>
                <button class="btn-visualizar" data-lote-id="${lote.id}">
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
            const loteId = parseInt(this.getAttribute('data-lote-id'));
            abrirModalVisualizarMedicamento(loteId);
        });
    });
}

// Função para buscar medicamentos
function buscarMedicamentos(termo) {
    // Se o termo estiver vazio, mostra todos os medicamentos considerando os filtros ativos
    if (!termo.trim()) {
        atualizarTabelaComFiltros();
        return;
    }
    
    // Filtra os lotes que correspondem ao termo de busca considerando também os filtros ativos
    const lotesFiltrados = lotes.filter(lote => {
        const medicamento = medicamentos.find(med => med.id === lote.id_remedio);
        if (!medicamento) return false;
        
        // Busca por princípio ativo ou número do lote
        const correspondeTermo = medicamento.principio_ativo.toLowerCase().includes(termo.toLowerCase()) ||
                                lote.num_lote.toLowerCase().includes(termo.toLowerCase());
        
        if (!correspondeTermo) return false;
        
        // Agora aplica os filtros adicionais se estiverem ativos
        
        // Filtro por medicamento
        if (filtrosAtivos.medicamento && parseInt(filtrosAtivos.medicamento) !== lote.id_remedio) {
            return false;
        }
        
        // Filtro por fabricante
        if (filtrosAtivos.fabricante && filtrosAtivos.fabricante !== lote.fabricante) {
            return false;
        }
        
        // Filtro por quantidade mínima
        if (filtrosAtivos.quantidadeMin && lote.quantidade < parseInt(filtrosAtivos.quantidadeMin)) {
            return false;
        }
        
        // Filtro por quantidade máxima
        if (filtrosAtivos.quantidadeMax && lote.quantidade > parseInt(filtrosAtivos.quantidadeMax)) {
            return false;
        }
        
        // Filtro por validade
        const dataAtual = new Date();
        const dataValidade = new Date(lote.data_validade);
        
        // Se não mostrar vencidos e o lote estiver vencido, não mostrar
        if (!filtrosAtivos.mostrarVencidos && dataValidade < dataAtual) {
            return false;
        }
        
        // Se mostrar próximos a vencer (3 meses)
        if (filtrosAtivos.proximosVencer) {
            const tresMesesDepois = new Date();
            tresMesesDepois.setMonth(tresMesesDepois.getMonth() + 3);
            
            // Se não estiver dentro de 3 meses para vencer, não mostrar
            if (!(dataValidade >= dataAtual && dataValidade <= tresMesesDepois)) {
                return false;
            }
        }
        
        return true;
    });
    
    // Atualiza a tabela com os resultados
    atualizarTabelaEstoque(lotesFiltrados);
}