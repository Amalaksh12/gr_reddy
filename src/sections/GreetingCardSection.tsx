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
                To Gayatri Reddy,
              </p>

              {/* Body paragraphs */}
              <div className="space-y-5">
                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Happy Birthdayyy
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  I honestly didn't know what to gift you... so I made you a whole website, because why not?
                  You're becoming a doctor, so clearly you deserve way more than just a generic "Happy Birthday" message.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  This scrapbook has your movie quiz (your favorite pastime), your music quiz (the songs that
                  make you vibe), and this letter from yours truly.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  I wanted to do something personal, not just pick up some random gift. Every chapter here is
                  essentially me saying: "I've paid attention." To the movies you love, the songs you play on
                  repeat, the doctor you're becoming.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  Here's to another year of you crushing it — at med school, at life, at everything. May your
                  Spotify wrapped always be fire, your movie choices impeccable, and your future patients
                  realize how lucky they are.
                </p>

                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: C.body, lineHeight: '1.75' }}
                >
                  You deserve all the happiness in the world — and this is just my small, slightly techy way
                  of showing you that.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-10 text-right">
                <p
                  className="font-sacramento text-2xl"
                  style={{ color: C.accent }}
                >
                  — Yours, Always
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
