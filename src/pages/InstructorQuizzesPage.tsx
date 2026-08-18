import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Quiz, QuizQuestion } from '../types';
import {
  FileQuestion,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Sparkles,
  X,
  Users,
  Eye,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const InstructorQuizzesPage: React.FC = () => {
  const { quizzes, addQuiz, showToast } = useLms();
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'results'>('list');

  // New Quiz form state
  const [title, setTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('Python for Data Science & Machine Learning');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(20);
  const [passingScore, setPassingScore] = useState(70);

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q-new-1',
      question: 'What is the mathematical definition of matrix rank?',
      options: [
        'Number of non-zero elements in the matrix',
        'Maximum number of linearly independent column or row vectors',
        'Sum of the eigenvalues',
        'Trace divided by determinant'
      ],
      correctAnswerIndex: 1,
      explanation: 'Matrix rank equals the dimension of the vector space spanned by its columns/rows.',
      points: 20
    }
  ]);

  // Mock results data
  const studentResults = [
    { student: 'Alex Rivera', quiz: 'Eigenvalues & Diagonalization', score: 92, status: 'PASSED', time: '14 mins', date: 'Today, 2:30 PM' },
    { student: 'Sarah Jenkins', quiz: 'Eigenvalues & Diagonalization', score: 85, status: 'PASSED', time: '18 mins', date: 'Today, 1:15 PM' },
    { student: 'Elena Rostova', quiz: 'Matrix Decompositions Quiz', score: 65, status: 'FAILED', time: '20 mins', date: 'Yesterday' },
    { student: 'Marcus Chen', quiz: 'Matrix Decompositions Quiz', score: 95, status: 'PASSED', time: '12 mins', date: 'Yesterday' }
  ];

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q-new-${Date.now()}`,
        question: 'New conceptual question on algorithmic complexity or optimization:',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0,
        explanation: 'Detailed mathematical solution.',
        points: 20
      }
    ]);
  };

  const handleRemoveQuestion = (qId: string) => {
    if (questions.length === 1) {
      showToast('A quiz must contain at least 1 question', 'error');
      return;
    }
    setQuestions(questions.filter((q) => q.id !== qId));
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a quiz title', 'error');
      return;
    }

    addQuiz({
      courseId: 'course-ds-101',
      courseTitle,
      title,
      description,
      timeLimitMinutes,
      passingScore,
      totalQuestions: questions.length,
      questions,
      status: 'PUBLISHED'
    });

    setTitle('');
    setActiveTab('list');
    showToast('Quiz published to course syllabus');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Assessments & Quizzes
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{quizzes.length} Authored Assessments</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Assessment & Quiz Studio
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Build timed tests, multiple choice questions, automated scoring rubrics, and certificate gates.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Assessment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#BDCAC0]/40 gap-4">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'list'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Active Quizzes ({quizzes.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'create'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Authoring Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'results'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Cohort Test Results</span>
        </button>
      </div>

      {/* TAB 1: Quizzes List */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-[#006B47] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {quiz.status}
                  </span>
                  <span className="text-xs text-[#707972] font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#006B47]" /> {quiz.timeLimitMinutes} Mins
                  </span>
                </div>

                <h3 className="font-bold text-base md:text-lg text-[#191c1e] font-display mb-1">
                  {quiz.title}
                </h3>
                <p className="text-xs text-[#006B47] font-semibold mb-2">{quiz.courseTitle}</p>
                <p className="text-xs text-[#404943] leading-relaxed mb-4">{quiz.description}</p>
              </div>

              <div className="pt-4 border-t border-[#BDCAC0]/40 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#707972]">
                  <span className="font-bold text-[#191c1e]">{quiz.questions.length} Questions</span>
                  <span>•</span>
                  <span>Pass: {quiz.passingScore}%</span>
                </div>
                <button
                  onClick={() => setActiveTab('results')}
                  className="text-xs font-bold text-[#006B47] bg-[#8af5be]/30 hover:bg-[#8af5be]/50 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  View Attempts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Quiz Authoring Studio */}
      {activeTab === 'create' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border-b border-[#BDCAC0]/40 pb-3">
            <FileQuestion className="w-5 h-5 text-[#006B47]" />
            <h3 className="font-bold text-lg text-[#191c1e] font-display">
              Author Timed Assessment
            </h3>
          </div>

          <form onSubmit={handleSaveQuiz} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Assessment Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Spectral Graph Theory & Eigen-decompositions Test"
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Time Limit (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Passing Threshold (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Description & Instructions</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide test rules, allowed calculators, and scope..."
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Questions Authoring */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center border-t border-[#BDCAC0]/50 pt-3">
                <h4 className="font-bold text-sm text-[#191c1e]">Multiple Choice Questions ({questions.length})</h4>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="text-xs text-[#006B47] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              </div>

              {questions.map((q, idx) => (
                <div key={q.id} className="bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-[#006B47]">Question {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-[#BA1A1A] p-1 hover:bg-[#ffdad6]/30 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions(questions.map((item) => (item.id === q.id ? { ...item, question: val } : item)));
                    }}
                    className="w-full p-2 bg-white border border-[#BDCAC0] rounded-xl font-semibold text-xs text-[#191c1e]"
                  />

                  {/* Options */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#707972] font-semibold">Select the radio button for the correct answer:</span>
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctAnswerIndex === optIdx}
                          onChange={() => {
                            setQuestions(
                              questions.map((item) =>
                                item.id === q.id ? { ...item, correctAnswerIndex: optIdx } : item
                              )
                            );
                          }}
                          className="text-[#006B47] focus:ring-[#006B47]"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[optIdx] = e.target.value;
                            setQuestions(
                              questions.map((item) => (item.id === q.id ? { ...item, options: newOpts } : item))
                            );
                          }}
                          className="flex-1 p-2 bg-white border border-[#BDCAC0]/80 rounded-xl text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#BDCAC0]/50">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#006B47] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#005034] cursor-pointer"
              >
                Save & Publish Assessment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Cohort Test Results */}
      {activeTab === 'results' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs space-y-4 p-6">
          <div className="flex justify-between items-center border-b border-[#BDCAC0]/40 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#191c1e] font-display">Student Assessment Submissions</h3>
              <p className="text-xs text-[#707972]">Live logs of student quiz completions and automated scoring.</p>
            </div>
            <span className="text-xs font-bold text-[#006B47] bg-[#8af5be]/30 px-3 py-1 rounded-full">
              Average Score: 84.2%
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f4f6] text-[#404943] font-bold border-b border-[#BDCAC0]/50 uppercase tracking-wider">
              <tr>
                <th className="p-3">Learner</th>
                <th className="p-3">Assessment Title</th>
                <th className="p-3">Score</th>
                <th className="p-3">Time Taken</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/30">
              {studentResults.map((r, idx) => (
                <tr key={idx} className="hover:bg-[#F7F9FB]">
                  <td className="p-3 font-bold text-[#191c1e]">{r.student}</td>
                  <td className="p-3 text-[#404943]">{r.quiz}</td>
                  <td className="p-3 font-mono font-bold text-[#006B47]">{r.score}%</td>
                  <td className="p-3 text-[#707972]">{r.time}</td>
                  <td className="p-3 text-[#707972]">{r.date}</td>
                  <td className="p-3 text-right">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      r.status === 'PASSED' ? 'bg-[#8af5be] text-[#005034]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
