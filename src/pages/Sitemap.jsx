import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarClock,
  ChevronDown,
  Compass,
  Cpu,
  DollarSign,
  Download,
  ExternalLink,
  FileSearch,
  FileText,
  FolderGit2,
  HelpCircle,
  Home,
  Layers,
  Mail,
  MessageCircle,
  Newspaper,
  Search,
  Shield,
  ShoppingCart,
  Star,
  Target,
  Trophy,
  User,
  Wrench,
  Award,
} from "lucide-react";

import PageHero from "@/components/portfolio/PageHero";
import { CONTACT, SOCIALS } from "@/config/site";
import { WhatsAppIcon } from "@/components/portfolio/shared";

const groups = [
  {
    title: "Main Navigation",
    icon: Home,
    links: [
      {
        label: "Home",
        desc: "Hero, featured work, and quick navigation",
        to: "/",
      },
      {
        label: "About Me",
        desc: "My story, mission, and values",
        to: "/about",
      },
      {
        label: "My Journey",
        desc: "Career path and entrepreneurial timeline",
        to: "/",
      },
      {
        label: "Mission, Vision & Values",
        desc: "Principles that guide my work",
        to: "/",
      },
      {
        label: "Skills & Technologies",
        desc: "Technical and creative proficiencies",
        to: "/skills",
      },
      {
        label: "Experience",
        desc: "Professional career timeline",
        to: "/experience",
      },
      {
        label: "Certifications",
        desc: "Professional credentials and qualifications",
        to: "/certifications",
      },
      {
        label: "Awards & Achievements",
        desc: "Recognition and milestones",
        to: "/certifications",
      },
      {
        label: "Featured Projects",
        desc: "Highlighted work and case studies",
        to: "/portfolio",
      },
      {
        label: "Case Studies",
        desc: "In-depth project deep dives",
        to: "/case-studies",
      },
      {
        label: "Client Testimonials",
        desc: "Reviews and endorsements",
        to: "/testimonials",
      },
      {
        label: "Services",
        desc: "Offerings, packages, and process",
        to: "/services",
      },
      {
        label: "Pricing",
        desc: "Transparent pricing and plans",
        to: "/pricing",
      },
      {
        label: "Book a Consultation",
        desc: "Schedule a discovery or strategy call",
        to: "/book-consultation",
      },
      {
        label: "Frequently Asked Questions",
        desc: "Answers to common questions",
        to: "/faq",
      },
      {
        label: "Blog",
        desc: "Articles on tech, fashion, and business",
        to: "/blog",
      },
      {
        label: "Resources",
        desc: "Templates, guides, and tools",
        to: "/",
      },
      {
        label: "Resume / CV",
        desc: "Complete professional overview",
        to: "/resume",
      },
      {
        label: "Contact",
        desc: "Get in touch and start a project",
        to: "/contact",
      },
      {
        label: "Newsletter",
        desc: "Subscribe for updates and insights",
        to: "/",
      },
    ],
  },
  {
    title: "Professional Services",
    icon: Wrench,
    links: [
      {
        label: "Website Design & Development",
        desc: "Fast, secure, responsive websites",
        to: "/services",
      },
      {
        label: "E-commerce Development",
        desc: "Online stores and payment integration",
        to: "/services",
      },
      {
        label: "UI/UX Design",
        desc: "Intuitive, user-centered interfaces",
        to: "/services",
      },
      {
        label: "Brand Identity Design",
        desc: "Logos, style guides, and visual systems",
        to: "/services",
      },
      {
        label: "Search Engine Optimization (SEO)",
        desc: "Rank higher and grow organic traffic",
        to: "/services",
      },
      {
        label: "AI Solutions & Automation",
        desc: "Chatbots, workflows, and integrations",
        to: "/services",
      },
      {
        label: "Digital Marketing Strategy",
        desc: "Campaigns that convert and scale",
        to: "/services",
      },
      {
        label: "Business & Technology Consulting",
        desc: "Strategic guidance for growth",
        to: "/services",
      },
    ],
  },
  {
    title: "Consultations",
    icon: CalendarClock,
    links: [
      {
        label: "Free Discovery Call",
        desc: "Initial 15-minute introduction",
        to: "/book-consultation",
      },
      {
        label: "Website Design Consultation",
        desc: "Plan your next website project",
        to: "/book-consultation",
      },
      {
        label: "Fashion Business Consultation",
        desc: "Grow and scale your fashion brand",
        to: "/book-consultation",
      },
      {
        label: "Logo & Brand Identity Consultation",
        desc: "Define your visual identity",
        to: "/book-consultation",
      },
      {
        label: "E-commerce Store Consultation",
        desc: "Launch and optimize online sales",
        to: "/book-consultation",
      },
      {
        label: "Digital Marketing Consultation",
        desc: "Strategy and channel guidance",
        to: "/book-consultation",
      },
      {
        label: "SEO Consultation",
        desc: "Technical and content SEO review",
        to: "/book-consultation",
      },
      {
        label: "AI Automation & Chatbot Consultation",
        desc: "Automate support and workflows",
        to: "/book-consultation",
      },
      {
        label: "Business Growth Strategy Consultation",
        desc: "Roadmap for scaling",
        to: "/book-consultation",
      },
    ],
  },
  {
    title: "Portfolio",
    icon: FolderGit2,
    links: [
      {
        label: "Featured Projects",
        desc: "Highlighted work and case studies",
        to: "/portfolio",
      },
      {
        label: "Project Details",
        desc: "Deep dives into individual projects",
        to: "/case-studies",
      },
      {
        label: "Case Studies",
        desc: "Challenges, solutions, and results",
        to: "/case-studies",
      },
      {
        label: "Technologies Used",
        desc: "Stack and tools across projects",
        to: "/skills",
      },
      {
        label: "Project Gallery",
        desc: "Visual showcase of completed work",
        to: "/bless-fashion-house",
      },
    ],
  },
  {
    title: "Blog",
    icon: BookOpen,
    links: [
      {
        label: "All Articles",
        desc: "Browse every published post",
        to: "/blog",
      },
      {
        label: "Categories",
        desc: "Filter articles by topic",
        to: "/blog",
      },
      {
        label: "Tags",
        desc: "Explore content by tag",
        to: "/blog",
      },
      {
        label: "Search Articles",
        desc: "Find specific tutorials and insights",
        to: "/blog",
      },
      {
        label: "Featured Articles",
        desc: "Editor’s picks and popular reads",
        to: "/blog",
      },
      {
        label: "Latest Articles",
        desc: "Newest publications",
        to: "/blog",
      },
    ],
  },
  {
    title: "Resources",
    icon: Layers,
    links: [
      {
        label: "Website Development",
        desc: "Checklists, templates, and guides",
        to: "/",
      },
      {
        label: "Branding & Design",
        desc: "Brand identity and style resources",
        to: "/",
      },
      {
        label: "Business & Entrepreneurship",
        desc: "Plans, growth, and strategy tools",
        to: "/",
      },
      {
        label: "Artificial Intelligence",
        desc: "Prompt engineering and AI guides",
        to: "/",
      },
      {
        label: "E-commerce",
        desc: "Listing, inventory, and support templates",
        to: "/",
      },
      {
        label: "Digital Marketing",
        desc: "SEO, content, and social guides",
        to: "/",
      },
    ],
  },
  {
    title: "Legal Pages",
    icon: Shield,
    links: [
      {
        label: "Privacy Policy",
        desc: "How your data is collected and protected",
        to: "/privacy",
      },
      {
        label: "Terms of Service",
        desc: "Terms of use and project agreements",
        to: "/terms",
      },
      {
        label: "Sitemap",
        desc: "This page — a full site overview",
        to: "/sitemap",
      },
    ],
  },
  {
    title: "Contact",
    icon: Mail,
    links: [
      {
        label: "Contact Form",
        desc: "Send a message directly",
        to: "/contact",
      },
      {
        label: "WhatsApp",
        desc: "Quick chat and enquiries",
        to: CONTACT.whatsappLink,
        external: true,
      },
      {
        label: "Telephone",
        desc: "Call during business hours",
        to: "tel:+256707333422",
        external: true,
      },
      {
        label: "Calendly Booking",
        desc: "Schedule a consultation online",
        to: CONTACT.calendly,
        external: true,
      },
    ],
  },
  {
    title: "Social Media",
    icon: MessageCircle,
    links: [
      {
        label: "WhatsApp",
        desc: "Primary contact for quick communication",
        to: CONTACT.whatsappLink,
        external: true,
      },
      {
        label: "LinkedIn",
        desc: "Professional profile and career updates",
        to: SOCIALS.linkedin,
        external: true,
      },
      {
        label: "Facebook",
        desc: "Business updates and announcements",
        to: SOCIALS.facebook,
        external: true,
      },
      {
        label: "Instagram",
        desc: "Fashion content and creative work",
        to: SOCIALS.instagram,
        external: true,
      },
      {
        label: "X (Twitter)",
        desc: "Technology discussions and AI insights",
        to: SOCIALS.twitter,
        external: true,
      },
      {
        label: "TikTok",
        desc: "Short educational and fashion videos",
        to: SOCIALS.tiktok,
        external: true,
      },
      {
        label: "Medium",
        desc: "Long-form articles and professional insights",
        to: SOCIALS.medium,
        external: true,
      },
    ],
  },
];

