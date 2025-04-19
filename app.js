// Classe Tâche
class Tache {
    constructor(titre, description, priorite = "normale", dateEcheance = null) {
        this.id = Date.now();
        this.titre = titre;
        this.description = description;
        this.priorite = priorite;
        this.dateCreation = new Date();
        this.dateEcheance = dateEcheance ? new Date(dateEcheance) : null;
        this.terminee = false;
    }

    toggleTerminee() {
        this.terminee = !this.terminee;
    }

    estEnRetard() {
        if (!this.dateEcheance || this.terminee) return false;
        return new Date() > this.dateEcheance;
    }

    mettreAJour(titre, description, priorite, dateEcheance) {
        this.titre = titre;
        this.description = description;
        this.priorite = priorite;
        this.dateEcheance = dateEcheance ? new Date(dateEcheance) : null;
    }
}

// Classe gestionnaire de tâches
class GestionnaireTaches {
    constructor() {
        this.taches = JSON.parse(localStorage.getItem('taches')) || [];
        this.filtreActuel = 'all';
        this.recherche = '';
        this.triActuel = 'date';
        
        // Conversion des dates stockées en objets Date
        this.taches = this.taches.map(tache => {
            const nouvelleTache = new Tache(
                tache.titre,
                tache.description,
                tache.priorite,
                tache.dateEcheance
            );
            nouvelleTache.id = tache.id;
            nouvelleTache.terminee = tache.terminee;
            nouvelleTache.dateCreation = new Date(tache.dateCreation);
            return nouvelleTache;
        });
    }

    sauvegarder() {
        localStorage.setItem('taches', JSON.stringify(this.taches));
    }

    ajouterTache(titre, description, priorite, dateEcheance) {
        const nouvelleTache = new Tache(titre, description, priorite, dateEcheance);
        this.taches.push(nouvelleTache);
        this.sauvegarder();
        return nouvelleTache;
    }

    supprimerTache(id) {
        this.taches = this.taches.filter(tache => tache.id !== id);
        this.sauvegarder();
    }

    modifierTache(id, titre, description, priorite, dateEcheance) {
        const tache = this.taches.find(t => t.id === id);
        if (tache) {
            tache.mettreAJour(titre, description, priorite, dateEcheance);
            this.sauvegarder();
        }
    }

    toggleTache(id) {
        const tache = this.taches.find(t => t.id === id);
        if (tache) {
            tache.toggleTerminee();
            this.sauvegarder();
        }
    }

    getTacheParId(id) {
        return this.taches.find(tache => tache.id === parseInt(id));
    }

    setRecherche(terme) {
        this.recherche = terme.toLowerCase();
    }

    setTri(critere) {
        this.triActuel = critere;
    }

    getTachesFiltrees() {
        let tachesFiltrees = this.taches;

        // Filtre par état
        if (this.filtreActuel === 'active') {
            tachesFiltrees = tachesFiltrees.filter(tache => !tache.terminee);
        } else if (this.filtreActuel === 'completed') {
            tachesFiltrees = tachesFiltrees.filter(tache => tache.terminee);
        }

        // Filtre par recherche
        if (this.recherche) {
            tachesFiltrees = tachesFiltrees.filter(tache =>
                tache.titre.toLowerCase().includes(this.recherche) ||
                tache.description.toLowerCase().includes(this.recherche)
            );
        }

        // Tri
        tachesFiltrees.sort((a, b) => {
            switch (this.triActuel) {
                case 'date':
                    return b.dateEcheance - a.dateEcheance;
                case 'priority':
                    const prioriteOrdre = { haute: 3, normale: 2, basse: 1 };
                    return prioriteOrdre[b.priorite] - prioriteOrdre[a.priorite];
                case 'title':
                    return a.titre.localeCompare(b.titre);
                default:
                    return 0;
            }
        });

        return tachesFiltrees;
    }

    getStatistiques() {
        return this.taches.reduce((stats, tache) => {
            stats.total++;
            if (tache.terminee) stats.terminees++;
            if (tache.estEnRetard()) stats.enRetard++;
            stats[tache.priorite] = (stats[tache.priorite] || 0) + 1;
            return stats;
        }, { total: 0, terminees: 0, enRetard: 0 });
    }
}

// Interface utilisateur
class UI {
    constructor() {
        this.gestionnaire = new GestionnaireTaches();
        this.modal = document.getElementById('editModal');
        this.initializeEventListeners();
        this.rafraichirAffichage();
    }

