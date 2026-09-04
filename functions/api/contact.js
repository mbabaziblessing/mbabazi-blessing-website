const PRODUCTION_ORIGIN = "https://mbabaziblessing.com";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const TO_EMAIL = "hello@mbabaziblessing.com";
const FROM_EMAIL = "Mbabazi Blessing <hello@mbabaziblessing.com>";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const responseHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function jsonResponse(body, status, origin) {
  const headers = new Headers(responseHeaders);

  if (origin === PRODUCTION_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", PRODUCTION_ORIGIN);
    headers.set("Vary", "Origin");
  }

  return new Response(JSON.stringify(body), {
    status,
    headers,
  });
}

function errorResponse(
  status,
  origin,
  message = "Unable to process the request."
) {
  return jsonResponse({ error: message }, status, origin);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function validateBody(body) {
  if (!isPlainObject(body)) {
    return { valid: false };
  }

  const name = normalizeText(body.name);
  const email = normalizeText(body.email);
  const subject = normalizeText(body.subject);
  const message = normalizeText(body.message);

  if (!name || name.length < 2 || name.length > MAX_NAME_LENGTH) {
    return { valid: false };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false };
  }

  if (!subject || subject.length > MAX_SUBJECT_LENGTH) {
    return { valid: false };
  }

  if (!message || message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      subject,
      message,
    },
  };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendResendEmail({
  to,
  replyTo,
  subject,
  html,
  text,
  apiKey,
}) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error("Resend request failed");
    error.providerStatus = response.status;
    error.providerBody = result;
    throw error;
  }

  return result;
}

function buildOwnerNotification(data) {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:680px;margin:0 auto">
      <h2 style="margin-bottom:24px">New website enquiry</h2>

      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>

      <p>
        <strong>Email:</strong>
        <a href="mailto:${escapeHtml(data.email)}">
          ${escapeHtml(data.email)}
        </a>
      </p>

      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>

      <p><strong>Message:</strong></p>

      <div style="padding:16px;background:#f6f6f6;border-radius:8px;white-space:pre-wrap">
        ${escapeHtml(data.message)}
      </div>

      <hr style="margin:28px 0;border:0;border-top:1px solid #ddd">

      <p style="font-size:12px;color:#666">
        This enquiry was submitted through
        <a href="https://mbabaziblessing.com">
          mbabaziblessing.com
        </a>.
      </p>
    </div>
  `;

  const text = [
    "NEW WEBSITE ENQUIRY",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "Submitted through: https://mbabaziblessing.com",
  ].join("\n");

  return {
    subject: `Website enquiry: ${data.subject}`,
    html,
    text,
  };
}

function buildVisitorConfirmation(data) {
  const safeName = escapeHtml(data.name);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:680px;margin:0 auto">

      <div style="padding:24px 0">
        <h2 style="margin:0 0 20px">
          Thank you for contacting Mbabazi Blessing
        </h2>

        <p>Hello ${safeName},</p>

        <p>
          Thank you for reaching out through my website.
          I have received your enquiry and will review the details
          and get back to you shortly.
        </p>

        <div style="margin:24px 0;padding:18px;background:#f6f6f6;border-radius:8px">
          <p style="margin:0 0 10px">
            <strong>Your enquiry:</strong>
          </p>

          <p style="margin:6px 0">
            <strong>Subject:</strong> ${safeSubject}
          </p>

          <p style="margin:6px 0">
            <strong>Message:</strong>
          </p>

          <p style="margin:6px 0;white-space:pre-wrap">
            ${safeMessage}
          </p>
        </div>

        <p>
          If you have additional information to share, simply reply
          to this email.
        </p>

        <p>
          Best regards,<br>
          <strong>Mbabazi Blessing</strong><br>
          Web Developer & Digital Solutions
        </p>

        <p>
          <a href="https://mbabaziblessing.com">
            mbabaziblessing.com
          </a>
        </p>
      </div>

    </div>
  `;

  const text = [
    "THANK YOU FOR CONTACTING MBABAZI BLESSING",
    "",
    `Hello ${data.name},`,
    "",
    "Thank you for reaching out through my website.",
    "I have received your enquiry and will review the details and get back to you shortly.",
    "",
    "YOUR ENQUIRY",
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "If you have additional information to share, simply reply to this email.",
    "",
    "Best regards,",
    "Mbabazi Blessing",
    "Web Developer & Digital Solutions",
    "https://mbabaziblessing.com",
  ].join("\n");

  return {
    subject: "We received your enquiry — Mbabazi Blessing",
    html,
    text,
  };
}

export async function onRequest(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin");

  /*
   * Only allow requests originating from the production website.
   */
  if (origin && origin !== PRODUCTION_ORIGIN) {
    return errorResponse(403, origin);
  }

  /*
   * Only POST requests are accepted.
   */
  if (request.method !== "POST") {
    return errorResponse(405, origin);
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return errorResponse(400, origin, "Invalid request.");
  }

  const validation = validateBody(body);

  if (!validation.valid) {
    return errorResponse(
      400,
      origin,
      "Please provide valid contact details."
    );
  }

  const apiKey = env?.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");

    return errorResponse(
      503,
      origin,
      "Email service is temporarily unavailable."
    );
  }

  const data = validation.data;

  const ownerEmail = buildOwnerNotification(data);
  const visitorEmail = buildVisitorConfirmation(data);

  /*
   * Send both emails.
   *
   * OWNER:
   * From: hello@mbabaziblessing.com
   * To: hello@mbabaziblessing.com
   * Reply-To: visitor's email
   *
   * VISITOR:
   * From: hello@mbabaziblessing.com
   * To: visitor's email
   * Reply-To: hello@mbabaziblessing.com
   */
  const [ownerResult, visitorResult] = await Promise.allSettled([
    sendResendEmail({
      to: TO_EMAIL,
      replyTo: data.email,
      subject: ownerEmail.subject,
      html: ownerEmail.html,
      text: ownerEmail.text,
      apiKey,
    }),

    sendResendEmail({
      to: data.email,
      replyTo: TO_EMAIL,
      subject: visitorEmail.subject,
      html: visitorEmail.html,
      text: visitorEmail.text,
      apiKey,
    }),
  ]);

  /*
   * The owner notification is the critical email.
   * If it fails, report an error to the website.
   */
  if (ownerResult.status === "rejected") {
    console.error(
      "Owner notification failed:",
      ownerResult.reason?.providerStatus || "",
      ownerResult.reason?.providerBody || ""
    );

    return errorResponse(
      502,
      origin,
      "We couldn't send your message right now. Please try again shortly or contact us directly."
    );
  }

  /*
   * The visitor confirmation is helpful but should not make
   * a successful enquiry appear to have failed.
   */
  if (visitorResult.status === "rejected") {
    console.error(
      "Visitor confirmation failed:",
      visitorResult.reason?.providerStatus || "",
      visitorResult.reason?.providerBody || ""
    );
  }

  return jsonResponse(
    {
      success: true,
      message: "Your message has been sent successfully.",
      id:
        ownerResult.status === "fulfilled"
          ? ownerResult.value?.id || null
          : null,
      confirmationSent: visitorResult.status === "fulfilled",
    },
    200,
    origin
  );
}