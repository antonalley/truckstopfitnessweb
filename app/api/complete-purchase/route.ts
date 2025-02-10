import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    console.log("Request headers: ", req.headers.get("origin"));
    const { searchParams } = new URL(req.url);
    const pricing = searchParams.get("pricing");
    console.log("Pricing", pricing);
    const container_location = searchParams.get("container_location");
    let price_id = "";
    let mode: Stripe.Checkout.SessionCreateParams.Mode = "payment";
    if (pricing === "one-time-use") {
      price_id = "price_1Qow8YB9IjT0aVOi83iXq5ye";
      mode = "payment";
    } else {
      price_id = "price_1QowIfB9IjT0aVOiXSsPLES6";
      mode = "subscription";
    }

    const uid = searchParams.get("uid");
    console.log("UID", uid);
    if (uid === null) {
      throw Error("User ID is required");
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price_id,
          quantity: 1,
        },
      ],
      client_reference_id: uid,
      mode: mode,
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      automatic_tax: { enabled: true },
      metadata: { pricing: pricing, location: container_location },
    });
    if (session.url) {
      return NextResponse.json({ url: session.url });
    } else {
      return NextResponse.json(
        { error: "Session URL is null" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(err.message, { status: err.statusCode || 500 });
  }
}

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  // Do whatever you want
  // res.status(405).json({ error: "Method not allowed" });
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
