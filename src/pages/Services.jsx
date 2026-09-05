import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/portfolio/PageHero";
import PricingTable from "@/components/portfolio/PricingTable";
import ConsultationPackages from "@/components/portfolio/ConsultationPackages";
import { services } from "@/data/services";

const process = [
  { step: "01", title: "Discovery", desc: "Understand goals, users, requirements, and scope." },
  { step: "02", title: "Strategy", desc: "Define the structure, priorities, technical direction, and visual approach." },
  { step: "03", title: "Design & Build", desc: "Create and implement the solution with iterative refinement." },
  { step: "04", title: "Launch & Improve", desc: "Deploy, review, fix issues, and support future improvements." },
];

const deliveryStandards = [
  "Clear communication",
  "Responsive implementation",
  "User-focused design",
  "Maintainable architecture",
  "Mobile-first thinking",
  "Practical business alignment",
  "Post-launch support",
];

const serviceAltText = {
  "web-development": "Web development workspace",
  "ecommerce-development": "E-commerce development visual",
  "uiux-design": "UI/UX design visual",
  "branding-identity": "Branding and identity design",
  "graphic-design": "Graphic design creative work",
  "fashion-creative-services": "Fashion and creative services",
  "ai-digital-solutions": "AI and digital solutions",
  "digital-marketing-seo": "Digital marketing and SEO",
};

const faqs = [
  { q: "How long does a typical project take?", a: "Project timing depends on scope, content, feedback, and integrations. We define a realistic delivery plan during discovery." },
  { q: "Do you offer ongoing support?", a: "Yes. Support and maintenance can be discussed according to the needs of the project after launch." },
  { q: "Can you work with clients outside Uganda?", a: "Absolutely. I work with clients worldwide remotely through email, WhatsApp, and scheduled video calls." },
  { q: "What technologies do you use?", a: "The stack is selected according to the project. Current work includes React, Vite, Tailwind CSS, JavaScript, Node.js, Supabase, REST/API architecture, and tools for design and content production where relevant." },
  { q: "Do you require a deposit?", a: "Payment arrangements depend on the agreed project scope and are confirmed before work begins." },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="overflow-hidden rounded-2xl glass">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-vapor">
        <span className="text-sm font-medium text-alabaster sm:text-base">{q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 text-vapor transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm font-light leading-relaxed text-graphite">{a}</p>
      </motion.div>
    </div>
  );
}

function ServiceVisual({ service, featured = false }) {
  const Icon = service.icon;
  if (!service.image) {
    return (
      <div className={`${featured ? "aspect-[16/8]" : "aspect-[16/9]"} flex items-center justify-center bg-gradient-to-br from-vapor/20 via-blue-500/10 to-transparent`}>
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-vapor/30 bg-obsidian/50 text-vapor shadow-[0_0_30px_rgba(139,92,246,0.25)]">
          <Icon size={34} />
        </div>
      </div>
    );
  }
  return (
    <img
      src={service.image}
      alt={serviceAltText[service.id] || `${service.name} service visual`}
      loading="lazy"
      decoding="async"
      className={`${featured ? "aspect-[16/8]" : "aspect-[16/9]"} w-full object-cover transition duration-500 group-hover:scale-105`}
    />
  );
}

function ServiceCard({ service, featured = false }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className={`group overflow-hidden rounded-2xl glass hover:border-vapor/25 ${featured ? "lg:row-span-2" : ""}`}>
      <div className="overflow-hidden border-b border-white/10"><ServiceVisual service={service} featured={featured} /></div>
      <div className={featured ? "p-6 sm:p-8" : "p-5"}>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vapor">{service.category}</span>
        <h2 className="mt-2 font-heading text-2xl font-light text-alabaster">{service.name}</h2>
        <p className="mt-3 text-sm font-light leading-relaxed text-graphite">{service.description}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {service.services.slice(0, 6).map((item) => <li key={item} className="flex items-start gap-2 text-xs font-light text-graphite"><Check size={13} className="mt-0.5 flex-shrink-0 text-vapor" />{item}</li>)}
        </ul>
        <p className="mt-5 border-t border-white/10 pt-4 text-xs font-light leading-relaxed text-graphite"><span className="text-alabaster">Best for:</span> {service.bestFor}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-vapor px-4 py-2.5 text-xs font-medium text-white transition hover:bg-vapor/90">Discuss This Service <ArrowRight size={14} /></Link>
          <Link to="/book-consultation" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-xs font-medium text-alabaster transition hover:bg-white/10">Book Consultation</Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <>
      <PageHero title="Digital Services Built Around Your Goals" subtitle="From websites and e-commerce platforms to UI/UX, branding, AI, and digital growth, I create practical solutions designed around real business needs." breadcrumb={[{ label: "Home", path: "/" }, { label: "Services" }]} />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">What I Offer</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">Core Services</h2></div>
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => <ServiceCard key={service.id} service={service} featured={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="py-14"><div className="mx-auto max-w-7xl px-6"><div className="mb-8 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">Delivery Standard</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">What You Get</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{deliveryStandards.map((item) => <div key={item} className="flex items-center gap-3 rounded-xl glass px-4 py-4 text-sm text-alabaster"><Check size={16} className="flex-shrink-0 text-vapor" />{item}</div>)}</div></div></section>

      <section className="py-14"><div className="mx-auto max-w-7xl px-6"><div className="mb-10 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">How I Work</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">My Process</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{process.map((item, index) => <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl glass p-6"><span className="mb-3 block font-mono text-3xl font-light text-vapor/40">{item.step}</span><h3 className="mb-2 text-base font-medium text-alabaster">{item.title}</h3><p className="text-sm font-light leading-relaxed text-graphite">{item.desc}</p></motion.div>)}</div></div></section>

      <section className="py-14"><div className="mx-auto max-w-7xl px-6"><div className="mb-10 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">Project Pricing</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">Project Pricing</h2><p className="mx-auto mt-3 max-w-xl text-sm font-light text-graphite">Choose a starting point for your project. Custom scopes can be quoted separately.</p></div><PricingTable /></div></section>

      <section className="py-14"><div className="mx-auto max-w-7xl px-6"><div className="mb-10 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">Consultation</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">Consultation Packages</h2><p className="mx-auto mt-3 max-w-xl text-sm font-light text-graphite">Need guidance before committing to a full project? Book a consultation session tailored to your needs.</p></div><ConsultationPackages /></div></section>

      <section className="py-14 pb-32"><div className="mx-auto max-w-3xl px-6"><div className="mb-10 text-center"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-vapor">FAQ</p><h2 className="font-heading text-3xl font-light text-alabaster sm:text-5xl">Frequently Asked Questions</h2></div><div className="space-y-3">{faqs.map((faq, index) => <FAQItem key={faq.q} {...faq} index={index} />)}</div><div className="mt-10 text-center"><Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-vapor px-6 py-3 text-sm font-medium text-white transition hover:bg-vapor/90">Start a Project <ArrowRight size={16} /></Link></div></div></section>
    </>
  );
}
