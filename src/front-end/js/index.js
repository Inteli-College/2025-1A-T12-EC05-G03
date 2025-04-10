// Esperando o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Header effect
    initHeaderEffect();
    
    // Botão de volta ao topo
    initBackToTopButton();
    
    // Smooth scrolling para links internos
    initSmoothScrolling();
    
    // Animações de hover nos boxes
    initBoxHoverEffects();
    
    // Efeito de pulsar no botão principal
    initPulseEffect();
    
    // Efeito de ondulação (ripple) nos botões
    initRippleEffect();
});

// Header scroll effect
function initHeaderEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 30) {
            header.classList.add('header-blur');
        } else {
            header.classList.remove('header-blur');
        }
    });
}

// Inicializa o botão de voltar ao topo
function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializa o scroll suave para links internos
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Inicializa efeitos de hover para os boxes
function initBoxHoverEffects() {
    // Efeitos para os boxes de features
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            this.querySelector('.feature-icon').style.transform = 'scale(1.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.querySelector('.feature-icon').style.transform = '';
        });
    });
    
    // Efeitos para os boxes de comparação
    const comparisonBoxes = document.querySelectorAll('.comparison-box');
    
    comparisonBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Efeitos para os membros da equipe
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Inicializa o efeito de pulsar no botão principal
function initPulseEffect() {
    const mainButton = document.querySelector('.btn-primary');
    
    setInterval(() => {
        mainButton.classList.add('animate-pulse');
        setTimeout(() => {
            mainButton.classList.remove('animate-pulse');
        }, 1000);
    }, 3000);
}

// Inicializa o efeito de ondulação nos botões
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Função para adicionar imagens da equipe
function setTeamImages(imagesArray) {
    const teamPhotoContainers = document.querySelectorAll('.team-photo');
    
    teamPhotoContainers.forEach((container, index) => {
        if (imagesArray[index]) {
            // Remove o ícone padrão
            container.innerHTML = '';
            
            // Cria elemento de imagem
            const img = document.createElement('img');
            img.src = imagesArray[index];
            img.alt = 'Membro da equipe';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            container.appendChild(img);
        }
    });
}

// Função para adicionar imagem à seção Quem Somos
function setQuemSomosImage(imageUrl) {
    const quemSomosImage = document.querySelector('.quem-somos-image');
    if (quemSomosImage) {
        quemSomosImage.src = imageUrl;
    }
}

// Animação reveladora de números para os contadores
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos para a contagem
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Detectar quando elementos entram na viewport para animar
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const isInViewport = el => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    const handleScroll = () => {
        elements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animated');
            }
        });
    };
    
    // Inicializar no carregamento
    handleScroll();
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll);
}