import { NextResponse, NextRequest } from "next/server";
import { getSubscriptionsData } from "@/lib/file-db";

import { CONFIG } from "@/config";
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@example.com",
  CONFIG.PUBLIC_KEY,
  CONFIG.PRIVATE_KEY
);
export async function POST(request: NextRequest) {
  const body = await request.json();
  const subscription = body.pushSubscription as PushSubscription | null;
  const payload: { title: string; body: string; link: string } = body.payload;

  console.log("payload", payload);

  webpush
    .sendNotification(subscription, JSON.stringify(payload))
    .catch((error: any) => {
      return NextResponse.json({
        message: error.message,
      });
    });

  return NextResponse.json({
    message: `구독자 >> 메시지 보냄!`,
  });
}
