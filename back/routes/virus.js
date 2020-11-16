const express = require('express');
const router = express.Router();
const virusCtrl = require('../controllers/virus');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const validation = require('../middleware/validation');


//s'occuper d'un middleware de filtrage (nombre de upload par)
router.post('/upload',auth, multer, validation, virusCtrl.uploaders);


module.exports = router

