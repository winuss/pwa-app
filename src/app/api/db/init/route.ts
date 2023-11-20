import { NextRequest, NextResponse } from "next/server";
import { initFileData } from "@/lib/file-db";

export async function POST(request: NextRequest) {
  const result = await initFileData();

  return NextResponse.json(result);
}
