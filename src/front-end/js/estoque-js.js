async function atualiza_remedios() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch(
      "https://two025-1a-t12-ec05-g03.onrender.com/remedios/listar",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar medicamentos");
    }

    const data = await response.json();
    console.log("Medicamentos disponiveis:", data);

    // Atribui diretamente como array
    Object.assign(medicamentos, data); // Armazena os dados na variável

    // Chama a função para carregar selects após atualizar
    carregarMedicamentosSelect();

    return data;
  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
    throw error;
  }
}

const medicamentos = [];

async function atualiza_lotes() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await fetch(
      "https://two025-1a-t12-ec05-g03.onrender.com/lotes/listar",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar lotes");
    }

    const data = await response.json();
    console.log("Lotes de medicamentos disponiveis:", data);

    // Atribui diretamente como array
    Object.assign(lotes, data); // Armazena os dados na variável

    // Atualiza a tabela e filtros após carregar os lotes
    atualizarTabelaComFiltros();
    carregarOpcoesParaFiltros();

    return data;
  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
    throw error;
  }
}

async function inicializarPagina() {
  try {
    await Promise.all([atualiza_remedios(), atualiza_lotes()]);

    carregarTabelaEstoque();
    carregarMedicamentosSelect();
    carregarOpcoesParaFiltros();
    setupEventListeners();
  } catch (error) {
    console.error("Erro ao inicializar página:", error);
    alert("Não foi possível carregar os dados");
  }
}

document.addEventListener("DOMContentLoaded", inicializarPagina);

// Array de lotes (simula a tabela 'lote')
let lotes = [];

// Variáveis para armazenar os filtros ativos
let filtrosAtivos = {
  medicamento: "",
  fabricante: "",
  quantidadeMin: "",
  quantidadeMax: "",
  mostrarVencidos: false,
  proximosVencer: false,
};

// Carrega a tabela de estoque com os dados mockados
function carregarTabelaEstoque() {
  atualiza_lotes();
}

// Carrega os medicamentos nos selects dos formulários
function carregarMedicamentosSelect() {
  const selectMedicamentoLote = document.getElementById("medicamentoLote");
  const selectMedicamentoRetirar =
    document.getElementById("medicamentoRetirar");

  // Limpa os selects
  selectMedicamentoLote.innerHTML = "";
  selectMedicamentoRetirar.innerHTML = "";

  // Opção padrão
  selectMedicamentoLote.innerHTML =
    '<option value="">Selecione um medicamento</option>';
  selectMedicamentoRetirar.innerHTML =
    '<option value="">Selecione um medicamento</option>';

  // Adiciona cada medicamento aos selects
  medicamentos.forEach((med) => {
    const optionLote = document.createElement("option");
    optionLote.value = med.id;
    optionLote.textContent = med.principio_ativo;
    selectMedicamentoLote.appendChild(optionLote);

    const optionRetirar = document.createElement("option");
    optionRetirar.value = med.id;
    optionRetirar.textContent = med.principio_ativo;
    selectMedicamentoRetirar.appendChild(optionRetirar);
  });

  // Adiciona listener para quando o medicamento for selecionado no form de retirada
  selectMedicamentoRetirar.addEventListener("change", carregarLotesSelect);
}

// Carrega os lotes disponíveis para o medicamento selecionado
function carregarLotesSelect() {
  const medicamentoId = parseInt(
    document.getElementById("medicamentoRetirar").value
  );
  const loteSelect = document.getElementById("loteRetirar");

  // Limpa o select
  loteSelect.innerHTML = "";
  loteSelect.innerHTML = '<option value="">Selecione um lote</option>';

  // Se nenhum medicamento foi selecionado, retorna
  if (!medicamentoId) return;

  // Filtra os lotes pelo medicamento selecionado
  const lotesFiltrados = lotes.filter(
    (lote) => lote.id_remedio === medicamentoId
  );

  // Adiciona cada lote ao select
  lotesFiltrados.forEach((lote) => {
    const option = document.createElement("option");
    option.value = lote.id;
    option.textContent = `${lote.num_lote} - Qtd: ${lote.quantidade}`;
    loteSelect.appendChild(option);
  });
}

