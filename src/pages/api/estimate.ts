import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Basic HTML escaping so user input can't break your email HTML
const escapeHtml = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const firstName = (formData.get("firstName") || "").toString();
    const lastName = (formData.get("lastName") || "").toString();
    const email = (formData.get("email") || "").toString();
    const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

if (!email || !isValidEmail(email)) {
  return new Response(
    JSON.stringify({ ok: false, error: "Please enter a valid email." }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

    const phone = (formData.get("phone") || "").toString();
    const address = (formData.get("address") || "").toString();
    const zip = (formData.get("zip") || "").toString();
    const projectType = (formData.get("projectType") || "").toString();
    const timeline = (formData.get("timeline") || "").toString();
    const referral = (formData.get("referral") || "").toString();
    const message = (formData.get("message") || "").toString();

    const roomsJsonRaw = (formData.get("roomsJson") || "").toString();

    // photoUrls comes in as a string (JSON array) from your hidden input
    let photoUrls: string[] = [];
const photoUrlsEntry = formData.get("photoUrls");

if (photoUrlsEntry) {
  const raw = photoUrlsEntry.toString().trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        photoUrls = parsed.filter((u) => typeof u === "string");
      }
    } catch {
      photoUrls = [];
    }
  }
}


    const toEmail = import.meta.env.ESTIMATE_TO_EMAIL;
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL;

    if (!toEmail || !fromEmail) {
      return new Response(
        JSON.stringify({ ok: false, error: "Email config missing on server" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `New estimate request from ${fullName || "website lead"}`;

    // Rooms block: show nicely if valid JSON, otherwise show raw
    let roomsBlock = "";
    if (roomsJsonRaw && roomsJsonRaw !== "[]") {
      try {
        const rooms = JSON.parse(roomsJsonRaw);
        if (Array.isArray(rooms) && rooms.length) {
          const rows = rooms
            .map((r: any, i: number) => {
              const name = escapeHtml(String(r?.name || `Room ${i + 1}`));
              const len = r?.lengthFt ?? "";
              const wid = r?.widthFt ?? "";
              const hgt = r?.ceilingHtFt ?? "";
              const notes = escapeHtml(String(r?.notes || ""));
              return `
                <tr>
                  <td style="padding:6px 10px;border-top:1px solid #e5e7eb;"><strong>${name}</strong><br/>
                    <span style="color:#6b7280;font-size:12px;">${notes}</span>
                  </td>
                  <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${len}</td>
                  <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${wid}</td>
                  <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${hgt}</td>
                </tr>
              `;
            })
            .join("");

          roomsBlock = `
            <h3 style="margin:24px 0 8px;font-size:16px;">Rooms & Measurements</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
              <thead>
                <tr style="background:#f9fafb;">
                  <th align="left" style="padding:8px 10px;">Room</th>
                  <th align="left" style="padding:8px 10px;">Length</th>
                  <th align="left" style="padding:8px 10px;">Width</th>
                  <th align="left" style="padding:8px 10px;">Ceiling</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          `;
        }
      } catch {
        roomsBlock = `
          <h3 style="margin:24px 0 8px;font-size:16px;">Rooms & Measurements</h3>
          <pre style="background:#f4f4f5;padding:12px;border-radius:8px;font-size:13px;white-space:pre-wrap;">${escapeHtml(
            roomsJsonRaw
          )}</pre>
        `;
      }
    }

    const photosBlock =
      photoUrls.length > 0
        ? `<h3 style="margin:24px 0 8px;font-size:16px;">Photos</h3>
           <ul style="padding-left:18px;font-size:14px;">
             ${photoUrls
               .map((url) => {
                 const safeUrl = escapeHtml(url);
                 return `<li><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></li>`;
               })
               .join("")}
           </ul>`
        : `<p style="margin-top:16px;font-size:14px;color:#6b7280;">No photos attached.</p>`;

    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;color:#111827;">
        <h2 style="font-size:20px;margin-bottom:4px;">New estimate request</h2>
        <p style="font-size:14px;color:#6b7280;margin-bottom:18px;">Submitted from the PaintCraft MN website.</p>

        <h3 style="margin:16px 0 8px;font-size:16px;">Contact Info</h3>
        <table style="font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Name:</td><td>${escapeHtml(fullName || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Email:</td><td>${escapeHtml(email || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Phone:</td><td>${escapeHtml(phone || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Address:</td><td>${escapeHtml(address || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">ZIP:</td><td>${escapeHtml(zip || "-")}</td></tr>
        </table>

        <h3 style="margin:20px 0 8px;font-size:16px;">Project Details</h3>
        <table style="font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Project type:</td><td>${escapeHtml(projectType || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Timeline:</td><td>${escapeHtml(timeline || "-")}</td></tr>
          <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Heard about us via:</td><td>${escapeHtml(referral || "-")}</td></tr>
        </table>

        ${
          message
            ? `<h3 style="margin:20px 0 8px;font-size:16px;">Project Notes</h3>
               <p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(message)}</p>`
            : ""
        }

        ${roomsBlock}
        ${photosBlock}
      </div>
    `;

    await resend.emails.send({
  from: fromEmail,
  to: toEmail,
  subject,
  html: htmlBody,

  // when PaintCraft hits Reply, it replies to the customer
  replyTo: email || import.meta.env.REPLY_TO_EMAIL || toEmail,

  // optional: if you want yourself copied on every lead:
  bcc: import.meta.env.LEADS_BCC_EMAIL || undefined,
});


    if (email) {
     await resend.emails.send({
  from: fromEmail,
  to: email,
  subject: "We received your estimate request",
  replyTo: import.meta.env.REPLY_TO_EMAIL || toEmail,
  html: `
          <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;color:#111827;">
            <h2 style="font-size:20px;margin-bottom:8px;">Thanks for reaching out to PaintCraft MN.</h2>
            <p style="font-size:14px;color:#374151;margin-bottom:16px;">
              Hi ${escapeHtml(firstName || "")}${firstName ? "," : ""} we’ve received your estimate request and will review your project details shortly.
            </p>
            <p style="font-size:14px;color:#374151;margin-bottom:16px;">
              You can expect a reply within one business day with next steps. If needed, we’ll schedule a quick walk-through to get you an accurate quote.
            </p>
            <p style="font-size:13px;color:#6b7280;">
              If you have additional photos or details to share, just reply to this email and we’ll add them to your file.
            </p>
          </div>
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Estimate API error", err);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
