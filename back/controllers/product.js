const Product = require('../models/product');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

// Notre controller de produit


exports.getAll = async (req, res, next) => {
  const allProduct = await Product.find({});
  res.render('testproduct', {
    products: allProduct
  })
};

// La methode get qui devrait être refacto afin de clairement assigner à chaque methode une fonction claire. Ici la méthode joue le double role d'afficher un produit et de créer une intention de paiment pour stripe. En chantier ##
exports.get = async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price,
      currency: 'eur',
      payment_method_types: ['card'],
      description: `la description du produit : ${product.description}`,
      statement_descriptor: `x1 ${product.name}`.substr(0, 22),
      metadata: {
        product_id: product.id,
        legreg: "bonjour"
      }
    });
    res.render('productShow', {
      client_secret: paymentIntent.client_secret,
      product: product,
      key: process.env.PUBLISHABLE_KEY
    })
  } catch (error) {
    console.log(error);
  }
};
