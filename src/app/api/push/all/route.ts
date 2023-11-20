import { NextResponse, NextRequest } from "next/server";
import { getSubscriptionsData } from "@/lib/file-db";

import { CONFIG } from "@/config";
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@example.com",
  CONFIG.PUBLIC_KEY,
  CONFIG.PRIVATE_KEY
);

//푸시 보내기
export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload: { title: string; body: string; link: string } = body.payload;
  const subscriptions = await getSubscriptionsData();

  subscriptions.forEach((s) => {
    webpush.sendNotification(s, JSON.stringify(payload));
  });

  return NextResponse.json({
    message: `${subscriptions.length}명 구독 >> 메시지 보냄!`,
  });
}
