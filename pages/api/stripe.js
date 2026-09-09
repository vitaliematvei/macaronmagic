import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: 'Stripe secret key is not configured',
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const cartItems = Array.isArray(req.body) ? req.body : [];

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      });
    }

    const lineItems = cartItems.map((item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (!item.name || !Number.isFinite(price) || price <= 0) {
        throw new Error(
          `Preț invalid pentru produsul: ${item.name || 'necunoscut'}`,
        );
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Cantitate invalidă pentru produsul: ${item.name}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      };
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.origin ||
      'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/canceled`,
    });

    return res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe API error:', error);

    return res.status(500).json({
      message: error.message || 'Unable to create Stripe checkout session',
    });
  }
}
