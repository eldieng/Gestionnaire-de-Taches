// Application de Gestion de Tâches (Todo List)

class Tache {
    constructor(titre, description, priorite = "normale") {
        this.id = Date.now(); // Identifiant unique basé sur le timestamp
        this.titre = titre;
        this.description = description;
        this.priorite = priorite;
        this.dateCreation = new Date();
        this.terminee = false;
    }

    toggleTerminee() {
        this.terminee = !this.terminee;
    }
}

class GestionnaireTaches {
    constructor() {
        this.taches = [];
    }

    ajouterTache(titre, description, priorite) {
        const nouvelleTache = new Tache(titre, description, priorite);
        this.taches.push(nouvelleTache);
        return nouvelleTache;
    }

    supprimerTache(id) {
        this.taches = this.taches.filter(tache => tache.id !== id);
    }

    getTacheParId(id) {
        return this.taches.find(tache => tache.id === id);
    }

    modifierTache(id, nouveauTitre, nouvelleDescription) {
        const tache = this.getTacheParId(id);
        if (tache) {
            tache.titre = nouveauTitre;
            tache.description = nouvelleDescription;
        }
    }

    // Méthodes utilisant les fonctions avancées de tableau
    getTachesTerminees() {
        return this.taches.filter(tache => tache.terminee);
    }

    getTachesEnCours() {
        return this.taches.filter(tache => !tache.terminee);
    }

    getTachesParPriorite(priorite) {
        return this.taches.filter(tache => tache.priorite === priorite);
    }

    // Utilisation de reduce pour les statistiques
    getStatistiques() {
        return this.taches.reduce((stats, tache) => {
            stats.total++;
            if (tache.terminee) stats.terminees++;
            stats[tache.priorite] = (stats[tache.priorite] || 0) + 1;
            return stats;
        }, { total: 0, terminees: 0 });
    }
}

// Démonstration de l'utilisation
async function demonstrationApp() {
    console.log("=== Démarrage de l'application de gestion de tâches ===\n");
    
    const gestionnaire = new GestionnaireTaches();

    // Ajout de quelques tâches
    console.log("Ajout de tâches...");
    gestionnaire.ajouterTache("Apprendre JavaScript", "Étudier les concepts avancés", "haute");
    gestionnaire.ajouterTache("Faire les courses", "Acheter des fruits et légumes", "normale");
    gestionnaire.ajouterTache("Sport", "Faire 30 minutes de jogging", "basse");

    // Simulation d'une opération asynchrone
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Affichage des tâches avec destructuration
    console.log("\nListe des tâches :");
    gestionnaire.taches.forEach(({ titre, priorite, terminee }) => {
        console.log(`- ${titre} (Priorité: ${priorite}) ${terminee ? '✓' : '○'}`);
    });

    // Marquer une tâche comme terminée
    const tache = gestionnaire.taches[0];
    tache.toggleTerminee();

    // Statistiques avec template literals
    const stats = gestionnaire.getStatistiques();
    console.log(`\nStatistiques :
    Total des tâches: ${stats.total}
    Tâches terminées: ${stats.terminees}
    Tâches restantes: ${stats.total - stats.terminees}
    `);

    // Filtrer les tâches par priorité
    const tachesPrioritaires = gestionnaire.getTachesParPriorite("haute");
    console.log("\nTâches prioritaires :");
    tachesPrioritaires.forEach(tache => console.log(`- ${tache.titre}`));
}

// Exécution de la démonstration
demonstrationApp().then(() => {
    console.log("\n=== Fin de la démonstration ===");
}); 