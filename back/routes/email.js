const express = require('express');
const router = express.Router();
const emailCtrl = require("../controllers/email");

// Les routes des produits

router.post('/testemail', emailCtrl.sendTest);
module.exports = router

