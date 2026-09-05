import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CONTACT, SOCIALS } from "@/config/site";
import { SocialIcon, WhatsAppIcon } from "@/components/portfolio/shared";
import { openWhatsApp, WhatsAppMessages } from "@/lib/whatsapp";
import PageHero from "@/components/portfolio/PageHero";

const businessHours = [
  {
    day: "Monday - Friday",
    hours: "9:00 AM - 6:00 PM",
  },
  {
    day: "Saturday",
    hours: "10:00 AM - 4:00 PM",
  },
  {
    day: "Sunday",
    hours: "Closed",
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: SOCIALS.linkedin,
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: SOCIALS.facebook,
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: SOCIALS.instagram,
    icon: "instagram",
  },
  {
    label: "X (Twitter)",
    href: SOCIALS.twitter,
    icon: "x",
  },
  {
    label: "TikTok",
    href: SOCIALS.tiktok,
    icon: "tiktok",
  },
  {
    label: "Medium",
    href: SOCIALS.medium,
    icon: "medium",
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!form.message.trim()) {
    errors.message = "Message is required.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Please provide a little more information.";
  }

  return errors;
}

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const result = await response
        .json()
        .catch(() => null);

      if (
        !response.ok ||
        !result ||
        result.success !== true
      ) {
        throw new Error(
          result?.error || "Unable to send message."
        );
      }

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});

      window.setTimeout(() => {
        setSubmitted(false);
      }, 7000);
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error
      );

      setSubmitted(false);

      setErrors({
        form:
          "We couldn't send your message right now. Please try again shortly or contact me directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    openWhatsApp(
      WhatsAppMessages.general(),
      "contact_page_whatsapp"
    );
  };

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let's build something extraordinary together. Reach out through any channel below."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Contact" },
        ]}
      />

      <section
        ref={ref}
        className="relative py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor"
            >
              Get In Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.05,
              }}
              className="mb-4 font-heading text-4xl font-light text-alabaster sm:text-5xl"
            >
              Contact Me
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="mx-auto max-w-2xl font-light leading-relaxed text-graphite"
            >
              Let's connect and discuss your next project. Whether you need a
              website, AI solution, branding, business consultation, or digital
              strategy, I'm ready to help.
            </motion.p>

            <p className="mx-auto mt-5 max-w-3xl text-sm font-light leading-relaxed text-graphite/80">
              Have a project, business idea, collaboration opportunity, or
              consultation request? Send me a message and I'll get back to you
              as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass rounded-3xl p-6 sm:p-8"
            >
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-light text-alabaster">
                  Send a Message
                </h3>

                <p className="mt-2 text-sm font-light leading-relaxed text-graphite">
                  Tell me what you're building, what you need, and how I can
                  help.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-green-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-alabaster">
                      Message sent successfully.
                    </p>

                    <p className="mt-1 text-xs font-light leading-relaxed text-graphite">
                      Thank you for reaching out. Your message has been
                      delivered successfully, and I'll get back to you as
                      soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {errors.form && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-red-400"
                  />

                  <div>
                    <p className="text-sm font-medium text-alabaster">
                      Message not sent
                    </p>

                    <p className="mt-1 text-xs font-light leading-relaxed text-graphite">
                      {errors.form}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-graphite"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster outline-none transition placeholder:text-graphite/50 ${
                        errors.name
                          ? "border border-red-500/40"
                          : "focus:border-vapor/30"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1.5 text-[11px] text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-graphite"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster outline-none transition placeholder:text-graphite/50 ${
                        errors.email
                          ? "border border-red-500/40"
                          : "focus:border-vapor/30"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-[11px] text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-graphite"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    className={`w-full rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster outline-none transition placeholder:text-graphite/50 ${
                      errors.subject
                        ? "border border-red-500/40"
                        : "focus:border-vapor/30"
                    }`}
                  />

                  {errors.subject && (
                    <p className="mt-1.5 text-[11px] text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-graphite"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Tell me about your project..."
                    className={`w-full resize-none rounded-xl glass bg-transparent px-4 py-3 text-sm text-alabaster outline-none transition placeholder:text-graphite/50 ${
                      errors.message
                        ? "border border-red-500/40"
                        : "focus:border-vapor/30"
                    }`}
                  />

                  {errors.message && (
                    <p className="mt-1.5 text-[11px] text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-vapor px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-vapor/90 hover:shadow-lg hover:shadow-vapor/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] font-light leading-relaxed text-graphite/60">
                  Your message will open in your default email application.
                </p>
              </form>
            </motion.div>

            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="space-y-6"
            >
              {/* Identity */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
                    <MapPin
                      size={21}
                      className="text-vapor"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-alabaster">
                      Mbabazi Blessing
                    </h4>

                    <p className="mt-1 text-xs font-light leading-relaxed text-graphite">
                      Fashion Entrepreneur - Full-Stack Web Developer - UI/UX
                      Designer - Brand Strategist - AI Solutions Developer
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs font-light text-graphite/70">
                      <MapPin
                        size={11}
                        className="text-vapor"
                      />
                      Uganda - Available worldwide remotely
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone + WhatsApp */}
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="tel:+256707333422"
                  className="glass rounded-2xl p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-vapor/25"
                >
                  <Phone
                    size={18}
                    className="mb-3 text-vapor"
                  />

                  <p className="text-xs font-medium text-alabaster">
                    Phone
                  </p>

                  <p className="mt-1 text-xs font-light text-graphite">
                    +256 707 333 422
                  </p>

                  <p className="mt-0.5 text-[11px] font-light text-graphite/70">
                    +256 776 994 892
                  </p>
                </a>

                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-green-400/25"
                >
                  <WhatsAppIcon
                    size={18}
                    className="mb-3 text-green-400"
                  />

                  <p className="text-xs font-medium text-alabaster">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-xs font-light text-graphite">
                    +256 707 333 422
                  </p>

                  <p className="mt-0.5 text-[11px] font-light text-graphite/70">
                    +256 776 994 892
                  </p>
                </a>
              </div>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="glass group flex items-center gap-4 rounded-2xl p-6 transition-all duration-500 hover:border-vapor/25"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
                  <Mail
                    size={19}
                    className="text-vapor"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-alabaster transition group-hover:text-vapor">
                    Email
                  </p>

                  <p className="mt-1 break-all text-xs font-light text-graphite">
                    {CONTACT.email}
                  </p>
                </div>

                <ExternalLink
                  size={14}
                  className="ml-auto flex-shrink-0 text-graphite/50"
                />
              </a>

              {/* Business hours */}
              <div className="glass rounded-2xl p-6">
                <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-vapor">
                  <Clock size={14} />
                  Business Hours
                </h4>

                <div className="space-y-2">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="font-light text-graphite">
                        {item.day}
                      </span>

                      <span
                        className={
                          item.hours === "Closed"
                            ? "font-light text-red-400/70"
                            : "font-light text-alabaster"
                        }
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-green-500/90"
                >
                  <WhatsAppIcon size={16} />
                  Chat on WhatsApp
                </button>

                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl glass px-4 py-3.5 text-sm font-medium text-alabaster transition hover:bg-white/10"
                >
                  <Calendar size={16} />
                  Book a Consultation
                </a>

                <a
                  href="tel:+256707333422"
                  className="flex w-full items-center justify-center gap-2 rounded-xl glass px-4 py-3.5 text-sm font-medium text-alabaster transition hover:bg-white/10"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>

              {/* Social links */}
              <div className="glass rounded-2xl p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-vapor">
                    Connect
                  </h4>

                  <span className="text-[10px] font-light text-graphite/60">
                    Follow for updates
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2.5 text-sm text-graphite transition hover:border-vapor/20 hover:bg-vapor/10 hover:text-alabaster"
                    >
                      <SocialIcon name={social.icon} size={16} />
                      <span>{social.label}</span>
                      <ExternalLink
                        size={11}
                        className="text-graphite/50"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Response note */}
              <div className="flex items-start gap-2 px-1 text-[11px] font-light leading-relaxed text-graphite/60">
                <AlertCircle
                  size={13}
                  className="mt-0.5 flex-shrink-0 text-vapor"
                />

                <p>
                  I aim to respond to enquiries within 24 hours during
                  business days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section className="py-16 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <Calendar
              size={28}
              className="mx-auto mb-3 text-vapor"
            />

            <h2 className="mb-3 font-heading text-3xl font-light text-alabaster sm:text-4xl">
              Schedule a Consultation
            </h2>

            <p className="mx-auto max-w-lg font-light leading-relaxed text-graphite">
              Book a meeting directly on my calendar. Available slots are
              managed through Calendly.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-8 text-center sm:p-14">
            <Calendar
              size={28}
              className="mx-auto mb-3 text-vapor"
            />

            <h3 className="mb-3 font-heading text-2xl font-light text-alabaster">
              Book Directly on My Calendar
            </h3>

            <p className="mx-auto mb-6 max-w-md font-light leading-relaxed text-graphite">
              Choose a time that works for you and book your consultation
              directly through Calendly.
            </p>

            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-vapor px-7 py-3.5 text-sm font-medium text-white transition hover:bg-vapor/90"
            >
              <Calendar size={16} />
              Book a Session
            </a>

            <p className="mt-5 text-xs font-light text-graphite">
              Prefer to chat first?{" "}
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vapor hover:underline"
              >
                Message me on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                Location
              </p>

              <h2 className="mt-2 font-heading text-2xl font-light text-alabaster sm:text-3xl">
                Based in Uganda
              </h2>
            </div>

            <MapPin
              size={22}
              className="text-vapor"
            />
          </div>

          <div className="glass overflow-hidden rounded-2xl">
            <div className="h-72 sm:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772082988!2d32.55281525!3d0.3155611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f90af3bff%3A0x43b3d34f786b0a0!2sKampala%2C%20Uganda!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "invert(90%) hue-rotate(180deg) saturate(0.5)",
                }}
                allowFullScreen
                loading="lazy"
                title="Kampala, Uganda"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}