import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Film, Clapperboard, Check, X, ChevronRight, Ticket } from 'lucide-react';

const C = {
  background: '#FAF8F5',
  paper: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  body: '#374151',
  border: '#E7E2DC',
  accent: '#C97A8B',
  sage: '#A8BBA2',
};

interface MovieSectionProps {
  onComplete: (score: number, max: number) => void;
  updateScore: (points: number) => void;
  movieScore: number;
}

const movieQuestions = [
  {
    question: "Which movie introduced the famous pair Karthik and Jessie?",
    options: ["Fidaa", "Ye Maaya Chesave", "Majili", "Orange"],
    correct: 1,
    movie: "Ye Maaya Chesave",
  },
  {
    question: "What is Adi's profession in OK Jaanu?",
    options: ["Chef", "Game Developer", "Doctor", "Architect"],
    correct: 1,
    movie: "OK Jaanu",
  },
  {
    question: "In Tamasha, what does Ved truly dream of becoming?",
    options: ["Doctor", "Pilot", "Storyteller", "Singer"],
    correct: 2,
    movie: "Tamasha",
  },
  {
    question: "In Ye Maaya Chesave, who falls in love first?",
    options: ["Jessie", "Karthik", "Both together", "Neither"],
    correct: 1,
    movie: "Ye Maaya Chesave",
  },
  {
    question: "Which popular song from Orange became a fan favorite?",
    options: ["Rooba Rooba", "Hello Rammante", "Samajavaragamana", "Inkem Inkem"],
    correct: 0,
    movie: "Orange",
  },
  {
    question: "In Hasee Toh Phasee, Nikhil is initially engaged to whom?",
    options: ["Meeta", "Karishma", "Naina", "Tara"],
    correct: 1,
    movie: "Hasee Toh Phasee",
  },
];

const TOTAL = movieQuestions.length;

const ticketColors = [
  { bg: '#FFF0F3', border: '#C97A8B', accent: '#C97A8B' },
  { bg: '#F0F7FF', border: '#7BA8D4', accent: '#5B8DB8' },
  { bg: '#F0FDF4', border: '#86EFAC', accent: '#16A34A' },
  { bg: '#FFF7ED', border: '#FCD34D', accent: '#D97706' },
  { bg: '#F5F3FF', border: '#C4B5FD', accent: '#7C3AED' },
  { bg: '#FFF1F2', border: '#FDA4AF', accent: '#E11D48' },
];

