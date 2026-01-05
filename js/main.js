// Charger les données et remplir le portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Charger les couleurs d'abord
    if (typeof loadCustomColors === 'function') {
        loadCustomColors();
    }
    loadPortfolioData();
});

function loadPortfolioData() {
    // Charger les données depuis le stockage local ou les données par défaut
    const savedData = localStorage.getItem('portfolioData');
    const data = savedData ? JSON.parse(savedData) : portfolioData;

    // Remplir le HTML avec les données
    document.getElementById('navName').textContent = data.name;
    document.getElementById('heroTitle').textContent = `Bienvenue, je suis ${data.name}`;
    document.getElementById('heroSubtitle').textContent = data.title;
    document.getElementById('aboutText').innerHTML = `<p>${data.shortBio}</p>`;
    document.getElementById('contactText').innerHTML = `<p>Email: <a href="mailto:${data.email}">${data.email}</a></p><p>Tél: ${data.phone}</p>`;

    // Charger les projets
    loadProjects(data.projects);

    // Charger les compétences
    loadSkills(data.skills);

    // Charger les réseaux sociaux
    loadSocial(data.social);
}

function loadProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link">Voir le projet →</a>
            </div>
        `;
        container.appendChild(projectCard);
    });
}

function loadSkills(skills) {
    const container = document.getElementById('skillsList');
    container.innerHTML = '';
    
    skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        container.appendChild(skillTag);
    });
}

function loadSocial(social) {
    const container = document.getElementById('socialLinks');
    container.innerHTML = '';
    
    social.forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;
        link.className = 'social-link';
        link.title = item.name;
        link.innerHTML = `<i class="${item.icon}"></i>`;
        link.target = '_blank';
        container.appendChild(link);
    });
}

// Navigation lisse
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
