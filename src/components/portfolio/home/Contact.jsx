import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Calendar,
  Globe,
  Music2,
  AlertCircle,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  CONTACT,
  SOCIALS,
  WhatsAppIcon,
} from "@/components/portfolio/shared";
import { openWhatsApp, WhatsAppMessages } from "@/lib/whatsapp";

const serviceOptions = [
  "Website Design & Development",
  "E-commerce Development",
  "UI/UX Design",
  "Brand Identity Design",
  "SEO Consultation",
  "AI Solutions & Automation",
  "Digital Marketing",
  "Business Strategy Consultation",
  "Fashion Business Consultation",
  "Other",
];

const socialLinks = [
  {
    icon: () => <span className="text-xs font-bold">f</span>,
    label: "Facebook",
    url: SOCIALS.facebook,
  },
  {
    icon: () => <span className="text-xs font-bold">◎</span>,
    label: "Instagram",
    url: SOCIALS.instagram,
  },
  {
    icon: () => <span className="text-xs font-bold">in</span>,
    label: "LinkedIn",
    url: SOCIALS.linkedin,
  },
  {
    icon: Music2,
    label: "TikTok",
    url: SOCIALS.tiktok,
  },
  {
    icon: () => <span className="text-xs font-bold">▶</span>,
    label: "YouTube",
    url: "https://youtube.com/@mbabaziblessing",
  },
  {
    icon: () => <span className="text-xs font-bold">𝕏</span>,
    label: "X (Twitter)",
    url: SOCIALS.twitter,
  },
];

const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 6:00 PM (EAT)" },
  { day: "Saturday", time: "9:00 AM – 4:00 PM (EAT)" },
  { day: "Sunday", time: "Closed" },
];

