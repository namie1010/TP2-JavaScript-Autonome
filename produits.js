
// 1. Création du tableau des produits
const produits = [
    { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
    { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
    { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
    { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 }
];

// 2. Fonction de validation
function estValide(produit) {
    return (
        typeof produit.prix === "number" &&
        Number.isFinite(produit.prix) &&
        produit.prix >= 0 &&
        typeof produit.stock === "number" &&
        Number.isFinite(produit.stock) &&
        produit.stock >= 0
    );
}

// Vérification des données
const produitsValides = produits.filter(estValide);

console.log("=== Vérification des données ===");
console.log("Nombre de produits valides :", produitsValides.length);

// 3. Affichage du catalogue
console.log("\n=== Catalogue complet ===");

produits.forEach(produit => {
    console.log(`${produit.nom} - ${produit.prix} MAD`);
});

// 4. Recherche des produits disponibles
const produitsDisponibles = produitsValides.filter(
    produit => produit.stock > 0
);

console.log("\n=== Produits disponibles ===");

produitsDisponibles.forEach(produit => {
    console.log(produit.nom);
});

console.log(
    "Nombre de produits disponibles :",
    produitsDisponibles.length
);

// 5. Calcul de la valeur totale du stock
const valeurStock = produitsValides.reduce(
    (total, produit) => total + produit.prix * produit.stock,
    0
);

console.log("\nValeur totale du stock :", valeurStock, "MAD");

// 6. Recherche du produit disponible le moins cher
console.log("\n=== Produit disponible le moins cher ===");

if (produitsDisponibles.length > 0) {
    const moinsCher = produitsDisponibles.reduce(
        (minimum, produit) =>
            produit.prix < minimum.prix ? produit : minimum
    );

    // Déstructuration
    const { nom, prix } = moinsCher;

    console.log(`${nom} : ${prix} MAD`);
} else {
    console.log("Aucun produit disponible.");
}

// 7. Création du résumé avec map()
const resume = produits.map(
    ({ nom, prix, stock }) =>
        `${nom} - ${prix} MAD - ${stock} unités`
);

console.log("\n=== Résumé du catalogue ===");

resume.forEach(ligne => {
    console.log(ligne);
});

// 8. Tests supplémentaires
console.log("\n=== Tests supplémentaires ===");

// Test : tous les stocks à zéro
const testZero = produits.map(
    produit => ({ ...produit, stock: 0 })
);

const disponiblesZero = testZero.filter(
    produit => estValide(produit) && produit.stock > 0
);

const valeurZero = testZero
    .filter(estValide)
    .reduce(
        (total, produit) => total + produit.prix * produit.stock,
        0
    );

console.log("Produits disponibles :", disponiblesZero.length);
console.log("Valeur du stock :", valeurZero, "MAD");

if (disponiblesZero.length === 0) {
    console.log("Aucun produit disponible.");
}

// Test : catalogue vide
const catalogueVide = [];

const valeurVide = catalogueVide.reduce(
    (total, produit) => total + produit.prix * produit.stock,
    0
);

console.log("Valeur du catalogue vide :", valeurVide, "MAD");

// Test : données invalides
console.log(
    "Prix négatif valide ?",
    estValide({ prix: -10, stock: 5 })
);

console.log(
    "Stock non numérique valide ?",
    estValide({ prix: 100, stock: "5" })
);
