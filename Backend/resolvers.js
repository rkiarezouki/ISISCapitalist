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

module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        acheterQtProduit(parent, args, context) {
            const produit = context.world.products.find(p => p.id === args.id);
            if (!produit) {
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`);
            }
            
            const coutTotal = produit.cout * (1 - Math.pow(produit.croissance, args.quantite)) / (1 - produit.croissance);
            
            if (context.world.money < coutTotal) {
                throw new Error(`Pas assez d'argent pour acheter ${args.quantite}  ${produit.name}`);
            }
            
            context.world.money -= coutTotal;
            produit.quantite += args.quantite;
            produit.cout = Math.pow(1 + produit.croissance, args.quantite) * produit.cout;

            saveWorld(context);
            return produit;
        },

        lancerProductionProduit(parent, args, context) {
            const produit = context.world.products.find(p => p.id === args.id);
            if(!product){
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`)
            }
            produit.timeleft = produit.vitesse;
            context.world.lastupdate = Date.now().toString();
            saveWorld(context)
        },

        engagerManager(parent, args, context) {
            let manager = context.world.managers.find(p => p.name === args.name)
            let product = context.world.products.find(p => p.id === manager.idcible)
            if(!manager){
                throw new Error(`Le manager avec le nom ${args.name} n'existe pas`)
            }
            
            manager.unlocked = true
            product.managerUnlocked = true
            saveWorld(context)
            
        }
    }
};