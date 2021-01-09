const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notre modèle Produit

const productSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: [{ type: String, required: true, default: "Une description du produit" }],
  image: { type: String },
  productId: {type: String},
  priceId: {type: String}
});


const Product = mongoose.model('Product', productSchema, "Products");

module.exports = Product;
