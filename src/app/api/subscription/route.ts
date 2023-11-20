import { saveSubscriptionToData } from "@/lib/file-db";
import { NextRequest, NextResponse } from "next/server";

//구독하기
export async function POST(request: NextRequest) {
  const subscription = (await request.json()) as PushSubscription | null;

  if (!subscription) {
    console.error("No subscription was provided!");
    return NextResponse.json({ message: "fail" });
  }

  const updatedDb = saveSubscriptionToData(subscription);

  return NextResponse.json({ message: "success", updatedDb });
}
