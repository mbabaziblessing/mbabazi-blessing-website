import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  X,
  ZoomIn,
} from "lucide-react";

import PageHero from "@/components/portfolio/PageHero";

const BASE = "/assets/portfolio";

const filters = [
  "All",
  "Websites",
  "E-commerce",
  "UI/UX",
  "Branding",
  "Fashion",
  "Graphics",
];

const projects = [
  {
    title: "PearlMart",
    category: "E-commerce",
    description:
      "A marketplace platform concept focused on online shopping, seller operations, payments, delivery, and customer experience.",
    image: `${BASE}/ecommerce-01.png`,
    gallery: [
      `${BASE}/ecommerce-01.png`,
      `${BASE}/ecommerce-02.jpg`,
    ],
    tech: ["React", "E-commerce", "Payments", "Marketplace"],
  },
  {
    title: "Website Design & Development",
    category: "Websites",
    description:
      "Modern responsive website experiences designed for businesses, organizations, brands, and digital projects.",
    image: `${BASE}/workspace-01.png`,
    gallery: [
      `${BASE}/workspace-01.png`,
      `${BASE}/workspace-02.png`,
      `${BASE}/workspace-03.jfif`,
    ],
    tech: ["React", "Vite", "Tailwind", "Responsive Design"],
  },
  {
    title: "UI/UX Design Collection",
    category: "UI/UX",
    description:
      "A collection of interface concepts focused on usability, responsive layouts, visual hierarchy, and modern digital experiences.",
    image: `${BASE}/uiux-01.jpg`,
    gallery: [
      `${BASE}/uiux-01.jpg`,
      `${BASE}/uiux-02.jpg`,
      `${BASE}/uiux-03.jpg`,
      `${BASE}/uiux-04.jpg`,
      `${BASE}/uiux-05.jpg`,
    ],
    tech: ["UI/UX", "Figma", "Prototyping", "Design Systems"],
  },
  {
    title: "Brand Identity & Design",
    category: "Branding",
    description:
      "Creative identity work combining visual direction, digital graphics, presentation materials, and brand consistency.",
    image: `${BASE}/branding-01.jpg`,
    gallery: [
      `${BASE}/branding-01.jpg`,
      `${BASE}/branding-02.jpg`,
    ],
    tech: ["Branding", "Graphic Design", "Visual Identity"],
  },
  {
    title: "Bless Fashion House",
    category: "Fashion",
    description:
      "Fashion-focused digital creative work supporting clothing presentation, visual storytelling, and online brand presence.",
    image: `${BASE}/fashion-01.jpg`,
    gallery: [
      `${BASE}/fashion-01.jpg`,
      `${BASE}/fashion-02.jpg`,
      `${BASE}/fashion-03.jpg`,
      `${BASE}/fashion-04.jpg`,
    ],
    tech: ["Fashion", "Creative Direction", "Digital Branding"],
  },
  {
    title: "Graphic Design & Creative Work",
    category: "Graphics",
    description:
      "Promotional graphics, marketing materials, campaign visuals, and creative communication designed for digital and print use.",
    image: `${BASE}/graphics-01.png`,
    gallery: [`${BASE}/graphics-01.png`],
    tech: ["Graphic Design", "Photoshop", "Creative Design"],
  },
];

