import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';
import { CONTACT, WhatsAppIcon } from '@/components/portfolio/shared';

const faqGroups = [
  {
    category: 'General',
    questions: [
      { q: 'What services do you offer?', a: 'I offer full-stack web development, UI/UX design, brand identity, fashion design, and digital marketing. I also run Bless Fashion House for bespoke tailoring and uniforms.' },
      { q: 'Where are you based, and do you work with international clients?', a: 'I am based in Kampala, Uganda, and I work with clients globally. Most communication happens remotely via email, WhatsApp, and video calls.' },
      { q: 'How do we get started working together?', a: 'Head to the Contact page, fill out the form with your project details, and I will respond within 24 hours to schedule an initial consultation.' },
    ],
  },
  {
    category: 'Web Development',
    questions: [
      { q: 'How long does a typical website take to build?', a: 'A simple 3-page site takes about 5 days, while a full custom web application can take 4–8 weeks. I provide a timeline estimate after our first consultation.' },
      { q: 'Do you provide ongoing maintenance after launch?', a: 'Yes. All plans include post-launch support ranging from 5 to 90 days, and ongoing maintenance packages are available thereafter.' },
      { q: 'Will my website be mobile-friendly and SEO-optimized?', a: 'Absolutely. Every site I build is fully responsive and includes foundational SEO — structured metadata, fast load times, and semantic markup.' },
    ],
  },
  {
    category: 'Bless Fashion House',
    questions: [
      { q: 'How does custom tailoring work?', a: 'After your initial inquiry, we schedule a consultation to discuss style, fabric, and measurements. Two fittings follow before final delivery. Lead times range from 1–3 weeks depending on complexity.' },
      { q: 'Do you offer corporate uniforms?', a: 'Yes. We produce branded uniforms for schools, hospitality, and corporate teams. Minimum order quantities apply — contact us for a tailored quote.' },
      { q: 'Can I buy your ready-to-wear collections online?', a: 'Yes, our online store ships nationwide across Uganda. New collections are released seasonally and featured on the Bless Fashion House page.' },
    ],
  },
  {
    category: 'Pricing & Payments',
    questions: [
      { q: 'How do you price your services?', a: 'Web development is priced per project with clear tiers on the Services page. Fashion services are quoted based on design complexity, fabric, and quantity. Consultation sessions have fixed rates.' },
      { q: 'What payment methods do you accept?', a: 'I accept bank transfers, mobile money (MTN MoMo and Airtel Money), and international payments via Stripe. A deposit is required to begin most projects.' },
      { q: 'Do you offer refunds?', a: 'Deposits cover initial work and are non-refundable, but I am committed to your satisfaction. If deliverables do not meet agreed scope, we will make it right before final payment.' },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about working with me, my services, and Bless Fashion House."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'FAQ' }]}
      />

      <section className="py-16 pb-32">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {faqGroups.map((group) => (
            <div key={group.category}>
              <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-4">{group.category}</p>
              <div className="space-y-3">
                {group.questions.map((item) => {
                  const key = `${group.category}-${item.q}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className="glass rounded-2xl overflow-hidden">
                      <button onClick={() => setOpen(isOpen ? null : key)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                        <span className="text-alabaster text-sm sm:text-base font-medium">{item.q}</span>
                        <ChevronDown size={18} className={`text-vapor flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="px-5 pb-5 text-graphite text-sm font-light leading-relaxed">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="glass-strong rounded-2xl p-8 text-center">
            <MessageCircle size={28} className="text-vapor mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-light text-alabaster mb-2">Still Have Questions?</h2>
            <p className="text-graphite text-sm font-light mb-6">Reach out directly and I will get back to you within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">Contact Support <ArrowRight size={16} /></Link>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">
                <WhatsAppIcon size={16} /> Live Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}