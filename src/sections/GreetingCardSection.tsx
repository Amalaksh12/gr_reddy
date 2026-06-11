import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const C = {
  background: '#FAF8F5',
  paper: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  body: '#374151',
  caption: '#6B7280',
  border: '#E7E2DC',
  accent: '#C97A8B',
};

export default function GreetingCardSection() {
  return (
    <section
      id="greeting-card"
      className="relative py-16 md:py-28 px-4 md:px-8"
      style={{ background: C.background, minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="font-caveat text-base mb-2" style={{ color: C.accent }}>
            FINAL CHAPTER
          </p>
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold mb-3"
            style={{ color: C.textPrimary }}
          >
            The Birthday Letter
          </h2>
          <p
            className="font-sacramento text-xl"
            style={{ color: C.caption }}
          >
            A few words that deserved their own page.
          </p>
        </motion.div>

        {/* Letter paper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/* Paper clip decoration */}
          <div
            className="absolute -top-3 left-10 z-10"
            style={{
              width: '3px',
              height: '36px',
              background: '#C0B8B0',
              borderRadius: '2px',
              boxShadow: '-3px 0 0 #C0B8B0, -3px 8px 0 #C0B8B0, -3px 16px 0 #C0B8B0',
            }}
          />

          {/* Heart corner decoration */}
          <div
            className="absolute top-5 right-5 opacity-40 z-10"
            style={{ color: C.accent }}
          >
            <Heart size={16} style={{ color: C.accent }} />
          </div>

          {/* Folded corner */}
          <div
            className="absolute bottom-0 right-0 z-10"
            style={{
              width: '32px',
              height: '32px',
              background: `linear-gradient(225deg, ${C.border} 50%, transparent 50%)`,
              borderRadius: '0 0 12px 0',
            }}
          />

          {/* Letter itself */}
          <div
            className="relative rounded-xl px-8 py-10 md:px-12 md:py-12"
            style={{
              background: C.paper,
              border: `1px solid ${C.border}`,
              boxShadow: '0 8px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Subtle paper lines */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #F0EDE8 27px, #F0EDE8 28px)',
                backgroundPosition: '0 48px',
                opacity: 0.4,
              }}
            />

            {/* Letter content */}
            <div className="relative">
              {/* Greeting */}
              <p
                className="font-sacramento text-2xl mb-6"
                style={{ color: C.accent }}
              >
                My dearest Gayatri,
              </p>

              {/* Body paragraphs */}
              <div className="space-y-5">
                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Today is your day — and I wanted to mark it with something that captures
                  even a small fraction of who you are. Not just the doctor you're becoming,
                  but the whole person: the stories you love, the songs that stay in your
                  head, the little things that make you entirely, wonderfully you.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Every quiz, every vinyl record, every chapter in this scrapbook was
                  made with one thought — that you deserve to feel celebrated. Not just
                  for your achievements, but for the warmth you carry into every room.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Thank you for being curious, for dreaming loud, for caring deeply about
                  the people around you. The world is better because you are in it — and this
                  small scrapbook is my way of saying that out loud.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Happy Birthday. May this year bring you everything you've been quietly
                  hoping for, and a few beautiful surprises you never expected.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-10 text-right">
                <p
                  className="font-sacramento text-xl mb-1"
                  style={{ color: C.caption }}
                >
                  Forever and always,
                </p>
                <p
                  className="font-playfair text-2xl font-bold"
                  style={{ color: C.textPrimary }}
                >
                  Happy Birthday,
                  <span style={{ color: C.accent }}> Gayatri Devi Reddy</span>
                </p>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block mt-2"
                >
                  <Heart size={18} style={{ color: C.accent }} fill={C.accent} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: C.paper,
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Heart size={13} style={{ color: C.accent }} />
            <span
              className="font-caveat text-base"
              style={{ color: C.caption }}
            >
              Written with love
            </span>
            <Heart size={13} style={{ color: C.accent }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
