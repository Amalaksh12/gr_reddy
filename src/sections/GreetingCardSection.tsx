import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Heart, PartyPopper, Sparkles, BookOpen, PenLine
} from 'lucide-react';
import { Confetti, Sparkles as SparklesEffect } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

const C = {
  background: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
  accent: '#C08497',
};

export default function GreetingCardSection() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleLetterClick = () => setStep(2);
  const handleRevealJourney = () => setStep(3);
  const handleBlowCandle = () => {
    setShowConfetti(true);
    setShowSparkles(true);
    setTimeout(() => setStep(4), 1500);
  };

  return (
    <section
      id="greeting-card"
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden min-h-screen"
      style={{ background: C.background }}
    >
      <FairyLights className="top-0" count={10} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              background: i % 2 === 0 ? `${C.accent}30` : '#B9AEDC30',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-lg mb-2" style={{ color: C.accent }}>
            FINAL CHAPTER
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: C.textPrimary }}>
            The <span style={{ color: C.accent }}>Birthday</span> Letter
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Closed Letter */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={handleLetterClick}
                className="cursor-pointer relative"
              >
                {/* Closed Envelope */}
                <div
                  className="w-72 md:w-80 rounded-lg shadow-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #E6DDD4 0%, #F5EEEB 50%, #E6DDD4 100%)',
                    border: `2px solid ${C.border}`,
                  }}
                >
                  {/* Envelope flap */}
                  <div
                    className="absolute top-0 left-0 right-0 h-12"
                    style={{
                      background: 'linear-gradient(135deg, #D6C8BE, #E6DDD4)',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  />

                  {/* Wax seal */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: C.accent }}
                  >
                    <Heart className="w-5 h-5 text-white" style={{ fill: 'white' }} />
                  </motion.div>

                  {/* Letter hint */}
                  <div className="pt-16 pb-6 text-center">
                    <p className="font-sacramento text-xl" style={{ color: C.textSecondary }}>
                      A letter for Gayatri
                    </p>
                    <p className="font-caveat text-sm mt-1" style={{ color: C.textSecondary }}>
                      Click to open
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Open Letter - First Part */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
              onClick={handleRevealJourney}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl shadow-2xl p-6 md:p-10 cursor-pointer relative max-w-md w-full"
                style={{ border: `1px solid ${C.border}` }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 paper-texture opacity-20 rounded-xl" />

                {/* Washi tape decorations */}
                <div
                  className="absolute -top-2 left-8 w-16 h-4 rounded"
                  style={{ background: C.accent, transform: 'rotate(-3deg)' }}
                />
                <div
                  className="absolute -top-2 right-8 w-12 h-4 rounded"
                  style={{ background: '#A7C4A0', transform: 'rotate(4deg)' }}
                />

                {/* Content */}
                <div className="relative">
                  <p className="font-sacramento text-2xl text-center mb-4" style={{ color: C.accent }}>
                    Dearest Gayatri,
                  </p>

                  <p className="font-cormorant text-base leading-relaxed mb-4" style={{ color: C.textSecondary }}>
                    On your special day, I wanted to create something that celebrates who you are —
                    not just the doctor you're becoming, but the music you carry in your heart,
                    the stories you love, and all the little things that make you... you.
                  </p>

                  <p className="font-cormorant text-base leading-relaxed" style={{ color: C.textSecondary }}>
                    This scrapbook is a journey through all the chapters we've written together...
                  </p>
                </div>

                {/* Click indicator */}
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-caveat text-sm text-center mt-6"
                  style={{ color: C.accent }}
                >
                  Click to continue reading
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Full Letter with Candle */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {/* Letter continuation */}
              <div
                className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8"
                style={{ border: `1px solid ${C.border}` }}
              >
                {/* Journey icons */}
                <div className="flex justify-center gap-4 mb-6">
                  {[
                    { icon: BookOpen, label: 'Your Story' },
                    { icon: Sparkles, label: 'Dreams' },
                    { icon: Heart, label: 'Love' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: `${C.accent}15` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: C.accent }} />
                      </div>
                      <span className="font-caveat text-xs" style={{ color: C.textSecondary }}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <p className="font-sacramento text-xl text-center mb-4" style={{ color: C.accent }}>
                  Now, make a wish...
                </p>

                {/* Candle */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={handleBlowCandle}
                  className="cursor-pointer relative mx-auto w-fit"
                >
                  <div className="relative">
                    {/* Candle body */}
                    <div
                      className="w-8 h-20 rounded-t-sm mx-auto"
                      style={{ background: `linear-gradient(to bottom, #F8DCC8, ${C.accent})` }}
                    />

                    {/* Flame */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                    >
                      <div
                        className="w-5 h-10 rounded-full"
                        style={{ background: 'linear-gradient(to top, #FB923C, #FCD34D, #FEF3C7)' }}
                      />
                    </motion.div>

                    {/* Glow */}
                    <div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full blur-xl"
                      style={{ background: '#FEF3C760' }}
                    />
                  </div>
                </motion.div>

                <motion.p
                  animate={{ opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-caveat text-sm mt-4"
                  style={{ color: C.textSecondary }}
                >
                  Click to blow out the candle
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Final Message */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="mb-6"
              >
                <PartyPopper className="w-14 h-14 mx-auto" style={{ color: C.accent }} />
              </motion.div>

              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="font-playfair text-3xl md:text-4xl font-bold mb-6"
                style={{ color: C.textPrimary }}
              >
                Happy Birthday<br />
                <span style={{ color: C.accent }}>Gayatri Devi Reddy!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-cormorant text-lg md:text-xl mb-6 max-w-md mx-auto"
                style={{ color: C.textSecondary }}
              >
                "May this new chapter bring you endless joy, beautiful stories,
                and all the happiness you deserve."
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="mb-6"
              >
                <p className="font-sacramento text-2xl" style={{ color: C.accent }}>
                  THE END
                </p>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ background: C.accent }}
              >
                <Heart className="w-6 h-6 text-white" style={{ fill: 'white' }} />
              </motion.div>

              {/* Signature */}
              <div className="bg-white rounded-xl p-6 max-w-sm mx-auto" style={{ border: `1px solid ${C.border}` }}>
                <PenLine className="w-4 h-4 mx-auto mb-2" style={{ color: C.accent }} />
                <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
                  A birthday scrapbook made with love, just for you
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
      <SparklesEffect show={showSparkles} />
    </section>
  );
}
