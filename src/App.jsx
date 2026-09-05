import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const BlessAI = lazy(() => import("./components/BlessAI"));

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));

const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Resume = lazy(() => import("./pages/Resume"));

const Services = lazy(() => import("./pages/Services"));
const BookConsultation = lazy(() => import("./pages/BookConsultation"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));

const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioProject = lazy(() => import("./pages/PortfolioProject"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));

const BlessFashionHouse = lazy(
  () => import("./pages/BlessFashionHouse")
);

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-obsidian text-graphite">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-vapor" />

        <p className="font-mono text-xs uppercase tracking-[0.25em]">
          Loading
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden bg-obsidian text-alabaster">
        <Navbar />

        <main className="min-h-screen pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* About */}
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route
                path="/certifications"
                element={<Certifications />}
              />
              <Route path="/resume" element={<Resume />} />

              {/* Services */}
              <Route path="/services" element={<Services />} />
              <Route
                path="/book-consultation"
                element={<BookConsultation />}
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />

              {/* Portfolio */}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route
                path="/portfolio/:slug"
                element={<PortfolioProject />}
              />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route
                path="/case-studies/:slug"
                element={<CaseStudyDetail />}
              />

              {/* Business */}
              <Route
                path="/bless-fashion-house"
                element={<BlessFashionHouse />}
              />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route
                path="/blog/:slug"
                element={<BlogPost />}
              />

              {/* Legal */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
<Route path="/testimonials" element={<Testimonials />} />
<Route path="/sitemap" element={<Sitemap />} />

              {/* Legacy pricing URL */}
              <Route
                path="/prices"
                element={<Navigate to="/pricing" replace />}
              />

              {/* Unknown URLs */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <Suspense fallback={null}>
          <BlessAI />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
