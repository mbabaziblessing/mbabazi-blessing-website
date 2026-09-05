import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  X,
  ZoomIn,
} from "lucide-react";
import PageHero from "@/components/portfolio/PageHero";
import {
  getPortfolioProject,
  portfolioProjects,
} from "@/data/portfolioProjects";

function ListSection({ title, items }) {
  return (
    <section>
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
        {title}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm font-light leading-relaxed text-graphite"
          >
            <Check size={15} className="mt-0.5 flex-shrink-0 text-vapor" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function GalleryLightbox({ gallery, title, index, onClose, onPrevious, onNext }) {
  const image = gallery[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery viewer`}
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-6xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image}
          alt={`${title} gallery image ${index + 1}`}
          className="max-h-[calc(100vh-8rem)] max-w-full rounded-2xl object-contain"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
        >
          <X size={20} />
        </button>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous gallery image"
              className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next gallery image"
              className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-alabaster transition hover:text-vapor"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full glass-strong px-4 py-2 font-mono text-xs text-graphite">
          {index + 1} / {gallery.length}
        </p>
      </div>
    </motion.div>
  );
}

export default function PortfolioProject() {
  const { slug } = useParams();
  const project = getPortfolioProject(slug);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const projectIndex = portfolioProjects.findIndex((item) => item.slug === slug);
  const previousProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < portfolioProjects.length - 1
    ? portfolioProjects[projectIndex + 1]
    : null;

  useEffect(() => {
    if (!project) return undefined;

    const previousTitle = document.title;
    const description = `${project.title} - ${project.shortDescription}`;
    document.title = `${project.title} | Mbabazi Blessing`;

    let descriptionTag = document.querySelector('meta[name="description"]');
    const createdDescription = !descriptionTag;
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    const previousDescription = descriptionTag.content;
    descriptionTag.content = description;

    return () => {
      document.title = previousTitle;
      if (createdDescription) {
        descriptionTag.remove();
      } else {
        descriptionTag.content = previousDescription;
      }
    };
  }, [project]);

  useEffect(() => {
    if (galleryIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setGalleryIndex(null);
      if (event.key === "ArrowLeft") {
        setGalleryIndex((current) =>
          current === 0 ? project.gallery.length - 1 : current - 1
        );
      }
      if (event.key === "ArrowRight") {
        setGalleryIndex((current) =>
          current === project.gallery.length - 1 ? 0 : current + 1
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryIndex, project]);

  if (!project) {
    return (
      <div className="px-6 pb-32 pt-40 text-center">
        <h1 className="mb-4 font-heading text-4xl text-alabaster">
          Project Not Found
        </h1>
        <Link to="/portfolio" className="text-vapor hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.shortDescription}
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Portfolio", path: "/portfolio" },
          { label: project.title },
        ]}
      />

      <main className="pb-24">
        <section className="border-y border-white/5 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6">
            <span className="rounded-full bg-vapor/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
              {project.status}
            </span>
            {project.isRealProject && (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                Project
              </span>
            )}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              <img
                src={project.primaryImage}
                alt={`${project.title} primary project visual`}
                loading="eager"
                className="aspect-[16/8] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-12">
            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                Overview
              </h2>
              <p className="max-w-3xl text-base font-light leading-relaxed text-graphite">
                {project.overview}
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                My Role
              </h2>
              {Array.isArray(project.role) ? (
                <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
                  {project.role.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-light leading-relaxed text-alabaster">
                      <Check size={15} className="mt-0.5 flex-shrink-0 text-vapor" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-3xl text-base font-light leading-relaxed text-alabaster">
                  {project.role}
                </p>
              )}
            </section>

            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span key={service} className="rounded-lg glass px-3 py-2 text-xs text-graphite">
                    {service}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                Approach
              </h2>
              <p className="max-w-3xl text-base font-light leading-relaxed text-graphite">
                {project.approach}
              </p>
            </section>

            <ListSection title="Challenges" items={project.challenges} />
            {project.features?.length > 0 && (
              <ListSection
                title={project.focusLabel || "Key Features"}
                items={project.features}
              />
            )}
            {project.deliverables?.length > 0 && (
              <ListSection title="Deliverables" items={project.deliverables} />
            )}

            <section id="project-gallery">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                    Project Gallery
                  </h2>
                  <p className="mt-2 text-sm font-light text-graphite">
                    Open an image for a fullscreen view.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`Open ${project.title} gallery image ${index + 1}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 text-left"
                  >
                    <img
                      src={image}
                      alt={`${project.title} gallery visual ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full glass-strong text-alabaster opacity-0 transition group-hover:opacity-100">
                      <ZoomIn size={16} />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-7 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  Project Status
                </p>
                <p className="text-sm text-alabaster">{project.status}</p>
              </div>

              {project.technologies.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                    Technologies / Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-graphite">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
                  Related Categories
                </p>
                <p className="text-sm font-light leading-relaxed text-alabaster">
                  {project.relatedCategories.join(" / ")}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-vapor px-5 py-3 text-sm font-medium text-white transition hover:bg-vapor/90">
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
                <a href="#project-gallery" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-alabaster transition hover:bg-white/5">
                  View Gallery
                  <ZoomIn size={16} />
                </a>
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm text-vapor hover:underline">
                    Visit Project
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm text-graphite hover:text-alabaster">
                    View GitHub
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto mt-16 max-w-7xl border-t border-white/10 px-6 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-vapor hover:underline">
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
            <Link to="/portfolio#visual-showcase" className="text-sm text-graphite hover:text-alabaster">
              Explore Visual Showcase
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {previousProject ? (
              <Link to={`/portfolio/${previousProject.slug}`} className="rounded-2xl glass p-5 transition hover:border-vapor/30">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">Previous Project</span>
                <span className="mt-2 block text-alabaster">{previousProject.title}</span>
              </Link>
            ) : <div />}
            {nextProject && (
              <Link to={`/portfolio/${nextProject.slug}`} className="rounded-2xl glass p-5 text-right transition hover:border-vapor/30">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">Next Project</span>
                <span className="mt-2 block text-alabaster">{nextProject.title}</span>
              </Link>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {galleryIndex !== null && (
          <GalleryLightbox
            gallery={project.gallery}
            title={project.title}
            index={galleryIndex}
            onClose={() => setGalleryIndex(null)}
            onPrevious={() => setGalleryIndex((current) => current === 0 ? project.gallery.length - 1 : current - 1)}
            onNext={() => setGalleryIndex((current) => current === project.gallery.length - 1 ? 0 : current + 1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
