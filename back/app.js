require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const virusRoutes = require('./routes/virus');
const mongoose = require('mongoose')

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

app.use(bodyParser.json());
app.use('/auth', userRoutes);
app.use('/virus', virusRoutes);




module.exports = app;

