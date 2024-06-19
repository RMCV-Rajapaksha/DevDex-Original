const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const Stripe = require('stripe');

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

router.post('/create-checkout-session', async (req, res) => {
  try {
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: req.body.item.name,
            },
            unit_amount: req.body.item.price * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    //   success_url: `${YOUR_DOMAIN}/success.html`,
    //   cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    // Respond with the session URL
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
