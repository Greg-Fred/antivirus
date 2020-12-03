const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const { catchAsync, AppError } = require('../lib/AppError');

// Notre controller de produit

const allProduct = catchAsync(async (req, res, next) => {
  const allProduct = await Product.find({});
  res.render('productIndex', {
    products: allProduct
  })
});

// La methode get qui devrait être refacto afin de clairement assigner à chaque methode une fonction claire. Ici la méthode joue le double role d'afficher un produit et de créer une intention de paiment pour stripe. En chantier ##
const userInfo = catchAsync(async (req, res, next) => {



});

module.exports = { allProduct, userInfo };
