import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map product IDs to Stripe Price IDs — update these after creating products in Stripe
const PRICES = {
  // Subscriptions
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  scale: process.env.STRIPE_PRICE_SCALE,
  generator: process.env.STRIPE_PRICE_GENERATOR,
  // One-time templates
  template_1: process.env.STRIPE_PRICE_TEMPLATE_1,
  template_2: process.env.STRIPE_PRICE_TEMPLATE_2,
  template_3: process.env.STRIPE_PRICE_TEMPLATE_3,
  template_4: process.env.STRIPE_PRICE_TEMPLATE_4,
  template_5: process.env.STRIPE_PRICE_TEMPLATE_5,
  template_6: process.env.STRIPE_PRICE_TEMPLATE_6,
  template_7: process.env.STRIPE_PRICE_TEMPLATE_7,
  template_8: process.env.STRIPE_PRICE_TEMPLATE_8,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { priceKey, mode } = req.body;

  if (!priceKey || !PRICES[priceKey]) {
    return res.status(400).json({ error: "Invalid product" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment", // "payment" for one-time, "subscription" for recurring
      line_items: [
        {
          price: PRICES[priceKey],
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin || "https://tools.fundalmedia.dk"}?success=true`,
      cancel_url: `${req.headers.origin || "https://tools.fundalmedia.dk"}?canceled=true`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Checkout failed. Please try again." });
  }
}
