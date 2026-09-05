import { CONTACT } from "@/config/site";

/**
 * Central WhatsApp helper.
 * Builds pre-filled WhatsApp links and opens WhatsApp.
 */

export function buildWhatsAppUrl(message = "") {
  const base = CONTACT.whatsappLink;

  return message
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}

export function openWhatsApp(message = "") {
  window.open(
    buildWhatsAppUrl(message),
    "_blank",
    "noopener,noreferrer"
  );
}

export const WhatsAppMessages = {
  general: (name) =>
    `Hello Mbabazi,${name ? `\n\nMy name is ${name}.` : ""}\n\nI was browsing your portfolio website and would like to connect.\n\nThank you.`,

  aiHandoff: (name, service) =>
    `Hello Mbabazi,\n\nI was chatting with Bless AI on your website.\n\nMy name is ${name || "—"}.\n${
      service ? `I'm interested in ${service}.\n` : ""
    }Could we continue the conversation here?\n\nThank you.`,

  quote: (name, service) =>
    `Hello Mbabazi,\n\nI have just submitted a quotation request through your website.\n\nName: ${
      name || "—"
    }\nService: ${service || "—"}\n\nThank you.`,

  portfolio: (project) =>
    `Hello Mbabazi,\n\nI viewed your portfolio project:\n${project}\n\nI'd like to discuss a similar project.\n\nThank you.`,

  service: (service) =>
    `Hello Mbabazi,\n\nI'm interested in your:\n${service}\n\nI'd like more information.\n\nThank you.`,

  consultation: (date, time, type) =>
    `Hello Mbabazi,\n\nI'd like to book a consultation.\n\nPreferred Date: ${
      date || "—"
    }\nPreferred Time: ${time || "—"}\nMeeting Type: ${
      type || "—"
    }\n\nThank you.`,

  fashionShopping: () =>
    `Hello,\n\nI'm interested in shopping at Bless Fashion House.\n\nCould you assist me?`,

  fashionTailoring: () =>
    `Hello,\n\nI'd like to request custom tailoring services.`,

  fashionUniforms: () =>
    `Hello,\n\nI'd like information about uniform services.`,
};