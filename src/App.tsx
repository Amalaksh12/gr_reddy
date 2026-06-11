import { useState, useEffect, useCallback } from 'react';
import './App.css';
import HeroSection from './sections/HeroSection';
import DoctorSection from './sections/DoctorSection';
import MovieSection from './sections/MovieSection';
import MusicSection from './sections/MusicSection';
import LittleThingsSection from './sections/LittleThingsSection';
import GreetingCardSection from './sections/GreetingCardSection';
import ClosingPage from './sections/ClosingPage';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { ChapterProvider, useChapters } from './context/ChapterContext';

const C = {
  cream: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
  accent: '#C08497',
};

function ScrapbookContent() {
  const {
    unlockedChapters,
    currentChapter,
    scores,
    unlockChapter,
    setCurrentChapter,
    updateScore,
  } = useChapters();

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedChapter, setCompletedChapter] = useState<number | null>(null);
  const [chapterScore, setChapterScore] = useState({ score: 0, max: 0 });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const chapterNum = parseInt(hash.replace('#chapter-', ''));
      if (!isNaN(chapterNum) && unlockedChapters.includes(chapterNum)) {
        setCurrentChapter(chapterNum);
      }
    }
  }, []);

  const handleUnlockChapter = useCallback((chapter: number) => {
    unlockChapter(chapter);
    setCurrentChapter(chapter);
  }, [unlockChapter, setCurrentChapter]);

  const handleChapterComplete = useCallback((chapterNum: number, score: number, max: number) => {
    setCompletedChapter(chapterNum);
    setChapterScore({ score, max });
    setShowCompletionModal(true);
  }, []);

  const handleContinueFromModal = useCallback(() => {
    setShowCompletionModal(false);
    if (completedChapter && completedChapter < 6) {
      setTimeout(() => {
        handleUnlockChapter(completedChapter + 1);
      }, 100);
    }
  }, [completedChapter, handleUnlockChapter]);

  const handleBeginJourney = useCallback(() => {
    handleUnlockChapter(2);
  }, [handleUnlockChapter]);

  useEffect(() => {
    if (currentChapter > 1) {
      const sectionId = [
        'hero', 'doctor', 'movies', 'music', 'little-things', 'greeting-card'
      ][currentChapter - 1];
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [currentChapter]);

  const getChapterTitle = (num: number): string => {
    const titles = [
      '',
      'The Story of Gayatri',
      'Doctor Quiz Complete',
      'Cinema Quiz Complete',
      'Music Chapter Complete',
      'Personality Complete',
      'The Final Letter',
    ];
    return titles[num] || '';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.cream, overflowX: 'hidden' }}>
      {/* Mobile Progress Indicator - Simple dots only */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.98)',
          borderTop: `1px solid ${C.border}`,
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((ch) => {
          const isUnlocked = unlockedChapters.includes(ch);
          const isCurrent = currentChapter === ch;
          const isComplete = isUnlocked && currentChapter > ch;

          return (
            <div
              key={ch}
              style={{
                width: isCurrent ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: isComplete ? '#A3A3A3' : isCurrent ? C.textPrimary : '#E5E5E5',
                transition: 'all 0.3s ease',
              }}
            />
          );
        })}
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && completedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.3)',
              padding: '20px',
            }}
            onClick={handleContinueFromModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: C.paper,
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '360px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleContinueFromModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} style={{ color: C.textSecondary }} />
              </button>

              {/* Check icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#E5E5E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.textPrimary} strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>

              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: C.textPrimary,
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                {getChapterTitle(completedChapter)}
              </h3>

              {completedChapter >= 2 && completedChapter <= 5 && (
                <p
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '20px',
                    color: C.textSecondary,
                    textAlign: 'center',
                    marginBottom: '24px',
                  }}
                >
                  Score: {chapterScore.score} / {chapterScore.max}
                </p>
              )}

              {completedChapter === 4 && (
                <p
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '18px',
                    color: C.textSecondary,
                    textAlign: 'center',
                    marginBottom: '24px',
                  }}
                >
                  Playlist Created
                </p>
              )}

              <button
                onClick={handleContinueFromModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '14px 24px',
                  background: C.textPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ paddingBottom: '60px' }} className="md:pb-0">
        {currentChapter >= 1 && (
          <motion.div
            key={`ch1-${currentChapter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HeroSection onBeginJourney={handleBeginJourney} />
          </motion.div>
        )}

        {currentChapter >= 2 && (
          <motion.div
            key="ch2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DoctorSection
              onComplete={(score, max) => handleChapterComplete(2, score, max)}
              updateScore={(points) => updateScore('doctor', points)}
              doctorScore={scores.doctor}
            />
          </motion.div>
        )}

        {currentChapter >= 3 && (
          <motion.div
            key="ch3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MovieSection
              onComplete={(score, max) => handleChapterComplete(3, score, max)}
              updateScore={(points) => updateScore('movies', points)}
              movieScore={scores.movies}
            />
          </motion.div>
        )}

        {currentChapter >= 4 && (
          <motion.div
            key="ch4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MusicSection
              onComplete={() => handleChapterComplete(4, 0, 0)}
              updateScore={(points) => updateScore('music', points)}
              musicScore={scores.music}
            />
          </motion.div>
        )}

        {currentChapter >= 5 && (
          <motion.div
            key="ch5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LittleThingsSection
              onComplete={() => handleChapterComplete(5, 0, 0)}
              updateScore={(points) => updateScore('personality', points)}
              personalityScore={scores.personality}
            />
          </motion.div>
        )}

        {currentChapter >= 6 && (
          <motion.div
            key="ch6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GreetingCardSection />
          </motion.div>
        )}

        {currentChapter >= 6 && (
          <motion.div
            key="closing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ClosingPage />
          </motion.div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ChapterProvider>
      <ScrapbookContent />
    </ChapterProvider>
  );
}

export default App;
