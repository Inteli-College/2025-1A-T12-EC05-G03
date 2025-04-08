// Arquivo para controle do menu sanduíche (sidebar)
// Será compartilhado por todas as páginas para manter a consistência

// Função para alternar o estado do menu
function toggleMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    if (!sidebar) return;
    
    // Alterna a classe 'expanded' na sidebar
    sidebar.classList.toggle('expanded');
    
    // Alterna a classe no body para ajustar o conteúdo principal
    body.classList.toggle('menu-expanded');
    
    // Salva o estado do menu no localStorage
    localStorage.setItem('menuExpandido', sidebar.classList.contains('expanded'));
    
    console.log("Estado do menu: " + (sidebar.classList.contains('expanded') ? "expandido" : "retraído"));
}

// Função para inicializar a barra lateral
function initSidebar() {
    console.log("Inicializando menu sanduíche");
    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    // Verifica se os elementos existem
    if (!menuToggle || !sidebar) {
        console.error('Elementos do menu não encontrados!');
        return;
    }
    
    // Verifica se o menu estava expandido (recupera do localStorage)
    const menuExpandido = localStorage.getItem('menuExpandido') === 'true';
    if (menuExpandido) {
        sidebar.classList.add('expanded');
        body.classList.add('menu-expanded');
    }
    
    // Remove qualquer evento existente para evitar duplicação
    menuToggle.removeEventListener('click', toggleMenu);
    
    // Adiciona evento de clique no botão hamburguer de forma mais direta
    menuToggle.addEventListener('click', toggleMenu);
    
    // Adiciona evento também ao ícone dentro do botão (para garantir)
    const iconElement = menuToggle.querySelector('i');
    if (iconElement) {
        iconElement.style.pointerEvents = 'none'; // Evita problemas de propagação
    }
    
    // Marca o item de menu ativo com base na URL atual
    setActiveMenuItem();
}

// Função para definir o item de menu ativo
function setActiveMenuItem() {
    // Obtém o caminho da URL atual
    const urlAtual = window.location.pathname;
    console.log("URL atual: " + urlAtual);
    
    // Remove a classe 'active' de todos os itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Determina qual página está ativa
    let paginaAtiva = '';
    
    // Verifica se estamos na página inicial
    if (urlAtual === '/' || urlAtual.endsWith('index.html')) {
        paginaAtiva = 'home';
    } 
    // Verifica outras páginas
    else if (urlAtual.includes('historico-prescricao')) {
        paginaAtiva = 'historico-prescricao';
    }
    else if (urlAtual.includes('historico-log')) {
        paginaAtiva = 'historico-log';
    }
    else if (urlAtual.includes('historico')) {
        paginaAtiva = 'historico';
    }
    else if (urlAtual.includes('estoque')) {
        paginaAtiva = 'estoque';
    }
    else {
        // Extrai o nome da página da URL (remove barras e extensão .html)
        const match = urlAtual.match(/\/([^\/]+)(?:\.html)?$/);
        if (match && match[1]) {
            paginaAtiva = match[1];
        }
    }
    
    console.log("Página ativa identificada: " + paginaAtiva);
    
    // Adiciona a classe 'active' ao item de menu correspondente
    if (paginaAtiva) {
        const activeItem = document.querySelector(`.menu-item[data-page="${paginaAtiva}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            console.log("Item de menu ativado: " + paginaAtiva);
        } else {
            console.log("Item de menu não encontrado para: " + paginaAtiva);
        }
    }
}

// Inicializar imediatamente
document.addEventListener('DOMContentLoaded', initSidebar);

// Garantir que o menu continua funcionando mesmo após a página carregar completamente
window.addEventListener('load', function() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        // Reforçar a adição do evento de clique
        menuToggle.removeEventListener('click', toggleMenu);
        menuToggle.addEventListener('click', toggleMenu);
        
        // Tornar visualmente mais clicável
        menuToggle.style.cursor = 'pointer';
    }
    
    // Verificar novamente o item ativo (caso a URL tenha mudado)
    setActiveMenuItem();
});