const express = require('express');
const router = express.Router();
const dotenv = require('dotenv'); // Corrected require statement for dotenv
const Stripe = require('stripe');

dotenv.config(); // Load environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Corrected instance creation

// Assuming YOUR_DOMAIN is defined in your .env file
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Hh2YzEIEunygoAKeLxIbqQ2', // Replace with your actual Price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
  
    res.redirect(303, session.url);
  });

module.exports = router;