// Concepts JavaScript Avancés

// 1. Méthodes de tableau modernes
const nombres = [1, 2, 3, 4, 5, 6];

// map() - transformer chaque élément
const nombresDubles = nombres.map(nombre => nombre * 2);
console.log("Nombres doublés:", nombresDubles);

// filter() - filtrer les éléments
const nombresPairs = nombres.filter(nombre => nombre % 2 === 0);
console.log("Nombres pairs:", nombresPairs);

// reduce() - réduire à une seule valeur
const somme = nombres.reduce((total, nombre) => total + nombre, 0);
console.log("Somme totale:", somme);

// 2. Objets et méthodes
const etudiant = {
    nom: "Dieng",
    notes: [15, 17, 13],
    calculerMoyenne() {
        const sommeNotes = this.notes.reduce((total, note) => total + note, 0);
        return sommeNotes / this.notes.length;
    },
    afficherBilan() {
        const moyenne = this.calculerMoyenne();
        console.log(`${this.nom} a une moyenne de ${moyenne}`);
    }
};

etudiant.afficherBilan();

// 3. Promesses et asynchrone
function simuleRequeteServeur(temps) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Données reçues !");
        }, temps);
    });
}

console.log("Début de la requête...");
simuleRequeteServeur(2000).then(resultat => {
    console.log(resultat);
});
console.log("La requête est en cours...");

// 4. Destructuration
const personne = {
    prenom: "El hadji",
    ville: "Dakar",
    profession: "Développeur"
};

const { prenom, ville } = personne;
console.log(`${prenom} habite à ${ville}`);

// 5. Template Literals avancés
function formaterTexte(strings, ...values) {
    return strings.reduce((resultat, str, i) => 
        `${resultat}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`, '');
}

const langage = "JavaScript";
const niveau = "avancé";
const message = formaterTexte`Je suis en train d'apprendre ${langage} au niveau ${niveau}!`;
console.log(message);

// 6. Classes
class CompteBancaire {
    constructor(proprietaire, soldeInitial = 0) {
        this.proprietaire = proprietaire;
        this.solde = soldeInitial;
    }

    deposer(montant) {
        this.solde += montant;
        console.log(`Dépôt de ${montant}€ effectué. Nouveau solde: ${this.solde}€`);
    }

    retirer(montant) {
        if (montant <= this.solde) {
            this.solde -= montant;
            console.log(`Retrait de ${montant}€ effectué. Nouveau solde: ${this.solde}€`);
        } else {
            console.log("Solde insuffisant !");
        }
    }
}

const monCompte = new CompteBancaire("El hadji", 1000);
monCompte.deposer(500);
monCompte.retirer(200); 