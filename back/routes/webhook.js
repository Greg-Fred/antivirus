const express = require('express');
const router = express.Router();
const webhook = require('../controllers/webhook');

// La route du webhook de stripe

router.post('/webhook', webhook);


module.exports = router
