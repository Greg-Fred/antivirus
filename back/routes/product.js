const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer');
// const validation = require('../middleware/validation');


// En phase de dévellopement. J'enlève les auth et validations :
router.get('/', productCtrl.getAll);
router.get('/:id', productCtrl.get);

module.exports = router

