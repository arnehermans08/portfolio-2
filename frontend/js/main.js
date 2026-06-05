// ========== MOBILE MENU CLASS ==========
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector(".hamburger");
        this.navMenu = document.querySelector(".nav-menu");
        this.navLinks = document.querySelectorAll(".nav-link");

        if (this.hamburger) {
            this.initEvents();
        }
    }

    initEvents() {
        this.hamburger.addEventListener("click", () => this.toggleMenu());
        this.navLinks.forEach(link =>
            link.addEventListener("click", () => this.closeMenu())
        );
    }

    toggleMenu() {
        this.hamburger.classList.toggle("active");
        this.navMenu.classList.toggle("active");
    }

    closeMenu() {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
    }
}

// ========== SKILLS CLASS (data uit database) ==========
class Skills {
    constructor() {
        this.container = document.getElementById('skills-container');
        this.apiUrl = '/api/skills';
    }

    async loadSkills() {
        try {
            const response = await fetch(this.apiUrl);
            const skills = await response.json();
            this.renderSkills(skills);
            this.animateProgressBars();
        } catch (error) {
            console.error('Fout bij laden skills:', error);
            this.container.innerHTML = '<div class="loading"><p>❌ Fout bij laden skills</p></div>';
        }
    }

    renderSkills(skills) {
        if (!skills || skills.length === 0) {
            this.container.innerHTML = '<div class="loading"><p>Geen skills gevonden</p></div>';
            return;
        }

        this.container.innerHTML = '';
        skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.setAttribute('data-index', index);
            skillCard.innerHTML = `
                <div class="skill-header">
                    <div class="skill-icon">${skill.icon || '💻'}</div>
                    <h3 class="skill-name">${skill.naam}</h3>
                </div>
                <div class="skill-category">${skill.category || 'Algemeen'}</div>
                <div class="progress-bar">
                    <div class="progress-fill" data-percentage="${skill.level}"></div>
                </div>
                <div class="skill-percentage">${skill.level}%</div>
            `;
            this.container.appendChild(skillCard);
        });
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 200);
        });
    }
}

// ========== PROJECTS CLASS (data uit database) ==========
class Projects {
    constructor() {
        this.container = document.getElementById('projects-container');
        this.apiUrl = '/api/projects';
    }

    async loadProjects() {
        try {
            const response = await fetch(this.apiUrl);
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.error('Fout bij laden projecten:', error);
            this.container.innerHTML = '<div class="loading"><p>❌ Fout bij laden projecten</p></div>';
        }
    }

    renderProjects(projects) {
        if (!projects || projects.length === 0) {
            this.container.innerHTML = '<div class="loading"><p>Geen projecten gevonden</p></div>';
            return;
        }

        this.container.innerHTML = '';
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-index', index);
            
            // Placeholder afbeelding styling
            const imageHtml = project.afbeelding ? 
                `<img src="${project.afbeelding}" alt="${project.titel}" style="width:100%; height:100%; object-fit:cover;">` :
                `<div class="project-image-placeholder">🖼️</div>`;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    ${imageHtml}
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.titel}</h3>
                    <p class="project-description">${project.beschrijving}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">GitHub →</a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">Live Demo →</a>` : ''}
                    </div>
                </div>
            `;
            this.container.appendChild(projectCard);
        });
    }
}

// ========== CONTACT FORM CLASS (extra API) ==========
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.messageDiv = document.getElementById('form-message');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const naam = document.getElementById('naam').value;
        const email = document.getElementById('email').value;
        const bericht = document.getElementById('bericht').value;

        // Validatie
        if (!naam || !email || !bericht) {
            this.showMessage('Vul alle velden in!', 'error');
            return;
        }

        // Email validatie
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showMessage('Vul een geldig emailadres in!', 'error');
            return;
        }

        const submitBtn = this.form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verzenden...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ naam, email, bericht })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showMessage('Bericht succesvol verzonden! Ik neem snel contact op.', 'success');
                this.form.reset();
            } else {
                this.showMessage(data.message || 'Er is een fout opgetreden.', 'error');
            }
        } catch (error) {
            console.error('Fout:', error);
            this.showMessage('Kon bericht niet verzenden. Probeer later opnieuw.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Verstuur bericht';
        }
    }

    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        
        setTimeout(() => {
            this.messageDiv.textContent = '';
            this.messageDiv.className = 'form-message';
        }, 5000);
    }
}

// ========== SCROLL ANIMATIONS (fade in bij scrollen) ==========
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.skill-card, .project-card, .fade-in');
        this.init();
    }

    init() {
        this.checkVisibility();
        window.addEventListener('scroll', () => this.checkVisibility());
    }

    checkVisibility() {
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !element.classList.contains('visible')) {
                if (element.classList.contains('skill-card') || element.classList.contains('project-card')) {
                    element.classList.add('visible');
                } else {
                    element.style.opacity = '1';
                }
            }
        });
    }
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
}

// ========== NAVBAR SCROLL EFFECT ==========
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ========== FOOTER YEAR ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== INITIALISATIE ALLES ==========
window.addEventListener('DOMContentLoaded', async () => {
    // Mobile menu
    new MobileMenu();
    
    // Skills uit database laden
    const skills = new Skills();
    await skills.loadSkills();
    
    // Projecten uit database laden
    const projects = new Projects();
    await projects.loadProjects();
    
    // Contact form
    new ContactForm();
    
    // Scroll animaties
    new ScrollAnimations();
    
    // Active nav link
    new ActiveNavLink();
    
    // Navbar scroll effect
    new NavbarScroll();
});