// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MENU MOBILE ====================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Alterna ícone do menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================== ACTIVE MENU LINK ====================
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // ==================== SCROLL REVEAL ANIMATION ====================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verifica elementos na carga inicial
    checkFade();
    
    // Verifica durante o scroll
    window.addEventListener('scroll', checkFade);
    
    // ==================== FORMULÁRIO DE CONTATO ====================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simula envio (aqui você pode integrar com um backend real)
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                showFormMessage('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensagem';
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFormMessage(text, type) {
        if (!formMessage) {
            // Cria elemento se não existir
            const newFormMessage = document.createElement('div');
            newFormMessage.id = 'formMessage';
            newFormMessage.className = `form-message ${type}`;
            newFormMessage.textContent = text;
            contactForm.appendChild(newFormMessage);
        } else {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
        }
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            const msg = document.getElementById('formMessage');
            if (msg) {
                msg.style.display = 'none';
            }
        }, 5000);
    }
    
    // ==================== ANO ATUAL NO FOOTER ====================
    const footerYear = document.querySelector('footer p:first-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} GeoSabbagh – Consultoria em Geoprocessamento`;
    }
    
    // ==================== SCROLL SUAVE PARA LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==================== ESTATÍSTICAS DE CARREGAMENTO ====================
    console.log('✅ GeoSabbagh site carregado com sucesso!');
    console.log(`📱 Largura da tela: ${window.innerWidth}px`);
    console.log(`🕒 Horário de carregamento: ${new Date().toLocaleString('pt-BR')}`);
});
