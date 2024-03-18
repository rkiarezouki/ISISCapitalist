module.exports = {
    "name": "MarioWorld",
    "logo": "icones/logomonde.jpg",
    "money": 500,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": 0,
    "products": [
        {
            "id": 1,
            "name": "Banane",
            "logo": "icones/OIP.jpeg",
            "cout": 4,
            "croissance": 1.07,
            "revenu": 1,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 0,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "triple Banane",
                    "logo": "icones/tripleBanane.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": false
                },
                {
                    "name": "Banane géante",
                    "logo": "icones/BananeGéante.png",
                    "seuil": 75,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": false
                }]
            
        },
        {
            "id": 2,
            "name": "Champignon",
            "logo": "icones/Champignon.jpeg",
            "cout": 4,
            "croissance": 1.07,
            "revenu": 1,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 0,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "triple Champignon",
                    "logo": "icones/TripleChampi.webp",
                    "seuil": 30,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": false
                },
                {
                    "name": "Champignon doré",
                    "logo": "icones/champior.webp",
                    "seuil": 85,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": false
                }]
            
        }
        
    ],
    "allunlocks": [
        {
            "name": "Nom du premier unlock général",
            "logo": "icones/premierunlock.jpg",
            "seuil": 30,
            "idcible": 1,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": false
        }
        
    ],
    "upgrades": [
        {
            "name": "Nom du premier upgrade",
            "logo": "icones/premierupgrade.jpg",
            "seuil": 1e3,
            "idcible": 1,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": false
        }
        
    ],
    "angelupgrades": [
        {
            "name": "Angel Sacrifice",
            "logo": "icones/angel.png",
            "seuil": 10,
            "idcible": 0,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": false
        }
        
    ],
    "managers": [
        {
            "name": "Mario",
            "logo": "icones/Mario.png",
            "seuil": 10,
            "idcible": 1,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Luigi",
            "logo": "icones/Luigi.webp",
            "seuil": 100,
            "idcible": 2,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Peach",
            "logo": "icones/Peach.webp",
            "seuil": 1000,
            "idcible": 3,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Daisy",
            "logo": "icones/Daisy.png",
            "seuil": 10000,
            "idcible": 4,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Yoshi",
            "logo": "icones/Yoshi.webp",
            "seuil": 100000,
            "idcible": 5,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        },
        {
            "name": "Toad",
            "logo": "icones/Toad.png",
            "seuil": 1000000,
            "idcible": 6,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": false
        }
    ]
};