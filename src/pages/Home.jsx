import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Quote } from "lucide-react";

import {
  IMAGES,
  CONTACT,
  WhatsAppIcon,
} from "@/components/portfolio/shared";

import TrustedBy from "@/components/portfolio/TrustedBy";
import TiltCard from "@/components/portfolio/TiltCard";
import Ripple from "@/components/portfolio/Ripple";
import SmartImage from "@/components/portfolio/SmartImage";

import { blogPosts } from "@/components/portfolio/blogData";

import Hero from "@/components/portfolio/home/Hero";
import AboutSection from "@/components/portfolio/home/AboutSection";
import MissionVisionValues from "@/components/portfolio/home/MissionVisionValues";
import Journey from "@/components/portfolio/home/Journey";
import Pricing from "@/components/portfolio/home/Pricing";
import BookConsultation from "@/components/portfolio/home/BookConsultation";
import FAQ from "@/components/portfolio/home/FAQ";
import Resume from "@/components/portfolio/home/Resume";
import SocialMedia from "@/components/portfolio/home/SocialMedia";
import Newsletter from "@/components/portfolio/home/Newsletter";

const featuredProjects = [
  {
    title: "Luxe Commerce",
    category: "Websites",
    image: IMAGES.ecom,
  },
  {
    title: "Novus Brand System",
    category: "Branding",
    image: IMAGES.brand,
  },
  {
    title: "FinTrack Dashboard",
    category: "UI/UX",
    image: IMAGES.uiux,
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-obsidian">
      {/* =========================================================
          HERO
          Deepest background. The Hero component keeps its own
          portrait + purple glow treatment.
      ========================================================== */}
      <section className="hero-background">
        <Hero />
      </section>

      {/* =========================================================
          ABOUT
          Slightly lighter midnight chapter.
      ========================================================== */}
      <section className="section-midnight relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vapor/[0.035] to-transparent" />
        <AboutSection />
      </section>

      {/* =========================================================
          MISSION / VISION / VALUES
          Raised surface for visual separation.
      ========================================================== */}
      <section className="section-charcoal relative">
        <div className="pointer-events-none absolute inset-0 bg-purple-wash opacity-40" />
        <div className="relative">
          <MissionVisionValues />
        </div>
      </section>

      {/* =========================================================
          JOURNEY
          Returns toward the darker base.
      ========================================================== */}
      <section className="section-dark relative">
        <Journey />
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section className="section-violet relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-vapor/[0.055] blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-light leading-relaxed text-alabaster sm:text-3xl"
          >
            I build{" "}
            <span className="gradient-text">
              digital experiences
            </span>{" "}
            that bridge the gap between high fashion and rigorous
            engineering — treating code as fabric and interfaces as
            art installations.
          </motion.p>
        </div>
      </section>

      {/* =========================================================
          TRUSTED BY
      ========================================================== */}
      <section className="section-midnight relative">
        <TrustedBy />
      </section>

      {/* =========================================================
          PRICING
      ========================================================== */}
      <section className="section-charcoal relative">
        <Pricing />
      </section>

      {/* =========================================================
          CONSULTATION
      ========================================================== */}
      <section className="section-midnight relative">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/[0.035] blur-[130px]" />
        <BookConsultation />
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="section-surface relative">
        <FAQ />
      </section>

      {/* =========================================================
          FEATURED PROJECTS
          Deep-black visual chapter with project photography.
      ========================================================== */}
      <section className="section-dark relative py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-vapor/[0.045] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
                Recent Work
              </p>

              <h2 className="font-heading text-3xl font-light text-alabaster sm:text-4xl">
                Featured Projects
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="hidden items-center gap-1 text-sm text-vapor transition-all hover:gap-2 sm:flex"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <TiltCard className="group h-full overflow-hidden rounded-2xl glass">
                  <SmartImage
                    src={project.image}
                    alt={project.title}
                    aspect="3/2"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                      {project.category}
                    </span>

                    <h3 className="mt-1 text-lg font-medium text-alabaster">
                      {project.title}
                    </h3>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LATEST BLOG
          Slightly lighter surface.
      ========================================================== */}
      <section className="section-midnight relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
                Insights
              </p>

              <h2 className="font-heading text-3xl font-light text-alabaster sm:text-4xl">
                Latest Posts
              </h2>
            </div>

            <Link
              to="/blog"
              className="hidden items-center gap-1 text-sm text-vapor transition-all hover:gap-2 sm:flex"
            >
              View All Blog Articles
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl glass transition-all duration-500 hover:border-vapor/20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      aspect="16/9"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-lg bg-vapor/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-1 text-base font-medium text-alabaster">
                      {post.title}
                    </h3>

                    <p className="text-sm font-light text-graphite">
                      {post.date} · {post.readTime}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIAL
          Softer violet chapter.
      ========================================================== */}
      <section className="section-violet relative py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-vapor/[0.045] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Quote
            size={36}
            className="mx-auto mb-6 text-vapor/25"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-xl font-light italic leading-relaxed text-alabaster sm:text-2xl"
          >
            "Mbabazi is not just a developer — he is a strategic
            thinker. His branding and SEO work helped us rank on the
            first page of Google within three months."
          </motion.p>

          <div className="mb-2 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <p className="text-sm font-light text-graphite">
            James Mugisha — KGL Ventures
          </p>

          <Link
            to="/testimonials"
            className="mt-6 inline-flex items-center gap-1 text-sm text-vapor transition-all hover:gap-2"
          >
            Read More Testimonials
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* =========================================================
          RESUME
      ========================================================== */}
      <section className="section-charcoal relative">
        <Resume />
      </section>

      {/* =========================================================
          CONTACT CTA
          Homepage conversion-focused contact section.
          Full contact details remain on /contact.
      ========================================================== */}
      <section className="section-midnight relative overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-vapor/[0.06] blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
              Get In Touch
            </p>

            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">
              Let's Build Something{" "}
              <span className="gradient-text">Extraordinary</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-graphite sm:text-base">
              Have a website, AI, branding, e-commerce, or business project in
              mind? Tell me what you're building and let's discuss how I can help
              turn your idea into a practical digital solution.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Ripple>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 rounded-xl bg-vapor px-6 py-3.5 text-sm font-medium text-white transition hover:bg-vapor/90 hover:shadow-lg hover:shadow-vapor/20"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </Ripple>

              <Ripple>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-medium text-alabaster transition hover:bg-white/10"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp Me
                </a>
              </Ripple>
            </div>

            <p className="mt-6 text-xs font-mono text-graphite/80">
              Based in Uganda · Available worldwide remotely
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SOCIAL MEDIA
      ========================================================== */}
      <section className="section-surface relative">
        <SocialMedia />
      </section>

      {/* =========================================================
          NEWSLETTER
      ========================================================== */}
      <section className="section-midnight relative">
        <Newsletter />
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="section-dark relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-vapor/[0.07] blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center sm:p-16"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-vapor/15 blur-[100px]" />

            <div className="relative">
              <h2 className="mb-4 font-heading text-3xl font-light text-alabaster sm:text-5xl">
                Let's Build Something{" "}
                <span className="gradient-text">
                  Extraordinary
                </span>
              </h2>

              <p className="mx-auto mb-8 max-w-lg font-light text-graphite">
                Ready to elevate your brand with world-class design
                and development? Let's talk.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Ripple>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 rounded-xl bg-vapor px-6 py-3 text-sm font-medium text-white transition hover:bg-vapor/90"
                  >
                    Start a Project
                  </Link>
                </Ripple>

                <Ripple>
                  <a
                    href={CONTACT.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-alabaster transition hover:bg-white/10"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp Me
                  </a>
                </Ripple>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}