function MovieTicketCard({
  questionIndex,
  movie,
  delay,
}: {
  questionIndex: number;
  movie: string;
  delay: number;
}) {
  const colors = ticketColors[questionIndex % ticketColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        minWidth: '140px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}
    >
      {/* Ticket notch left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
        style={{ background: C.background }}
      />
      {/* Ticket notch right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full"
        style={{ background: C.background }}
      />

      <div className="px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Ticket style={{ width: '12px', height: '12px', color: colors.accent }} />
          <span
            className="font-inter font-semibold uppercase tracking-wide"
            style={{ fontSize: '8px', color: colors.accent }}
          >
            ADMIT ONE
          </span>
        </div>
        <p
          className="font-playfair font-bold leading-tight"
          style={{ fontSize: '12px', color: C.textPrimary }}
        >
          {movie}
        </p>
        <div
          className="mt-2 pt-2"
          style={{ borderTop: `1px dashed ${colors.border}` }}
        >
          <p
            className="font-caveat"
            style={{ fontSize: '10px', color: C.textSecondary }}
          >
            Movie Night
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MovieSection({ onComplete, updateScore }: MovieSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [collectedTickets, setCollectedTickets] = useState<number[]>([]);

  const handleStartQuiz = () => setPhase('quiz');

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === movieQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCollectedTickets(prev => [...prev, currentQuestion]);
      updateScore(1);
    }

    setTimeout(() => {
      if (currentQuestion < TOTAL - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setPhase('complete');
      }
    }, 1200);
  };

  const handleContinue = () => {
    onComplete(collectedTickets.length, TOTAL);
  };

  const getOptionStyle = (index: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '8px',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      cursor: selectedAnswer === null ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      border: '1px solid',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: C.paper,
    };

    if (selectedAnswer === null) {
      return { ...base, borderColor: C.border };
    }
    if (index === movieQuestions[currentQuestion].correct) {
      return { ...base, background: '#F0FDF4', borderColor: '#86EFAC', color: '#166534' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, borderColor: C.border, opacity: 0.45 };
  };

  return (
    <section
      id="movies"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-caveat text-lg mb-2" style={{ color: C.textSecondary }}>
              CHAPTER 3
            </p>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold mb-3"
              style={{ color: C.textPrimary }}
            >
              Romantic Cinema Challenge
            </h2>
            <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
              How well do you know these love stories?
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div
                className="bg-white rounded-2xl p-8 shadow-sm mb-8"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: '#F3F4F6' }}
                  >
                    <Clapperboard className="w-8 h-8" style={{ color: C.textPrimary }} />
                  </div>
                </div>

                <h3
                  className="font-playfair text-xl font-semibold mb-3"
                  style={{ color: C.textPrimary }}
                >
                  Cinema Quiz
                </h3>

                <p
                  className="font-cormorant text-base mb-3"
                  style={{ color: C.body }}
                >
                  6 questions about romantic Hindi and Telugu cinema you love.
                </p>

                <div className="flex items-center justify-center gap-2">
                  <Film className="w-4 h-4" style={{ color: C.textSecondary }} />
                  <span
                    className="font-caveat text-sm"
                    style={{ color: C.textSecondary }}
                  >
                    Earn a movie ticket for every correct answer
                  </span>
                  <Ticket className="w-4 h-4" style={{ color: C.accent }} />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartQuiz}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: C.textPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '14px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <span>Start Quiz</span>
                <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* QUIZ */}
          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* 6-step progress bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {movieQuestions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '5px',
                      borderRadius: '3px',
                      background:
                        i < currentQuestion
                          ? '#A3A3A3'
                          : i === currentQuestion
                          ? C.textPrimary
                          : '#E5E7EB',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Film className="w-4 h-4" style={{ color: C.textSecondary }} />
                  <p className="font-inter text-sm" style={{ color: C.textSecondary }}>
                    Question {currentQuestion + 1} of {TOTAL}
                  </p>
                </div>

                <h3
                  className="font-playfair text-lg font-semibold text-center mb-6"
                  style={{ color: C.textPrimary }}
                >
                  {movieQuestions[currentQuestion].question}
                </h3>

                <div>
                  {movieQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={`${currentQuestion}-${index}`}
                      whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      style={getOptionStyle(index)}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && (
                        <>
                          {index === movieQuestions[currentQuestion].correct && (
                            <Check size={16} color="#16A34A" />
                          )}
                          {selectedAnswer === index && !isCorrect && (
                            <X size={16} color="#DC2626" />
                          )}
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Live ticket counter */}
              {collectedTickets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 mt-5"
                >
                  <Ticket className="w-4 h-4" style={{ color: C.accent }} />
                  <span className="font-caveat text-base" style={{ color: C.textSecondary }}>
                    {collectedTickets.length} ticket{collectedTickets.length !== 1 ? 's' : ''} collected
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* COMPLETE */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
                style={{ border: `1px solid ${C.border}` }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: '#F3F4F6' }}
                >
                  <Clapperboard className="w-8 h-8" style={{ color: C.textPrimary }} />
                </motion.div>

                <h3
                  className="font-playfair text-2xl font-bold mb-2"
                  style={{ color: C.textPrimary }}
                >
                  Movie Marathon Locked In
                </h3>

                <p
                  className="font-cormorant text-lg mb-6"
                  style={{ color: C.textSecondary }}
                >
                  {collectedTickets.length === TOTAL
                    ? 'A perfect score — every answer right!'
                    : collectedTickets.length >= 4
                    ? 'Almost a clean sweep — great cinema knowledge!'
                    : 'A true romantic cinema fan.'}
                </p>

                {/* Ticket collection */}
                {collectedTickets.length > 0 ? (
                  <div className="mb-8">
                    <p
                      className="font-caveat text-sm mb-4"
                      style={{ color: C.textSecondary }}
                    >
                      Tickets collected
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {collectedTickets.map((qIndex, i) => (
                        <MovieTicketCard
                          key={qIndex}
                          questionIndex={qIndex}
                          movie={movieQuestions[qIndex].movie}
                          delay={i * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p
                    className="font-caveat text-base mb-8"
                    style={{ color: C.textSecondary }}
                  >
                    Better luck next time — the movies are still worth watching!
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: C.textPrimary,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 32px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
