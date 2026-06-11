import { motion, useInView } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const C = {
  background: '#FAF8F5',
  paper: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  body: '#374151',
  caption: '#6B7280',
  border: '#E7E2DC',
  accent: '#C97A8B',
  sage: '#A8BBA2',
};

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const paragraphs = [
  "I honestly didn't know what to gift you, and then I thought... why not make something that feels a little more personal?",
  "So here we are.",
  "A random collection of questions, movies, songs, and tiny little things that reminded me of you while building this scrapbook.",
  "No deep meaning behind everything, no hidden life lessons, no emotional damage. Just a small corner of the internet made specially for your birthday.",
  "I hope you had fun answering the questions, collecting movie tickets, picking songs for your playlist, and going through all the chapters.",
  "You're one of those people who somehow manages to stay dedicated, ambitious, chaotic, funny, and stubborn all at the same time. And honestly, that's what makes you... you.",
  "I know the next few years are going to be full of exams, hospital duties, responsibilities, and a lot of caffeine. But I hope they also bring good memories, great people, random adventures, and enough reasons to smile.",
  "Take care of yourself, keep chasing your goals, keep being annoying when necessary, and most importantly, don't forget to enjoy the journey along the way.",
  "Wishing you a year filled with happiness, good health, success, and lots of moments worth remembering.",
];

export default function GreetingCardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="greeting-card"
      ref={sectionRef}
      className="relative py-16 md:py-28 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
          <p className="font-sacramento text-xl" style={{ color: C.caption }}>
            A few words that deserved their own page.
          </p>
        </motion.div>

        {/* 22 Years badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 160 }}
          className="flex justify-center mb-10"
        >
          <div
            className="relative flex flex-col items-center justify-center"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, #FDE8EF 0%, #F9F3E8 50%, #E8F3EC 100%)`,
              border: `2px solid ${C.border}`,
              boxShadow: '0 8px 32px rgba(201,122,139,0.12)',
            }}
          >
            {/* Rotating dashes ring */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 140 140"
              style={{ animation: 'spin 18s linear infinite' }}
            >
              <circle
                cx="70" cy="70" r="64"
                fill="none"
                stroke={C.accent}
                strokeWidth="1.5"
                strokeDasharray="6 8"
                opacity="0.4"
              />
            </svg>

            <span
              className="font-playfair font-bold leading-none"
              style={{ fontSize: '52px', color: C.textPrimary, lineHeight: 1 }}
            >
              <CountUp target={22} duration={1200} />
            </span>
            <span
              className="font-caveat text-sm mt-0.5"
              style={{ color: C.accent, letterSpacing: '0.08em' }}
            >
              years
            </span>

            {/* Small sparkle dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: [0, 1, 0], scale: [0, 1, 0] } : {}}
                transition={{ duration: 2, delay: 0.8 + i * 0.12, repeat: Infinity, repeatDelay: 2 }}
                style={{
                  position: 'absolute',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? C.accent : C.sage,
                  top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`,
                  left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Letter paper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
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
          <motion.div
            className="absolute top-5 right-5 z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: 0.5 }}
          >
            <Heart size={15} style={{ color: C.accent }} fill={C.accent} />
          </motion.div>

          {/* Sparkles top-left */}
          <motion.div
            className="absolute top-5 left-5 z-10"
            animate={{ rotate: [0, 20, -10, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={14} style={{ color: C.accent }} />
          </motion.div>

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
                opacity: 0.35,
              }}
            />

            {/* Letter content */}
            <div className="relative">
              {/* Greeting line */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-sacramento text-2xl mb-2"
                style={{ color: C.accent }}
              >
                To Gayatri Reddy,
              </motion.p>

              {/* Happy Birthday line */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.62 }}
                className="font-playfair text-xl font-semibold mb-6"
                style={{ color: C.textPrimary }}
              >
                Happy Birthdayyy{' '}
                <span style={{ fontFamily: 'sans-serif' }}>🎂</span>
              </motion.p>

              {/* Body paragraphs with stagger */}
              <div className="space-y-4">
                {paragraphs.map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.7 + i * 0.08 }}
                    className="font-cormorant text-lg leading-relaxed"
                    style={{ color: C.body, lineHeight: '1.78' }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Closing line */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.7 + paragraphs.length * 0.08 }}
                className="font-playfair font-semibold text-lg mt-5"
                style={{ color: C.textPrimary }}
              >
                Happy Birthdayyy ra Pottiiiii{' '}
                <span style={{ fontFamily: 'sans-serif' }}>🐷</span>
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.55 }}
                style={{
                  height: '1px',
                  background: `linear-gradient(to right, transparent, ${C.border}, transparent)`,
                  margin: '28px 0',
                  transformOrigin: 'left',
                }}
              />

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.65 }}
                className="text-right"
              >
                <p className="font-sacramento text-2xl" style={{ color: C.accent }}>
                  — Hitesh
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex justify-center gap-3 mt-8"
        >
          {[0, 0.3, 0.6].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart
                size={i === 1 ? 16 : 12}
                style={{ color: C.accent, opacity: i === 1 ? 0.7 : 0.45 }}
                fill={C.accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
