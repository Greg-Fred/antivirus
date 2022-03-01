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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'))
  });
}


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

///// ROUTES


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


app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(sendErrorHandler);

module.exports = app;


