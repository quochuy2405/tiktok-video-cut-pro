import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function parseTikTokSignatureHeader(header: string | null): { t: string; s: string } | null {
  if (!header) return null;
  let t: string | undefined;
  let s: string | undefined;
  for (const part of header.split(",")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key === "t") t = val;
    if (key === "s") s = val;
  }
  if (!t || !s) return null;
  return { t, s };
}

function verifyTikTokWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  clientSecret: string,
  maxSkewSeconds: number,
): boolean {
  const parsed = parseTikTokSignatureHeader(signatureHeader);
  if (!parsed) return false;

  const signedPayload = `${parsed.t}.${rawBody}`;
  const expectedHex = createHmac("sha256", clientSecret).update(signedPayload).digest("hex");

  let expectedBuf: Buffer;
  let receivedBuf: Buffer;
  try {
    expectedBuf = Buffer.from(expectedHex, "hex");
    receivedBuf = Buffer.from(parsed.s, "hex");
  } catch {
    return false;
  }

  if (expectedBuf.length !== receivedBuf.length || !timingSafeEqual(expectedBuf, receivedBuf)) {
    return false;
  }

  const ts = Number.parseInt(parsed.t, 10);
  if (!Number.isFinite(ts)) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return Math.abs(nowSec - ts) <= maxSkewSeconds;
}

/** TikTok Developer Portal callback — POST JSON events, optional HMAC via `TIKTOK_CLIENT_SECRET`. */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const secret = process.env.TIKTOK_CLIENT_SECRET;

  const signatureHeader = request.headers.get("tiktok-signature");

  if (secret) {
    const maxSkew = Number.parseInt(process.env.TIKTOK_WEBHOOK_MAX_SKEW_SECONDS ?? "300", 10);
    const skew = Number.isFinite(maxSkew) ? maxSkew : 300;
    if (!verifyTikTokWebhookSignature(rawBody, signatureHeader, secret, skew)) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  if (rawBody.length > 0) {
    try {
      JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "invalid json" }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/** Health / portal “test URL” probe — must return 2xx on HTTPS. */
export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
