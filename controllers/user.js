const { catchAsync, AppError } = require('../lib/AppError');
const { sendPasswordRecoveryEmail, sendVerificationEmail } = require('../lib/nodemailer');
const User = require('../models/user'); // jwt gère le systeme de token
const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const cookieParser = require('cookie-parser');
const util = require('util');

// CATCHASYNC function nous sert à rendre le code plus dry en déléguant le try catch à la fonction supérieur catchAsync.

/////////////////////////////////////////EMAIL DE VALIDATION DE COMPTE

// Génération d'un nouveau token utilisateur et envoie d'un email de confirmation. Si le token expire, il est possible de redemander le mail de confirmation en appelant cette methode. (POST)
const emailValidation = catchAsync(async (user, next) => {
  user.generateAccountToken();
  user.save();
  // methode de la lib nodemailer qui envoi un mail de vérification à l'utilisateur.
  sendVerificationEmail(user);

});
//////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////// CREATION UTILISATEUR (POST)

// ETAPE 1 : CREATION DE L'UTILISATEUR ET ENVOIE DE L'EMAIL DE VALIDATION (POST)
const signup = catchAsync(async (req, res, next) => {

  // Système temporaire qui regarde si la requete vient de react ou du vieux système de front

  let emailRequest;
  let passwordRequest;
  let nameRequest;

  if (req.body.data === undefined) {
    emailRequest = req.body.email;
    passwordRequest = req.body.password;
    nameRequest = req.body.name
  } else {
    emailRequest = req.body.data.newMail;
    passwordRequest = req.body.data.newPdm;
    nameRequest = req.body.data.newName;
  }

  // En mode réact c'est le req.body.data.x qui fonctionne


  const email = emailRequest;
  const password = passwordRequest;
  const name = nameRequest;
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
  emailValidation(user);

  console.log('Utilisateur créé :' + user);

  // const token = user.createToken();
  // res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  // res.cookie('email', user.email, { maxAge: 3600000 });

  res.status(201).json({
    status: 'success',
    user: user
  });


  // Ici encore le système est fait pour répondre à react ou au système ancien de front

  if (req.body.data !== undefined) {
    res.status(201).json({
      status: 'success',
      user: user
    })
  } else {
    const token = user.createToken();

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    res.cookie('email', emailRequest, { maxAge: 3600000 });
    res.status(200).json({
      status: 'success'
    });
  }

  //////////////:




});
///////////

// ETAPE 2 : VALIDATION DU COMPTE (GET) ce vers quoi pointe le lien de validation envoyé à l'utilisateur. Ce qui changera le statut du compte utilisateur en "active".
const accountValidation = catchAsync(async (req, res, next) => {
  console.log(req.params);
  // A partir du token présent dans le query string, on cherche l'utilisateur lié à ce token
  // et on vérifie si le token est toujours valide.
  const user = await User.findOne({ accountToken: req.params.token, accountTokenExpires: { $gt: Date.now() } });
  if (!user) {
    // Le token a expiré ! : Ici nous pourrions renvoyer vers la vue d'envoie du mail de renvoie d'un mail avec token
    res.render('', {
      expired: true
    })
  } else {
    // Le token est encore valide, le status du compte passe à validé
    user.status = "active";
    user.save();
    // Pour le moment on renvoi un simple texte, à voir à l'avenir ce qu'on veut faire une fois le compte validé !
    res.send('Votre compte a été validé !');
  }
});
///////////


/////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////// LOGIN (POST)

