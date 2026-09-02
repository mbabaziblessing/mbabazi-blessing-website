import React, { useEffect, useRef } from 'react';
import { CONTACT } from "@/components/portfolio/shared";
export default function CalendlyEmbed({ url = CONTACT.calendly, height = 720 }) {
  const ref = useRef(null);

  useEffect(() => {
    const fullUrl = `${url}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=f8fafc&primary_color=4f46e5`;
    const init = () => {
      if (window.Calendly && ref.current) {
        ref.current.innerHTML = '';
        window.Calendly.initInlineWidget({ url: fullUrl, element: ref.current });
      }
    };
    if (window.Calendly) {
      init();
    } else {
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    }
  }, [url]);

  return (
    <div
      ref={ref}
      className="calendly-inline-widget"
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  );
}
