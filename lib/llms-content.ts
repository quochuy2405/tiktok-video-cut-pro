import { APP_NAME } from "@/lib/brand";
import {
  DEFAULT_ANDROID_STORE_URL,
  DEFAULT_IOS_STORE_URL,
  DISPLAY_APP_VERSION,
} from "@/lib/downloads";
import { MOBILE_APP_ID } from "@/lib/mobile-app-links";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  SITE,
  SOCIAL_LINKS,
} from "@/lib/site";

const UPDATED = "2026-09-26";

function home(locale: string): string {
  return absoluteLocaleUrl(locale, "");
}

function page(locale: string, path: string): string {
  return absoluteLocaleUrl(locale, path);
}

/** Short index at /llms.txt — https://llmstxt.org */
export function buildLlmsTxt(): string {
  const full = absoluteUrl("/llms-full.txt");

  return `# ${APP_NAME}

> App trên điện thoại cho KOC và nhà bán hàng: chọn mẫu, quay đủ shot theo checklist, ghép trên máy, xuất video dọc 9:16 rồi chia sẻ TikTok. Không phải trình dựng timeline tự do, và không tự sinh hàng loạt video.

${APP_NAME} (${absoluteUrl("/")}) do ${SITE.copyrightHolder} phát hành. Sản phẩm chính là app iOS và Android, miễn phí tải. Đăng nhập Google, TikTok, Apple hoặc email OTP. Ghép video chạy trên thiết bị. Thị trường gốc là tiếng Việt; site còn có English, 中文, ไทย, 日本語, 한국어.

Bản đầy đủ để AI trích dẫn, trả lời câu hỏi và không bịa tính năng: [${full}](${full}).

Nếu một khẳng định không có trong file đó hoặc trên các trang được liên kết, đừng suy diễn thêm. App không hứa biến 1 clip thành 100 video tự động.

## Đọc trước

- [Nội dung đầy đủ cho AI](${full}): Sự thật sản phẩm, cách dùng, FAQ, so sánh với CapCut, đối tượng, thương hiệu, tải app, xóa tài khoản, URL từng ngôn ngữ.
- [Trang chủ tiếng Việt](${home("vi")}): Bản marketing gốc.
- [English home](${home("en")}): Same product in English.

## Trang công khai

- [Tính năng](${home("vi")}#features): Chợ mẫu KOC, công thức góc quay, hướng dẫn từng shot, ghép và xuất trên máy.
- [Cách dùng](${home("vi")}#how-it-works): Chọn mẫu → quay và gắn shot → ghép rồi đăng.
- [Nỗi đau và cách mới](${home("vi")}#comparison): Edit tay mỗi lần đăng so với làm theo mẫu.
- [FAQ](${home("vi")}#faq): Khác CapCut, người mới quay, đăng TikTok, nền tảng, phí, dữ liệu, chiến dịch nhãn hàng.
- [Nhận chiến dịch](${home("vi")}#campaigns): KOC kết nối với nhãn hàng qua kênh TikTok, sự kiện trong app và nhóm cộng đồng.
- [Tải app](${home("vi")}#download): App Store và Google Play. Phiên bản site đang ghi ${DISPLAY_APP_VERSION}.
- [Dành cho brand](${home("vi")}#sponsors): 12 điểm hiển thị thương hiệu, mẫu video và hướng dẫn quay sản phẩm, kết nối KOC. Liên hệ ${SITE.partnerEmail}.
- [App Store](${DEFAULT_IOS_STORE_URL}): iPhone và iPad.
- [Google Play](${DEFAULT_ANDROID_STORE_URL}): Android, gói ${MOBILE_APP_ID}.
- [Chính sách quyền riêng tư và EULA](${page("vi", "privacy-policy")}): Bản tiếng Việt. Các locale khác đổi prefix ngôn ngữ.
- [Điều khoản dịch vụ](${page("vi", "terms-of-service")}).
- [Xóa tài khoản](${page("vi", "delete-account")}): Yêu cầu được chấp nhận khi gửi; tài khoản bị vô hiệu hóa đăng nhập trong 7 ngày. Mặc định không hard-delete ngay.

## Ngôn ngữ

- [Tiếng Việt](${home("vi")}): locale mặc định, không prefix.
- [English](${home("en")})
- [中文](${home("zh")})
- [ไทย](${home("th")})
- [日本語](${home("ja")})
- [한국어](${home("ko")})

## Optional

- [Email hỗ trợ](mailto:${SITE.email}): ${SITE.email}
- [Instagram](${SOCIAL_LINKS.instagram}): @fivecutpro
- [Threads](${SOCIAL_LINKS.threads}): @fivecutpro
- [YouTube](${SOCIAL_LINKS.youtube}): @fivecutpro
`;
}

