import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  getShopPainting,
  isForSale,
  SHIPPING_RATES,
  ALLOWED_SHIPPING_COUNTRIES,
  ShippingRegion,
} from '../../../data/shop';

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Os pagamentos ainda não estão configurados neste site. Contacte a artista diretamente.' },
      { status: 500 }
    );
  }

  let body: { paintingId?: string; region?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const { paintingId, region } = body;

  if (!paintingId || !isForSale(paintingId)) {
    return NextResponse.json({ error: 'Esta obra não está disponível para compra.' }, { status: 400 });
  }

  const shippingRate = region ? SHIPPING_RATES[region as ShippingRegion] : undefined;
  if (!shippingRate) {
    return NextResponse.json({ error: 'Região de envio inválida.' }, { status: 400 });
  }

  const painting = getShopPainting(paintingId)!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${painting.title} (Obra Original)`,
              description: `Pintura original, acrílico em tela - ${painting.dimensions}. Por Naia Sousa.`,
            },
            unit_amount: Math.round(painting.priceEUR! * 100),
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: { allowed_countries: ALLOWED_SHIPPING_COUNTRIES as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingRate.amountCents, currency: 'eur' },
            display_name: `Envio - ${shippingRate.label}`,
          },
        },
      ],
      success_url: `${siteUrl}/loja/sucesso?obra=${encodeURIComponent(painting.title)}`,
      cancel_url: `${siteUrl}/#portfolio`,
      metadata: { paintingId: painting.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Não foi possível iniciar o pagamento. Tente novamente.' }, { status: 500 });
  }
}
