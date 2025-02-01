const stripe = require('stripe')('sk_test_51QndE0GaLbzsMnocN6aOruHa3LOV2oa9bDkYIKCcd0h0T5i7bCnRWFlo9zfIIBPkG60zzxlImCNUaj6ezmOeCRgm00REaU9ovy');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));