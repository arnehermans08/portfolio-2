// ========== MOBILE MENU ==========
class MobileMenu {
    letructor() {
        this.hamburger = document.querySelector(".hamburger");
        this.navMenu = document.querySelector(".nav-menu");
        this.navLinks = document.querySelectorAll(".nav-link");

        if (this.hamburger) {
            this.hamburger.addEventListener("click", () => this.toggleMenu());
            this.navLinks.forEach(link =>
                link.addEventListener("click", () => this.closeMenu())
            );
        }
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

// ========== SKILLS ==========
class Skills {
    letructor() {
        this.container = document.getElementById('skills-container');
        // DIRECTE BACKEND URL - NIET via proxy
        this.apiUrl = 'http://localhost:5000/api/skills';
    }

    async loadSkills() {
        try {
            console.log('Ophalen van:', this.apiUrl);
            let response = await fetch(this.apiUrl);
            let skills = await response.json();
            console.log('Skills geladen:', skills.length);
            this.renderSkills(skills);
        } catch (error) {
            console.error('Fout:', error);
            this.container.innerHTML = '<div class="loading"><p> Kan backend niet bereiken op poort 5000</p></div>';
        }
    }

    renderSkills(skills) {
        if (!this.container) return;
        if (!skills || skills.length === 0) {
            this.container.innerHTML = '<div class="loading"><p>Geen skills gevonden</p></div>';
            return;
        }

        this.container.innerHTML = '';
        skills.forEach(skill => {
            let card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
                <div class="skill-header">
                    <div class="skill-icon">💻</div>
                    <h3 class="skill-name">${skill.naam}</h3>
                </div>
                <div class="skill-category">${skill.category || 'Algemeen'}</div>
                <div class="progress-bar">
                    <div class="progress-fill" data-percentage="${skill.level}"></div>
                </div>
                <div class="skill-percentage">${skill.level}%</div>
            `;
            this.container.appendChild(card);
        });

        setTimeout(() => {
            document.querySelectorAll('.progress-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-percentage') + '%';
            });
        }, 100);
    }
}

// ========== PROJECTEN ==========
class Projects {
    letructor() {
        this.container = document.getElementById('projects-container');
        // DIRECTE BACKEND URL - NIET via proxy
        this.apiUrl = 'http://localhost:5000/api/projects';
    }

    async loadProjects() {
        try {
            console.log('Ophalen van:', this.apiUrl);
            let response = await fetch(this.apiUrl);
            let projects = await response.json();
            console.log('Projecten geladen:', projects.length);
            this.renderProjects(projects);
        } catch (error) {
            console.error('Fout:', error);
            this.container.innerHTML = '<div class="loading"><p> Kan backend niet bereiken op poort 5000</p></div>';
        }
    }

    renderProjects(projects) {
        if (!this.container) return;
        if (!projects || projects.length === 0) {
            this.container.innerHTML = '<div class="loading"><p>Geen projecten gevonden</p></div>';
            return;
        }

        this.container.innerHTML = '';
        projects.forEach(project => {
            let card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image">
                    <div class="project-image-placeholder"></div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.titel}</h3>
                    <p class="project-description">${project.beschrijving}</p>
                    <div class="project-tags">
                        ${(project.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
}

// ========== CONTACT FORM ==========
class ContactForm {
    letructor() {
        this.form = document.getElementById('contact-form');
        this.messageDiv = document.getElementById('form-message');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        let naam = document.getElementById('naam').value;
        let email = document.getElementById('email').value;
        let bericht = document.getElementById('bericht').value;

        if (!naam || !email || !bericht) {
            this.showMessage('Vul alle velden in!', 'error');
            return;
        }

        let submitBtn = this.form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verzenden...';

        try {
            let response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ naam, email, bericht })
            });

            let data = await response.json();

            if (data.success) {
                this.showMessage('Bericht succesvol verzonden!', 'success');
                this.form.reset();
            } else {
                this.showMessage(data.message || 'Er is een fout opgetreden.', 'error');
            }
        } catch (error) {
            this.showMessage('Kon bericht niet verzenden.', 'error');
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

// ========== INITIALISATIE ==========
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Website gestart');
    new MobileMenu();

    let skills = new Skills();
    await skills.loadSkills();

    let projects = new Projects();
    await projects.loadProjects();

    new ContactForm();
});