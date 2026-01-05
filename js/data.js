// Données du portfolio - Cette file peut être modifiée via l'admin
const portfolioData = {
    name: "Djamel Sarni",
    title: "Développeur Full Stack",
    email: "contact@example.com",
    phone: "+33 6 00 00 00 00",
    description: "Passionné par le développement web et la création de solutions innovantes.",
    shortBio: "Je suis un développeur passionné avec une expérience en développement web full stack.",
    projects: [
        {
            id: 1,
            title: "Projet E-Commerce",
            description: "Plateforme e-commerce moderne avec paiement en ligne",
            image: "https://via.placeholder.com/400x250?text=E-Commerce",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "https://github.com"
        },
        {
            id: 2,
            title: "Application Task Manager",
            description: "Application de gestion de tâches avec synchronisation en temps réel",
            image: "https://via.placeholder.com/400x250?text=Task+Manager",
            technologies: ["Vue.js", "Firebase"],
            link: "https://github.com"
        },
        {
            id: 3,
            title: "Blog Personnel",
            description: "Blog avec système de commentaires et authentification",
            image: "https://via.placeholder.com/400x250?text=Blog",
            technologies: ["Next.js", "PostgreSQL"],
            link: "https://github.com"
        }
    ],
    skills: [
        "JavaScript",
        "React",
        "Vue.js",
        "Node.js",
        "Python",
        "MongoDB",
        "PostgreSQL",
        "HTML/CSS"
    ],
    social: [
        { name: "GitHub", icon: "fab fa-github", link: "https://github.com" },
        { name: "LinkedIn", icon: "fab fa-linkedin", link: "https://linkedin.com" },
        { name: "Twitter", icon: "fab fa-twitter", link: "https://twitter.com" },
        { name: "Email", icon: "fas fa-envelope", link: "mailto:contact@example.com" }
    ]
};
