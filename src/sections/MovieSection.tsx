import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Film, Clapperboard, Check, X, ChevronRight, Award } from 'lucide-react';

const C = {
  background: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
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
  },
  {
    question: "What is Adi's profession in OK Jaanu?",
    options: ["Chef", "Game Developer", "Doctor", "Architect"],
    correct: 1,
  },
  {
    question: "In Tamasha, Ved struggles between reality and his true passion. What does he dream of becoming?",
    options: ["Doctor", "Engineer", "Storyteller", "Musician"],
    correct: 2,
  },
  {
    question: "In Ye Maaya Chesave, who falls in love first?",
    options: ["Jessie", "Karthik", "Both together", "Neither"],
    correct: 1,
  },
  {
    question: "Which popular song from Orange became a fan favorite?",
    options: ["Rooba Rooba", "Hello Rammante", "Samajavaragamana", "Inkem Inkem"],
    correct: 0,
  },
  {
    question: "In Hasee Toh Phasee, Nikhil is initially engaged to whom?",
    options: ["Meeta", "Karishma", "Naina", "Tara"],
    correct: 1,
  },
  {
    question: "In 2 States, Krish and Ananya come from which two cultures?",
    options: ["Tamil & Punjabi", "Telugu & Bengali", "Punjabi & Tamil", "Gujarati & Malayali"],
    correct: 2,
  },
  {
    question: "In Majili, what sport did Poorna play professionally?",
    options: ["Football", "Cricket", "Tennis", "Hockey"],
    correct: 1,
  },
  {
    question: "In Wake Up Sid, where does Sid move to after leaving home?",
    options: ["Delhi", "Mumbai friend's apartment", "Bangalore", "Pune"],
    correct: 1,
  },
  {
    question: "In Yeh Jawaani Hai Deewani, what is Bunny's dream profession?",
    options: ["Doctor", "Photographer", "Engineer", "Writer"],
    correct: 1,
  },
  {
    question: "In Dear Comrade, what issue does Bharat fight for?",
    options: ["Women's rights", "Student politics", "Environmental justice", "Labor rights"],
    correct: 2,
  },
  {
    question: "In Fidaa, where does Bhanumathi first meet Varun?",
    options: ["College campus", "Village in Telangana", "Hospital", "Wedding"],
    correct: 1,
  },
  {
    question: "In Geetha Govindam, what is Vijay's profession?",
    options: ["Teacher", "Engineer", "Lecturer", "Doctor"],
    correct: 2,
  },
  {
    question: "In Love Story, what is Revanth's family background?",
    options: ["Wealthy industrialists", "Middle-class farmers", "Film industry", "Political family"],
    correct: 1,
  },
  {
    question: "What is the profession of the male lead in Jab We Met?",
    options: ["Businessman", "Industrialist", "Doctor", "Teacher"],
    correct: 1,
  },
  {
    question: "In Raanjhanaa, where does Kundu first see Zoya?",
    options: ["College", "Temple", "Through a window", "Market"],
    correct: 2,
  },
  {
    question: "Which 2013 film features the song 'Tum Hi Ho'?",
    options: ["Yeh Jawaani Hai Deewani", "Aashiqui 2", "Raanjhanaa", "Aashiqui"],
    correct: 1,
  },
  {
    question: "In Barfi!, what disability does the protagonist have?",
    options: ["Blindness", "Deaf and mute", "Mobility impairment", "None"],
    correct: 1,
  },
  {
    question: "Which film features the song 'Channa Mereya'?",
    options: ["Yeh Jawaani Hai Deewani", "Ae Dil Hai Mushkil", "Barfi!", "Tamasha"],
    correct: 1,
  },
  {
    question: "In Sanam Teri Kasam, what is Saraswati's profession?",
    options: ["Librarian", "Teacher", "Doctor", "Lawyer"],
    correct: 0,
  },
];

export default function MovieSection({ onComplete, updateScore, movieScore }: MovieSectionProps) {
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
    const correct = index === movieQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
      updateScore(1);
    }

    setTimeout(() => {
      if (currentQuestion < movieQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setTimeout(() => {
          setPhase('complete');
          onComplete(correctAnswers, movieQuestions.length);
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
    if (index === movieQuestions[currentQuestion].correct) {
      return { ...base, background: '#F0FDF4', borderColor: '#86EFAC', color: '#166534' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, borderColor: C.border, opacity: 0.5 };
  };

  return (
    <section
      id="movies"
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
              CHAPTER 3
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: C.textPrimary }}>
              Romantic Cinema Challenge
            </h2>
            <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
              How well do you know these love stories?
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
                    <Clapperboard className="w-8 h-8" style={{ color: C.textPrimary }} />
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-semibold mb-3" style={{ color: C.textPrimary }}>
                  Cinema Quiz
                </h3>

                <p className="font-cormorant text-base mb-4" style={{ color: C.textSecondary }}>
                  20 questions about romantic Hindi and Telugu cinema — from classic love stories to modern favorites.
                </p>

                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4" style={{ color: C.textSecondary }} />
                    <span style={{ color: C.textSecondary }}>20 Questions</span>
                  </div>
                </div>
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
                {movieQuestions.map((_, i) => (
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
                  <Film className="w-4 h-4" style={{ color: C.textSecondary }} />
                  <p className="font-inter text-sm" style={{ color: C.textSecondary }}>
                    Question {currentQuestion + 1} of {movieQuestions.length}
                  </p>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-center mb-6" style={{ color: C.textPrimary }}>
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
                  Score: {movieScore} / {movieQuestions.length}
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
                <Award className="w-4 h-4" style={{ color: C.textPrimary }} />
                <span className="font-caveat text-lg" style={{ color: C.textPrimary }}>
                  Chapter 3 Complete! Score: {correctAnswers} / {movieQuestions.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
