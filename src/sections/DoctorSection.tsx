import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Check, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

interface DoctorSectionProps {
  onComplete: (score: number, max: number) => void;
  updateScore: (points: number) => void;
  doctorScore: number;
}

const doctorQuestions = [
  {
    question: "What color is oxygen-rich blood usually represented as?",
    options: ["Blue", "Red", "Green", "Yellow"],
    correct: 1,
  },
  {
    question: "What is the normal human body temperature?",
    options: ["37°C", "40°C", "35°C", "42°C"],
    correct: 0,
  },
  {
    question: "What is the average number of bones in an adult human body?",
    options: ["106", "206", "306", "406"],
    correct: 1,
  },
  {
    question: "What is the largest artery in the human body?",
    options: ["Pulmonary Artery", "Aorta", "Coronary Artery", "Femoral Artery"],
    correct: 1,
  },
  {
    question: "What does ECG stand for?",
    options: ["Electrocardiogram", "Electronic Cardiac Graph", "Electric Cardio Grid", "Electro Graph"],
    correct: 0,
  },
];

const TOTAL = doctorQuestions.length;

export default function DoctorSection({ onComplete, updateScore }: DoctorSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const handleStartQuiz = () => setPhase('quiz');

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === doctorQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount(prev => prev + 1);
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
    onComplete(correctCount, TOTAL);
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
    if (index === doctorQuestions[currentQuestion].correct) {
      return { ...base, background: '#F0FDF4', borderColor: '#86EFAC', color: '#166534' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, borderColor: C.border, opacity: 0.45 };
  };

  return (
    <section
      id="doctor"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-caveat text-lg mb-2" style={{ color: C.accent }}>
              CHAPTER 2
            </p>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold mb-3"
              style={{ color: C.textPrimary }}
            >
              The White Coat Chronicles
            </h2>
            <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
              Medical knowledge meets dedication
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
                    <Stethoscope className="w-8 h-8" style={{ color: C.textPrimary }} />
                  </div>
                </div>

                <h3
                  className="font-playfair text-xl font-semibold mb-3"
                  style={{ color: C.textPrimary }}
                >
                  Doctor Challenge
                </h3>

                <p
                  className="font-cormorant text-base mb-2"
                  style={{ color: C.body }}
                >
                  5 quick medical questions to put your knowledge to the test.
                </p>

                <p className="font-caveat text-sm" style={{ color: C.textSecondary }}>
                  No pressure — just a chance to see how much you know!
                </p>
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
              {/* 5-step progress bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {doctorQuestions.map((_, i) => (
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
                <p
                  className="font-inter text-sm text-center mb-4"
                  style={{ color: C.textSecondary }}
                >
                  Question {currentQuestion + 1} of {TOTAL}
                </p>

                <h3
                  className="font-playfair text-lg font-semibold text-center mb-6"
                  style={{ color: C.textPrimary }}
                >
                  {doctorQuestions[currentQuestion].question}
                </h3>

                <div>
                  {doctorQuestions[currentQuestion].options.map((option, index) => (
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
                          {index === doctorQuestions[currentQuestion].correct && (
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
            </motion.div>
          )}

          {/* COMPLETE */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
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
                  style={{ background: C.sage }}
                >
                  <Check className="w-7 h-7 text-white" />
                </motion.div>

                <h3
                  className="font-playfair text-2xl font-bold mb-3"
                  style={{ color: C.textPrimary }}
                >
                  Doctor Challenge Complete
                </h3>

                <p
                  className="font-cormorant text-lg mb-8"
                  style={{ color: C.textSecondary }}
                >
                  Looks like all those study sessions paid off.
                </p>

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
