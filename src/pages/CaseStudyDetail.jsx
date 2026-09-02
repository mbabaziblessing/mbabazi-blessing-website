import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Target,
  UserCog,
  Lightbulb,
  TrendingUp,
  Check,
  Calendar,
  Building2,
} from "lucide-react";
import PageHero from "@/components/portfolio/PageHero";
import { caseStudies } from "@/components/caseStudyData";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <div className="pt-40 pb-32 text-center">
        <h1 className="mb-4 font-heading text-4xl text-alabaster">
          Case Study Not Found
        </h1>

        <Link
          to="/case-studies"
          className="text-vapor hover:underline"
        >
          ← Back to all case studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={cs.title}
        subtitle={cs.summary}
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Portfolio", path: "/portfolio" },
          { label: "Case Studies", path: "/case-studies" },
          { label: cs.title },
        ]}
      />

      {/* Meta bar */}
      <section className="border-y border-white/5 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vapor/10">
              <Building2 size={18} className="text-vapor" />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-graphite">
                Client
              </p>
              <p className="text-sm font-light text-alabaster">
                {cs.client}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vapor/10">
              <span className="text-xs font-mono text-vapor">
                {cs.category.split(" ")[0]}
              </span>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-graphite">
                Category
              </p>
              <p className="text-sm font-light text-alabaster">
                {cs.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vapor/10">
              <Calendar size={18} className="text-vapor" />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-graphite">
                Year
              </p>
              <p className="text-sm font-light text-alabaster">
                {cs.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vapor/10">
              <UserCog size={18} className="text-vapor" />
            </div>

            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-wider text-graphite">
                My Role
              </p>

              <p className="truncate text-sm font-light text-alabaster">
                {cs.role.split("—")[0].trim()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src={cs.image}
              alt={cs.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Overview + Goals */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
              Overview
            </p>

            <h2 className="mb-4 font-heading text-3xl font-light text-alabaster">
              The Challenge
            </h2>

            <p className="text-base font-light leading-relaxed text-graphite">
              {cs.challenge}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl glass p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-vapor">
              <Target size={16} />
              <h3 className="font-mono text-xs uppercase tracking-wider">
                Project Goals
              </h3>
            </div>

            <ul className="space-y-3">
              {cs.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex items-start gap-2 text-sm font-light leading-relaxed text-graphite"
                >
                  <Check
                    size={14}
                    className="mt-1 flex-shrink-0 text-vapor"
                  />
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* My Role */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6 rounded-2xl glass p-8 sm:flex-row"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
              <UserCog size={22} className="text-vapor" />
            </div>

            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-vapor">
                My Role
              </h3>

              <p className="text-base font-light leading-relaxed text-alabaster">
                {cs.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center gap-2 text-vapor">
              <Lightbulb size={16} />
              <p className="font-mono text-xs uppercase tracking-wider">
                The Solution
              </p>
            </div>

            <h2 className="mb-4 font-heading text-3xl font-light text-alabaster">
              How I Approached It
            </h2>

            <p className="text-base font-light leading-relaxed text-graphite">
              {cs.solution}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {cs.tech.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg glass px-3 py-1 text-xs font-mono text-graphite"
                >
                  {technology}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {cs.gallery.slice(1).map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={image}
                  alt={`${cs.title} ${index + 2}`}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-vapor">
              <TrendingUp size={16} />

              <p className="font-mono text-xs uppercase tracking-wider">
                Outcomes
              </p>
            </div>

            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-4xl">
              Results Achieved
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cs.results.map((result, index) => (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-4 rounded-2xl glass p-6"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
                  <TrendingUp size={18} className="text-vapor" />
                </div>

                <p className="text-sm font-light leading-snug text-alabaster">
                  {result}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer navigation */}
      <section className="pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Link
            to="/case-studies"
            className="flex items-center gap-1.5 text-sm text-graphite transition hover:text-alabaster"
          >
            <ArrowLeft size={15} />
            All Case Studies
          </Link>

          <div className="flex flex-wrap gap-3">
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-vapor px-5 py-2.5 text-sm font-medium text-white transition hover:bg-vapor/90"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>

            <a
              href={cs.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl glass px-5 py-2.5 text-sm font-medium text-alabaster transition hover:bg-white/10"
            >
              <span className="text-xs font-bold">GH</span>
              Code
            </a>
          </div>
        </div>
      </section>

      {/* More case studies */}
      <section className="border-t border-white/5 pb-24 pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
            More Work
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {caseStudies
              .filter((item) => item.slug !== slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/case-studies/${item.slug}`}
                  className="group overflow-hidden rounded-2xl glass transition-all duration-500 hover:border-vapor/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                        {item.category}
                      </span>

                      <h3 className="mt-1 text-base font-medium text-alabaster">
                        {item.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-graphite transition group-hover:text-vapor"
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}