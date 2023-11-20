import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionsData, initFileData } from "@/lib/file-db";

export async function GET(_: NextRequest) {
  const subscriptions = await getSubscriptionsData();
  return NextResponse.json(subscriptions);
}
