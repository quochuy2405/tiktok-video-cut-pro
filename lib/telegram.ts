/**
 * Telegram Notification Service for Sponsor / Partner Inquiries
 */

export interface SponsorSubmissionData {
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  budget?: string;
  note?: string;
  locale?: string;
  userAgent?: string;
  ip?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendTelegramSponsorMessage(
  data: SponsorSubmissionData
): Promise<{ success: boolean; error?: string }> {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN?.trim() ||
    // Fallback if token is in .env directly without prefix
    (process.env.TELEGRAM_TOKEN?.trim());

  const chatId =
    process.env.TELEGRAM_CHAT_ID?.trim() ||
    process.env.TELEGRAM_CHANNEL_ID?.trim();

  if (!botToken || !chatId) {
    const missing: string[] = [];
    if (!botToken) missing.push("TELEGRAM_BOT_TOKEN");
    if (!chatId) missing.push("TELEGRAM_CHAT_ID/TELEGRAM_CHANNEL_ID");
    console.warn(
      `[Telegram Sponsor] Cannot send notification, missing config: ${missing.join(", ")}`
    );
    return {
      success: false,
      error: `Missing environment variables: ${missing.join(", ")}`,
    };
  }

  const now = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });

  const message = [
    "<b>🚀 ĐĂNG KÝ TÀI TRỢ MỚI (SPONSOR LEAD)</b>",
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    `🏢 <b>Nhãn hàng:</b> ${escapeHtml(data.brandName)}`,
    `👤 <b>Người liên hệ:</b> ${escapeHtml(data.contactName)}`,
    `📧 <b>Email:</b> <code>${escapeHtml(data.email)}</code>`,
    `📞 <b>Điện thoại:</b> <code>${escapeHtml(data.phone)}</code>`,
    `💰 <b>Ngân sách:</b> ${escapeHtml(data.budget || "Chưa chọn")}`,
    "",
    "📝 <b>Ghi chú / Nhu cầu:</b>",
    `<i>${escapeHtml(data.note || "Không có")}</i>`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    `🌐 <b>Hệ thống:</b> Five Cut Pro Website`,
    `⏰ <b>Thời gian:</b> ${now}`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const result = (await res.json()) as { ok: boolean; description?: string };

    if (!result.ok) {
      console.error("[Telegram Sponsor Error]:", result.description);
      return {
        success: false,
        error: result.description || "Telegram API returned an error",
      };
    }

    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Telegram Sponsor Network Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
