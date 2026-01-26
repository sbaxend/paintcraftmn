// import type { APIRoute } from "astro";
// import { Resend } from "resend";

// export const prerender = false;

// const resend = new Resend(import.meta.env.RESEND_API_KEY);

// const escapeHtml = (v: string) =>
//   v
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#39;");

// const isValidEmail = (value: string) =>
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const formData = await request.formData();

//     // --- EASY anti-spam ---
//   const gotcha = (formData.get("_gotcha") || "").toString().trim();
//   if (gotcha) {
//     // Quiet success so bots don't learn
//     return new Response(JSON.stringify({ ok: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const tsRaw = (formData.get("_ts") || "").toString().trim();
//   const ts = Number(tsRaw);
//   if (!Number.isFinite(ts)) {
//     return new Response(JSON.stringify({ ok: false, error: "Invalid submission." }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const elapsed = Date.now() - ts;
//   if (elapsed < 3000) {
//     // too fast = bot
//     return new Response(JSON.stringify({ ok: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   // --- end EASY anti-spam ---

//   // --- Turnstile (not-a-robot) ---
// const token = (formData.get("cf-turnstile-response") || "").toString().trim();
// if (!token) {
//   return new Response(
//     JSON.stringify({ ok: false, error: "Please confirm you’re not a robot." }),
//     { status: 400, headers: { "Content-Type": "application/json" } }
//   );
// }

// const secret = import.meta.env.TURNSTILE_SECRET_KEY;
// if (!secret) {
//   return new Response(
//     JSON.stringify({ ok: false, error: "Turnstile is not configured on the server." }),
//     { status: 500, headers: { "Content-Type": "application/json" } }
//   );
// }

// const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
//   method: "POST",
//   headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   body: new URLSearchParams({
//     secret,
//     response: token,
//   }),
// });

// const verify = await verifyRes.json();

// if (!verify?.success) {
//   return new Response(
//     JSON.stringify({ ok: false, error: "Anti-spam check failed. Please try again." }),
//     { status: 400, headers: { "Content-Type": "application/json" } }
//   );
// }
// // --- end Turnstile ---



//     const firstName = (formData.get("firstName") || "").toString().trim();
//     const lastName = (formData.get("lastName") || "").toString().trim();
//     const email = (formData.get("email") || "").toString().trim();

//     if (!email || !isValidEmail(email)) {
//       return new Response(
//         JSON.stringify({ ok: false, error: "Please enter a valid email." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const phone = (formData.get("phone") || "").toString().trim();
//     const address = (formData.get("address") || "").toString().trim();
//     const zip = (formData.get("zip") || "").toString().trim();
//     const projectType = (formData.get("projectType") || "").toString().trim();
//     const timeline = (formData.get("timeline") || "").toString().trim();
//     const referral = (formData.get("referral") || "").toString().trim();
//     const message = (formData.get("message") || "").toString();

//     const roomsJsonRaw = (formData.get("roomsJson") || "").toString();

//     // photoUrls comes in as JSON string from a hidden input
//     let photoUrls: string[] = [];
//     const photoUrlsEntry = formData.get("photoUrls");
//     if (photoUrlsEntry) {
//       const raw = photoUrlsEntry.toString().trim();
//       if (raw) {
//         try {
//           const parsed = JSON.parse(raw);
//           if (Array.isArray(parsed)) {
//             photoUrls = parsed.filter((u) => typeof u === "string");
//           }
//         } catch {
//           photoUrls = [];
//         }
//       }
//     }

//     const toEmail = import.meta.env.ESTIMATE_TO_EMAIL;
//     const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
//     const replyToDefault = import.meta.env.REPLY_TO_EMAIL || toEmail;
//     const bccEmail = import.meta.env.LEADS_BCC_EMAIL;

//     if (!toEmail || !fromEmail) {
//       return new Response(
//         JSON.stringify({ ok: false, error: "Email config missing on server" }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const fullName = `${firstName} ${lastName}`.trim();
//     const subject = `New estimate request from ${fullName || "website lead"}`;

//     // Rooms block
//     let roomsBlock = "";
//     if (roomsJsonRaw && roomsJsonRaw !== "[]") {
//       try {
//         const rooms = JSON.parse(roomsJsonRaw);
//         if (Array.isArray(rooms) && rooms.length) {
//           const rows = rooms
//             .map((r: any, i: number) => {
//               const name = escapeHtml(String(r?.name || `Room ${i + 1}`));
//               const len = r?.lengthFt ?? "";
//               const wid = r?.widthFt ?? "";
//               const hgt = r?.ceilingHtFt ?? "";
//               const notes = escapeHtml(String(r?.notes || ""));

