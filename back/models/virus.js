const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
// Notre modèle virus qui a une relation OneToMany avec les utilisateurs

const virusSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Cette ligne donne corp à la relation OneToMany qu'il possède avec l'utilisateur
  name: { type: String, required: true },
  // cloudinary_id: { type: String, required: true },
  size: { type: Number, required: true },
  post_date: { type: Date, default: Date.now },
  report: {type: String},
  type: {type: String}
});

virusSchema.plugin(uniqueValidator);

const Virus = mongoose.model('Virus', virusSchema, 'Virus');

module.exports = Virus;