const mapService = (service) =>
  ({
    "Website Design & Development": "Website Development",
    "E-commerce Development": "E-commerce Website",
    "UI/UX Design": "UI/UX Design",
    "Brand Identity Design": "Branding",
    "SEO Consultation": "SEO Optimization",
    "AI Solutions & Automation": "AI Integration",
    "Digital Marketing": "Other",
    "Business Strategy Consultation": "Consultation",
    "Fashion Business Consultation": "Consultation",
    Other: "Other",
  })[service] || "Other";

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    if (status) {
      setStatus(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const service = mapService(form.service);

      const detailsParts = [form.subject.trim()];

      if (form.message.trim()) {
        detailsParts.push(form.message.trim());
      }

      if (form.budget.trim()) {
        detailsParts.push(`Budget: ${form.budget.trim()}`);
      }

      const emailSubject = encodeURIComponent(
        `New Quote Request from ${form.name.trim()}`
      );

      const emailBody = encodeURIComponent(
        [
          `Name: ${form.name.trim()}`,
          `Email: ${form.email.trim()}`,
          `Phone: ${form.phone.trim() || "—"}`,
          `Company: ${form.company.trim() || "—"}`,
          `Service: ${form.service || service}`,
          "",
          detailsParts.join("\n\n"),
        ].join("\n")
      );

      window.location.href =
        `mailto:${CONTACT.email}?subject=${emailSubject}&body=${emailBody}`;

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative border-t border-white/5 py-24"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor"
          >
            Get In Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 font-heading text-4xl font-light text-alabaster sm:text-5xl"
          >
            Contact Me
          </motion.h2>

          <p className="mx-auto max-w-2xl font-light text-graphite">
            Let's connect and discuss your next project. Whether you need a
            website, AI solution, branding, business consultation, or digital
            strategy, I'm ready to help.
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm font-light leading-relaxed text-graphite/80">
            Thank you for visiting my portfolio. If you have a project,
            business idea, collaboration opportunity, or would like to
            schedule a consultation, feel free to get in touch. I aim to
            respond to all enquiries as soon as possible.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 rounded-3xl glass p-7 sm:p-8 lg:order-1"
          >
            <h3 className="mb-5 font-heading text-xl font-light text-alabaster">
              Send a Message
            </h3>

            {status === "success" && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <Check
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-green-400"
                />

                <p className="text-sm font-light text-alabaster">
                  Your email draft has been opened. Review it and send it from
                  your email application.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-red-400"
                />

                <p className="text-sm font-light text-alabaster">
                  Something went wrong. Please contact me directly through
                  WhatsApp or email.
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Full Name *
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none ${
                      errors.name ? "border border-red-500/40" : ""
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Email Address *
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none ${
                      errors.email ? "border border-red-500/40" : ""
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+256 ..."
                    className="w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Company / Organization
                  </label>

                  <input
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Service Interested In
                  </label>

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl glass bg-obsidian px-4 py-3 text-sm text-alabaster focus:border-vapor/30 focus:outline-none"
                  >
                    <option value="">Select a service</option>

                    {serviceOptions.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-obsidian"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-light text-graphite">
                    Budget
                  </label>

                  <input
                    name="budget"
                    type="text"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. $500 - $1000"
                    className="w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-light text-graphite">
                  Subject *
                </label>

                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project subject"
                  className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none ${
                    errors.subject ? "border border-red-500/40" : ""
                  }`}
                />

                {errors.subject && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-light text-graphite">
                  Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={`w-full resize-none rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none ${
                    errors.message ? "border border-red-500/40" : ""
                  }`}
                />

                {errors.message && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-vapor px-6 py-3.5 text-sm font-medium text-white transition hover:bg-vapor/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  "Opening Email..."
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <div className="order-1 space-y-4 lg:order-2">
            <div className="rounded-2xl glass p-6">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
                  <MapPin
                    size={20}
                    className="text-vapor"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-alabaster">
                    Mbabazi Blessing
                  </h4>

                  <p className="mt-0.5 text-xs font-light text-graphite">
                    Fashion Entrepreneur | Full-Stack Web Developer | UI/UX
                    Designer | Brand Strategist | AI Solutions Developer
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs font-light text-graphite/70">
                    <Globe size={11} className="text-vapor" />
                    Uganda
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+256707333422"
                className="rounded-2xl glass p-5 transition hover:-translate-y-0.5 hover:border-vapor/25"
              >
                <Phone size={18} className="mb-2 text-vapor" />
                <p className="text-xs font-medium text-alabaster">
                  Primary
                </p>
                <p className="text-xs font-light text-graphite">
                  +256 707 333 422
                </p>
                <p className="mt-1 text-[11px] font-light text-graphite/70">
                  +256 776 994 892
                </p>
              </a>

              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl glass p-5 transition hover:-translate-y-0.5 hover:border-green-400/25"
              >
                <WhatsAppIcon
                  size={18}
                  className="mb-2 text-green-400"
                />
                <p className="text-xs font-medium text-alabaster">
                  WhatsApp
                </p>
                <p className="text-xs font-light text-graphite">
                  +256 707 333 422
                </p>
                <p className="mt-1 text-[11px] font-light text-graphite/70">
                  +256 776 994 892
                </p>
              </a>
            </div>

            <div className="rounded-2xl glass p-6">
              <div className="mb-3 flex items-center gap-2">
                <Clock size={16} className="text-vapor" />
                <h4 className="text-sm font-medium text-alabaster">
                  Business Hours
                </h4>
              </div>

              <ul className="space-y-1.5">
                {hours.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between gap-4 text-xs"
                  >
                    <span className="font-light text-graphite">
                      {item.day}
                    </span>

                    <span
                      className={
                        item.time === "Closed"
                          ? "font-mono text-red-400/70"
                          : "font-mono text-alabaster/80"
                      }
                    >
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    WhatsAppMessages.general(),
                    "contact_to_whatsapp"
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-vapor px-4 py-3 text-sm font-medium text-white transition hover:bg-vapor/90"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </button>

              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-medium text-alabaster transition hover:bg-white/10"
              >
                <Calendar size={16} />
                Book a Consultation
              </a>

              <a
                href="tel:+256707333422"
                className="flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-medium text-alabaster transition hover:bg-white/10"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl glass h-56">
              <iframe
                title="Map of Uganda"
                src="https://maps.google.com/maps?q=Uganda&z=6&output=embed"
                className="h-full w-full grayscale invert opacity-70"
                loading="lazy"
              />
            </div>

            <div className="rounded-2xl glass p-5">
              <p className="mb-3 text-xs font-medium text-alabaster">
                Follow Me
              </p>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-graphite transition hover:bg-vapor hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[11px] font-light text-graphite/60">
                <Mail size={11} className="text-vapor" />
                I aim to respond to enquiries within 24 hours during business
                days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}