const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');

// Les routes des produits

router.get('/', productCtrl.getAll);
router.get('/:id', productCtrl.get);

module.exports = router

