const jwt = require('jsonwebtoken'); // Module qui génère et gère les tokens
const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user');

const auth = catchAsync(async (req, res, next) => {

  // Récupération du token à partir du head en mode [x-access-token]
  // const token = req.headers["x-access-token"];


  // Récupération du token en mode Bearer token

  const headerToken = req.headers['authorization'];
  console.log("le header token");
  console.log(headerToken);

  if (!headerToken) {
    // Cela veut dire que la requête ne contient pas de header authorization
  }

  const token = headerToken.split(' ')[1];
  console.log("le token");
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);
  console.log("decodedtoken");
  console.log(decodedToken);
  // Décodage du token avec jwt


  // Vérifier si le token est toujours valide
  const current_time = new Date().getTime() / 1000;
  if (current_time > decodedToken.exp) { console.log("expiré !") };
  // Dans le cas d'un token, penser à une redirection.
  // Il suffit peut être de faire une logique coté client qui redirige vers le login en cas d'erreur

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
  // res.status(401).json({
  //   error: new Error('Invalid request!')
  // });
});

module.exports = { auth };
