const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              description: item.desc,
              images: [item.img],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/success`,
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json(session.url);
  } catch (err) {
    res.status(500).json(err);
  }
});

// stripe.charges.create(
//   {
//     source: req.body.tokenId,
//     amount: req.body.amount,
//     currency: "usd",
//   },
//   (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).json(stripeErr);
//     } else {
//       res.status(200).json(stripeRes);
//     }
//   }
// );

module.exports = router;
