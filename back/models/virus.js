const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VirusSchema = Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  cloudinary_id: {type: String, required: true},
  size: {type: Number, required: true},
  post_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Virus', VirusSchema);

// Ici j'ai rajouté un système d'Id. Attention Mongo db générait déja un id. A voir dans le tuto.
