const express = require('express');
const router = express.Router();
const buyCtrl = require('../controllers/buy');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

router.get('/product1', function (req, res) {
  res.render('product1')
})


// test de paiement avec stripe
const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/product1/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});


module.exports = router