const linkIcon = (label) => {
  const iconMap = {
    Home,
    "About Me": User,
    "My Journey": Compass,
    "Mission, Vision & Values": Target,
    "Skills & Technologies": Cpu,
    Experience: Briefcase,
    Certifications: Award,
    "Awards & Achievements": Trophy,
    "Featured Projects": FolderGit2,
    "Case Studies": FileSearch,
    "Client Testimonials": Star,
    Services: Wrench,
    Pricing: DollarSign,
    "Book a Consultation": CalendarClock,
    "Frequently Asked Questions": HelpCircle,
    Blog: BookOpen,
    Resources: Layers,
    "Resume / CV": Download,
    Contact: Mail,
    Newsletter: Newspaper,
    "Contact Form": Mail,
    LinkedIn: User,
    Facebook: MessageCircle,
    Instagram: MessageCircle,
    "X (Twitter)": MessageCircle,
    TikTok: MessageCircle,
    Medium: BookOpen,
    WhatsApp: MessageCircle,
    Telephone: MessageCircle,
    "Calendly Booking": CalendarClock,
    "Website Design & Development": Wrench,
    "E-commerce Development": ShoppingCart,
    "UI/UX Design": Cpu,
    "Brand Identity Design": Star,
    "Search Engine Optimization (SEO)": Search,
    "AI Solutions & Automation": Cpu,
    "Digital Marketing Strategy": Target,
    "Business & Technology Consulting": Briefcase,
    "Free Discovery Call": CalendarClock,
    "Website Design Consultation": CalendarClock,
    "Fashion Business Consultation": CalendarClock,
    "Logo & Brand Identity Consultation": CalendarClock,
    "E-commerce Store Consultation": CalendarClock,
    "Digital Marketing Consultation": CalendarClock,
    "SEO Consultation": Search,
    "AI Automation & Chatbot Consultation": Cpu,
    "Business Growth Strategy Consultation": Target,
    "Project Details": FileSearch,
    "Technologies Used": Cpu,
    "Project Gallery": FolderGit2,
    "All Articles": BookOpen,
    Categories: Layers,
    Tags: FileText,
    "Search Articles": Search,
    "Featured Articles": Star,
    "Latest Articles": Newspaper,
    "Website Development": Wrench,
    "Branding & Design": Star,
    "Business & Entrepreneurship": Briefcase,
    "Artificial Intelligence": Cpu,
    "E-commerce": FolderGit2,
    "Digital Marketing": Target,
    "Privacy Policy": Shield,
    "Terms of Service": FileText,
    Sitemap: FileSearch,
  };

  return iconMap[label] || FileText;
};

