import { NextRequest, NextResponse } from "next/server";
import {
  sendTelegramSponsorMessage,
  type SponsorSubmissionData,
} from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SponsorSubmissionData;

    if (
      !body.brandName?.trim() ||
      !body.contactName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim()
    ) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ các thông tin bắt buộc." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await sendTelegramSponsorMessage({
      ...body,
      ip,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      telegramDelivered: result.success,
      warning: result.error,
    });
  } catch (error) {
    console.error("[API Sponsor Route Error]:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống khi gửi thông tin." },
      { status: 500 }
    );
  }
}
