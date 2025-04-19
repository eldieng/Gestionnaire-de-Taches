// Exercices pratiques JavaScript

// Exercice 1 : Calculer l'âge en jours
let votreAge = 25;
let joursParAn = 365;
let ageEnJours = votreAge * joursParAn;
console.log("Vous avez environ " + ageEnJours + " jours");

// Exercice 2 : Vérifier si un nombre est pair ou impair
function verifierPairImpair(nombre) {
    if (nombre % 2 === 0) {
        console.log(nombre + " est pair");
    } else {
        console.log(nombre + " est impair");
    }
}

// Testez avec différents nombres
verifierPairImpair(4);
verifierPairImpair(7);

// Exercice 3 : Créer une table de multiplication
console.log("Table de multiplication de 5 :");
for (let i = 1; i <= 10; i++) {
    console.log("5 x " + i + " = " + (5 * i));
}

// Exercice 4 : Travailler avec un tableau
let notes = [15, 12, 18, 9, 14];
let somme = 0;

// Calculer la moyenne
for (let i = 0; i < notes.length; i++) {
    somme = somme + notes[i];
}
let moyenne = somme / notes.length;
console.log("La moyenne des notes est : " + moyenne);

// Exercice 5 : Créer une fonction qui dit bonjour selon l'heure
function direBonjourSelon(heure) {
    if (heure < 12) {
        return "Bon matin !";
    } else if (heure < 18) {
        return "Bon après-midi !";
    } else {
        return "Bonne soirée !";
    }
}

// Tester la fonction avec différentes heures
console.log(direBonjourSelon(9));  // matin
console.log(direBonjourSelon(14)); // après-midi
console.log(direBonjourSelon(20)); // soir 