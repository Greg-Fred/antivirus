const jwt = require('jsonwebtoken'); // Module qui génère et gère les tokens
const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user');

const auth = catchAsync( async (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const current_time = new Date().getTime() / 1000;
  if (current_time > decodedToken.exp) { console.log("expiré !") };
  const user = await User.findOne({email: req.cookies.email});

  // const token = req.headers.authorization.split(' ')[1];

  const userId = decodedToken.userId;


  if (user._id && user._id != userId) {
    console.log("Attention bug !");
    throw new AppError("Invalid User id", 401);
  } else {
    next();
  }
  // res.status(401).json({
  //   error: new Error('Invalid request!')
  // });
});

module.exports = { auth };
