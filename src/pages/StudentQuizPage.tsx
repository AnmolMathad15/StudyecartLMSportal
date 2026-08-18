import React, { useState, useEffect } from 'react';
import { useLms } from '../context/LmsContext';
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface StudentQuizPageProps {
  quizId?: string;
}

export const StudentQuizPage: React.FC<StudentQuizPageProps> = ({ quizId }) => {
  const { quizzes, currentRoute, navigate, showToast } = useLms();

  const activeQuizId = quizId || currentRoute.split('/').pop() || quizzes[0].id;
  const quiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.timeLimitMinutes * 60);

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = quiz.questions[currentQIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: optIndex });
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const finalScore = calculateScore();
    if (finalScore >= quiz.passingScore) {
      showToast(`Congratulations! You passed with ${finalScore}%! Certificate unlocked.`, 'success');
    } else {
      showToast(`Quiz completed with ${finalScore}%. Review explanations below.`, 'info');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQIndex(0);
    setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const finalScore = calculateScore();
  const isPassed = finalScore >= quiz.passingScore;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Quiz Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider">
            {quiz.courseTitle}
          </span>
          <h2 className="text-xl font-bold text-[#191c1e] font-display mt-0.5">
            {quiz.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-[#005034]">
              <Clock className="w-4 h-4 text-[#006B47]" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>
          )}
          <span className="text-xs font-semibold text-[#707972]">
            Pass Threshold: <strong>{quiz.passingScore}%</strong>
          </span>
        </div>
      </div>

      {/* Quiz Body or Results Screen */}
      {!isSubmitted ? (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 md:p-8 shadow-2xs space-y-6">
          {/* Question Counter Progress */}
          <div className="flex justify-between items-center text-xs font-semibold text-[#707972]">
            <span>Question {currentQIndex + 1} of {quiz.questions.length}</span>
            <span>{Object.keys(selectedAnswers).length} / {quiz.questions.length} Answered</span>
          </div>

          <div className="w-full h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#006B47] rounded-full transition-all"
              style={{ width: `${((currentQIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold text-[#191c1e] font-display leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQIndex] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#71DBA6]/20 border-[#006B47] text-[#005034] shadow-xs'
                      : 'bg-white border-[#BDCAC0]/80 hover:bg-[#F7F9FB] text-[#191c1e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-[#006B47] text-white' : 'bg-[#e1e2e5] text-[#404943]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-[#BDCAC0]/40">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 bg-[#f2f4f6] hover:bg-[#e7e8eb] disabled:opacity-30 rounded-lg text-xs font-bold text-[#191c1e] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentQIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                className="px-5 py-2.5 bg-[#006B47] hover:bg-[#005034] rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 bg-[#006B47] hover:bg-[#005034] rounded-lg text-xs font-bold text-white transition-all shadow-md cursor-pointer active:scale-95"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-8 shadow-md space-y-6 text-center">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg bg-gradient-to-br from-[#006B47] to-[#005034] text-white">
            {isPassed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
              {isPassed ? 'Assessment Passed!' : 'Requires Review & Retake'}
            </h3>
            <p className="text-sm text-[#404943] mt-1">
              You scored <strong className="text-[#006B47] text-lg">{finalScore}%</strong> (Threshold: {quiz.passingScore}%)
            </p>
          </div>

          {isPassed ? (
            <div className="p-4 bg-[#71DBA6]/20 border border-[#71DBA6]/60 rounded-xl max-w-md mx-auto text-xs text-[#005034]">
              <p className="font-bold mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006B47]" /> Certificate of Mastery Granted!
              </p>
              Your verified certificate has been appended to your credentials locker.
            </div>
          ) : (
            <div className="p-4 bg-[#ffdad6]/30 border border-[#ffdad6] rounded-xl max-w-md mx-auto text-xs text-[#BA1A1A]">
              Study the detailed answer solutions below before attempting your retake.
            </div>
          )}

          {/* Answer Breakdown */}
          <div className="space-y-4 text-left pt-4 border-t border-[#BDCAC0]/40">
            <h4 className="font-bold text-base text-[#191c1e] font-display">Answer Key & Explanations</h4>
            {quiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctAnswerIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isCorrect ? 'bg-[#71DBA6]/10 border-[#71DBA6]' : 'bg-[#ffdad6]/20 border-[#ffdad6]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>Question {idx + 1}: {q.question}</span>
                    {isCorrect ? (
                      <span className="text-[#006B47] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-[#BA1A1A] flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-[#404943]">
                    <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}
                  </p>
                  {q.explanation && (
                    <p className="text-[#707972] bg-white p-2.5 rounded-lg border border-[#BDCAC0]/40">
                      <strong>Solution Note:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-[#f2f4f6] hover:bg-[#e7e8eb] font-bold text-xs rounded-lg text-[#191c1e] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
            {isPassed && (
              <button
                onClick={() => navigate('/student/certificates')}
                className="px-6 py-2.5 bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" /> View Certificate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
