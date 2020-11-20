const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notre modèle virus qui a une relation OneToMany avec les utilisateurs

const VirusSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Cette ligne donne corp à la relation OneToMany qu'il possède avec l'utilisateur
  name: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  size: { type: Number, required: true },
  post_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Virus', VirusSchema, 'Virus');

