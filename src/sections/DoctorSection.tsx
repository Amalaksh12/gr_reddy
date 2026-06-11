import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Check, X, Activity, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const C = {
  background: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
  accent: '#C08497',
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
    question: "Normal human body temperature?",
    options: ["37°C", "40°C", "35°C", "42°C"],
    correct: 0,
  },
  {
    question: "What is the average number of bones in an adult?",
    options: ["106", "206", "306", "406"],
    correct: 1,
  },
  {
    question: "Largest artery in the body?",
    options: ["Pulmonary Artery", "Aorta", "Coronary Artery", "Femoral Artery"],
    correct: 1,
  },
  {
    question: "What does ECG stand for?",
    options: ["Electrocardiogram", "Electronic Cardiac Graph", "Electric Cardio Grid", "Electro Graph"],
    correct: 0,
  },
  {
    question: "Which organ produces insulin?",
    options: ["Liver", "Pancreas", "Kidney", "Stomach"],
    correct: 1,
  },
  {
    question: "What is the normal resting heart rate for adults?",
    options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "30-50 bpm"],
    correct: 1,
  },
  {
    question: "Which blood type is known as the universal donor?",
    options: ["A", "B", "AB", "O"],
    correct: 3,
  },
  {
    question: "How many pairs of ribs does a human have?",
    options: ["10", "12", "14", "8"],
    correct: 1,
  },
  {
    question: "What is the main function of red blood cells?",
    options: ["Fight infection", "Carry oxygen", "Blood clotting", "Produce antibodies"],
    correct: 1,
  },
  {
    question: "Which part of the brain controls balance?",
    options: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],
    correct: 1,
  },
  {
    question: "What is the longest bone in the human body?",
    options: ["Tibia", "Fibula", "Femur", "Humerus"],
    correct: 2,
  },
  {
    question: "Normal blood pressure is typically around?",
    options: ["80/40 mmHg", "100/60 mmHg", "120/80 mmHg", "150/100 mmHg"],
    correct: 2,
  },
  {
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correct: 3,
  },
  {
    question: "How many teeth does a normal adult have?",
    options: ["26", "28", "32", "36"],
    correct: 2,
  },
];

export default function DoctorSection({ onComplete, updateScore, doctorScore }: DoctorSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleStartQuiz = () => {
    setPhase('quiz');
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === doctorQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
      updateScore(1);
    }

    setTimeout(() => {
      if (currentQuestion < doctorQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setTimeout(() => {
          setPhase('complete');
          onComplete(correctAnswers, doctorQuestions.length);
        }, 500);
      }
    }, 1200);
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
    return { ...base, borderColor: C.border, opacity: 0.5 };
  };

  return (
    <section
      id="doctor"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-caveat text-lg mb-2" style={{ color: C.textSecondary }}>
              CHAPTER 2
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: C.textPrimary }}>
              The White Coat Chronicles
            </h2>
            <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
              Medical knowledge meets dedication
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#E5E5E5' }}>
                    <Stethoscope className="w-8 h-8" style={{ color: C.textPrimary }} />
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-semibold mb-3" style={{ color: C.textPrimary }}>
                  Medical Knowledge Quiz
                </h3>

                <p className="font-cormorant text-base mb-4" style={{ color: C.textSecondary }}>
                  Test your medical knowledge with 15 questions covering anatomy, physiology, and clinical basics.
                </p>

                <p className="font-caveat text-sm" style={{ color: C.textSecondary }}>
                  No pressure — just a chance to see how much you know!
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
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

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Progress bar */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {doctorQuestions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '2px',
                      background: i < currentQuestion ? '#A3A3A3' : i === currentQuestion ? C.textPrimary : '#E5E5E5',
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
                  <Activity className="w-4 h-4" style={{ color: C.textSecondary }} />
                  <p className="font-inter text-sm" style={{ color: C.textSecondary }}>
                    Question {currentQuestion + 1} of {doctorQuestions.length}
                  </p>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-center mb-6" style={{ color: C.textPrimary }}>
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
                            <Check size={18} color="#16A34A" />
                          )}
                          {selectedAnswer === index && !isCorrect && (
                            <X size={18} color="#DC2626" />
                          )}
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Current Score */}
              <div className="text-center mt-6">
                <p className="font-caveat text-base" style={{ color: C.textSecondary }}>
                  Score: {doctorScore} / {doctorQuestions.length}
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full" style={{ background: '#E5E5E5' }}>
                <Check className="w-4 h-4" style={{ color: C.textPrimary }} />
                <span className="font-caveat text-lg" style={{ color: C.textPrimary }}>
                  Chapter 2 Complete! Score: {correctAnswers} / {doctorQuestions.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
