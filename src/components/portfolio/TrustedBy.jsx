import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Building2,
  ExternalLink,
  HeartHandshake,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const platforms = [
  {
    name: "Bless Fashion House",
    type: "Fashion & Lifestyle Brand",
    icon: Building2,
    href: "https://www.facebook.com/blessfashionhouseug",
  },
  {
    name: "PearlMart Uganda",
    type: "E-commerce Marketplace",
    icon: Building2,
    href: "https://pearlmart.ug",
  },
  {
    name: "SoftwareSuggest",
    type: "Professional Vendor Platform",
    icon: ExternalLink,
    href: "https://www.softwaresuggest.com/",
  },
  {
    name: "freeCodeCamp",
    type: "Professional Profile & Certifications",
    icon: Award,
    href: "https://www.freecodecamp.org/mbabaziblessing",
  },
  {
    name: "Blessing Hope Foundation",
    type: "Community Organization",
    icon: HeartHandshake,
    href: null,
  },
];

export default function TrustedBy() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">
            Professional Presence
          </p>

          <h2 className="font-heading text-2xl font-light text-alabaster sm:text-3xl">
            Platforms, Brands & Organizations
          </h2>

          <p className="mt-3 text-sm font-light leading-relaxed text-graphite">
            Selected businesses, professional platforms, and organizations
            connected to my work and professional journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {platforms.map((item, i) => {
            const Icon = item.icon;

            const card = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0 }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:border-vapor/30 hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-vapor/15 bg-vapor/10 text-vapor">
                    <Icon size={18} />
                  </div>

                  {item.href && (
                    <ArrowUpRight
                      size={17}
                      className="text-graphite transition duration-300 group-hover:text-vapor"
                    />
                  )}
                </div>

                <h3 className="font-heading text-base font-medium text-alabaster">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs font-light leading-relaxed text-graphite">
                  {item.type}
                </p>
              </motion.div>
            );

            if (!item.href) {
              return (
                <div key={item.name}>
                  {card}
                </div>
              );
            }

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.name}`}
                className="block"
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
