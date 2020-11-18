const seeder = require('mongoose-seed');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

seeder.connect("mongodb+srv://greg:P9Q933jRryW3PYUv@Cluster0.hlx2g.mongodb.net/cluster0?retryWrites=true&w=majority", function () {

  // Require des models
  seeder.loadModels([
    './models/product.js'
  ]);


  // Supression des instances
  seeder.clearModels(['Product'], function () {
    console.log('All model deleted DONE !');
  });



  // Ajout des instances
  seeder.populateModels(data, function () {
    console.log('Instances created DONE !');
    seeder.disconnect();
  });
});

// Data array containing seed data - documents organized by Model
const data = [
  {
    'model': 'Product',
    'documents': [
      {
        '_id': new mongoose.Types.ObjectId(),
        'name': '1 mois',
        'price': 900,
        'description': "Profitez d'un abonnement de 1 mois !",
        'image': "https://www.keysworlds.com/media/catalog/product/cache/7ed5c9edeef724ede43badc51197dfdc/1/9/190912-c_85.jpg"
      },
      {
        '_id': new mongoose.Types.ObjectId(),
        'name': '1 an',
        'price': 8000,
        'description': "Profitez d'un abonnement de 12 mois !",
        'image': "https://www.keysworlds.com/media/catalog/product/cache/7ed5c9edeef724ede43badc51197dfdc/1/9/190912-c_85.jpg"
      }
    ]
  }
];
