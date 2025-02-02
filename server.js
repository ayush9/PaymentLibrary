const stripe = require('stripe')('sk_test_51QndE0GaLbzsMnocN6aOruHa3LOV2oa9bDkYIKCcd0h0T5i7bCnRWFlo9zfIIBPkG60zzxlImCNUaj6ezmOeCRgm00REaU9ovy');
const express = require('express');
const braintree = require('braintree');
const app = express();
app.use(express.json());

// Configure Braintree Gateway
const gateway = new braintree.BraintreeGateway({
        environment:  braintree.Environment.Sandbox,
        merchantId:   'hxwc8wkxctk78jpr',
        publicKey:    '9whs7pfxm6rm6cfz',
        privateKey:   'd700204f25005a5ad9808623bb84f3a4'
});


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


// Endpoint to generate a client token
app.get('/client_token', async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ clientToken: response.clientToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));