    initializeEventListeners() {
        // Gestion du formulaire d'ajout
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const titre = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const priorite = document.getElementById('taskPriority').value;
            const dateEcheance = document.getElementById('taskDueDate').value;
            
            this.gestionnaire.ajouterTache(titre, description, priorite, dateEcheance);
            this.rafraichirAffichage();
            e.target.reset();
        });

        // Gestion du formulaire de modification
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('editTaskId').value;
            const titre = document.getElementById('editTaskTitle').value;
            const description = document.getElementById('editTaskDescription').value;
            const priorite = document.getElementById('editTaskPriority').value;
            const dateEcheance = document.getElementById('editTaskDueDate').value;

            this.gestionnaire.modifierTache(parseInt(id), titre, description, priorite, dateEcheance);
            this.fermerModal();
            this.rafraichirAffichage();
        });

        // Gestion de la fermeture du modal
        document.querySelector('.close').addEventListener('click', () => this.fermerModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.fermerModal();
            }
        });

        // Gestion des filtres
        document.querySelector('.filters').addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
                this.gestionnaire.filtreActuel = e.target.dataset.filter;
                this.rafraichirAffichage();
            }
        });

        // Gestion de la recherche
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.gestionnaire.setRecherche(e.target.value);
            this.rafraichirAffichage();
        });

        // Gestion du tri
        document.getElementById('sortCriteria').addEventListener('change', (e) => {
            this.gestionnaire.setTri(e.target.value);
            this.rafraichirAffichage();
        });
    }

    formatDate(date) {
        if (!date) return '';
        return new Date(date).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatDateForInput(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16);
    }

    ouvrirModal(id) {
        const tache = this.gestionnaire.getTacheParId(id);
        if (tache) {
            document.getElementById('editTaskId').value = tache.id;
            document.getElementById('editTaskTitle').value = tache.titre;
            document.getElementById('editTaskDescription').value = tache.description;
            document.getElementById('editTaskPriority').value = tache.priorite;
            document.getElementById('editTaskDueDate').value = this.formatDateForInput(tache.dateEcheance);
            this.modal.style.display = 'block';
        }
    }

    fermerModal() {
        this.modal.style.display = 'none';
        document.getElementById('editTaskForm').reset();
    }

    creerElementTache(tache) {
        const div = document.createElement('div');
        div.className = `task-item ${tache.terminee ? 'completed' : ''} ${tache.estEnRetard() ? 'overdue' : ''}`;
        
        const dateEcheanceFormatee = this.formatDate(tache.dateEcheance);
        const estEnRetard = tache.estEnRetard() ? 'urgent' : '';

        div.innerHTML = `
            <div class="task-info">
                <div class="task-title">
                    ${tache.titre}
                    <span class="task-priority priority-${tache.priorite}">${tache.priorite}</span>
                </div>
                <div class="task-description">${tache.description}</div>
                <div class="task-meta">
                    <div class="task-due-date ${estEnRetard}">
                        🕒 ${dateEcheanceFormatee}
                    </div>
                </div>
            </div>
            <div class="task-actions">
                <button onclick="ui.ouvrirModal(${tache.id})" class="edit-btn">✏️</button>
                <button onclick="ui.toggleTache(${tache.id})" class="toggle-btn">
                    ${tache.terminee ? '↩️' : '✓'}
                </button>
                <button onclick="ui.supprimerTache(${tache.id})" class="delete-btn">🗑️</button>
            </div>
        `;
        return div;
    }

    rafraichirAffichage() {
        // Afficher les tâches
        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = '';
        this.gestionnaire.getTachesFiltrees().forEach(tache => {
            tasksList.appendChild(this.creerElementTache(tache));
        });

        // Mettre à jour les statistiques
        const stats = this.gestionnaire.getStatistiques();
        const statsHTML = `
            <h2>Statistiques</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">${stats.total}</div>
                    <div class="stat-label">Total</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.terminees}</div>
                    <div class="stat-label">Terminées</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.total - stats.terminees}</div>
                    <div class="stat-label">En cours</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.enRetard || 0}</div>
                    <div class="stat-label">En retard</div>
                </div>
            </div>
        `;
        document.getElementById('statistics').innerHTML = statsHTML;
    }

    toggleTache(id) {
        this.gestionnaire.toggleTache(id);
        this.rafraichirAffichage();
    }

    supprimerTache(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            this.gestionnaire.supprimerTache(id);
            this.rafraichirAffichage();
        }
    }
}

// Initialisation de l'application
const ui = new UI();

// Gestion du thème
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const THEME_KEY = 'app-theme';

// Charger le thème sauvegardé ou utiliser le thème par défaut
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Gérer le changement de thème
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Ajouter une classe pour l'animation
    html.classList.add('theme-transition');
    
    // Changer le thème
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Mettre à jour l'icône
    updateThemeIcon(newTheme);
    
    // Retirer la classe d'animation après la transition
    setTimeout(() => {
        html.classList.remove('theme-transition');
    }, 300);
});

// Mettre à jour l'icône du thème
function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('title', theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair');
} 