export default function Sitemap() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(groups.map((group) => group.title));

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        links: group.links.filter(
          (link) =>
            link.label.toLowerCase().includes(normalizedQuery) ||
            link.desc.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((group) => group.links.length > 0);
  }, [query]);

  const toggle = (title) => {
    setOpen((previous) =>
      previous.includes(title)
        ? previous.filter((item) => item !== title)
        : [...previous, title]
    );
  };

  const clearSearch = () => {
    setQuery("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <PageHero
        title="Sitemap"
        subtitle="Browse every page, section, and major feature available on my portfolio website."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Sitemap" },
        ]}
      />

      <section className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="font-light leading-relaxed text-graphite">
              This sitemap provides a structured overview of the entire
              website, making it easier for visitors to quickly find pages,
              services, resources, and important information.
            </p>
          </div>

          <div className="mx-auto mb-12 max-w-xl">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the website..."
                aria-label="Search the website"
                className="w-full rounded-xl glass bg-transparent py-3.5 pl-12 pr-4 text-sm text-alabaster placeholder:text-graphite/60 transition focus:border-vapor/30 focus:outline-none"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl glass p-10 text-center">
              <p className="font-light text-alabaster">
                No pages match your search. Try a different term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((group, groupIndex) => {
                const GroupIcon = group.icon;
                const isOpen = open.includes(group.title);

                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                      once: true,
                      margin: "-30px",
                    }}
                    transition={{
                      duration: 0.5,
                      delay: (groupIndex % 3) * 0.08,
                    }}
                    className="overflow-hidden rounded-2xl glass"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(group.title)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/5"
                      aria-expanded={isOpen}
                      aria-controls={`sitemap-group-${groupIndex}`}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-vapor/10">
                        <GroupIcon size={18} className="text-vapor" />
                      </div>

                      <span className="flex-1 font-mono text-xs uppercase tracking-[0.25em] text-vapor">
                        {group.title}
                      </span>

                      <ChevronDown
                        size={16}
                        className={`text-graphite transition-transform duration-300 lg:hidden ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={`sitemap-group-${groupIndex}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2 overflow-hidden px-5 pb-5"
                        >
                          {group.links.map((link) => {
                            const LinkIcon = linkIcon(link.label);

                            const content = (
                              <div className="group -mx-3 flex items-start gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 transition group-hover:bg-vapor/15">
                                  {link.label === "WhatsApp" ? (
                                    <WhatsAppIcon
                                      size={14}
                                      className="text-vapor"
                                    />
                                  ) : (
                                    <LinkIcon
                                      size={14}
                                      className="text-vapor"
                                    />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-alabaster transition group-hover:text-vapor">
                                      {link.label}
                                    </span>

                                    {link.external ? (
                                      <ExternalLink
                                        size={11}
                                        className="text-graphite/50"
                                      />
                                    ) : (
                                      <ArrowUpRight
                                        size={13}
                                        className="text-vapor opacity-0 transition group-hover:opacity-100"
                                      />
                                    )}
                                  </div>

                                  <p className="mt-0.5 text-xs font-light leading-snug text-graphite">
                                    {link.desc}
                                  </p>
                                </div>
                              </div>
                            );

                            return (
                              <li key={`${group.title}-${link.label}`}>
                                {link.external ? (
                                  <a
                                    href={link.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    {content}
                                  </a>
                                ) : (
                                  <Link to={link.to} className="block">
                                    {content}
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl rounded-3xl glass-strong p-8 sm:p-10">
              <h3 className="mb-3 font-heading text-2xl font-light text-alabaster">
                Can't find what you're looking for?
              </h3>

              <p className="mb-6 text-sm font-light text-graphite">
                Visit the Contact page or use the website search to quickly
                locate the information you need.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 rounded-xl bg-vapor px-6 py-3 text-sm font-medium text-white transition hover:bg-vapor/90"
                >
                  <Mail size={16} />
                  Visit Contact Page
                </Link>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-medium text-alabaster transition hover:bg-white/10"
                >
                  <Search size={16} />
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}