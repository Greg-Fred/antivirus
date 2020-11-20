const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Module qui aide mongoose mais son role ne me revient pas, à revoir. ***
const Schema = mongoose.Schema;

// Notre modèle user qui a une relation OneToMany avec les virus

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'basic', enum: ['basic', 'pro'] },
  virus: [{ type: Schema.Types.ObjectId, ref: 'Virus' }] // La ligne qui donne corp à la relation OneToMany avec les virus
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema, 'Users');
