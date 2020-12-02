const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Module qui aide mongoose mais son role ne me revient pas, à revoir. ***
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Notre modèle user qui a une relation OneToMany avec les virus

// Schema

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'basic', enum: ['basic', 'pro'] },
  virus: [{ type: Schema.Types.ObjectId, ref: 'Virus' }], // La ligne qui donne corp à la relation OneToMany avec les virus
  customerId: {type: String}
});

// Pre-method pour BCRYPT
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

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

// Application du module 'unique validator' pour mongoose **
userSchema.plugin(uniqueValidator);


const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
