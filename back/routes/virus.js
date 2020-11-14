const express = require('express');
const router = express.Router();
const virusCtrl = require('../controllers/virus');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


//s'occuper d'un middleware de filtrage (nombre de upload par)
router.post('/upload',auth, multer, virusCtrl.uploaders);


module.exports = router

