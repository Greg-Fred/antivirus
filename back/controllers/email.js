
const { catchAsync, AppError } = require('../lib/AppError');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'morris.padberg@ethereal.email',
    pass: 'fHp5uqVp6wzF2M2yKr'
  }
});

const newPwdConfirmation = catchAsync( async (user) => {
  //send email de confirmation de la modification du mot de passe
  console.log("on est pas loin. Il faut faire la méthode newPwdConfiamtion maintenant !");
});

const sendTest = catchAsync( async (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const { to, subject, text } = req.body;
  const mailData = {
    from: 'morris.padberg@ethereal.email',  // sender address
    to: to,   // list of receivers
    subject: subject,
    text: text,
    html: '<b>Bonjour monsieur Gregou !</b> < br > This is our first message sent with Nodemailer < br /> ',
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
      res.status(201).json({ message: "c'est arrivé !", log: info});
  });
});

module.exports = { sendTest, newPwdConfirmation };
