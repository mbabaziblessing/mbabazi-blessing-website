import React from "react";
import LegalLayout from "@/components/LegalLayout";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    heading: "1. Introduction",
    paragraphs: [
      "This Privacy Policy explains how information may be collected, used, stored, and protected when you visit or use the personal portfolio website of Mbabazi Blessing.",
      "By using this website, you acknowledge the practices described in this Privacy Policy.",
    ],
  },

  {
    heading: "2. Information You May Provide",
    paragraphs: [
      "You may voluntarily provide information when you contact me, request a quotation, book a consultation, subscribe to updates, or communicate through the website.",
      "This information may include:",
    ],
    blocks: [
      {
        items: [
          "Name",
          "Email address",
          "Telephone number",
          "Company or organization name",
          "Project or service information",
          "Messages and enquiries",
          "Consultation and booking information",
        ],
      },
    ],
  },

  {
    heading: "3. Automatically Collected Information",
    paragraphs: [
      "Some technical information may be collected automatically when you access the website.",
      "This may include:",
    ],
    blocks: [
      {
        items: [
          "IP address",
          "Browser type",
          "Device type",
          "Operating system",
          "Pages visited",
          "Referring pages",
          "General usage and performance information",
        ],
      },
    ],
  },

  {
    heading: "4. How Information Is Used",
    paragraphs: [
      "Information may be used to:",
    ],
    blocks: [
      {
        items: [
          "Respond to enquiries.",
          "Provide requested services.",
          "Manage consultation bookings.",
          "Communicate regarding projects.",
          "Improve website functionality and user experience.",
          "Provide relevant updates or information.",
          "Protect the security and integrity of the website.",
          "Comply with applicable legal obligations.",
        ],
      },
    ],
  },

  {
    heading: "5. Contact Forms",
    paragraphs: [
      "When you submit information through a contact form, the information may be used to respond to your enquiry or service request.",
      "Please avoid submitting sensitive personal information that is not necessary for your enquiry.",
    ],
  },

  {
    heading: "6. Cookies and Similar Technologies",
    paragraphs: [
      "The website may use cookies or similar technologies for functionality, analytics, security, and performance purposes.",
      "You may be able to control cookies through your browser settings. Disabling certain cookies may affect some website functionality.",
    ],
  },

  {
    heading: "7. Analytics",
    paragraphs: [
      "Analytics services may be used to understand website traffic, performance, and user behaviour.",
      "Analytics information is generally used in aggregate to improve the website and its services.",
    ],
  },

  {
    heading: "8. Third-Party Services",
    paragraphs: [
      "This website may interact with or link to third-party services, including:",
    ],
    blocks: [
      {
        items: [
          "Calendly",
          "Google Maps",
          "WhatsApp",
          "Email delivery services",
          "Analytics providers",
          "Artificial Intelligence providers",
          "Payment providers",
          "Social media platforms",
        ],
      },
    ],
    trailing: [
      "These third parties may collect or process information according to their own privacy policies and terms.",
    ],
  },

  {
    heading: "9. WhatsApp Communications",
    paragraphs: [
      "If you choose to communicate through WhatsApp, your communication is subject to WhatsApp's own terms and privacy policy in addition to this Privacy Policy.",
    ],
  },

  {
    heading: "10. Artificial Intelligence",
    paragraphs: [
      "The website may provide access to an AI-powered assistant.",
      "Information voluntarily entered into an AI interaction may be processed to generate responses or provide requested assistance.",
      "Users should avoid submitting sensitive, confidential, financial, authentication, or other information that they would not want processed by an AI service.",
    ],
  },

  {
    heading: "11. Data Sharing",
    paragraphs: [
      "Personal information is not intentionally sold for monetary consideration.",
      "Information may be shared with service providers where necessary to operate the website, deliver requested services, process bookings or payments, provide communications, or maintain website functionality.",
      "Information may also be disclosed where required by law or necessary to protect legal rights, security, or the website.",
    ],
  },

  {
    heading: "12. Data Security",
    paragraphs: [
      "Reasonable technical and organizational measures are used to protect information against unauthorized access, alteration, disclosure, or destruction.",
      "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },

  {
    heading: "13. Data Retention",
    paragraphs: [
      "Information may be retained for as long as reasonably necessary to provide services, maintain business records, resolve disputes, comply with legal obligations, and protect legitimate business interests.",
    ],
  },

  {
    heading: "14. Your Rights",
    paragraphs: [
      "Depending on applicable law, you may have rights relating to your personal information, including the ability to request access, correction, deletion, or other appropriate handling of your information.",
      "Requests may be submitted through the Contact page.",
    ],
  },

  {
    heading: "15. Children's Privacy",
    paragraphs: [
      "This website is not intentionally directed toward children under the age of 18.",
      "The website does not knowingly request or collect personal information from children for independent use of professional services.",
    ],
  },

  {
    heading: "16. External Links",
    paragraphs: [
      "This website may contain links to external websites, platforms, and services.",
      "I am not responsible for the privacy practices, security, or content of third-party websites.",
    ],
  },

  {
    heading: "17. International Visitors",
    paragraphs: [
      "The website is operated from Uganda and may be accessed from other countries.",
      "By using the website, you acknowledge that information may be processed in jurisdictions where service providers operate.",
    ],
  },

  {
    heading: "18. Changes to This Privacy Policy",
    paragraphs: [
      "This Privacy Policy may be updated periodically to reflect changes in services, technology, legal requirements, or business practices.",
      "The updated version will replace previous versions when published on this website.",
    ],
  },

  {
    heading: "19. Contact Information",
    paragraphs: [
      "For questions or requests relating to this Privacy Policy, please contact:",
      "Name: Mbabazi Blessing",
      "Location: Uganda",
      "Telephone: +256 707 333 422",
      "Alternative Telephone: +256 776 994 892",
      "WhatsApp: +256 707 333 422",
      "Please use the Contact page on this website for enquiries or privacy-related requests.",
    ],
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how information may be handled when you use this website and its services."
      lastUpdated="July 31, 2026"
      icon={ShieldCheck}
      breadcrumb={[
        { label: "Home", path: "/" },
        { label: "Privacy Policy" },
      ]}
      sections={sections}
      closingStatement="By using this website, you acknowledge that you have read and understood this Privacy Policy."
    />
  );
}