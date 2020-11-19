const express = require('express');
const router = express.Router();
const webhook = require('../controllers/webhook');


//s'occuper d'un middleware de filtrage (nombre de upload par)
router.post('/webhook', webhook);


module.exports = router
