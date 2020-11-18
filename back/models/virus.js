const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VirusSchema = Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  cloudinary_id: {type: String, required: true},
  size: {type: Number, required: true},
  post_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Virus', VirusSchema, 'Virus');

