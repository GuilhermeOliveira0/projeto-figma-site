// ========================================
// NAVIGATION COMPONENT - TECH CURSOS
// JavaScript para Navbar e funcionalidades globais
// ========================================

class NavigationManager {
    constructor() {
        this.navbar = null;
        this.mobileToggle = null;
        this.mobileMenu = null;
        this.scrollToTopBtn = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.navbar-toggle');
        this.mobileMenu = document.querySelector('.navbar-menu');
        this.scrollToTopBtn = document.querySelector('.scroll-to-top');

        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupScrollToTop();
        this.setupActiveLinks();
        this.setupSmoothScroll();
    }

    // Navbar scroll effects
    setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (this.navbar) {
                if (currentScroll > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }
            
            lastScroll = currentScroll;
        });
    }

    // Mobile menu toggle
    setupMobileMenu() {
        if (this.mobileToggle && this.mobileMenu) {
            this.mobileToggle.addEventListener('click', () => {
                this.mobileToggle.classList.toggle('active');
                this.mobileMenu.classList.toggle('active');
                document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on a link
            const menuLinks = this.mobileMenu.querySelectorAll('.navbar-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileToggle.classList.remove('active');
                    this.mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.mobileMenu.classList.contains('active') &&
                    !this.mobileMenu.contains(e.target) &&
                    !this.mobileToggle.contains(e.target)) {
                    this.mobileToggle.classList.remove('active');
                    this.mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Scroll to top button
    setupScrollToTop() {
        if (this.scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.scrollToTopBtn.classList.add('visible');
                } else {
                    this.scrollToTopBtn.classList.remove('visible');
                }
            });

            this.scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Set active link based on current page
    setupActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'home1.html') ||
                (currentPage === 'home1.html' && href === 'home1.html')) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Initialize navigation when script loads
const navigationManager = new NavigationManager();

// Helper function to create navbar HTML
function createNavbar() {
    return `
        <nav class="navbar">
            <div class="navbar-container">
                <a href="home1-premium.html" class="navbar-logo">
                    <img src="images/logo.png" alt="Tech Cursos" class="navbar-logo-img">
                    <span class="navbar-logo-text">Tech Cursos</span>
                </a>
                
                <ul class="navbar-menu">
                    <li class="navbar-item">
                        <a href="home1-premium.html" class="navbar-link">Início</a>
                    </li>
                    <li class="navbar-item">
                        <a href="cursosLista.html" class="navbar-link">Cursos</a>
                    </li>
                    <li class="navbar-item">
                        <a href="novidades.html" class="navbar-link">Novidades</a>
                    </li>
                    <li class="navbar-item">
                        <a href="home2.html" class="navbar-link">Dashboard</a>
                    </li>
                    <li class="navbar-item">
                        <a href="contato.html" class="navbar-link">Contato</a>
                    </li>
                </ul>
                
                <div class="navbar-actions">
                    <a href="logar.html" class="navbar-btn navbar-btn-secondary">Entrar</a>
                    <a href="cadastar.html" class="navbar-btn navbar-btn-primary">Cadastrar</a>
                </div>
                
                <button class="navbar-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;
}

// Helper function to create footer HTML
function createFooter() {
    return `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <img src="images/logo.png" alt="Tech Cursos" class="footer-logo-img">
                            <span class="footer-logo-text">Tech Cursos</span>
                        </div>
                        <p class="footer-description">
                            Transformando carreiras através da educação em tecnologia. 
                            Aprenda com os melhores cursos online e conquiste seu lugar no mercado tech.
                        </p>
                        <div class="footer-social">
                            <a href="#" class="footer-social-link" aria-label="Facebook">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                </svg>
                            </a>
                            <a href="#" class="footer-social-link" aria-label="Instagram">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                            <a href="#" class="footer-social-link" aria-label="LinkedIn">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                    <circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                            <a href="#" class="footer-social-link" aria-label="YouTube">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h3 class="footer-section-title">Cursos</h3>
                        <ul class="footer-links">
                            <li><a href="cursosLista.html" class="footer-link">Todos os Cursos</a></li>
                            <li><a href="cursosLista.html?category=programming" class="footer-link">Programação</a></li>
                            <li><a href="cursosLista.html?category=data" class="footer-link">Data Science</a></li>
                            <li><a href="cursosLista.html?category=design" class="footer-link">Design</a></li>
                            <li><a href="cursosLista.html?category=cloud" class="footer-link">Cloud & DevOps</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h3 class="footer-section-title">Empresa</h3>
                        <ul class="footer-links">
                            <li><a href="home2.html" class="footer-link">Sobre Nós</a></li>
                            <li><a href="novidades.html" class="footer-link">Blog</a></li>
                            <li><a href="contato.html" class="footer-link">Contato</a></li>
                            <li><a href="#" class="footer-link">Trabalhe Conosco</a></li>
                            <li><a href="#" class="footer-link">Parceiros</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h3 class="footer-section-title">Suporte</h3>
                        <ul class="footer-links">
                            <li><a href="#" class="footer-link">Central de Ajuda</a></li>
                            <li><a href="#" class="footer-link">FAQ</a></li>
                            <li><a href="contato.html" class="footer-link">Fale Conosco</a></li>
                            <li><a href="#" class="footer-link">Política de Reembolso</a></li>
                            <li><a href="#" class="footer-link">Status do Sistema</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © 2025 Tech Cursos. Todos os direitos reservados.
                    </p>
                    <div class="footer-legal">
                        <a href="#" class="footer-legal-link">Termos de Uso</a>
                        <a href="#" class="footer-legal-link">Política de Privacidade</a>
                        <a href="#" class="footer-legal-link">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
        
        <button class="scroll-to-top" aria-label="Voltar ao topo">
            ↑
        </button>
    `;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNavbar, createFooter, NavigationManager };
}