const login = catchAsync(async (req, res, next) => {

  // Système temporaire qui regarde si la requete vient de react ou du vieux système de front
  console.log("ici est l'entrée dans le login");

  let emailRequest;
  let passwordRequest;

  if (req.body.data === undefined) {
    emailRequest = req.body.email;
    passwordRequest = req.body.password;
  } else {
    emailRequest = req.body.data.newMail;
    passwordRequest = req.body.data.newPdm;
  }

  // En mode réact c'est le req.body.data.x qui fonctionne

  const user = await User.findOne({ email: emailRequest });
  if (!user) {
    throw new AppError("This user don't exist", 401);
  }
  const isPasswordValid = await user.passwordComparaison(passwordRequest);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw new AppError('Bad password', 401);
  } else if (user.status === "pending") {
    /* Nous vérifions ici si l'utilisateur a confirmé son compte par l'envoie d'un email de confirmation.
       Dans le cas ou le compte n'as pas été validé, on arrive ici.
       Pour le moment on ne fait que renvoyer une message d'erreur. A voir si nous devons gérer cette logique au niveau
       client ou au niveau serveur avec un middleware
       - Penser à proposer le renvoie */
    throw new AppError('Your account was create but need to be validate from your mail adress', 403);
  } else {

    // Ici encore le système est fait pour répondre à react ou au système ancien de front

    if (req.body.data !== undefined) {
      res.status(200).json({
        status: 'success'
      })
    } else {
      const token = user.createToken();


      res.status(200).send({
        id: user._id,
        username: user.name,
        email: user.email,
        role: user.role,
        accessToken: token,
        virus: user.virus
      })
    }

    //////////////:
  }
});
///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////// DASHBOARD (GET) (ce vers quoi pointe le login - probablement obsolète dans react)

const dashboard = catchAsync(async (req, res, next) => {
  console.log("j'arrive dans le dashboard");
  console.log("je console log le body");
  console.log(req.body);
  console.log(req.body.user.name);
  const user = req.body.user;
  const userVirus = await User.findOne({_id: user._id}).populate('virus');

  console.log(userVirus.virus);

  res.status(200).send({
    virus: userVirus.virus
  })
  // res.render('dashboard', {
  //   user: user,
  //   virus: populatedUser.virus
  // });
});

///////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////// ONGLET ACHATS (GET) (probablement obsolète pour react)

const payer = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.cookies.email });
  const product = await Product.find();

  res.render('payer', {
    customerId: user.customerId,
    user: user,
    product: product,
    key: process.env.PUBLISHABLE_KEY

  });
});
///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////// RECUPERATION DE MOT DE PASSE


// ETAPE 1 : Envoyer le lien de modification par mail à l'utilisateur (POST)

const emailPaswordRecovery = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("We don't know that email", 401);
  }
  // On génère un token qui sera utilisé afin de préparer la vue de changement de mot de passe
  user.generateAccountToken();
  user.save();
  // On envoie un email à l'utilisateur afin qu'il puisse modifier son mot de passe. Provient de la lib nodemailer
  const sendEmail = await sendPasswordRecoveryEmail(user);
  res.status(200).json({ message: 'Un email de récupération vous a été renvoyé', email: sendEmail });
});
/////////////


// ETAPE 2 : C'est ici que pointe le lien de modification de mot de passe, qui renvoie une vue afin de le modifier (GET)

const newPasswordForm = catchAsync(async (req, res, next) => {
  // REQ.BODY ou REQ.PARAMS ?
  console.log(req);
  console.log('caca ?');
  const user = await User.findOne({ accountToken: req.params.token, accountTokenExpires: { $gt: Date.now() } });
  if (!user) {
    // Ici nous pourrions renvoyer vers la vue d'envoie du mail de renvoie d'un mail avec token
    throw new AppError('Password reset token is invalid or has expired');
  }
  res.render('resetpwd', { user });

});
//////////


// ETAPE 3 : C'est ici que pointe le formulaire de modification de mot de passe afin de l'enregistrer en DB. (POST)


const saveNewPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ accountToken: req.body.token, accountTokenExpires: { $gt: Date.now() } });
  console.log('le user !' + user);
  console.log(user);
  if (!user) {
    // Ici nous pourrions renvoyer vers la vue d'envoie du mail de renvoie d'un mail avec token
    const error = new AppError('Password reset token is invalid or has expired');
    res.json({ error });
  }
  user.password = req.body.password;
  user.accountToken = undefined;
  user.accountTokenExpires = undefined;

  await user.save();

  console.log("mot de passe modifié");
  res.json({ message: "salut" });
  // const sendEmail = await newPwdConfirmation(user);
  // res.status(201).json({ message: "mot de passe mis à jour" });
});
////////////////

///////////////////////////////////////////////////////////////////////FIN RECUPERATION MDP


module.exports = { login, signup, dashboard, payer, emailPaswordRecovery, saveNewPassword, newPasswordForm, emailValidation, accountValidation };