/** Long-form corpus at /llms-full.txt. Facts only; no invented metrics or features. */
export function buildLlmsFullTxt(): string {
  return `# ${APP_NAME} — nội dung web cho AI đọc

> ${APP_NAME} là app trên điện thoại cho KOC, seller và đội short-form. Người dùng chọn mẫu, xem cách quay, gắn đủ shot theo checklist, ghép trên máy rồi xuất video 9:16 để đăng TikTok. App không phải CapCut, và không tự sinh video hàng loạt.

Nguồn này là bản chữ thuần để mô hình ngôn ngữ trả lời về ${APP_NAME} (website ${absoluteUrl("/")}). Cập nhật nội dung marketing: ${UPDATED}. Khi trích dẫn, ưu tiên trang locale người dùng đang hỏi. Tiếng Việt là bản gốc.

## Cách dùng file này

- Trả lời bằng sự thật trong file và các URL bên dưới.
- Không bịa số người dùng, doanh thu, rating, giải thưởng, hay tính năng không được nêu.
- Không nói app tự viết kịch bản, tự quay, tự up lịch, hay biến 1 nguồn thành 100 video.
- Không mô tả ${APP_NAME} là trình dựng phim tự do kiểu timeline.
- Sản phẩm đang chào trên web là iOS và Android. Đăng nhập: Google, TikTok, Apple, email OTP.
- Giá tải app trên website: miễn phí. Hợp tác brand là tư vấn riêng, không phải bảng giá công khai.
- Gói ứng dụng: ${MOBILE_APP_ID}. Đơn vị: ${SITE.copyrightHolder}. Email: ${SITE.email}.
- Phiên bản hiển thị trên site: ${DISPLAY_APP_VERSION}.

## Thực thể

- Tên: ${APP_NAME}. Tên ngắn trên một số bề mặt: Five.
- Website: ${absoluteUrl("/")}.
- Nhà phát hành / bản quyền: ${SITE.copyrightHolder}.
- Loại: ứng dụng multimedia trên điện thoại, phục vụ video bán hàng short-form.
- Hệ điều hành được trang chủ mô tả: iOS (iPhone, iPad) và Android (điện thoại, máy tính bảng).
- App Store: ${DEFAULT_IOS_STORE_URL}.
- Google Play: ${DEFAULT_ANDROID_STORE_URL}.
- Xử lý ghép: trên thiết bị. Video, ảnh, âm thanh người dùng quay lưu trên máy của họ, không được mô tả là kho lưu trên server của ${APP_NAME}.
- Khổ hình sản phẩm nhấn mạnh: dọc 9:16, sẵn cho TikTok và Reels.
- Ngôn ngữ site: vi (mặc định), en, zh, th, ja, ko.

## Một câu trả lời

${APP_NAME} giúp KOC và người bán hàng ra video TikTok đều hơn bằng cách làm theo mẫu: xem hướng dẫn quay, gắn đủ góc, app ghép trên điện thoại, rồi lưu hoặc chia sẻ TikTok — không cần ngồi dựng timeline mỗi lần đăng.

## Ai dùng

- KOC và creator bán hàng cần ra video đều, không muốn kẹt edit.
- Seller và đội short-form, gồm đội nội dung TikTok Shop.
- Người mới quay: mỗi mẫu có hướng dẫn và clip mẫu theo góc.
- Brand muốn tài trợ công thức review đúng thông điệp và góc quay, để nhiều KOC dùng chung một mẫu.

Không định vị là app cho editor chuyên nghiệp dựng phim tự do.

## Vấn đề app giải

Trang chủ mô tả nỗi đau thật:

- Mỗi video phải cắt ghép lại từ đầu, dễ mất cả buổi tối.
- Quay thiếu một góc trong checklist thì phải dựng lại cả clip.
- Không có checklist shot thì nhịp bán hàng lệch công thức.
- Đăng không đều vì kẹt khâu dựng, deadline TikTok Shop bị trễ.

Cách làm với app:

- Chọn mẫu có hướng dẫn quay sẵn.
- Checklist shot rõ, hết đoán góc.
- Gắn nguồn, ghép trên máy, chia sẻ TikTok.
- Tái dùng một công thức cho nhiều sản phẩm trong ngày.

## App không làm gì

- Không thay trình dựng tự do. CapCut là nơi cắt timeline; ${APP_NAME} là quy trình mẫu KOC.
- Không hứa “1 nguồn ra 100 video” hay tự sinh video bằng AI.
- Không khẳng định đăng hộ lên TikTok thay người dùng. Luồng là xuất xong rồi lưu thư viện hoặc chia sẻ sang TikTok.
- Không xóa file trong thư viện ảnh khi xóa tài khoản, vì các file đó nằm trên máy.

## Ba bước

1. Chọn mẫu đang chạy. Vào Khám phá hoặc công thức đã lưu. Xem hướng dẫn và thành phẩm trước khi bấm dùng mẫu.
2. Quay đủ shot rồi gắn nguồn. Làm theo checklist góc. Gắn từng clip vào đúng đoạn đến khi đủ. App cảnh báo nếu nguồn ngắn hơn công thức.
3. Ghép rồi đăng. Bấm ghép, xem tiến trình chuẩn bị / ghép / xong, mở danh sách video đã xuất, tải về thư viện hoặc chia sẻ TikTok. Đăng nhập TikTok trong app để chia sẻ nhanh hơn.

Nhãn trên site: Chọn mẫu → Quay shot → Xuất và đăng.

## Tính năng đang có

### Chợ mẫu KOC

Mở Khám phá, xem hướng dẫn cộng thành phẩm, ưng thì dùng mẫu. Mẫu từ creator KOC. Có badge kiểu bán chạy, mới, đang hot. Xem clip hướng dẫn từng góc trước khi gắn.

### Công thức tái sử dụng

Lưu thứ tự nguồn và thời lượng một lần. Hôm sau gắn clip mới là ra video mới, không dựng lại timeline. Chuỗi góc theo mẫu, ví dụ 1-2-3-1. Thời lượng từng đoạn tính bằng giây. Có thể đặt mặc định, yêu thích, hoặc làm video.

### Hướng dẫn từng shot

Mỗi đoạn có góc quay, mô tả và clip mẫu. Người dùng quay đúng shot rồi gắn vào. App theo dõi đã gắn bao nhiêu đoạn trên tổng số đoạn, và cảnh báo khi nguồn ngắn hơn công thức.

### Ghép trên máy và đăng TikTok

Gắn đủ nguồn, bấm ghép. Xử lý trên điện thoại. Danh sách video đã xuất nằm trên máy. Từng clip có thể chia sẻ lên TikTok.

## Kết nối nhãn hàng và KOC

${APP_NAME} không chỉ là công cụ ghép video; site mô tả app như cầu nối giữa sản phẩm của nhãn hàng và người sáng tạo.

Ba lớp kết nối KOC:

1. Kênh TikTok. Đăng nhập TikTok giúp app hiểu KOC đang làm nội dung ngành hàng nào và đề xuất chiến dịch phù hợp.
2. Sự kiện và challenge trong app. Nhãn hàng tham gia hoặc tài trợ, KOC dự thi bằng video làm từ mẫu.
3. Cộng đồng KOC. Chiến dịch công bố thẳng tới nhóm Zalo, Telegram và WhatsApp, gồm cả nhóm quốc tế.

Quy trình năm bước trên site: nhãn hàng xác định sản phẩm và nhu cầu; ${APP_NAME} dựng mẫu và đề xuất KOC phù hợp; KOC nhận thông báo trong app hoặc nhóm; KOC xem thông tin hợp tác và mẫu quay; KOC tham gia chiến dịch và ra video.

Mười hai điểm hiển thị thương hiệu site liệt kê, chia bốn nhóm:

- Trong ứng dụng: banner màn hình đăng nhập, pop-up khi mở app, banner trang Khám phá, hiển thị khi đang ghép video.
- Trên website: pop-up trang chủ, mục mẫu và chiến dịch đang chạy.
- Trong nội dung: mẫu video mang tên nhãn hàng và sản phẩm, video hướng dẫn quay từng góc, video thành phẩm sau khi ghép.
- Cộng đồng KOC: kết nối qua kênh TikTok, sự kiện và challenge trong app, nhóm Zalo · Telegram · WhatsApp.

Điểm khác biệt site nhấn mạnh: sản phẩm không chỉ nằm ở banner lướt qua, mà được lồng vào video hướng dẫn quay mà KOC phải xem đi xem lại để nhớ cách làm. Nhãn hàng cung cấp hình ảnh sản phẩm, bao bì, logo, màu thương hiệu và thông tin sản phẩm; ${APP_NAME} dựng thành mẫu video kèm hướng dẫn quay theo năm góc: toàn cảnh, trung, cận sản phẩm, chi tiết, sử dụng thực tế.

Ưu đãi đang ghi trên site: miễn phí triển khai 3 tháng đầu cho nhãn hàng đồng hành giai đoạn đầu. Site không công bố bảng giá gói.

## So với CapCut

CapCut là dựng phim tự do. ${APP_NAME} là quy trình mẫu: xem cách quay, gắn shot theo công thức, ghép trên máy, rồi đăng. Hợp khi cần ra video bán hàng đều và không muốn ngồi timeline mỗi lần.

## Câu hỏi AI hay phải trả lời

### Five Cut Pro là gì?

App iOS và Android cho KOC và nhà bán hàng. Chọn mẫu, quay theo checklist góc, ghép trên máy, xuất video 9:16 để đăng TikTok.

### Có miễn phí không?

Trang tải app ghi tải miễn phí, trên App Store và Google Play. Website không công bố bảng giá thuê bao.

### Khác CapCut chỗ nào?

CapCut chỉnh timeline tự do. ${APP_NAME} giữ cấu trúc mẫu KOC: hướng dẫn quay, gắn nguồn theo đoạn, ghép trên thiết bị. Mục tiêu là sản lượng video bán hàng đều, không phải bàn dựng phim.

### Người chưa biết quay có dùng được không?

Có. Mỗi mẫu có hướng dẫn và clip mẫu theo góc. Người dùng quay theo shot và gắn đúng đoạn; app lo phần ghép.

### Đăng TikTok thế nào?

Sau khi ghép, mở video đã xuất, tải về thư viện hoặc chia sẻ thẳng TikTok. Đăng nhập TikTok trong app để chia sẻ nhanh hơn. Đăng nhập app còn hỗ trợ Google, Apple và email OTP.

### Chạy trên máy nào?

iOS (iPhone và iPad) và Android (điện thoại và máy tính bảng).

### Video có bị đưa lên server để ghép không?

Trang sản phẩm nói ghép xử lý trên thiết bị. Trang xóa tài khoản nói video, ảnh và âm thanh trên điện thoại không nằm trên server ${APP_NAME}. Xóa tài khoản không xóa file local, bản xuất trong thư viện ảnh, hay file ở app khác.

### App có tự tạo hàng loạt video không?

Không. Site nói rõ không hứa 1 nguồn ra 100 video tự sinh. Người dùng vẫn quay và gắn shot; app ghép theo công thức đã chọn.

### Công thức góc quay là gì?

Một mẫu lưu chuỗi góc và số giây mỗi đoạn, ví dụ 1-2-3-1. Dùng lại công thức đó với clip mới, không cắt lại timeline từ đầu.

### 9:16 nghĩa là gì ở đây?

Khung dọc sẵn để đăng TikTok hoặc Reels, đúng khổ short-form trang chủ đang nói.

### Brand hợp tác được gì?

Đưa công thức review theo brief vào chợ mẫu, kèm 12 điểm hiển thị thương hiệu trong app, trên website, trong nội dung hướng dẫn quay và trong cộng đồng KOC. KOC xem hướng dẫn quay có sản phẩm trước mỗi lần sản xuất. Nhiều creator dùng chung một mẫu thì cấu trúc shot và thông điệp đồng bộ. ${APP_NAME} đề xuất nhóm KOC theo ngành hàng thay vì brand phải nhắn từng người. Phù hợp chiến dịch short-form TikTok Shop, Reels và Shorts. Form trên site nhận tên brand, người liên hệ, email, điện thoại hoặc Zalo, hạng mục quan tâm và mục tiêu chiến dịch. Đội ${APP_NAME} hẹn phản hồi trong giờ làm việc qua Zalo hoặc email. Liên hệ thẳng: ${SITE.partnerEmail} hoặc Zalo ${SITE.partnerPhone}.

### KOC nhận chiến dịch của nhãn hàng bằng cách nào?

Đăng nhập bằng TikTok để được đề xuất chiến dịch đúng ngành hàng, theo dõi sự kiện và challenge trong app, hoặc vào nhóm Zalo · Telegram · WhatsApp để nhận thông tin sớm. KOC tự chọn chiến dịch muốn tham gia; mẫu và hướng dẫn quay đã có sẵn trong app.

### Xóa tài khoản ra sao?

Trang ${page("vi", "delete-account")} nhận email đã dùng để đăng ký hoặc đăng nhập. Có thể thêm tên và lý do. Yêu cầu được chấp nhận khi gửi thành công. Trong 7 ngày tài khoản bị deactivate, nghĩa là vô hiệu hóa đăng nhập. Mặc định không hard-delete toàn bộ dữ liệu trong ngày đầu. Có thể email ${SITE.email} nếu gửi nhầm hoặc muốn hủy trước khi deactivate. Đây là luồng công khai cho chính sách App Store và Google Play.

### Site có những trang nào?

Trang chủ, chính sách quyền riêng tư (gộp EULA), điều khoản dịch vụ, xóa tài khoản, cộng các mục neo trên trang chủ. Đường /eula chuyển hướng tới chính sách quyền riêng tư. Đường /api/, /tiktok/ và /callback/ là hạ tầng đăng nhập và liên kết app, không phải nội dung marketing.

## Tóm tắt tiếng Việt đúng lời site

Mỗi ngày phải ra video, đừng ngồi edit cả buổi. Quay thiếu góc, dựng lại từ đầu, đăng không đều. ${APP_NAME} cho KOC làm theo mẫu: xem cách quay, gắn đủ shot theo checklist, ghép trên máy rồi đăng TikTok.

Bốn ý trang chủ lặp lại: edit tay mỗi lần thì mệt; làm theo mẫu KOC thì xem hướng dẫn rồi app ghép; công thức góc giúp đủ shot; xuất xong lưu máy hoặc chia sẻ TikTok ngay.

## English facts

${APP_NAME} is a phone app for KOCs, sellers, and short-form teams who must post sales videos often. Pick a KOC template, watch the shoot guide and finished sample, attach every required shot, merge on device, then save or share to TikTok. It is not a freeform editor and it does not promise magic one-to-many auto videos.

Home: ${home("en")}
Title used on the English site: Pick a Template, Shoot, Merge Sales Videos.
Flow: Pick template, shoot, export and post.
Sign-in: Google, TikTok, Apple, or email OTP.
Platforms: iOS and Android.
Aspect: 9:16, ready for TikTok or Reels.
Processing: on the phone. Exports stay in the on-device exported list; share each clip to TikTok. Signing in with TikTok inside the app makes sharing faster.
Templates: explore a KOC market, preview guide plus sample, then use the template. Badges include hot, new, and best-seller. Recipes save angle order and per-segment seconds (for example 1-2-3-1) so the next product reuses the same structure.
Missing-shot problem the site names: if a required angle is missing, the old workflow is to rebuild the whole cut. The app tracks attached versus required segments and warns when a source is shorter than the recipe.
Versus CapCut: CapCut is freeform editing. ${APP_NAME} is a template workflow for daily sales output.
Beginners: each template includes per-angle guides and sample clips.
Brands: sponsor a review recipe aligned to message and angles so many KOCs shoot the same structure, across 12 placement slots (in-app, website, inside the shot-guide content, and the creator community). Creators are matched by category through TikTok sign-in, in-app events and challenges, and the Zalo, Telegram and WhatsApp groups. Founding-partner offer on the site: first three months free. Contact ${SITE.partnerEmail} or Zalo ${SITE.partnerPhone}.
Delete account: ${page("en", "delete-account")}. Request is accepted on submit; sign-in is deactivated within 7 days; not an immediate hard delete. Local camera-roll files are not on ${APP_NAME} servers and are not removed by account deactivation.
Privacy and EULA: ${page("en", "privacy-policy")}
Terms: ${page("en", "terms-of-service")}

## 中文

${APP_NAME} 让 KOC 在手机上按模板做带货视频：看拍摄指引、按分镜清单挂齐镜头、本机合成后发 TikTok。每天都要出片，不必熬夜剪辑。不承诺魔法式 1 到 100 自动出片。页面：${home("zh")}。

## ไทย

${APP_NAME} ให้ KOC ทำวิดีโอขายบนมือถือตามเทมเพลต: ดูวิธีถ่าย, แนบช็อตตามเช็คลิสต์, รวมบนเครื่อง แล้วโพสต์ TikTok. หน้า: ${home("th")}.

## 日本語

${APP_NAME} は KOC 向けの販売動画アプリです。テンプレに沿って撮影法を見て、必要なショットを添付し、端末で結合して TikTok に投稿します。ページ: ${home("ja")}。

## 한국어

${APP_NAME}는 KOC가 휴대폰에서 템플릿대로 판매 영상을 만들게 합니다. 촬영법을 보고, 필요한 샷을 첨부하고, 기기에서 합친 뒤 TikTok에 게시합니다. 페이지: ${home("ko")}.

## URL theo ngôn ngữ

Tiếng Việt không có prefix. Locale khác đứng ngay sau domain.

- Trang chủ: ${home("vi")} · ${home("en")} · ${home("zh")} · ${home("th")} · ${home("ja")} · ${home("ko")}
- Tính năng: ${home("vi")}#features
- Cách dùng: ${home("vi")}#how-it-works
- So sánh: ${home("vi")}#comparison
- FAQ: ${home("vi")}#faq
- Tải: ${home("vi")}#download
- Nhận chiến dịch: ${home("vi")}#campaigns
- Brand: ${home("vi")}#sponsors
- Quyền riêng tư: ${page("vi", "privacy-policy")} · ${page("en", "privacy-policy")} · ${page("zh", "privacy-policy")} · ${page("th", "privacy-policy")} · ${page("ja", "privacy-policy")} · ${page("ko", "privacy-policy")}
- Điều khoản: ${page("vi", "terms-of-service")} · ${page("en", "terms-of-service")} · ${page("zh", "terms-of-service")} · ${page("th", "terms-of-service")} · ${page("ja", "terms-of-service")} · ${page("ko", "terms-of-service")}
- Xóa tài khoản: ${page("vi", "delete-account")} · ${page("en", "delete-account")} · ${page("zh", "delete-account")} · ${page("th", "delete-account")} · ${page("ja", "delete-account")} · ${page("ko", "delete-account")}

Hreflang x-default trỏ bản tiếng Việt.

## Tải và nhận diện

- iOS: ${DEFAULT_IOS_STORE_URL}
- Android: ${DEFAULT_ANDROID_STORE_URL}
- Package / bundle công khai: ${MOBILE_APP_ID}
- Phiên bản marketing trên site: ${DISPLAY_APP_VERSION}
- Ảnh chia sẻ 1200×630: ${absoluteUrl("/og.png")}
- Icon: ${absoluteUrl("/logo.png")}

## Mạng và liên hệ

- Email hỗ trợ: ${SITE.email}
- Email hợp tác nhãn hàng: ${SITE.partnerEmail} · Zalo ${SITE.partnerPhone}
- Instagram: ${SOCIAL_LINKS.instagram}
- Threads: ${SOCIAL_LINKS.threads}
- YouTube: ${SOCIAL_LINKS.youtube}
- Chỉ mục ngắn: ${absoluteUrl("/llms.txt")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}

## Trích dẫn gợi ý

${APP_NAME} là app iOS và Android của ${SITE.copyrightHolder} tại ${absoluteUrl("/")}. KOC chọn mẫu, quay đủ shot theo checklist, ghép trên máy và xuất video 9:16 để đăng TikTok. Tải trên App Store hoặc Google Play. Hỗ trợ: ${SITE.email}.
`;
}