// Função para carregar opções para filtros
function carregarOpcoesParaFiltros() {
  const filtroMedicamento = document.getElementById("filtroMedicamento");
  const filtroFabricante = document.getElementById("filtroFabricante");

  // Limpando as opções anteriores
  while (filtroMedicamento.options.length > 1) {
    filtroMedicamento.remove(1);
  }

  while (filtroFabricante.options.length > 1) {
    filtroFabricante.remove(1);
  }

  // Adicionando medicamentos ao filtro
  medicamentos.forEach((med) => {
    const option = document.createElement("option");
    option.value = med.id;
    option.textContent = med.principio_ativo;
    filtroMedicamento.appendChild(option);
  });

  // Obtendo fabricantes únicos
  const fabricantesUnicos = [...new Set(lotes.map((lote) => lote.fabricante))];

  // Adicionando fabricantes ao filtro
  fabricantesUnicos.forEach((fabricante) => {
    const option = document.createElement("option");
    option.value = fabricante;
    option.textContent = fabricante;
    filtroFabricante.appendChild(option);
  });
}

// Configura todos os event listeners necessários
function setupEventListeners() {
  // Botões para abrir modais
  document.getElementById("btnCadastrarLote").addEventListener("click", () => {
    document.getElementById("modalCadastrarLote").style.display = "block";
  });

  document
    .getElementById("btnCadastrarMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalCadastrarMedicamento").style.display =
        "block";
    });

  document
    .getElementById("btnRetirarMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalRetirarMedicamento").style.display =
        "block";
    });

  document.getElementById("btnFiltros").addEventListener("click", () => {
    document.getElementById("modalFiltros").style.display = "block";
  });

  // Botões para fechar modais
  document
    .getElementById("closeCadastrarLote")
    .addEventListener("click", () => {
      document.getElementById("modalCadastrarLote").style.display = "none";
    });

  document
    .getElementById("closeCadastrarMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalCadastrarMedicamento").style.display =
        "none";
    });

  document
    .getElementById("closeRetirarMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalRetirarMedicamento").style.display = "none";
    });

  document
    .getElementById("closeVisualizarMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalVisualizarMedicamento").style.display =
        "none";
    });

  document.getElementById("closeFiltros").addEventListener("click", () => {
    document.getElementById("modalFiltros").style.display = "none";
  });

  // Botões cancelar
  document
    .getElementById("cancelarCadastroLote")
    .addEventListener("click", () => {
      document.getElementById("modalCadastrarLote").style.display = "none";
    });

  document
    .getElementById("cancelarCadastroMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalCadastrarMedicamento").style.display =
        "none";
    });

  document
    .getElementById("cancelarRetiradaMedicamento")
    .addEventListener("click", () => {
      document.getElementById("modalRetirarMedicamento").style.display = "none";
    });

  // Botão limpar filtros
  document
    .getElementById("limparFiltros")
    .addEventListener("click", limparFiltros);

  // Formulários
  document
    .getElementById("formCadastrarLote")
    .addEventListener("submit", cadastrarLote);
  document
    .getElementById("formCadastrarMedicamento")
    .addEventListener("submit", cadastrarMedicamento);
  document
    .getElementById("formRetirarMedicamento")
    .addEventListener("submit", retirarMedicamento);
  document
    .getElementById("formFiltros")
    .addEventListener("submit", aplicarFiltros);

  // Campo de busca
  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("input", function () {
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
    document.getElementById('viewQrcode').textContent = lote.bin_qrcode;
    
    // Exibe o modal
    document.getElementById('modalVisualizarMedicamento').style.display = 'block';
}

// Função para cadastrar um novo lote
function cadastrarLote(event) {
  event.preventDefault();

  // Obtém os valores do formulário
  const idRemedio = parseInt(document.getElementById("medicamentoLote").value);
  const numLote = document.getElementById("numLote").value;
  const dataValidade = document.getElementById("dataValidade").value;
  const fabricante = document.getElementById("fabricante").value;
  const quantidade = parseInt(document.getElementById("quantidadeLote").value);
  const bin_qrcode = document.getElementById("bin_qrcode").value;

  // Validação básica
  if (!idRemedio || !numLote || !dataValidade || !fabricante || !quantidade) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  // Cria o novo lote
  const novoLote = {
    id: nextLoteId++,
    num_lote: numLote,
    data_validade: dataValidade,
    fabricante: fabricante,
    id_remedio: idRemedio,
    quantidade: quantidade,
    bin_qrcode: bin_qrcode,
  };

  // Adiciona o lote ao array
  lotes.push(novoLote);

  // Atualiza a tabela mantendo os filtros ativos
  atualizarTabelaComFiltros();

  // Atualiza os filtros com o novo fabricante, se necessário
  carregarOpcoesParaFiltros();

  // Fecha o modal
  document.getElementById("modalCadastrarLote").style.display = "none";

  // Limpa o formulário
  document.getElementById("formCadastrarLote").reset();

  // Previne comportamento padrão do form
  event.preventDefault();

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }

  fetch("https://two025-1a-t12-ec05-g03.onrender.com/lotes/cadastrar", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      num_lote: numLote,
      data_validade: dataValidade,
      fabricante: fabricante,
      id_remedio: idRemedio,
      quantidade: quantidade,
      bin_qrcode: bin_qrcode,
    }),
  })
    .then((response) => {
      alert("Medicamento cadastrado com sucesso");
      // Redireciona para a página de estoque
      setTimeout(function () {
        window.location.href = "/estoque";
      }, 500);
      return response.json(); // Continuar com o processamento normal da resposta se não for 422
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert(error);
    });
}

