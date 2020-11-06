const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'basic', enum: ['basic', 'pro'] }
});


UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
