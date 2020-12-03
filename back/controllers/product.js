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
  console.log("le req body oneproduct" + req.body)
  console.log(req.cookies.email);
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
});

module.exports = { allProduct, userInfo };
