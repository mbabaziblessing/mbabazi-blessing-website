import { useState, useEffect } from 'react';
import { WhatsAppIcon } from '@/components/portfolio/shared';
import { openWhatsApp, WhatsAppMessages } from '@/lib/whatsapp';

/**
 * Floating WhatsApp button (bottom-left). Glassmorphism + pulse.
 * Hides when the Bless AI chat widget is open (via custom event).
 */
export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const onToggle = (e) => setHidden(!!e.detail?.open);
    window.addEventListener('bless-chat-toggle', onToggle);
    const t1 = setTimeout(() => setShowTip(true), 3500);
    const t2 = setTimeout(() => setShowTip(false), 11000);
    return () => {
      window.removeEventListener('bless-chat-toggle', onToggle);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleClick = () => {
    openWhatsApp(WhatsAppMessages.general(), 'whatsapp_button_clicked');
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-[9998] transition-all duration-300 ${
        hidden
          ? 'pointer-events-none translate-y-5 scale-75 opacity-0'
          : 'translate-y-0 scale-100 opacity-100'
      }`}
    >
      <div
        className={`absolute bottom-16 left-0 whitespace-nowrap rounded-xl glass-strong border border-white/10 px-3 py-2 text-xs text-alabaster shadow-lg transition-all duration-300 ${
          showTip
            ? 'visible translate-x-0 opacity-100'
            : 'invisible -translate-x-2 opacity-0'
        }`}
      >
              Need help? Chat on WhatsApp
              <button onClick={() => setShowTip(false)} className="ml-2 text-graphite hover:text-alabaster" aria-label="Dismiss tooltip">✕</button>
      </div>
      <button
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/30 transition hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" aria-hidden="true" />
        <WhatsAppIcon size={28} className="relative z-10 text-white" />
      </button>
    </div>
  );
}