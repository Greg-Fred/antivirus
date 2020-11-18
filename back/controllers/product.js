const Product = require('../models/product');
const User = require('../models/user');

exports.getAll = async (req, res, next) => {
  const allProduct = await Product.find({});
  console.log(allProduct);
  res.render('testproduct', {
    products: allProduct
  })
};

exports.get = async (req, res, next) => {
  console.log(JSON.stringify(req.params));
  const product = await Product.findById({_id: req.params.id});
  console.log(product);
};