// Função para cadastrar um novo medicamento
function cadastrarMedicamento(event) {
  // Previne comportamento padrão do form
  event.preventDefault();

  // Captura valores dos campos
  const principio_ativo = document.getElementById("principioAtivo").value;

  // Validação básica
  if (!principio_ativo) {
    alert(
      "Por favor, antes de prosseguirmos, precisamos que você forneça o principio ativo do remédio!"
    );
    return;
  }
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }

  fetch("https://two025-1a-t12-ec05-g03.onrender.com/remedios/cadastrar", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ principio_ativo }),
  })
    .then((response) => {
      alert("Medicamento cadastrado com sucesso");
      // Redireciona para a página de estoque
      setTimeout(function () {
        window.location.href = "/estoque";
      }, 500);
      return response.json(); // Continuar com o processamento normal da resposta se não for 422
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert(error);
    });

  // Limpa o formulário após "cadastro"
  formCadastrarMedicamento.reset();
}

// Função para retirar medicamento do estoque
function retirarMedicamento(event) {
  // Previne comportamento padrão do form
  event.preventDefault();

  // Captura valores dos campos
  const loteId = parseInt(document.getElementById("loteRetirar").value);

  // Validação básica
  if (!loteId) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  // Encontra o lote
  const lote = lotes.find((l) => l.id === loteId);
  if (!lote) {
    alert("Lote não encontrado");
    return;
  }

  // Atualiza a tabela mantendo os filtros ativos
  atualizarTabelaComFiltros();

  // Fecha o modal
  document.getElementById("modalRetirarMedicamento").style.display = "none";

  // Limpa o formulário
  document.getElementById("formRetirarMedicamento").reset();

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token de autenticação não encontrado");
  }
  console.log({ loteId });

  fetch("https://two025-1a-t12-ec05-g03.onrender.com/lotes/deletar/" + loteId, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      alert("Medicamento excluído com sucesso");
      return response.json(); // Continuar com o processamento normal da resposta se não for 422
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert(error);
    });

  // Limpa o formulário após "cadastro"
  formCadastrarMedicamento.reset();
}

// Função para aplicar filtros
function aplicarFiltros(event) {
  event.preventDefault();

  // Obtém os valores dos filtros
  filtrosAtivos.medicamento =
    document.getElementById("filtroMedicamento").value;
  filtrosAtivos.fabricante = document.getElementById("filtroFabricante").value;
  filtrosAtivos.quantidadeMin = document.getElementById("quantidadeMin").value;
  filtrosAtivos.quantidadeMax = document.getElementById("quantidadeMax").value;
  filtrosAtivos.mostrarVencidos =
    document.getElementById("filtroVencidos").checked;
  filtrosAtivos.proximosVencer = document.getElementById(
    "filtroProximosVencer"
  ).checked;

  // Fecha o modal
  document.getElementById("modalFiltros").style.display = "none";

  // Aplica os filtros na tabela
  atualizarTabelaComFiltros();

  // Atualiza a aparência do botão de filtros para indicar que há filtros ativos
  atualizarEstadoBotaoFiltros();
}

// Função para limpar todos os filtros
function limparFiltros() {
  // Resetar formulário
  document.getElementById("formFiltros").reset();

  // Limpar objeto de filtros ativos
  filtrosAtivos = {
    medicamento: "",
    fabricante: "",
    quantidadeMin: "",
    quantidadeMax: "",
    mostrarVencidos: false,
    proximosVencer: false,
  };

  // Atualizar a tabela mostrando todos os lotes
  atualiza_lotes();

  // Atualiza a aparência do botão de filtros
  atualizarEstadoBotaoFiltros();
}

