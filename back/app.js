require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const Publishable_Key = 'pk_test_51HkSdNDXZyAsNyKOasOLrBiGaAbgoxHb8WzeD1fMyxhcFHXEWOOnKIuUAb0GR9LB5h3BsVkEUB38RcNVvZrk8WOd00OfoO2PLu'
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const path = require('path');

const app = express();

// express static utilisé pour tester des pages statiques dans static_stripe_views
app.use(express.static('static_stripe_views'));

mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

app.use(bodyParser.json());

app.use('/auth', userRoutes);

// get pour home
app.get('/', function (req, res) {
  // res render 'home' renvoit vers une vue ejs dans le dossier views
  res.render('home')
})



// test de paiement avec stripe   A CHANGER AVEC localhost 3500
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-session', async (req, res) => {
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


module.exports = app;
