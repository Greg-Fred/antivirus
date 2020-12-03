const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');

// Les routes des produits

router.get('/', productCtrl.allProduct);
router.get('/:id', productCtrl.userInfo);

module.exports = router

