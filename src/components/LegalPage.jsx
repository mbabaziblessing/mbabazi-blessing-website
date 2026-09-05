import PageHero from '@/components/portfolio/PageHero';

export default function LegalPage({ title, subtitle, breadcrumb, sections }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <section className="py-16 pb-32">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-4">{section.heading}</h2>
              <p className="text-graphite text-sm sm:text-base font-light leading-relaxed">{section.body}</p>
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-graphite text-sm font-light leading-relaxed">
                      <span className="text-vapor mt-1.5 w-1 h-1 rounded-full bg-vapor flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="text-graphite/60 text-xs font-mono pt-8 border-t border-white/5">
            Last updated: July 2026 · Questions? Contact mbabaziblessing2002@gmail.com
          </p>
        </div>
      </section>
    </>
  );
}