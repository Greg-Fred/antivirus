require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const path = require('path');
const virusRoutes = require('./routes/virus');
const webhookRoute = require('./routes/webhook');
// const { body, validationResult } = require('express-validator');

// require CORS ?? cross origin attack
// CONFIG /////////////////////////////////////


const app = express();


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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// NOS ROUTES ////////////////////////////////////////////////////:


app.use('/stripe', bodyParser.raw({ type: 'application/json' }), webhookRoute);
app.use(bodyParser.json());

app.get("/",  (req, res, next) => {
  res.render('home.ejs');
});

app.use('/auth', userRoutes);
app.use('/virus', virusRoutes);
app.use('/product', productRoutes);



module.exports = app;