//               return `
//                 <tr>
//                   <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">
//                     <strong>${name}</strong><br/>
//                     <span style="color:#6b7280;font-size:12px;">${notes}</span>
//                   </td>
//                   <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${len}</td>
//                   <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${wid}</td>
//                   <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${hgt}</td>
//                 </tr>
//               `;
//             })
//             .join("");

//           roomsBlock = `
//             <h3 style="margin:24px 0 8px;font-size:16px;">Rooms & Measurements</h3>
//             <table style="width:100%;border-collapse:collapse;font-size:13px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
//               <thead>
//                 <tr style="background:#f9fafb;">
//                   <th align="left" style="padding:8px 10px;">Room</th>
//                   <th align="left" style="padding:8px 10px;">Length</th>
//                   <th align="left" style="padding:8px 10px;">Width</th>
//                   <th align="left" style="padding:8px 10px;">Ceiling</th>
//                 </tr>
//               </thead>
//               <tbody>${rows}</tbody>
//             </table>
//           `;
//         }
//       } catch {
//         roomsBlock = `
//           <h3 style="margin:24px 0 8px;font-size:16px;">Rooms & Measurements</h3>
//           <pre style="background:#f4f4f5;padding:12px;border-radius:8px;font-size:13px;white-space:pre-wrap;">${escapeHtml(
//             roomsJsonRaw
//           )}</pre>
//         `;
//       }
//     }

//     const photosBlock =
//       photoUrls.length > 0
//         ? `<h3 style="margin:24px 0 8px;font-size:16px;">Photos</h3>
//            <ul style="padding-left:18px;font-size:14px;">
//              ${photoUrls
//                .map((url) => {
//                  const safeUrl = escapeHtml(url);
//                  return `<li><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></li>`;
//                })
//                .join("")}
//            </ul>`
//         : `<p style="margin-top:16px;font-size:14px;color:#6b7280;">No photos attached.</p>`;

//     const htmlBody = `
//       <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;color:#111827;">
//         <h2 style="font-size:20px;margin-bottom:4px;">New estimate request</h2>
//         <p style="font-size:14px;color:#6b7280;margin-bottom:18px;">Submitted from the PaintCraft MN website.</p>

