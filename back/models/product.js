const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notre modèle Produit

const ProductSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: [{ type: String, required: true, default: "Une description du produit" }],
  image: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema, "Products");
