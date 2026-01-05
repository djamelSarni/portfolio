// Admin Panel JavaScript
let currentData = {};

document.addEventListener('DOMContentLoaded', () => {
    loadAdminData();
    setupNavigation();
});

function loadAdminData() {
    const savedData = localStorage.getItem('portfolioData');
    currentData = savedData ? JSON.parse(savedData) : JSON.parse(JSON.stringify(portfolioData));
    
    // Remplir le formulaire général
    document.getElementById('name').value = currentData.name || '';
    document.getElementById('title').value = currentData.title || '';
    document.getElementById('email').value = currentData.email || '';
    document.getElementById('phone').value = currentData.phone || '';
    document.getElementById('shortBio').value = currentData.shortBio || '';
    
    // Afficher les projets
    displayProjects();
    
    // Afficher les compétences
    displaySkills();
    
    // Afficher les réseaux sociaux
    displaySocial();
}

function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            
            // Masquer toutes les sections
            document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
            
            // Afficher la section sélectionnée
            document.getElementById(`${section}-section`).classList.remove('hidden');
            
            // Mettre à jour le bouton actif
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

function saveData() {
    currentData.name = document.getElementById('name').value;
    currentData.title = document.getElementById('title').value;
    currentData.email = document.getElementById('email').value;
    currentData.phone = document.getElementById('phone').value;
    currentData.shortBio = document.getElementById('shortBio').value;
    
    localStorage.setItem('portfolioData', JSON.stringify(currentData));
    showMessage('Données enregistrées avec succès!', 'success');
}

// ====== PROJETS ======
function displayProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = '';
    
    currentData.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-edit';
        projectDiv.innerHTML = `
            <div class="form-group">
                <label>Titre du projet</label>
                <input type="text" class="project-title" value="${project.title}" 
                       onchange="updateProject(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-desc" onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
            </div>
            <div class="form-group">
                <label>URL de l'image</label>
                <input type="text" class="project-image" value="${project.image}" 
                       onchange="updateProject(${index}, 'image', this.value)">
            </div>
            <div class="form-group">
                <label>Lien du projet</label>
                <input type="text" class="project-link" value="${project.link}" 
                       onchange="updateProject(${index}, 'link', this.value)">
            </div>
            <div class="form-group">
                <label>Technologies (séparées par des virgules)</label>
                <input type="text" class="project-tech" value="${project.technologies.join(', ')}" 
                       onchange="updateProject(${index}, 'technologies', this.value.split(',').map(t => t.trim()))">
            </div>
            <button class="btn btn-danger" onclick="deleteProject(${index})">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        `;
        container.appendChild(projectDiv);
    });
}

function addProject() {
    const newProject = {
        id: Math.max(...currentData.projects.map(p => p.id || 0)) + 1,
        title: 'Nouveau projet',
        description: 'Description du projet',
        image: 'https://via.placeholder.com/400x250?text=Projet',
        technologies: ['Technologie'],
        link: 'https://github.com'
    };
    
    currentData.projects.push(newProject);
    displayProjects();
    saveData();
}

function updateProject(index, field, value) {
    if (field === 'technologies' && typeof value === 'string') {
        currentData.projects[index][field] = value.split(',').map(t => t.trim());
    } else {
        currentData.projects[index][field] = value;
    }
    saveData();
}

function deleteProject(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
        currentData.projects.splice(index, 1);
        displayProjects();
        saveData();
    }
}

// ====== COMPÉTENCES ======
function displaySkills() {
    const container = document.getElementById('skillsList');
    container.innerHTML = '';
    
    currentData.skills.forEach((skill, index) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <span>${skill}</span>
            <button class="btn btn-small btn-danger" onclick="deleteSkill(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(skillDiv);
    });
}

function addSkill() {
    const input = document.getElementById('newSkill');
    const skill = input.value.trim();
    
    if (skill && !currentData.skills.includes(skill)) {
        currentData.skills.push(skill);
        input.value = '';
        displaySkills();
        saveData();
        showMessage('Compétence ajoutée!', 'success');
    } else if (currentData.skills.includes(skill)) {
        showMessage('Cette compétence existe déjà!', 'warning');
    } else {
        showMessage('Veuillez entrer une compétence!', 'warning');
    }
}

function deleteSkill(index) {
    currentData.skills.splice(index, 1);
    displaySkills();
    saveData();
}

// ====== RÉSEAUX SOCIAUX ======
function displaySocial() {
    const container = document.getElementById('socialList');
    container.innerHTML = '';
    
    currentData.social.forEach((item, index) => {
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-item';
        socialDiv.innerHTML = `
            <div class="form-group">
                <label>Nom du réseau</label>
                <input type="text" value="${item.name}" 
                       onchange="updateSocial(${index}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Icône (classe FontAwesome)</label>
                <input type="text" value="${item.icon}" 
                       onchange="updateSocial(${index}, 'icon', this.value)" 
                       placeholder="fab fa-github">
            </div>
            <div class="form-group">
                <label>Lien</label>
                <input type="text" value="${item.link}" 
                       onchange="updateSocial(${index}, 'link', this.value)">
            </div>
            <button class="btn btn-danger" onclick="deleteSocial(${index})">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        `;
        container.appendChild(socialDiv);
    });
}

function addSocial() {
    const newSocial = {
        name: 'Nouveau réseau',
        icon: 'fas fa-link',
        link: 'https://example.com'
    };
    
    currentData.social.push(newSocial);
    displaySocial();
    saveData();
}

function updateSocial(index, field, value) {
    currentData.social[index][field] = value;
    saveData();
}

function deleteSocial(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce réseau?')) {
        currentData.social.splice(index, 1);
        displaySocial();
        saveData();
    }
}

// ====== EXPORT / IMPORT ======
function exportData() {
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showMessage('Données exportées avec succès!', 'success');
}

function importData() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            currentData = imported;
            localStorage.setItem('portfolioData', JSON.stringify(currentData));
            loadAdminData();
            showMessage('Données importées avec succès!', 'success');
        } catch (error) {
            showMessage('Erreur lors de l\'import du fichier!', 'error');
        }
    };
    reader.readAsText(file);
}

function resetData() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données? Cette action ne peut pas être annulée.')) {
        localStorage.removeItem('portfolioData');
        currentData = JSON.parse(JSON.stringify(portfolioData));
        loadAdminData();
        showMessage('Données réinitialisées!', 'success');
    }
}

// ====== MESSAGES ======
function showMessage(message, type = 'info') {
    const div = document.createElement('div');
    div.className = `message message-${type}`;
    div.textContent = message;
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 300);
    }, 3000);
}
