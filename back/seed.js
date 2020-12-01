const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

/* /// COMMENTAIRE :
  Ce seed utilise le module 'mongoose-seed car il permet
  d'utiliser les méthodes propre à mongoose qu'on utilise afin de communiquer avec mongo DB.
  Il me semble qu'à terme il puisse être plus intéressant de travailler directement avec le playground du plugin mongoDB de vscode. Il nous faudra apprendre à faire le lien entre le playgound
  et la surcouche mongoose.
  Mongoose-seed me semble un peu laborieux comme module, ça marche.. mais.. bon, à voir :D
*/

// On connecte ici le module mongoose-seed à notre DB.
seeder.connect("mongodb+srv://greg:P9Q933jRryW3PYUv@Cluster0.hlx2g.mongodb.net/cluster0?retryWrites=true&w=majority", function () {

  // On require ici les models sur lesquels on veut intervenir
  seeder.loadModels([
    './models/product.js',
    './models/user.js'
  ]);


  // On vide ici les instances des models require plus haut (db.drop)
  seeder.clearModels(['Product','User'], function () {
    console.log('Les instances ont été supprimé !');
  });



  // On peuple la db de nouvelles instances à partir de l'argument 'data'
  seeder.populateModels(data, function () {
    console.log('Les instances ont été créé !');
    seeder.disconnect();
  });
});

// La variable 'data' va contenir les paramètres d'instance qui peuplerons les documents de la db
const data = [
  {
    'model': 'Product',
    'documents': [
      {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'FIXE',
        'price': 1000,
        'description': "Produit de tet : FIXE",
        'image': "https://www.keysworlds.com/media/catalog/product/cache/7ed5c9edeef724ede43badc51197dfdc/1/9/190912-c_85.jpg",
        'productId': 'prod_IT5JaXCy0Sc1yZ' ,
        'priceId': 'price_1Hs99MDXZyAsNyKOuGhRGnM3'
      },
      {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'RECURENT',
        'price': 10000,
        'description': "Produit de test : RECURENT",
        'image': "https://www.keysworlds.com/media/catalog/product/cache/7ed5c9edeef724ede43badc51197dfdc/1/9/190912-c_85.jpg",
        'productId': 'prod_IT5MC4JdvWBLCw',
        'priceId': 'price_1Hs9C6DXZyAsNyKOQMaI2zqU'
      }
    ]
  }
];
