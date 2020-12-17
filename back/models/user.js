const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Module qui aide mongoose mais son role ne me revient pas, à revoir. ***
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Notre modèle user qui a une relation OneToMany avec les virus


// Validation d'email custom
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;



// Schema

const userSchema = Schema({
  email: {
    type: String,
    required: true, unique: true
  },
  status: { type: String, default: "pending"},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'basic', enum: ['basic', 'pro'] },
  virus: [{ type: Schema.Types.ObjectId, ref: 'Virus' }], // La ligne qui donne corp à la relation OneToMany avec les virus
  customerId: { type: String },
  accountToken: { type: String },
  accountTokenExpires: { type: Date }
}, { timestamps: true });

// Pre-method pour BCRYPT
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Custom validation :

userSchema.path('email').validate(function isEmailValid(email) {
  if (!email)
    return false;

  if (email.length > 254)
    return false;

  var valid = emailRegex.test(email);
  if (!valid)
    return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64)
    return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some(function (part) { return part.length > 63; }))
    return false;

  return true;
}, "Ton mail ne respecte rien mon gars !" );

// Methodes d'instance

// Bcrypt vérification
userSchema.methods.passwordComparaison = function (password) {
  return bcrypt.compare(password, this.password);
};

//Création d'un token
userSchema.methods.createToken = function () {
  console.log(this);
  return jwt.sign(
    { userId: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
};

// Création du token de compte utile à la validation de mail et à la récupération de mot de passe

userSchema.methods.generateAccountToken = function () {
  this.accountToken = crypto.randomBytes(20).toString('hex');
  this.accountTokenExpires = Date.now() + 3600000; //Dans une heure
};

// Application du module 'unique validator' pour mongoose **
userSchema.plugin(uniqueValidator);


const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
