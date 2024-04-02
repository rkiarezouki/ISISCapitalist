const fs = require('fs')
function saveWorld(context) {
    fs.writeFile("userworlds/" + context.user + "-world.json",
        JSON.stringify(context.world), err => {
            if (err) {
                console.error(err)
                throw new Error(
                    `Erreur d'écriture du monde coté serveur`)
            }
        })
}

function qtProduitSupplementaire(product, elapseTime) { //calculer Quantité de produits en fonction du temps écoulé
    let TempsRestant = product.timeleft - elapseTime //temps de production restant
    if (!product.managerUnlocked) { //Si manager pas débloqué
        if (product.timeleft !== 0 && TempsRestant <= 0) { //production finie
            product.timeleft = 0
            return 1 //1 produit de plus
        }
        else if (product.timeleft !== 0 && TempsRestant > 0) { //en cours de production
            product.timeleft =product.timeleftb-  elapseTime
            return 0
        }
        else { //aucune production
            return 0
        }
    }
    else { //Manager débloqué
        if (TempsRestant < 0) { //déjà produit
            product.timeleft = (product.vitesse - (TempsRestant % product.vitesse))
            return (1 + (Math.floor(-TempsRestant / product.vitesse)))
        }
        else if (TempsRestant === 0) { //va être produit
            product.timeleft = product.vitesse
            return 1
        }
        else { //pas de production
            product.timeleft = product.timeleft - elapseTime
            return 0
        }
    }
}
function updateArgent(context) { //mettre a jour l'argent en fonction de la quantité de produit supplémentaire
    let somme = 0
    context.world.products.forEach(p => {
        let tempsEcoule = Date.now() - Number(context.world.lastupdate)
        let qtProduit = qtProduitSupplementaire(p, tempsEcoule)
        somme = somme + (qtProduit * p.quantite * p.revenu* (1 + context.world.activeangels * context.world.angelbonus / 100))
    })
    context.world.lastupdate = Date.now().toString()
    context.world.money += somme
    context.world.score += somme
}

module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            updateArgent(context);
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        //marche
        acheterQtProduit(parent, args, context) {
            updateArgent(context);
            const produit = context.world.products.find(p => p.id === args.id);
            if (!produit) {
                throw new Error(`Le produit d'id ${args.id} n'existe pas`);
            }

            const totalcout = produit.cout * (1 - Math.pow(produit.croissance, args.quantite)) / (1 - produit.croissance);

            if (context.world.money < totalcout) {
                throw new Error(`Vous n'avez pas assez d'agent pour ajouter ce produit`);
            }

            context.world.money = context.world.money - totalcout;
            produit.quantite = produit.quantite+ args.quantite;
            produit.cout = Math.pow(1 + produit.croissance, args.quantite) * produit.cout;
            saveWorld(context);

            return produit;
        },

        //marche
        lancerProductionProduit(parent, args, context) {
            updateArgent(context);

            const produit = context.world.products.find(p => p.id === args.id);
            if (!produit) {
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`)
            }
            produit.timeleft = produit.vitesse;
            context.world.lastupdate = Date.now().toString();
            saveWorld(context);
            
        },

        //marche
        engagerManager(parent, args, context) {
            updateArgent(context);
            let manager = context.world.managers.find(p => p.name === args.name)
            let product = context.world.products.find(p => p.id === manager.idcible)
            if (!manager) {
                throw new Error(`Le manager avec le nom ${args.name} n'existe pas`)
            }

            manager.unlocked = true
            product.managerUnlocked = true
            
            
            saveWorld(context);
            
        }
    }
};