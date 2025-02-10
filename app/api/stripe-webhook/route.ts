import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const event: Stripe.Event = await req.json();

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was successful!", paymentIntentSucceeded);
      // Handle the event
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent failed!", paymentIntentFailed);
      // Handle the event
      break;
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was canceled!", paymentIntentCanceled);
      // Handle the event
      break;
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed!", checkoutSession);
      // Handle the event
      if (checkoutSession.status === "complete") {
        const payid = checkoutSession.id;
        const uid = checkoutSession.client_reference_id;
        const location = checkoutSession.metadata?.location;
        const pricing = checkoutSession.metadata?.pricing;
        // TODO: check if one time payment or subscription
        const data = {
          payid: payid,
          date: new Date(),
          location: location,
          pricing: pricing,
          amount: checkoutSession.amount_total,
          created: checkoutSession.created,
          currency: checkoutSession.currency,
          payment_status: checkoutSession.payment_status,
          status: checkoutSession.status,
        };
        console.log("Data", data);
        if (uid) {
          await db
            .collection("user-information")
            .doc(uid)
            .collection("check-ins")
            .add(data);
        }
      }

    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
