import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ExternalLink,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import PageHero from "@/components/portfolio/PageHero";
import { caseStudies } from "@/components/caseStudyData";

const categories = [
  "All",
  "Web Development",
  "Branding",
  "UI/UX Design",
];

export default function CaseStudies() {
  const [activeCat, setActiveCat] = useState("All");
  const [open, setOpen] = useState(null);

  const filtered = caseStudies.filter(
    (item) =>
      activeCat === "All" || item.category === activeCat
  );

  return (
    <>
      <PageHero
        title="Case Studies"
        subtitle="Deep dives into selected projects — the challenge, the solution, and the measurable results delivered."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Portfolio", path: "/portfolio" },
          { label: "Case Studies" },
        ]}
      />

      {/* Category filter */}
      <section className="py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCat(category)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                activeCat === category
                  ? "bg-vapor text-white"
                  : "glass text-graphite hover:text-alabaster"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="py-8 pb-32">
        <div className="mx-auto max-w-7xl space-y-6 px-6">
          {filtered.map((caseStudy, index) => {
            const isOpen = open === caseStudy.slug;

            return (
              <motion.div
                key={caseStudy.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl glass"
              >
                {/* Summary */}
                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? null : caseStudy.slug)
                  }
                  className="group grid w-full gap-0 text-left md:grid-cols-3"
                >
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-lg bg-vapor/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
                      {caseStudy.category}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-6 md:col-span-2 sm:p-8">
                    <p className="mb-2 text-xs font-mono text-graphite">
                      Client: {caseStudy.client}
                    </p>

                    <h2 className="mb-2 font-heading text-2xl font-light text-alabaster sm:text-3xl">
                      {caseStudy.title}
                    </h2>

                    <p className="mb-4 text-sm font-light leading-relaxed text-graphite">
                      {caseStudy.summary}
                    </p>

                    <span className="flex items-center gap-1 text-sm font-medium text-vapor">
                      {isOpen
                        ? "Hide Details"
                        : "View Full Case Study"}

                      <ArrowUpRight
                        size={14}
                        className={
                          isOpen
                            ? "rotate-90 transition"
                            : "transition"
                        }
                      />
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      {/* Details */}
                      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
                        <div>
                          <div className="mb-3 flex items-center gap-2 text-vapor">
                            <Lightbulb size={16} />
                            <h3 className="font-mono text-xs uppercase tracking-wider">
                              Challenge
                            </h3>
                          </div>

                          <p className="text-sm font-light leading-relaxed text-graphite">
                            {caseStudy.challenge}
                          </p>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-vapor">
                            <Target size={16} />
                            <h3 className="font-mono text-xs uppercase tracking-wider">
                              Solution
                            </h3>
                          </div>

                          <p className="text-sm font-light leading-relaxed text-graphite">
                            {caseStudy.solution}
                          </p>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-vapor">
                            <TrendingUp size={16} />
                            <h3 className="font-mono text-xs uppercase tracking-wider">
                              Results
                            </h3>
                          </div>

                          <ul className="space-y-2">
                            {caseStudy.results.map((result) => (
                              <li
                                key={result}
                                className="flex items-start gap-2 text-sm font-light text-graphite"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vapor" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Technologies + actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.tech.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-lg glass px-3 py-1 text-xs font-mono text-graphite"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <Link
                            to={`/case-studies/${caseStudy.slug}`}
                            className="flex items-center gap-1 text-sm font-medium text-vapor transition-all hover:gap-2"
                          >
                            Open Full Page
                            <ArrowUpRight size={14} />
                          </Link>

                          <a
                            href={caseStudy.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-vapor transition-all hover:gap-2"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>

                          <a
                            href={caseStudy.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-graphite transition hover:text-alabaster"
                          >
                            <span className="text-xs font-bold">
                              GH
                            </span>
                            Code
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-2xl glass p-10 text-center">
              <p className="text-sm font-light text-graphite">
                No case studies are available in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1 text-sm text-vapor transition-all hover:gap-2"
          >
            View all projects
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}