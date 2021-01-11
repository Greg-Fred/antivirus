const { catchAsync, AppError } = require('../lib/AppError');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require('nodemailer');

//credentials du compte smtp ethereal

const smtpCredentials = {
  name: "Scotty Gleichner",
  email: "elliott46@ethereal.email",
  password: "5dnSXrw8kJfMU55HTF"
};


// sendgrid credentials

const sendGridCredentials = {
  username: "apikey",
  password: "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"
}

//configuration du serveur smtp

const smtpConfig = {
  host: 'smtp.sendgrid.net',
  port: 465
};

// Initialisation de nodemailer.

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth: {
    user: sendGridCredentials.username,
    pass: sendGridCredentials.password
  }
});


// Envoie de l'email de récupération de mot de passe

const sendPasswordRecoveryEmail = catchAsync(async (user, next) => {
  let link = "http://localhost:3000/auth/reset/" + user.accountToken;
  const mailData = {
    from: "fedde.leg@gmail.com",  // sender address
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





//Email avec sendgrid

const sendVerificationEmail = catchAsync(async (user, next) => {
  let link = `https://antivirus-gregouillette-fredo.herokuapp.com/auth/emailValidation/${user._id}/${user.accountToken}`;

  const msg = {
    to: user.email, // Change to your recipient
    from: 'fedde.leg@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: `Bonjour ${user.name} ! \n
//     Pour valider ton compte click ici :  ${link} \n
//     enculé :D`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
});




// Email de validation de compte nodemailer

// const sendVerificationEmail = catchAsync( async (user, next) => {
//   let link = `http://localhost:3000/auth/emailValidation/${user._id}/${user.accountToken}`;
//   const mailData = {
//     from: smtpCredentials.email,  // sender address
//     to: user.email,   // list of receivers
//     subject: "Validation de compte !",
//     text: `Bonjour ${user.name} ! \n
//     Pour valider ton compte click ici :  ${link} \n
//     enculé :D`
//   };

//   transporter.sendMail(mailData, function (err, info) {
//     if (err)
//       console.log(err)
//     else
//       console.log(info);
//     res.status(201).json({ message: "c'est arrivé !", log: info });
//   });
// });



// FULL SENDGRID




module.exports = {  sendPasswordRecoveryEmail, sendVerificationEmail };
