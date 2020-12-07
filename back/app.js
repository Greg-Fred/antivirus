require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const productRoutes = require('./routes/stripe');
const stripeRoutes = require('./routes/stripe');
const path = require('path');
const virusRoutes = require('./routes/virus');
const webhookRoute = require('./routes/webhook');
const { AppError, sendErrorHandler } = require('./lib/AppError');
const app = express();
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

///// CONFIGURATION

// 'Express static' sert à l'utilisation de pages statiques dans le dossier 'static_stripe_views'
app.use(express.static('static_stripe_views'));

// On connect le module mongoose à la DB
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// On configure ici les headers de réponse - CORS - il nous faudra comprendre plus en détail ***
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// On configure ici le chemin des vues et le système de gestion des vues (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


///// NOS ROUTES


// Cette route gère le webhook de stripe. Pour des raisons propre à stripe nous devons appliquer bodyParser.raw à la requête. Ce qui explique sa position 'au dessus' du app.use(bodyParser.json()) suivant qui s'applique à toute les requêtes. A travailler... ***
app.use('/stripe', bodyParser.raw({ type: 'application/json' }), webhookRoute);
// On bodyPaser toute les requêtes ici - Il nous faudra comprendre plus précisément l'utiliter de la chose ***
app.use((req, res, next) => {
  if (req.originalUrl === '/payment/stripe-webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.render('login');
});
app.get('/signin', (req, res, next) => {
  res.render('signin');
});

app.use('/payment', stripeRoutes)
app.use('/auth', userRoutes);
app.use('/virus', virusRoutes);
app.use('/product', productRoutes);

//_____________________________________________________STRIPE______________________________________________________________________





//______________________________________________________________________________________________________________________________



app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(sendErrorHandler);

module.exports = app;


