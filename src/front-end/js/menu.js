// Arquivo para controle do menu sanduíche (sidebar)
// Será compartilhado por todas as páginas para manter a consistência

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
    
    // Evento de clique para expandir/retrair a barra lateral
    menuToggle.addEventListener('click', function() {
        console.log("Clique no botão do menu detectado");
        
        // Alterna a classe 'expanded' na sidebar
        sidebar.classList.toggle('expanded');
        
        // Alterna a classe no body para ajustar o conteúdo principal
        body.classList.toggle('menu-expanded');
        
        // Salva o estado do menu no localStorage
        localStorage.setItem('menuExpandido', sidebar.classList.contains('expanded'));
        
        console.log("Estado do menu: " + (sidebar.classList.contains('expanded') ? "expandido" : "retraído"));
    });
    
    // Verifica qual página está ativa baseada na URL atual
    const urlAtual = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    console.log("URL atual: " + urlAtual);
    
    menuItems.forEach(item => {
        // Remove a classe 'active' de todos
        item.classList.remove('active');
        
        // Adiciona a classe 'active' no item correspondente à página atual
        const hrefItem = item.getAttribute('href');
        if (hrefItem) {
            // Extrai apenas o nome do arquivo (ex: de "/home-page.html" para "home-page.html")
            const nomeArquivo = hrefItem.split('/').pop();
            
            console.log("Verificando link: " + nomeArquivo);
            
            // Verifica se o arquivo da URL atual contém o nome do arquivo do link
            if (urlAtual.includes(nomeArquivo)) {
                item.classList.add('active');
                console.log("Item ativo: " + nomeArquivo);
            }
            
            // Caso especial para a página inicial (index.html ou /)
            if ((urlAtual === '/' || urlAtual.endsWith('index.html') || urlAtual.endsWith('/')) && 
                (hrefItem.includes('index.html') || hrefItem === './' || hrefItem === '/')) {
                item.classList.add('active');
                console.log("Item da página inicial ativo");
            }
        }
    });
}

// Executa a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado, inicializando sidebar");
    initSidebar();
});