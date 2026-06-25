/**
 * email.server.ts – Resend integration for Studio Creart notifications.
 *
 * Set RESEND_API_KEY and ADMIN_EMAIL in your .env (and Vercel env vars).
 * All sends are fire-and-forget; a failure never breaks the main action.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "chrayahsalma121@gmail.com";
const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "Studio Creart <notifications@studiocreart.com>";

// ─── tiny branded HTML wrapper ────────────────────────────────────────────────
function htmlWrapper(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;
                      box-shadow:0 2px 12px rgba(0,0,0,.08);">
          <!-- Header -->
          <tr>
            <td style="background:#2d1f14;padding:28px 36px;">
              <p style="margin:0;color:#e8d9c4;font-size:11px;letter-spacing:3px;
                        text-transform:uppercase;font-weight:600;">Studio Creart · Tétouan</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">
                ${title}
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;color:#333333;font-size:15px;line-height:1.7;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #f0ebe3;
                       color:#999;font-size:12px;text-align:center;">
              This is an automated notification from your Studio Creart website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string | number): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#888;font-size:13px;white-space:nowrap;
               vertical-align:top;font-weight:600;">${label}</td>
    <td style="padding:6px 0;color:#222;font-size:14px;">${value}</td>
  </tr>`;
}

function table(rows: string): string {
  return `<table cellpadding="0" cellspacing="0" style="width:100%;margin-top:16px;">
    ${rows}
  </table>`;
}

// ─── send helper ──────────────────────────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set – skipping email");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
  }
}

// ─── public API ───────────────────────────────────────────────────────────────

export interface FeedbackEmailData {
  name: string;
  rating: number;
  message: string;
}

export async function sendFeedbackEmail(data: FeedbackEmailData): Promise<void> {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  const html = htmlWrapper(
    "New Feedback Received",
    `<p style="margin:0 0 8px;">Someone just left a review on your website 🎉</p>
    ${table(
      row("Name", data.name) +
        row("Rating", `<span style="color:#c9a84c;font-size:16px;">${stars}</span> (${data.rating}/5)`) +
        row("Message", `<em>"${data.message}"</em>`),
    )}`,
  );

  await sendEmail(ADMIN_EMAIL, `⭐ New Feedback from ${data.name} – Studio Creart`, html);
}

export interface ReservationEmailData {
  name: string;
  last_name: string;
  phone: string;
  email?: string;
  age: number;
  workshop: string;
  notes?: string;
}

export async function sendReservationEmail(data: ReservationEmailData): Promise<void> {
  const html = htmlWrapper(
    "New Workshop Reservation",
    `<p style="margin:0 0 8px;">A new reservation has been submitted on your website 🖌️</p>
    ${table(
      row("Name", `${data.name} ${data.last_name}`) +
        row("Phone", data.phone) +
        row("Email", data.email ?? "—") +
        row("Age", data.age) +
        row("Workshop", `<strong>${data.workshop}</strong>`) +
        row("Notes", data.notes || "—"),
    )}
    <p style="margin:24px 0 0;font-size:13px;color:#888;">
      Log in to your Supabase dashboard to manage reservations.
    </p>`,
  );

  await sendEmail(
    ADMIN_EMAIL,
    `🎨 New Reservation – ${data.workshop} from ${data.name} ${data.last_name}`,
    html,
  );
}
