const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user'); // jwt gère le systeme de token
const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const cookieParser = require('cookie-parser');

// CATCHASYNC function nous sert à rendre le code plus dry en déléguant le try catch à la fonction supérieur catchAsync.


const signup = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const user = new User({
    email: email,
    password: password,
    name: name
  });
  await user.save();
  const stripeCustomerObject = await stripe.customers.create({
    email: email,
  });
  user.customerId = stripeCustomerObject.id;
  await user.save();

  console.log('Utilisateur créé :' + user);

  const token = user.createToken();
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  res.cookie('email', user.email, { maxAge: 3600000 });

  res.status(201).json({
    status: 'success',
    user: user
  });
});


const login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("This user don't exist", 401);
  }
  const isPasswordValid = await user.passwordComparaison(req.body.password);
  if (!isPasswordValid) {
    throw new AppError('Bad password', 401);
  }
  const token = user.createToken();
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  res.cookie('email', req.body.email, { maxAge: 3600000} );

  res.status(200).json({
    status: 'success'
  });
});

const dashboard = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.cookies.email });
  const populatedUser = await User.findOne({email: user.email})
    .populate('virus');

  res.render('dashboard', {
    user: user,
    virus: populatedUser.virus
  });

});

const payer = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.cookies.email });
  const product = await Product.find();
  res.render('payer', {
    user: user,
    product: product,
    key: process.env.PUBLISHABLE_KEY

  });
});

const userInfo = catchAsync( async(req, res, next) => {
  console.log(req.body);
  const product = await Product.findById(req.body.productId);
  const user = await User.findOne({email: req.cookies.email});
  const priceId = product.priceId;
  const customerId = user.customerId;

  res.status(200).json({
    priceId: priceId,
    customerId: customerId,
    salut: 'je suis la réponse'
  });

});

module.exports = { login, signup, dashboard, payer, userInfo };
