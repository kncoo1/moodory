import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;

  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const reply = `I'm really proud of you for sharing this. Remember, even hard days are part of your growth. You are doing better than you think.`;

  return NextResponse.json({ reply });
}
