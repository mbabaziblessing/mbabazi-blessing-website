import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-[9998]"
        >
          {showTip && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute bottom-16 left-0 glass-strong rounded-xl px-3 py-2 text-xs text-alabaster whitespace-nowrap shadow-lg border border-white/10"
            >
              Need help? Chat on WhatsApp
              <button onClick={() => setShowTip(false)} className="ml-2 text-graphite hover:text-alabaster" aria-label="Dismiss tooltip">✕</button>
            </motion.div>
          )}
          <button
            onClick={handleClick}
            aria-label="Chat on WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" aria-hidden="true" />
            <WhatsAppIcon size={28} className="text-white relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}