const showcase = [
  {
    title: "UI/UX Interface",
    category: "UI/UX",
    image: `${BASE}/uiux-01.jpg`,
  },
  {
    title: "UI/UX Concept",
    category: "UI/UX",
    image: `${BASE}/uiux-02.jpg`,
  },
  {
    title: "Website Workspace",
    category: "Websites",
    image: `${BASE}/workspace-01.png`,
  },
  {
    title: "Web Development Workspace",
    category: "Websites",
    image: `${BASE}/workspace-02.png`,
  },
  {
    title: "E-commerce Experience",
    category: "E-commerce",
    image: `${BASE}/ecommerce-01.png`,
  },
  {
    title: "E-commerce Concept",
    category: "E-commerce",
    image: `${BASE}/ecommerce-02.jpg`,
  },
  {
    title: "Brand Identity",
    category: "Branding",
    image: `${BASE}/branding-01.jpg`,
  },
  {
    title: "Branding Material",
    category: "Branding",
    image: `${BASE}/branding-02.jpg`,
  },
  {
    title: "Fashion Collection",
    category: "Fashion",
    image: `${BASE}/fashion-01.jpg`,
  },
  {
    title: "Fashion Detail",
    category: "Fashion",
    image: `${BASE}/fashion-02.jpg`,
  },
  {
    title: "Fabric Study",
    category: "Fashion",
    image: `${BASE}/fabric-01.jpg`,
  },
  {
    title: "Graphic Design",
    category: "Graphics",
    image: `${BASE}/graphics-01.png`,
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const filteredProjects = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  const filteredShowcase = useMemo(() => {
    if (active === "All") return showcase;
    return showcase.filter((item) => item.category === active);
  }, [active]);

  const openLightbox = (item) => {
    setLightbox(item);
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const nextImage = (event) => {
    event.stopPropagation();

    setLightbox((current) => {
      if (!current || filteredShowcase.length === 0) return current;

      const currentIndex = filteredShowcase.findIndex(
        (item) => item.title === current.title
      );

      return filteredShowcase[
        (currentIndex + 1) % filteredShowcase.length
      ];
    });
  };

  const previousImage = (event) => {
    event.stopPropagation();

    setLightbox((current) => {
      if (!current || filteredShowcase.length === 0) return current;

      const currentIndex = filteredShowcase.findIndex(
        (item) => item.title === current.title
      );

      return filteredShowcase[
        (currentIndex - 1 + filteredShowcase.length) %
          filteredShowcase.length
      ];
    });
  };

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="A collection of current digital, creative, e-commerce, branding, UI/UX, fashion, and graphic design work."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Portfolio" },
        ]}
      />

      {/* Filters */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active === filter
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

      {/* Current Work */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
              Current Work
            </p>

            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-4xl">
              Selected Projects
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-graphite">
              Explore selected work across websites, e-commerce, interface
              design, branding, fashion, and graphics.
            </p>
          </div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-2xl glass transition-all duration-500 hover:border-vapor/20"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox({
                      title: project.title,
                      category: project.category,
                      image: project.image,
                    })}
                    className="relative block aspect-[3/2] w-full overflow-hidden text-left"
                    aria-label={`Open ${project.title} image`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <ZoomIn
                        size={15}
                        className="text-alabaster"
                      />
                    </div>
                  </button>

                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                      {project.category}
                    </span>

                    <h3 className="mt-1 text-lg font-medium text-alabaster">
                      {project.title}
                    </h3>

                    <p className="mb-4 mt-2 text-sm font-light leading-relaxed text-graphite">
                      {project.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tech.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-graphite"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 text-sm font-medium text-vapor transition-all hover:gap-2"
                    >
                      View Project Details
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
              Visual Showcase
            </p>

            <h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">
              Creative Gallery
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-graphite">
              Browse current visual work and open any image for a larger
              fullscreen view.
            </p>
          </div>

          <motion.div
            layout
            className="grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredShowcase.map((item, index) => (
                <motion.button
                  key={item.title}
                  layout
                  type="button"
                  onClick={() => openLightbox(item)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-500 hover:border-vapor/30 ${
                    index === 0
                      ? "col-span-2 row-span-2"
                      : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                      {item.category}
                    </span>

                    <h3 className="mt-1 text-sm font-medium text-alabaster sm:text-base">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ZoomIn
                      size={15}
                      className="text-alabaster"
                    />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/95 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl glass-strong"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                  {selectedProject.category}
                </span>

                <h3 className="mt-1 font-heading text-2xl font-light text-alabaster">
                  {selectedProject.title}
                </h3>

                <p className="mt-3 text-sm font-light leading-relaxed text-graphite">
                  {selectedProject.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-graphite"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 p-6 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-graphite transition hover:text-alabaster"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-graphite transition hover:text-alabaster sm:left-8"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-graphite transition hover:text-alabaster sm:right-8"
            >
              <ArrowRight size={20} />
            </button>

            <motion.div
              key={lightbox.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-5xl"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-full object-contain bg-obsidian"
                />
              </div>

              <div className="mt-5 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
                  {lightbox.category}
                </span>

                <h3 className="mt-1 font-heading text-2xl font-light text-alabaster">
                  {lightbox.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}