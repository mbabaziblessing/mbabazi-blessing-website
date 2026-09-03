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

function errorResponse(status, origin, message = "Unable to process the request.") {
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

  if (!name || name.length > MAX_NAME_LENGTH || name.length < 2) {
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

async function sendEmail(data, apiKey) {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      <hr />
      <p style="font-size:12px;color:#666">
        Sent from https://mbabaziblessing.com
      </p>
    </div>
  `;

  const text = [
    "New website enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "Sent from: https://mbabaziblessing.com",
  ].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: data.email,
      subject: `Website enquiry: ${data.subject}`,
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

export async function onRequest(context) {
  const { request, env } = context;
  const origin = request.headers.get("Origin");

  if (origin && origin !== PRODUCTION_ORIGIN) {
    return errorResponse(403, origin);
  }

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
    return errorResponse(400, origin, "Please provide valid contact details.");
  }

  const apiKey = env?.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return errorResponse(503, origin);
  }

  try {
    const result = await sendEmail(validation.data, apiKey);

    return jsonResponse(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: result?.id || null,
      },
      200,
      origin
    );
  } catch (error) {
    console.error(
      "Contact email provider error:",
      error?.providerStatus || "",
      error?.providerBody || ""
    );

    return errorResponse(
      502,
      origin,
      "We couldn't send your message right now. Please try again shortly or contact us directly."
    );
  }
}