//         <h3 style="margin:16px 0 8px;font-size:16px;">Contact Info</h3>
//         <table style="font-size:14px;border-collapse:collapse;">
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Name:</td><td>${escapeHtml(fullName || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Email:</td><td>${escapeHtml(email || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Phone:</td><td>${escapeHtml(phone || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Address:</td><td>${escapeHtml(address || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">ZIP:</td><td>${escapeHtml(zip || "-")}</td></tr>
//         </table>

//         <h3 style="margin:20px 0 8px;font-size:16px;">Project Details</h3>
//         <table style="font-size:14px;border-collapse:collapse;">
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Project type:</td><td>${escapeHtml(projectType || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Timeline:</td><td>${escapeHtml(timeline || "-")}</td></tr>
//           <tr><td style="padding:2px 8px 2px 0;color:#6b7280;">Heard about us via:</td><td>${escapeHtml(referral || "-")}</td></tr>
//         </table>

//         ${
//           message
//             ? `<h3 style="margin:20px 0 8px;font-size:16px;">Project Notes</h3>
//                <p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(
//                  message
//                )}</p>`
//             : ""
//         }

//         ${roomsBlock}
//         ${photosBlock}
//       </div>
//     `;

//     // 1) Send lead email to PaintCraft
//     await resend.emails.send({
//       from: fromEmail,
//       to: toEmail,
//       subject,
//       html: htmlBody,

//       // When PaintCraft hits Reply, it replies to the customer
//       replyTo: email || replyToDefault || toEmail,

//       // optional copy
//       bcc: bccEmail || undefined,
//     });

//     // 2) Auto-confirmation to the customer
//     await resend.emails.send({
//       from: fromEmail,
//       to: email,
//       subject: "We received your estimate request",
//       replyTo: replyToDefault || toEmail,
//       html: `
//         <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;color:#111827;">
//           <h2 style="font-size:20px;margin-bottom:8px;">Thanks for reaching out to PaintCraft MN.</h2>
//           <p style="font-size:14px;color:#374151;margin-bottom:16px;">
//             Hi ${escapeHtml(firstName || "")}${firstName ? "," : ""} we’ve received your estimate request and will review your project details shortly.
//           </p>
//           <p style="font-size:14px;color:#374151;margin-bottom:16px;">
//             You can expect a reply within one business day with next steps. If needed, we’ll schedule a quick walk-through to get you an accurate quote.
//           </p>
//           <p style="font-size:13px;color:#6b7280;">
//             If you have additional photos or details to share, just reply to this email and we’ll add them to your file.
//           </p>
//         </div>
//       `,
//     });

//     return new Response(JSON.stringify({ ok: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Estimate API error", err);
//     return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };

import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const escapeHtml = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const clampStr = (v: unknown, max = 2000) => {
  const s = (v ?? "").toString();
  return s.length > max ? s.slice(0, max) : s;
};

const isHttpUrl = (u: string) => /^https?:\/\/.+/i.test(u);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // --- EASY anti-spam (honeypot) ---
    const gotcha = clampStr(formData.get("_gotcha"), 200).trim();
    if (gotcha) {
      // Quiet success so bots don't learn
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- EASY anti-spam (time-to-submit) ---
    // Don’t hard-fail if missing; just reduce trust and rely on Turnstile.
    const tsRaw = clampStr(formData.get("_ts"), 50).trim();
    const ts = Number(tsRaw);
    if (Number.isFinite(ts)) {
      const elapsed = Date.now() - ts;
      if (elapsed < 3000) {
        // too fast = bot
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
    // --- end EASY anti-spam ---

    // --- Turnstile (not-a-robot) ---
    const token = clampStr(formData.get("cf-turnstile-response"), 5000).trim();
    if (!token) {
      return new Response(
        JSON.stringify({ ok: false, error: "Please confirm you’re not a robot." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const secret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Turnstile is not configured on the server.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...(ip ? { remoteip: ip } : {}),
        }),
      }
    );

    const verify = await verifyRes.json().catch(() => null);

    if (!verifyRes.ok || !verify?.success) {
      // Log details server-side only
      console.error("Turnstile verify failed:", {
        ok: verifyRes.ok,
        status: verifyRes.status,
        verify,
      });

      return new Response(
        JSON.stringify({
          ok: false,
          error: "Anti-spam check failed. Please try again.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // --- end Turnstile ---

    // ---- Read & validate fields ----
    const firstName = clampStr(formData.get("firstName"), 80).trim();
    const lastName = clampStr(formData.get("lastName"), 80).trim();
    const email = clampStr(formData.get("email"), 120).trim();

    if (!firstName || !lastName) {
      return new Response(
        JSON.stringify({ ok: false, error: "Please enter your name." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Please enter a valid email." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const phone = clampStr(formData.get("phone"), 60).trim();
    const address = clampStr(formData.get("address"), 160).trim();
    const zip = clampStr(formData.get("zip"), 20).trim();
    const projectType = clampStr(formData.get("projectType"), 60).trim();
    const timeline = clampStr(formData.get("timeline"), 60).trim();
    const referral = clampStr(formData.get("referral"), 60).trim();
    const message = clampStr(formData.get("message"), 8000);

    // roomsJson (cap size + safe parse)
    const roomsJsonRaw = clampStr(formData.get("roomsJson"), 20000).trim();

    // photoUrls comes in as JSON string from a hidden input
    let photoUrls: string[] = [];
    const photoUrlsEntry = formData.get("photoUrls");
    if (photoUrlsEntry) {
      const raw = clampStr(photoUrlsEntry, 20000).trim();
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            photoUrls = parsed
              .filter((u) => typeof u === "string")
              .map((u) => u.trim())
              .filter((u) => isHttpUrl(u))
              .slice(0, 20); // cap
          }
        } catch {
          photoUrls = [];
        }
      }
    }

    const toEmail = import.meta.env.ESTIMATE_TO_EMAIL;
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
    const replyToDefault = import.meta.env.REPLY_TO_EMAIL || toEmail;
    const bccEmail = import.meta.env.LEADS_BCC_EMAIL;

    if (!toEmail || !fromEmail) {
      return new Response(
        JSON.stringify({ ok: false, error: "Email config missing on server" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `New estimate request from ${fullName || "website lead"}`;

    // Rooms block
    let roomsBlock = "";
    if (roomsJsonRaw && roomsJsonRaw !== "[]") {
      try {
        const rooms = JSON.parse(roomsJsonRaw);
        if (Array.isArray(rooms) && rooms.length) {
          const rows = rooms
            .slice(0, 50)
            .map((r: any, i: number) => {
              const name = escapeHtml(String(r?.name || `Room ${i + 1}`));
              const len = r?.lengthFt ?? "";
              const wid = r?.widthFt ?? "";
              const hgt = r?.ceilingHtFt ?? "";
              const notes = escapeHtml(String(r?.notes || ""));

              return `
                <tr>
                  <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">
                    <strong>${name}</strong><br/>
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

    // 1) Send lead email to PaintCraft
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html: htmlBody,
      replyTo: email || replyToDefault || toEmail,
      bcc: bccEmail || undefined,
    });

    // 2) Auto-confirmation to the customer
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your estimate request",
      replyTo: replyToDefault || toEmail,
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
