import LegalLayout from "@/components/LegalLayout";
import { FileText } from "lucide-react";

const sections = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "Welcome to the personal portfolio website of Mbabazi Blessing.",
      "By accessing or using this website, booking consultations, requesting services, downloading resources, subscribing to newsletters, or communicating through this website, you agree to be bound by these Terms of Service.",
      "If you do not agree with these Terms, please discontinue use of this website.",
    ],
  },

  {
    heading: "2. About This Website",
    paragraphs: [
      "This website serves as a professional portfolio and service platform showcasing my skills, experience, projects, resources, articles, and professional services.",
      "Services may include:",
    ],
    blocks: [
      {
        items: [
          "Website Design & Development",
          "UI/UX Design",
          "E-commerce Development",
          "Artificial Intelligence Solutions",
          "AI Chatbot Development",
          "Branding & Logo Design",
          "SEO Services",
          "Digital Marketing Consultation",
          "Business Strategy Consultation",
          "Fashion Business Consultation",
        ],
      },
    ],
  },

  {
    heading: "3. Eligibility",
    paragraphs: [
      "You must be at least 18 years old or have permission from a parent or legal guardian to use this website or purchase professional services.",
    ],
  },

  {
    heading: "4. Professional Services",
    paragraphs: [
      "All professional services are provided according to the agreed project scope.",
      "Any additional work requested outside the agreed scope may require additional time, pricing, or a separate agreement.",
    ],
  },

  {
    heading: "5. Consultation Bookings",
    paragraphs: [
      "Consultations are scheduled through Calendly.",
      "By booking a consultation, you agree to:",
    ],
    blocks: [
      {
        items: [
          "Provide accurate information.",
          "Attend meetings on time.",
          "Respect scheduled appointment times.",
          "Complete payment before paid consultations.",
        ],
      },
    ],
    trailing: [
      "Meeting links are delivered after successful booking confirmation.",
    ],
  },

  {
    heading: "6. Payments",
    blocks: [
      {
        items: [
          "Payments are securely processed through approved third-party payment providers.",
          "Payment is required before work begins unless otherwise agreed in writing.",
          "Prices displayed on this website may change without prior notice.",
        ],
      },
    ],
  },

  {
    heading: "7. Cancellations & Rescheduling",
    blocks: [
      {
        items: [
          "Clients may reschedule consultations up to 24 hours before the scheduled meeting.",
          "Missed appointments without prior notice may not qualify for refunds or rescheduling.",
          "If I must cancel a consultation, an alternative meeting time will be offered.",
        ],
      },
    ],
  },

  {
    heading: "8. Refund Policy",
    paragraphs: [
      "Consultation fees are generally non-refundable after the consultation has taken place.",
      "Refund requests for other services will be evaluated based on the nature of the project and any written agreement between both parties.",
    ],
  },

  {
    heading: "9. Client Responsibilities",
    paragraphs: ["Clients agree to:"],
    blocks: [
      {
        items: [
          "Provide accurate project information.",
          "Supply required content on time.",
          "Respond to project communications promptly.",
          "Respect agreed deadlines.",
          "Make payments according to agreed terms.",
        ],
      },
    ],
  },

  {
    heading: "10. Intellectual Property",
    paragraphs: ["Unless otherwise agreed in writing:"],
    blocks: [
      {
        items: [
          "All website content remains my intellectual property.",
          "My portfolio designs, branding, articles, graphics, and code are protected by copyright.",
          "Clients receive ownership only for deliverables specifically transferred as part of a completed project.",
        ],
      },
    ],
    trailing: [
      "No part of this website may be copied, reproduced, distributed, or republished without written permission.",
    ],
  },

  {
    heading: "11. Acceptable Use",
    paragraphs: ["You agree not to:"],
    blocks: [
      {
        items: [
          "Attempt unauthorized access to the website.",
          "Upload malicious software.",
          "Abuse contact forms.",
          "Disrupt website operations.",
          "Violate applicable laws.",
          "Misrepresent your identity.",
        ],
      },
    ],
  },

  {
    heading: "12. AI Assistant",
    paragraphs: [
      "This website may include an AI-powered assistant.",
      "AI responses are intended for general informational purposes and may occasionally contain inaccuracies.",
      "Users should independently verify important information before making significant personal, business, financial, or legal decisions.",
    ],
  },

  {
    heading: "13. Third-Party Services",
    paragraphs: [
      "This website may integrate with:",
    ],
    blocks: [
      {
        items: [
          "Calendly",
          "PayPal",
          "Google Maps",
          "WhatsApp",
          "Email Delivery Services",
          "Analytics Providers",
          "Artificial Intelligence Providers",
        ],
      },
    ],
    trailing: [
      "These services operate under their own terms and privacy policies.",
    ],
  },

  {
    heading: "14. Limitation of Liability",
    paragraphs: [
      'While reasonable efforts are made to provide accurate information and reliable services, this website and its content are provided "as is."',
      "To the maximum extent permitted by applicable law, I shall not be liable for indirect, incidental, consequential, or special damages arising from the use of this website or services.",
    ],
  },

  {
    heading: "15. Disclaimer",
    paragraphs: [
      "Information published on this website is intended for general informational purposes and should not be interpreted as legal, financial, accounting, medical, or professional advice.",
    ],
  },

  {
    heading: "16. Termination",
    paragraphs: [
      "I reserve the right to suspend or terminate access to the website or services if these Terms of Service are violated or if misuse, fraud, or unlawful activity is detected.",
    ],
  },

  {
    heading: "17. Governing Law",
    paragraphs: [
      "These Terms of Service shall be governed and interpreted in accordance with the laws of the Republic of Uganda.",
    ],
  },

  {
    heading: "18. Changes to These Terms",
    paragraphs: [
      "These Terms of Service may be updated periodically.",
      "Continued use of the website after updates constitutes acceptance of the revised Terms.",
    ],
  },

  {
    heading: "19. Contact Information",
    paragraphs: [
      "For questions regarding these Terms of Service, please contact:",
      "Name: Mbabazi Blessing",
      "Location: Uganda",
      "Telephone: +256 707 333 422",
      "Alternative Telephone: +256 776 994 892",
      "WhatsApp: +256 707 333 422",
      "Please use the Contact page on this website for all enquiries.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these Terms of Service carefully before using this website or engaging my professional services."
      lastUpdated="July 31, 2026"
      icon={FileText}
      breadcrumb={[
        { label: "Home", path: "/" },
        { label: "Terms of Service" },
      ]}
      sections={sections}
      closingStatement="By using this website and my professional services, you acknowledge that you have read, understood, and agree to these Terms of Service."
    />
  );
}