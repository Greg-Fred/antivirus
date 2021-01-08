//Requires :
//Modules et config
require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const url = require('url');
const { AppError, sendErrorHandler } = require('./lib/AppError');
const app = express();
//Routers
const virusRoutes = require('./routes/virus');
const webhookRoute = require('./routes/webhook');
const stripeRoutes = require('./routes/stripe');
const productRoutes = require('./routes/stripe');
const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/email');






///// CONFIGURATION

// 'Express static' sert à l'utilisation de pages statiques dans le dossier 'static_stripe_views'
// app.use(express.static('static_stripe_views'));

//Configuration de push temporaire pour heroku
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
});

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

// Configuration du transport pour nodemailer :
// create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   port: 465,               // true for 465, false for other ports
//   host: "smtp.gmail.com",
//   auth: {
//     user: 'fedde.leg@gmail.com',
//     pass: 'Granolax3484',
//   },
//   secure: true,
// });

// On configure ici le chemin des vues et le système de gestion des vues (ejs)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;
  let ifNewPassword = queryObject.npwd == 'true' ? true : false;
  console.log(queryObject);
  console.log(ifNewPassword);
  res.render('login', { ifNewPassword: ifNewPassword });
});

app.get('/forgotpwd', (req, res, next) => {
  res.render('recoverymail');
});

app.get('/signin', (req, res, next) => {
  res.render('signin');
});

app.use('/payment', stripeRoutes)
app.use('/auth', userRoutes);
app.use('/virus', virusRoutes);
app.use('/product', productRoutes);
app.use('/email', emailRoutes);

//_____________________________________________________nodemailer test___________________________________________________________



//______________________________________________________________________________________________________________________________



app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(sendErrorHandler);

module.exports = app;


