const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const stripeCtrl = require('../controllers/stripe');

// Les routes des produits

router.post('/create-subscription', stripeCtrl.createSubscription );
router.post('/retry-invoice', stripeCtrl.retryInvoice);
router.post('/retrieve-upcoming-invoice', stripeCtrl.retrieveUpcomingInvoice);
router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), stripeCtrl.stripeWebhook);
module.exports = router

