const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user'); // jwt gère le systeme de token

// CATCHASYNC function nous sert à rendre le code plus dry en déléguant le try catch à la fonction supérieur catchAsync.


const signup = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
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
  res.status(200).json({
    status: 'success',
    userId: user._id,
    token: user.createToken()
  });
});

module.exports = { login, signup };
