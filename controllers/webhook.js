
/* /// COMMENTAIRE

Notre Webhook pour stripe - Fonctionnel, la structure est la mais elle est à peupler, c'est encore une coquille vide.
*/

module.exports = (req, res, next) => {
  let event;
  console.log('La requête de stripe ____ :' + req.body);

  try {
    event = JSON.parse(req.body);

  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  console.log("Le webhook fonctionne, c'est pour cette raison que ce message apparait :D !");
  res.status(200).json({ received: true });
};

