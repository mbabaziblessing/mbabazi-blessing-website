import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  CONTACT,
  SOCIALS,
  WhatsAppIcon,
} from "./portfolio/shared";

const footerLinks = {
  Explore: [
    { label: "About Me", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Blog", path: "/blog" },
  ],

  Services: [
    { label: "Web Development", path: "/services" },
    { label: "E-commerce", path: "/services" },
    { label: "UI/UX Design", path: "/services" },
    { label: "Brand Identity", path: "/services" },
    { label: "Book Consultation", path: "/book-consultation" },
    { label: "Pricing", path: "/pricing" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: SOCIALS.facebook,
    mark: "f",
  },
  {
    label: "Instagram",
    href: SOCIALS.instagram,
    mark: "◎",
  },
  {
    label: "LinkedIn",
    href: SOCIALS.linkedin,
    mark: "in",
  },
  {
    label: "X",
    href: SOCIALS.twitter,
    mark: "𝕏",
  },
  {
    label: "TikTok",
    href: SOCIALS.tiktok,
    mark: "♪",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#06070b]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vapor/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-vapor/20 bg-vapor/10">
                <span className="font-heading text-sm font-bold text-vapor">
                  MB
                </span>
              </div>

              <span className="font-heading text-xl font-light tracking-wide text-alabaster">
                Mbabazi Blessing
              </span>
            </Link>

            <p className="max-w-sm text-sm font-light leading-relaxed text-graphite">
              Fashion entrepreneur, full-stack web developer, UI/UX
              designer, brand strategist, and AI solutions developer
              building meaningful digital experiences and businesses.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-graphite transition hover:text-alabaster"
              >
                <Mail size={15} className="text-vapor" />
                {CONTACT.email}
              </a>

              <a
                href="tel:+256707333422"
                className="flex items-center gap-2 text-sm text-graphite transition hover:text-alabaster"
              >
                <Phone size={15} className="text-vapor" />
                +256 707 333 422
              </a>

              <div className="flex items-center gap-2 text-sm text-graphite">
                <MapPin size={15} className="text-vapor" />
                Uganda
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
              Explore
            </h3>

            <nav className="space-y-3">
              {footerLinks.Explore.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm font-light text-graphite transition hover:text-alabaster"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
              Services
            </h3>

            <nav className="space-y-3">
              {footerLinks.Services.map((link) => (
                <Link
                  key={`${link.path}-${link.label}`}
                  to={link.path}
                  className="block text-sm font-light text-graphite transition hover:text-alabaster"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
              Connect
            </h3>

            <p className="mb-5 max-w-sm text-sm font-light leading-relaxed text-graphite">
              Have a project, business idea, collaboration opportunity,
              or consultation request?
            </p>

            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-xl bg-vapor px-5 py-3 text-sm font-medium text-white transition hover:bg-vapor/90"
            >
              <WhatsAppIcon size={16} />
              Start a Conversation
            </a>

            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-graphite transition hover:border-vapor/30 hover:bg-vapor/10 hover:text-vapor"
                >
                  {social.mark}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-5 text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} Mbabazi Blessing. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/privacy"
                className="transition hover:text-alabaster"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="transition hover:text-alabaster"
              >
                Terms
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-alabaster"
              >
                Contact
              </Link>

              <span className="text-graphite/50">
                Built with purpose in Uganda.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
