// Gestion des variables CSS personnalisées

const defaultColors = {
    'primary-color': '#6366f1',
    'secondary-color': '#ec4899',
    'dark-bg': '#0f172a',
    'light-bg': '#f8fafc',
    'text-primary': '#1e293b',
    'text-secondary': '#64748b',
    'border-color': '#e2e8f0',
    'success': '#10b981',
    'warning': '#f59e0b',
    'error': '#ef4444'
};

const colorLabels = {
    'primary-color': 'Couleur Primaire',
    'secondary-color': 'Couleur Secondaire',
    'dark-bg': 'Fond Sombre',
    'light-bg': 'Fond Clair',
    'text-primary': 'Texte Principal',
    'text-secondary': 'Texte Secondaire',
    'border-color': 'Couleur Bordure',
    'success': 'Succès',
    'warning': 'Avertissement',
    'error': 'Erreur'
};

// Charger les couleurs personnalisées au démarrage
function loadCustomColors() {
    const savedColors = localStorage.getItem('portfolioColors');
    const colors = savedColors ? JSON.parse(savedColors) : defaultColors;
    
    // Appliquer les couleurs au CSS
    Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
    
    return colors;
}

// Afficher les contrôles de couleur dans l'admin
function displayColorControls() {
    const container = document.getElementById('colorsList');
    const colors = localStorage.getItem('portfolioColors') 
        ? JSON.parse(localStorage.getItem('portfolioColors')) 
        : defaultColors;
    
    container.innerHTML = '';
    
    Object.entries(defaultColors).forEach(([key, defaultValue]) => {
        const currentValue = colors[key] || defaultValue;
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-control';
        colorDiv.innerHTML = `
            <label>${colorLabels[key]}</label>
            <div class="color-input-group">
                <input type="color" id="color-${key}" value="${currentValue}" onchange="updateColor('${key}', this.value)">
                <input type="text" class="color-text" value="${currentValue}" onchange="updateColor('${key}', this.value)">
                <button class="btn-reset-color" onclick="resetColor('${key}')" title="Réinitialiser">
                    <i class="fas fa-undo"></i>
                </button>
            </div>
        `;
        container.appendChild(colorDiv);
    });
    
    // Ajouter bouton pour réinitialiser tout
    const resetAllDiv = document.createElement('div');
    resetAllDiv.className = 'reset-all-colors';
    resetAllDiv.innerHTML = `
        <button class="btn btn-danger" onclick="resetAllColors()">
            <i class="fas fa-redo"></i> Réinitialiser toutes les couleurs
        </button>
    `;
    container.appendChild(resetAllDiv);
}

// Mettre à jour une couleur
function updateColor(key, value) {
    // Valider que c'est une couleur valide
    if (!isValidColor(value)) {
        showMessage('Couleur invalide!', 'error');
        return;
    }
    
    // Appliquer la couleur
    document.documentElement.style.setProperty(`--${key}`, value);
    
    // Sauvegarder
    const colors = localStorage.getItem('portfolioColors') 
        ? JSON.parse(localStorage.getItem('portfolioColors')) 
        : defaultColors;
    colors[key] = value;
    localStorage.setItem('portfolioColors', JSON.stringify(colors));
    
    // Mettre à jour les inputs
    const colorInput = document.getElementById(`color-${key}`);
    const textInput = colorInput?.parentElement.querySelector('.color-text');
    if (colorInput) colorInput.value = value;
    if (textInput) textInput.value = value;
    
    showMessage(`${colorLabels[key]} mise à jour!`, 'success');
}

// Réinitialiser une couleur
function resetColor(key) {
    const defaultValue = defaultColors[key];
    updateColor(key, defaultValue);
}

// Réinitialiser toutes les couleurs
function resetAllColors() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les couleurs?')) {
        Object.entries(defaultColors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
        localStorage.setItem('portfolioColors', JSON.stringify(defaultColors));
        displayColorControls();
        showMessage('Toutes les couleurs ont été réinitialisées!', 'success');
    }
}

// Vérifier si une couleur est valide
function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

// Exporter les couleurs avec les données
function getColorsForExport() {
    return localStorage.getItem('portfolioColors') 
        ? JSON.parse(localStorage.getItem('portfolioColors')) 
        : defaultColors;
}

// Importer les couleurs
function importColors(colors) {
    Object.entries(colors).forEach(([key, value]) => {
        if (defaultColors.hasOwnProperty(key)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    });
    localStorage.setItem('portfolioColors', JSON.stringify(colors));
    if (document.getElementById('colorsList')) {
        displayColorControls();
    }
}

// Charger les couleurs au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadCustomColors();
});
