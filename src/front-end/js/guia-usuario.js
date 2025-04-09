// Script para o guia interativo do usuário

// Variável para armazenar os passos do guia
const guiaPassos = [
    {
        elemento: '.sidebar',
        posicao: 'right',
        titulo: 'Menu Principal',
        conteudo: 'Esta é a barra lateral de navegação. Clique no ícone do menu para expandir ou retrair a barra.'
    },
    {
        elemento: '.menu-item[data-page="home"]',
        posicao: 'right',
        titulo: 'Home',
        conteudo: 'Ao clicar no ícone Home, você tem acesso ao andamento das prescrições e pedidos.'
    },
    {
        elemento: '.menu-item[data-page="estoque"]',
        posicao: 'right',
        titulo: 'Estoque',
        conteudo: 'Ao clicar na aba Estoque, você acessa o estoque de medicamentos e lotes disponíveis.'
    },
    {
        elemento: '.menu-item[data-page="historico"]',
        posicao: 'right',
        titulo: 'Histórico',
        conteudo: 'Ao clicar em Histórico, você acessa o histórico completo de prescrições.'
    },
    {
        elemento: '.menu-item[data-page="historico-log"]',
        posicao: 'right',
        titulo: 'Logs',
        conteudo: 'Ao clicar em Logs, você acessa o histórico de todas as operações realizadas no sistema.'
    },
    {
        elemento: '.prescricoes-section',
        posicao: 'bottom',
        titulo: 'Prescrições',
        conteudo: 'Nesta seção você pode visualizar e avaliar as prescrições pendentes ou já avaliadas.'
    },
    {
        elemento: '#filtro-aguardando',
        posicao: 'bottom',
        titulo: 'Filtro de Prescrições',
        conteudo: 'Clique aqui para visualizar as prescrições que estão aguardando avaliação.'
    },
    {
        elemento: '#filtro-avaliadas',
        posicao: 'bottom',
        titulo: 'Prescrições Avaliadas',
        conteudo: 'Clique aqui para visualizar as prescrições que já foram avaliadas.'
    },
    {
        elemento: '.pedidos-section',
        posicao: 'top',
        titulo: 'Pedidos',
        conteudo: 'Nesta seção você pode acompanhar o status de todos os pedidos de medicamentos.'
    },
    {
        elemento: '.notifications-panel',
        posicao: 'left',
        titulo: 'Notificações',
        conteudo: 'Aqui você pode visualizar as notificações mais recentes do sistema.'
    }
];

// Variáveis globais
let passoAtual = 0;
let guiaAtivo = false;
let tooltipElement = null;
let overlayElement = null;

// Função para inicializar o guia do usuário
function inicializarGuiaUsuario() {
    // Verificar se é o primeiro acesso
    const primeiroAcesso = localStorage.getItem('primeiroAcesso') !== 'false';
    
    // Criar botão de ajuda
    criarBotaoAjuda();
    
    // Se for o primeiro acesso, iniciar o guia automaticamente
    if (primeiroAcesso) {
        iniciarGuia();
        // Marcar que não é mais o primeiro acesso
        localStorage.setItem('primeiroAcesso', 'false');
    }
}

// Função para criar o botão de ajuda fixo
function criarBotaoAjuda() {
    const btnAjuda = document.createElement('div');
    btnAjuda.className = 'help-button';
    btnAjuda.innerHTML = '<i class="fas fa-question"></i>';
    btnAjuda.addEventListener('click', iniciarGuia);
    document.body.appendChild(btnAjuda);
}

// Função para iniciar o guia
function iniciarGuia() {
    if (guiaAtivo) return;
    
    guiaAtivo = true;
    passoAtual = 0;
    
    // Criar overlay
    overlayElement = document.createElement('div');
    overlayElement.className = 'guia-overlay';
    document.body.appendChild(overlayElement);
    overlayElement.style.display = 'block';
    
    // Mostrar o primeiro passo
    mostrarPasso(passoAtual);
}

// Função para mostrar um passo específico do guia
function mostrarPasso(indice) {
    if (indice >= guiaPassos.length) {
        encerrarGuia();
        return;
    }
    
    const passo = guiaPassos[indice];
    const elemento = document.querySelector(passo.elemento);
    
    if (!elemento) {
        // Se o elemento não existir, pular para o próximo passo
        passoAtual++;
        mostrarPasso(passoAtual);
        return;
    }
    
    // Destacar o elemento
    destacarElemento(elemento);
    
    // Criar tooltip
    criarTooltip(passo, elemento);
}

// Função para destacar um elemento
function destacarElemento(elemento) {
    // Remover destaque anterior, se houver
    const elementoDestacado = document.querySelector('.guia-highlight');
    if (elementoDestacado) {
        elementoDestacado.classList.remove('guia-highlight');
    }
    
    // Adicionar destaque ao elemento atual
    elemento.classList.add('guia-highlight');
}

// Função para criar o tooltip
function criarTooltip(passo, elemento) {
    // Remover tooltip anterior, se houver
    if (tooltipElement) {
        tooltipElement.remove();
    }
    
    // Criar novo tooltip
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'guia-tooltip ' + passo.posicao;
    
    tooltipElement.innerHTML = `
        <div class="guia-tooltip-title">${passo.titulo}</div>
        <div class="guia-tooltip-content">${passo.conteudo}</div>
        <div class="guia-tooltip-buttons">
            <button class="guia-btn guia-btn-secondary" id="btn-pular">Pular tutorial</button>
            <button class="guia-btn guia-btn-primary" id="btn-proximo">Próximo</button>
        </div>
    `;
    
    document.body.appendChild(tooltipElement);
    
    // Posicionar o tooltip em relação ao elemento
    posicionarTooltip(tooltipElement, elemento, passo.posicao);
    
    // Adicionar event listeners aos botões
    document.getElementById('btn-proximo').addEventListener('click', proximoPasso);
    document.getElementById('btn-pular').addEventListener('click', encerrarGuia);
}

// Função para posicionar o tooltip em relação ao elemento
function posicionarTooltip(tooltip, elemento, posicao) {
    const rect = elemento.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top, left;
    
    switch (posicao) {
        case 'top':
            top = rect.top - tooltipRect.height - 15;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            break;
        case 'bottom':
            top = rect.bottom + 15;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            break;
        case 'left':
            top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            left = rect.left - tooltipRect.width - 15;
            break;
        case 'right':
            top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            left = rect.right + 15;
            break;
    }
    
    // Ajustar para garantir que o tooltip não saia da tela
    if (top < 0) top = 10;
    if (left < 0) left = 10;
    if (top + tooltipRect.height > window.innerHeight) {
        top = window.innerHeight - tooltipRect.height - 10;
    }
    if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

// Função para avançar para o próximo passo
function proximoPasso() {
    passoAtual++;
    mostrarPasso(passoAtual);
}

// Função para encerrar o guia
function encerrarGuia() {
    guiaAtivo = false;
    
    // Remover destaque
    const elementoDestacado = document.querySelector('.guia-highlight');
    if (elementoDestacado) {
        elementoDestacado.classList.remove('guia-highlight');
    }
    
    // Remover tooltip
    if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
    }
    
    // Remover overlay
    if (overlayElement) {
        overlayElement.style.display = 'none';
        overlayElement.remove();
        overlayElement = null;
    }
}

// Inicializar o guia quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Dar um tempo para garantir que todos os elementos estejam carregados
    setTimeout(inicializarGuiaUsuario, 1000);
});