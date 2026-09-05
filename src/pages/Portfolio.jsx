import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/portfolio/PageHero";
import { portfolioProjects } from "@/data/portfolioProjects";
import {
  visualShowcase,
  visualShowcaseCategories,
} from "@/data/visualShowcase";

const projectFilters = [
  "All",
  "Websites",
  "E-commerce",
  "UI/UX",
  "Branding",
  "Fashion",
  "Graphics",
];

function ShowcaseImage({ item, className, loading = "lazy" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-white/[0.04] p-6 text-center text-xs text-graphite`}
      >
        {item.title} is temporarily unavailable.
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function ShowcaseLightbox({ item, items, index, onClose, onPrevious, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} fullscreen viewer`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-xl sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-6xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ShowcaseImage
          item={item}
          loading="eager"
          className="max-h-[calc(100vh-8rem)] max-w-full rounded-2xl object-contain"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close visual showcase"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
        >
          <X size={20} />
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous showcase image"
              className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next showcase image"
              className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full glass-strong px-4 py-2 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
            {item.category}
          </span>
          <span className="text-xs text-alabaster">{item.title}</span>
          <span className="font-mono text-xs text-graphite">
            {index + 1} / {items.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeProjectCategory, setActiveProjectCategory] = useState("All");
  const [activeShowcaseCategory, setActiveShowcaseCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredProjects = useMemo(() => (
    activeProjectCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeProjectCategory)
  ), [activeProjectCategory]);

  const filteredShowcase = useMemo(() => (
    activeShowcaseCategory === "All"
      ? visualShowcase
      : visualShowcase.filter((item) => item.category === activeShowcaseCategory)
  ), [activeShowcaseCategory]);

  const lightboxItem = lightboxIndex === null ? null : filteredShowcase[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => current === 0 ? filteredShowcase.length - 1 : current - 1);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => current === filteredShowcase.length - 1 ? 0 : current + 1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredShowcase]);

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="A collection of current digital, creative, e-commerce, branding, UI/UX, fashion, and graphic design work."
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Portfolio" }]}
      />

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2" aria-label="Project categories">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveProjectCategory(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeProjectCategory === filter
                    ? "bg-vapor text-white"
                    : "glass text-graphite hover:bg-white/5 hover:text-alabaster"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-vapor">Current Work</p>
            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-4xl">Selected Projects</h2>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-graphite">
              Explore selected work across websites, e-commerce, interface design, branding, fashion, and graphics.
            </p>
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-2xl glass transition-all duration-500 hover:border-vapor/20"
                >
                  <Link to={`/portfolio/${project.slug}`} className="block aspect-[3/2] overflow-hidden">
                    <img
                      src={project.primaryImage}
                      alt={`${project.title} ${project.category} project visual`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">{project.category}</span>
                    <h3 className="mt-1 text-lg font-medium text-alabaster">{project.title}</h3>
                    <p className="mb-4 mt-2 text-sm font-light leading-relaxed text-graphite">{project.shortDescription}</p>
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <span key={technology} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-graphite">{technology}</span>
                      ))}
                    </div>
                    <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-vapor transition-all hover:gap-2">
                      View Project Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="visual-showcase" className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">Visual Showcase</p>
            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">Creative Gallery</h2>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-graphite">
              Browse current visual work and open any image for a larger fullscreen view.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2" aria-label="Visual showcase categories">
            {visualShowcaseCategories.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveShowcaseCategory(filter);
                  setLightboxIndex(null);
                }}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                  activeShowcaseCategory === filter ? "bg-vapor text-white" : "glass text-graphite hover:text-alabaster"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredShowcase.map((item, index) => (
                <motion.button
                  key={item.id}
                  layout
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  aria-label={`Open ${item.title} showcase image`}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-500 hover:border-vapor/30 ${index === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <ShowcaseImage
                    item={item}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">{item.category}</span>
                    <h3 className="mt-1 text-sm font-medium text-alabaster sm:text-base">{item.title}</h3>
                  </div>
                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-alabaster opacity-0 transition group-hover:opacity-100">
                    <ZoomIn size={15} />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <ShowcaseLightbox
            item={lightboxItem}
            items={filteredShowcase}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrevious={() => setLightboxIndex((current) => current === 0 ? filteredShowcase.length - 1 : current - 1)}
            onNext={() => setLightboxIndex((current) => current === filteredShowcase.length - 1 ? 0 : current + 1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
