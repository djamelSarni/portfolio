# Portfolio Évolutif

Un portfolio moderne et évolutif hébergé gratuitement sur GitHub Pages avec une interface admin intégrée.

## 🚀 Caractéristiques

- **Hébergé gratuitement** sur GitHub Pages
- **Interface Admin** complète pour gérer votre contenu
- **Données stockées localement** (localStorage + export/import JSON)
- **Design responsive** et moderne
- **Facile à maintenir** et à personnaliser
- **Pas de dépendances complexes** - HTML, CSS, JS pur

## 📝 Contenu Gérable

Via l'interface admin (`/admin.html`), vous pouvez gérer:
- Informations générales (nom, titre, contact)
- Projets (titre, description, technologies, liens)
- Compétences
- Réseaux sociaux
- Export/Import des données

## 🛠️ Architecture

```
portfolio/
├── index.html              # Page principale
├── admin.html              # Interface admin
├── css/
│   ├── style.css          # Styles du portfolio
│   └── admin.css          # Styles de l'admin
├── js/
│   ├── data.js            # Données du portfolio
│   ├── main.js            # Logique du portfolio
│   └── admin.js           # Logique de l'admin
└── README.md
```

## 🔧 Utilisation

### Accéder à l'admin
1. Allez à `/admin.html` sur votre site
2. Modifiez vos informations, projets, compétences, etc.
3. Cliquez sur "Enregistrer"

### Exporter/Importer les données
- Utilisez la section "Export/Import" pour télécharger ou restaurer vos données en JSON
- Utile pour la sauvegarde et la restauration

## 📱 Personnalisation du Style

Tous les styles sont dans `css/style.css`. Les variables CSS sont définies au début:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... */
}
```

## 🚀 Déploiement sur GitHub Pages

1. Poussez ce code sur votre repo `username.github.io`
2. Les changements seront visibles automatiquement à `https://username.github.io`
3. Pour un domaine custom, configurez-le dans les paramètres du repo

## 💾 Stockage des Données

Les données sont stockées localement dans `localStorage` du navigateur. Pour les synchroniser entre appareils ou les sauvegarder:
1. Allez dans Admin > Export/Import
2. Téléchargez votre `portfolio-backup-YYYY-MM-DD.json`
3. Importez-le sur un autre appareil/navigateur si nécessaire

## ⚙️ Notes Techniques

- Compatible avec GitHub Pages (pas de serveur requis)
- Utilise localStorage pour la persistance des données
- Les données peuvent être exportées/importées en JSON
- Responsive design pour mobile et desktop
- Aucune dépendance externe (icônes FontAwesome via CDN)

## 📄 Licence

MIT
