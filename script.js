// script.js - GeoSabbagh

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CONTADOR DE VISITAS EXTERNO ==========
    function inicializarContador() {
        const contadorDiv = document.getElementById('contador-visitas');
        
        // Usando CountAPI (funciona sem backend)
        fetch('https://api.countapi.xyz/hit/geosabbagh/visitas')
            .then(response => response.json())
            .then(data => {
                if (data && data.value !== undefined) {
                    contadorDiv.innerHTML = `👁️ Visitantes: <strong>${data.value.toLocaleString('pt-BR')}</strong>`;
                }
            })
            .catch(() => {
                // Fallback para contador local caso a API falhe
                let visitas = localStorage.getItem('geosabbagh_visitas') || '0';
                visitas = parseInt(visitas) + 1;
                localStorage.setItem('geosabbagh_visitas', visitas);
                contadorDiv.innerHTML = `👁️ Visitantes (local): <strong>${visitas}</strong>`;
            });
    }
    
    // ========== MENU MOBILE ==========
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // ========== HEADER SCROLL ==========
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========== BACK TO TOP ==========
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
    
    // ========== ACTIVE MENU LINK ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    function updateActiveLink() {
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
    
    // ========== SCROLL REVEAL ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    checkFade();
    window.addEventListener('scroll', checkFade);
    
    // ========== FORMULÁRIO DE CONTATO ==========
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validação
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensagem('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Preparar dados
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', document.getElementById('phone').value.trim());
            formData.append('subject', subject);
            formData.append('message', message);
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            try {
                const response = await fetch('https://formspree.io/f/mvzayqaj', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    successModal.style.display = 'flex';
                    contactForm.reset();
                    if (formMessage) formMessage.style.display = 'none';
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            'event_category': 'contato',
                            'event_label': 'formulario'
                        });
                    }
                } else {
                    throw new Error('Erro ao enviar');
                }
            } catch (error) {
                console.error('Erro:', error);
                mostrarMensagem('Erro ao enviar. Use o email: contato.geosabbagh@gmail.com', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensagem';
            }
        });
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function mostrarMensagem(texto, tipo) {
        if (!formMessage) return;
        formMessage.textContent = texto;
        formMessage.className = `form-message ${tipo}`;
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (window.innerWidth <= 768 && mainNav) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // ========== ATUALIZAR ANO NO FOOTER ==========
    const footerYear = document.querySelector('footer p:first-child');
    if (footerYear) {
        footerYear.innerHTML = `© ${new Date().getFullYear()} GeoSabbagh – Consultoria em Geoprocessamento`;
    }
    
    // ========== INICIALIZAR CONTADOR ==========
    inicializarContador();
});

// ========== FECHAR MODAL ==========
function fecharModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) fecharModal();
});
