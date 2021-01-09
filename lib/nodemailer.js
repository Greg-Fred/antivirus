const { catchAsync, AppError } = require('../lib/AppError');
const nodemailer = require('nodemailer');

//credentials du compte smtp

const smtpCredentials = {
  name: "Scotty Gleichner",
  email: "minnie15@ethereal.email",
  password: "gfHa7sd69mGXBFqwfn"
};

//configuration du serveur smtp

const smtpConfig = {
  host: 'smtp.ethereal.email',
  port: 587
};

// Initialisation de nodemailer.

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth: {
    user: smtpCredentials.email,
    pass: smtpCredentials.password
  }
});


// Envoie de l'email de récupération de mot de passe

const sendPasswordRecoveryEmail = catchAsync(async (user, next) => {
  let link = "http://localhost:3000/auth/reset/" + user.accountToken;
  const mailData = {
    from: smtpCredentials.email,  // sender address
    to: user.email,   // list of receivers
    subject: "Récupération de mot de passe",
    text: `Bonjour ${user.name} ! \n
    Pour recéer ton mot de passe, click ici : ${link} \n
    enculé :D`
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
    res.status(201).json({ message: "c'est arrivé !", log: info });
  });

});

// const sendTest = catchAsync(async (req, res, next) => {
//   console.log(req);
//   console.log(req.body);
//   const { to, subject, text } = req.body;
//   const mailData = {
//     from: smtpCredentials.email,  // sender address
//     to: to,   // list of receivers
//     subject: subject,
//     text: text,
//     html: '<b>Bonjour monsieur Gregou !</b> < br > This is our first message sent with Nodemailer < br /> ',
//   };

//   transporter.sendMail(mailData, function (err, info) {
//     if (err)
//       console.log(err)
//     else
//       console.log(info);
//     res.status(201).json({ message: "c'est arrivé !", log: info });
//   });
// });

// Email de validation de compte

const sendVerificationEmail = catchAsync( async (user, next) => {
  let link = `http://localhost:3000/auth/emailValidation/${user._id}/${user.accountToken}`;
  const mailData = {
    from: smtpCredentials.email,  // sender address
    to: user.email,   // list of receivers
    subject: "Validation de compte !",
    text: `Bonjour ${user.name} ! \n
    Pour valider ton compte click ici :  ${link} \n
    enculé :D`
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
    res.status(201).json({ message: "c'est arrivé !", log: info });
  });
});

module.exports = {  sendPasswordRecoveryEmail, sendVerificationEmail };
