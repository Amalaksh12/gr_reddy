import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Sparkles, Check, Coffee, Book, Flower2, Film, Music, Plane,
  Moon, Heart, Star, PenLine, Stethoscope, Building2
} from 'lucide-react';
import { Confetti } from '../components/CelebrationEffects';

const C = {
  background: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
  accent: '#C08497',
};

interface LittleThingsSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  personalityScore: number;
}

const allStickers = [
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'books', label: 'Books', icon: Book },
  { id: 'flowers', label: 'Flowers', icon: Flower2 },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'night', label: 'Night Sky', icon: Moon },
  { id: 'stars', label: 'Stars', icon: Star },
  { id: 'dreams', label: 'Dreams', icon: Heart },
  { id: 'writing', label: 'Writing', icon: PenLine },
  { id: 'whitecoat', label: 'White Coat', icon: Stethoscope },
  { id: 'city', label: 'City Lights', icon: Building2 },
];

export default function LittleThingsSection({ onComplete, updateScore, personalityScore: _personalityScore }: LittleThingsSectionProps) {
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [phase, setPhase] = useState<'selecting' | 'complete'>('selecting');
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleSticker = (id: string) => {
    if (selectedStickers.includes(id)) {
      setSelectedStickers((prev) => prev.filter((s) => s !== id));
    } else if (selectedStickers.length < 5) {
      setSelectedStickers((prev) => [...prev, id]);
    }
  };

  const handleComplete = () => {
    if (selectedStickers.length >= 5) {
      updateScore(15);
      setShowConfetti(true);
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 2000);
    }
  };

  return (
    <section
      id="little-things"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-caveat text-lg mb-2" style={{ color: C.accent }}>
              CHAPTER 5
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: C.textPrimary }}>
              Things That Feel Like <span style={{ color: C.accent }}>Gayatri</span>
            </h2>
            <p className="font-caveat text-base" style={{ color: C.textSecondary }}>
              Select 5 things that describe you best
            </p>
          </motion.div>
        </div>

        {phase === 'selecting' ? (
          <>
            {/* Sticker Board */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8"
              style={{ border: `1px solid ${C.border}` }}
            >
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {allStickers.map((sticker, index) => {
                  const isSelected = selectedStickers.includes(sticker.id);
                  const isDisabled = !isSelected && selectedStickers.length >= 5;
                  const Icon = sticker.icon;

                  return (
                    <motion.button
                      key={sticker.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ scale: isDisabled ? 1 : 1.08 }}
                      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                      onClick={() => !isDisabled && toggleSticker(sticker.id)}
                      className="relative p-4 rounded-xl"
                      style={{
                        background: isSelected ? `${C.accent}10` : isDisabled ? '#F4F4F4' : C.paper,
                        border: `2px solid ${isSelected ? C.accent : C.border}`,
                        opacity: isDisabled ? 0.5 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon
                        className="w-7 h-7 mx-auto mb-2"
                        style={{ color: isSelected ? C.accent : C.textSecondary }}
                      />
                      <span className="font-caveat text-sm block" style={{ color: C.textPrimary }}>
                        {sticker.label}
                      </span>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: C.accent }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <span className="font-caveat text-base" style={{ color: C.textSecondary }}>
                  Selected: {selectedStickers.length} / 5
                </span>
              </div>
            </div>

            {/* Complete Button */}
            <div className="text-center">
              <motion.button
                whileHover={selectedStickers.length >= 5 ? { scale: 1.02 } : {}}
                whileTap={selectedStickers.length >= 5 ? { scale: 0.98 } : {}}
                onClick={handleComplete}
                disabled={selectedStickers.length < 5}
                style={{
                  background: selectedStickers.length >= 5 ? C.textPrimary : '#D1D5DB',
                  color: selectedStickers.length >= 5 ? '#FFFFFF' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '14px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: selectedStickers.length >= 5 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                }}
              >
                {selectedStickers.length >= 5 ? 'Continue' : `Select ${5 - selectedStickers.length} more`}
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{ background: '#E5E5E5' }}
            >
              <Sparkles className="w-4 h-4" style={{ color: C.textPrimary }} />
              <span className="font-caveat text-lg" style={{ color: C.textPrimary }}>
                Chapter 5 Complete!
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
