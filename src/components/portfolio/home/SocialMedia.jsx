import React from "react";
import { motion } from "framer-motion";
import {
  Music2,
  ExternalLink,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SOCIALS, WhatsAppIcon } from "@/components/portfolio/shared";

const platforms = [
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    desc: "Quick communication, customer support, consultations, and project enquiries.",
    url: SOCIALS.whatsappLink,
    primary: true,
    numbers: ["+256 707 333 422", "+256 776 994 892"],
  },
  {
    name: "Facebook",
    icon: () => <span className="text-lg font-bold">f</span>,
    desc: "Business updates, portfolio highlights, announcements, and community engagement.",
    url: SOCIALS.facebook,
  },
  {
    name: "Instagram",
    icon: () => <span className="text-lg font-bold">◎</span>,
    desc: "Fashion content, branding, creative work, behind-the-scenes, and project showcases.",
    url: SOCIALS.instagram,
  },
  {
    name: "X (Twitter)",
    icon: () => <span className="text-lg font-bold">𝕏</span>,
    desc: "Technology discussions, AI updates, web development insights, and industry news.",
    url: SOCIALS.twitter,
  },
  {
    name: "TikTok",
    icon: Music2,
    desc: "Short educational videos, web development tips, AI demonstrations, business advice, and fashion content.",
    url: SOCIALS.tiktok,
  },
];

const whyFollow = [
  "Technology Updates",
  "AI Tips & Tutorials",
  "Website Development",
  "UI/UX Design Inspiration",
  "Fashion Business Updates",
  "Entrepreneurship Advice",
  "Project Announcements",
  "Digital Marketing Insights",
  "Business Growth Strategies",
  "Behind-the-Scenes Content",
];

export default function SocialMedia() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative border-t border-white/5 py-24"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor"
          >
            Stay Connected
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 font-heading text-4xl font-light text-alabaster sm:text-5xl"
          >
            Connect With Me
          </motion.h2>

          <p className="mx-auto max-w-2xl font-light text-graphite">
            Follow me on social media for project updates, technology
            insights, fashion inspiration, business ideas, tutorials, and
            behind-the-scenes content.
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm font-light leading-relaxed text-graphite/80">
            Stay connected with me across my social media platforms to follow
            my latest projects, business updates, web development tutorials,
            AI innovations, fashion content, and entrepreneurial journey.
          </p>
        </div>

        {/* Platform cards */}
        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;

            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-30px",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className={`group relative flex flex-col items-center rounded-2xl glass p-6 text-center transition-all duration-500 hover:-translate-y-1.5 ${
                  platform.primary
                    ? "border-vapor/30 ring-1 ring-vapor/30"
                    : "hover:border-vapor/25"
                }`}
              >
                {platform.primary && (
                  <span className="absolute -top-2.5 rounded-full bg-vapor px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
                    Primary
                  </span>
                )}

                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition ${
                    platform.primary
                      ? "bg-vapor"
                      : "bg-vapor/10 group-hover:bg-vapor/20"
                  }`}
                >
                  <Icon
                    size={26}
                    className={
                      platform.primary
                        ? "text-white"
                        : "text-vapor"
                    }
                  />
                </div>

                <h3 className="mb-2 flex items-center gap-1 text-sm font-medium text-alabaster">
                  {platform.name}
                  <ExternalLink
                    size={11}
                    className="text-graphite/50"
                  />
                </h3>

                <p className="mb-4 flex-1 text-xs font-light leading-relaxed text-graphite">
                  {platform.desc}
                </p>

                {platform.numbers && (
                  <div className="mb-4 space-y-0.5">
                    {platform.numbers.map((number) => (
                      <p
                        key={number}
                        className="text-[11px] font-mono text-graphite/70"
                      >
                        {number}
                      </p>
                    ))}
                  </div>
                )}

                <span
                  className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-medium transition ${
                    platform.primary
                      ? "bg-vapor text-white"
                      : "glass text-alabaster group-hover:bg-white/10"
                  }`}
                >
                  {platform.primary ? "Chat Now" : "Follow"}
                  <ArrowRight size={13} />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Why follow */}
        <div className="mb-10 rounded-2xl glass p-7">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles
              size={16}
              className="text-vapor"
            />

            <h3 className="font-heading text-xl font-light text-alabaster">
              Why Follow Me
            </h3>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {whyFollow.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.04,
                }}
                className="flex items-center gap-2 text-xs font-light text-graphite"
              >
                <Check
                  size={13}
                  className="flex-shrink-0 text-vapor"
                />
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl glass-strong p-8 text-center sm:p-12"
        >
          <h3 className="mb-3 font-heading text-2xl font-light text-alabaster sm:text-3xl">
            Let's stay connected.
          </h3>

          <p className="mx-auto mb-6 max-w-lg font-light text-graphite">
            Follow my social media channels to receive the latest updates,
            educational content, and announcements.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-vapor px-6 py-3 text-sm font-medium text-white transition hover:bg-vapor/90"
            >
              <span className="text-sm font-bold">f</span>
              Follow Me
            </a>

            <a
              href={SOCIALS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-alabaster transition hover:bg-white/10"
            >
              <WhatsAppIcon size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}