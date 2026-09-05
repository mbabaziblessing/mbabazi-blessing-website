import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import {
  WhatsAppIcon,
} from "./portfolio/shared";
import { CONTACT } from "@/config/site";

const navGroups = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    children: [
      { label: "About Me", path: "/about" },
      { label: "Experience", path: "/experience" },
      { label: "Skills", path: "/skills" },
      { label: "Certifications", path: "/certifications" },
      { label: "Resume / CV", path: "/resume" },
    ],
  },
  {
    label: "Work",
    children: [
      { label: "Portfolio", path: "/portfolio" },
      { label: "Case Studies", path: "/case-studies" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Services", path: "/services" },
      { label: "Book a Consultation", path: "/book-consultation" },
      { label: "Pricing", path: "/pricing" },
      { label: "FAQ", path: "/faq" },
      { label: "Request a Quote", path: "/contact" },
    ],
  },
  {
    label: "Bless Fashion",
    path: "/bless-fashion-house",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 20;
      setScrolled((current) => current === next ? current : next);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const closeNavigation = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const isGroupActive = (group) => {
    if (group.children) {
      return group.children.some((child) => isActive(child.path));
    }

    return isActive(group.path);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-obsidian/75 shadow-2xl shadow-black/20 backdrop-blur-2xl"
            : "bg-obsidian/35 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeNavigation}
            className="group flex min-w-0 items-center gap-3"
            aria-label="Mbabazi Blessing home"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white">
              <img
                src="/assets/portfolio/logo-small.webp"
                alt="MB"
                width="144"
                height="96"
                className="h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>

            <span className="hidden truncate font-heading text-lg font-light tracking-wide text-alabaster sm:block">
              Mbabazi Blessing
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden xl:flex xl:items-center xl:gap-1"
          >
            {navGroups.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === item.label
                          ? null
                          : item.label
                      )
                    }
                    className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isGroupActive(item)
                        ? "bg-vapor/15 text-white"
                        : "text-graphite hover:bg-white/5 hover:text-alabaster"
                    }`}
                  >
                    {item.label}

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.label
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-obsidian/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-200 ${
                      openDropdown === item.label
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-2 opacity-0"
                    }`}
                  >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={closeNavigation}
                            className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                              isActive(child.path)
                                ? "bg-vapor/10 text-vapor"
                                : "text-graphite hover:bg-white/5 hover:text-alabaster"
                            }`}
                          >
                            <span>{child.label}</span>

                            {isActive(child.path) && (
                              <span className="h-1.5 w-1.5 rounded-full bg-vapor" />
                            )}
                          </Link>
                        ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeNavigation}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isGroupActive(item)
                      ? "bg-vapor/15 text-white"
                      : "text-graphite hover:bg-white/5 hover:text-alabaster"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop WhatsApp */}
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:border-green-400/40 hover:bg-green-500/15 xl:flex"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-400/20 bg-green-500/10 text-green-400"
            >
              <WhatsAppIcon size={18} />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-alabaster transition hover:bg-white/10"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-obsidian/98 px-5 pb-8 pt-4 shadow-2xl backdrop-blur-2xl transition-all duration-200 xl:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-5 opacity-0"
        }`}
      >
            <div className="mx-auto max-w-2xl">
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400"
              >
                <WhatsAppIcon size={17} />
                Chat on WhatsApp
              </a>

              <div className="space-y-1">
                {navGroups.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown((current) =>
                            current === item.label
                              ? null
                              : item.label
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base transition ${
                          isGroupActive(item)
                            ? "bg-vapor/15 text-white"
                            : "text-graphite hover:bg-white/5 hover:text-alabaster"
                        }`}
                      >
                        {item.label}

                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            openDropdown === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid overflow-hidden pl-3 transition-all duration-200 ${
                          openDropdown === item.label
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={closeNavigation}
                                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                                  isActive(child.path)
                                    ? "text-vapor"
                                    : "text-graphite hover:bg-white/5 hover:text-alabaster"
                                }`}
                              >
                                {child.label}

                                {isActive(child.path) && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-vapor" />
                                )}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeNavigation}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition ${
                        isGroupActive(item)
                          ? "bg-vapor/15 text-white"
                          : "text-graphite hover:bg-white/5 hover:text-alabaster"
                      }`}
                    >
                      {item.label}

                      <ArrowUpRight
                        size={15}
                        className="opacity-40"
                      />
                    </Link>
                  )
                )}
              </div>
            </div>
      </div>
    </>
  );
}