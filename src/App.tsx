import { useEffect, useCallback } from 'react';
import './App.css';
import HeroSection from './sections/HeroSection';
import DoctorSection from './sections/DoctorSection';
import MovieSection from './sections/MovieSection';
import MusicSection from './sections/MusicSection';
import LittleThingsSection from './sections/LittleThingsSection';
import GreetingCardSection from './sections/GreetingCardSection';
import { motion } from 'framer-motion';
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

  const handleChapterComplete = useCallback((chapterNum: number) => {
    if (chapterNum < 6) {
      setTimeout(() => {
        handleUnlockChapter(chapterNum + 1);
      }, 100);
    }
  }, [handleUnlockChapter]);

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
              onComplete={() => handleChapterComplete(2)}
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
              onComplete={() => handleChapterComplete(3)}
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
              onComplete={() => handleChapterComplete(4)}
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
              onComplete={() => handleChapterComplete(5)}
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
