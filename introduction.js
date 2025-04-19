// Introduction à JavaScript
// Ce fichier contient les concepts de base avec des exemples

// 1. Variables et types de données
let nom = "El hadji Dieng";               // Une chaîne de caractères (string)
let age = 25;                   // Un nombre (number)
let estEtudiant = true;        // Un booléen (boolean)

// 2. Afficher des informations dans la console
console.log("Bonjour " + nom);  // Concaténation de chaînes
console.log(`Vous avez ${age} ans`);  // Template string (moderne)

// 3. Opérateurs de base
let a = 10;
let b = 5;
console.log("Addition:", a + b);
console.log("Soustraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);

// 4. Structure conditionnelle (if/else)
if (age >= 18) {
    console.log("Vous êtes majeur");
} else {
    console.log("Vous êtes mineur");
}

// 5. Boucle for
console.log("Compter jusqu'à 5:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// 6. Fonction simple
function direBonjour(prenom) {
    return "Bonjour " + prenom + "!";
}

// Utilisation de la fonction
let message = direBonjour("Marie");
console.log(message);

// 7. Tableau (Array)
let fruits = ["pomme", "banane", "orange"];
console.log("Premier fruit:", fruits[0]);
console.log("Nombre de fruits:", fruits.length);

// 8. Objet
let personne = {
    nom: "Dupont",
    prenom: "Pierre",
    age: 30,
    ville: "Paris"
};
console.log("Informations:", personne.prenom, personne.nom, "habite à", personne.ville); 