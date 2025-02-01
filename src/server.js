require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe("sk_test_51QndE0GaLbzsMnocN6aOruHa3LOV2oa9bDkYIKCcd0h0T5i7bCnRWFlo9zfIIBPkG60zzxlImCNUaj6ezmOeCRgm00REaU9ovy"); 

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
