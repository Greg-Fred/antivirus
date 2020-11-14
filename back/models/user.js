const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'basic', enum: ['basic', 'pro'] },
  virus: [{ type: Schema.Types.ObjectId, ref: 'Virus'}]
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
