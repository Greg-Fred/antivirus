const { catchAsync, AppError } = require('../lib/AppError');
const User = require('../models/user'); // jwt gère le systeme de token
const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const cookieParser = require('cookie-parser');
const util = require('util');
const { model } = require('../models/user');


const createSubscription = catchAsync(async (req, res) => {
  // Set the default payment method on the customer
  await stripe.paymentMethods.attach(req.body.paymentMethodId, {
    customer: req.body.customerId,
  });
  let updateCustomerDefaultPaymentMethod = await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceId }],
    expand: ['latest_invoice.payment_intent'],
  });
  res.send(subscription);
});


const retryInvoice = catchAsync(async (req, res) => { // <======================================================= doute sur l'utilité !
  // Set the default payment method on the customer
  await stripe.paymentMethods.attach(req.body.paymentMethodId, {
    customer: req.body.customerId,
  });
  await stripe.customers.update(req.body.customerId, {
    invoice_settings: {
      default_payment_method: req.body.paymentMethodId,
    },
  });
  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent'],
  });
  res.send(invoice);
});

const retrieveUpcomingInvoice = catchAsync(async (req, res) => { // <==================== doute sur l'utilité !
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );
  const invoice = await stripe.invoices.retrieveUpcoming({
    subscription_prorate: true,
    customer: req.body.customerId,
    subscription: req.body.subscriptionId,
    subscription_items: [
      {
        id: subscription.items.data[0].id,
        deleted: true,
      },
      {
        price: process.env[req.body.newPriceId],
        deleted: false,
      },
    ],
  });
  res.send(invoice);
});


const stripeWebhook = catchAsync(async (req, res) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;
    event = stripe.webhooks.constructEvent(
      req.body,
      req.header('Stripe-Signature'),
      process.env.STRIPE_WEBHOOK
    );
  // Extract the object from the event.
  const dataObject = event.data.object;

  // Handle the event
  // Review important events for Billing webhooks
  // https://stripe.com/docs/billing/webhooks
  // Remove comment to see the various objects sent for this sample
  switch (event.type) {

    case 'customer.subscription.created':
      console.log('Abonnement créé !' + dataObject);
    case 'invoice.paid':
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your
      // database to reference when a user accesses your service to avoid hitting rate limits.
      break;
    case 'invoice.payment_failed':
      // If the payment fails or the customer does not have a valid payment method,
      //  an invoice.payment_failed event is sent, the subscription becomes past_due.
      // Use this webhook to notify your user that their payment has
      // failed and to retrieve new card details.
      break;
    case 'invoice.finalized':
      // If you want to manually send out invoices to your customers
      // or store them locally to reference to avoid hitting Stripe rate limits.
      break;
    case 'customer.subscription.deleted':
      if (event.request != null) {
        // handle a subscription cancelled by your request
        // from above.
      } else {
        // handle subscription cancelled automatically based
        // upon your subscription settings.
      }
      break;
    case 'customer.subscription.trial_will_end':
      // Send notification to your user that the trial will end
      break;
    default:

    // Unexpected event type
  }
  res.sendStatus(200);
}
);

module.exports = { createSubscription, stripeWebhook, retrieveUpcomingInvoice, retryInvoice };
