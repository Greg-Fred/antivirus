const jwt = require('jsonwebtoken'); // Module qui génère et gère les tokens
const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user');

const auth = catchAsync(async (req, res, next) => {

  // Récupération du token Bearer token

  const headerToken = req.headers['authorization'];
  console.log("le header token");
  console.log(headerToken);

  if (!headerToken) {
    
  }

  const token = headerToken.split(' ')[1];
  console.log("le token");
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);
  console.log("decodedtoken");
  console.log(decodedToken);
  
  // Vérifier si le token est toujours valide
  const current_time = new Date().getTime() / 1000;
  if (current_time > decodedToken.exp) { console.log("expiré !") };
 
  // Récupération de l'utilisateur à partir du token.
  const user = await User.findOne({ _id: decodedToken.userId });
  req.body.user = user;


  const userId = decodedToken.userId;

  if (user._id && user._id != userId) {
    console.log("Attention bug !");
    throw new AppError("Invalid User id", 401);
  } else {
    console.log("cool !");
    next();
  }

});

module.exports = { auth };
