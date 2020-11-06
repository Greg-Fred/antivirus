const mongoose = require('mongoose');

const VirusSchema = mongoose.Schema({
  name: {type: String, required: true},
  cloudinary_id: {type: String, required: true},
  userId: {type: String, required: true},
  size: {type: Number, required: true},
  post_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Virus', VirusSchema);