// Função para atualizar a aparência do botão de filtros
function atualizarEstadoBotaoFiltros() {
  const btnFiltros = document.getElementById("btnFiltros");

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
    btnFiltros.classList.add("filtro-ativo");
    btnFiltros.textContent = "Filtros Ativos";
  } else {
    btnFiltros.classList.remove("filtro-ativo");
    btnFiltros.textContent = "Filtros";
  }
}

// Função para atualizar a tabela com os filtros aplicados
function atualizarTabelaComFiltros() {
  // Filtra os lotes de acordo com os filtros selecionados
  let lotesFiltrados = lotes.filter((lote) => {
    // Filtro por medicamento
    if (
      filtrosAtivos.medicamento &&
      parseInt(filtrosAtivos.medicamento) !== lote.id_remedio
    ) {
      return false;
    }

    // Filtro por fabricante
    if (
      filtrosAtivos.fabricante &&
      filtrosAtivos.fabricante !== lote.fabricante
    ) {
      return false;
    }

    // Filtro por quantidade mínima
    if (
      filtrosAtivos.quantidadeMin &&
      lote.quantidade < parseInt(filtrosAtivos.quantidadeMin)
    ) {
      return false;
    }

    // Filtro por quantidade máxima
    if (
      filtrosAtivos.quantidadeMax &&
      lote.quantidade > parseInt(filtrosAtivos.quantidadeMax)
    ) {
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
  const tableBody = document.getElementById("estoqueTableBody");
  tableBody.innerHTML = ""; // Limpa a tabela

  // Se não houver lotes para mostrar
  if (lotesList.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td colspan="4" style="text-align: center;">Nenhum item encontrado</td>
        `;
    tableBody.appendChild(row);
    return;
  }

  // Para cada lote, adiciona uma linha na tabela
  lotesList.forEach((lote) => {
    // Encontra o medicamento correspondente ao lote
    const medicamento = medicamentos.find((med) => med.id === lote.id_remedio);

    // Formata a data de validade
    const dataValidade = new Date(lote.data_validade);
    const dataFormatada = dataValidade.toLocaleDateString("pt-BR");

    // Verifica se está vencido para aplicar classe CSS
    const dataAtual = new Date();
    const estaVencido = dataValidade < dataAtual;

    // Verifica se está próximo a vencer (3 meses)
    const tresMesesDepois = new Date();
    tresMesesDepois.setMonth(tresMesesDepois.getMonth() + 3);
    const proximoVencer =
      dataValidade >= dataAtual && dataValidade <= tresMesesDepois;

    // Cria a nova linha da tabela com classes CSS condicionais
    const row = document.createElement("tr");
    if (estaVencido) {
      row.classList.add("vencido");
    } else if (proximoVencer) {
      row.classList.add("proximo-vencer");
    }

    row.innerHTML = `
            <td>${
              medicamento ? medicamento.principio_ativo : "Desconhecido"
            }</td>
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
  const visualizarButtons = document.querySelectorAll(".btn-visualizar");
  visualizarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const loteId = parseInt(this.getAttribute("data-lote-id"));
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
  const lotesFiltrados = lotes.filter((lote) => {
    const medicamento = medicamentos.find((med) => med.id === lote.id_remedio);
    if (!medicamento) return false;

    // Busca por princípio ativo ou número do lote
    const correspondeTermo =
      medicamento.principio_ativo.toLowerCase().includes(termo.toLowerCase()) ||
      lote.num_lote.toLowerCase().includes(termo.toLowerCase());

    if (!correspondeTermo) return false;

    // Agora aplica os filtros adicionais se estiverem ativos

    // Filtro por medicamento
    if (
      filtrosAtivos.medicamento &&
      parseInt(filtrosAtivos.medicamento) !== lote.id_remedio
    ) {
      return false;
    }

    // Filtro por fabricante
    if (
      filtrosAtivos.fabricante &&
      filtrosAtivos.fabricante !== lote.fabricante
    ) {
      return false;
    }

    // Filtro por quantidade mínima
    if (
      filtrosAtivos.quantidadeMin &&
      lote.quantidade < parseInt(filtrosAtivos.quantidadeMin)
    ) {
      return false;
    }

    // Filtro por quantidade máxima
    if (
      filtrosAtivos.quantidadeMax &&
      lote.quantidade > parseInt(filtrosAtivos.quantidadeMax)
    ) {
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
