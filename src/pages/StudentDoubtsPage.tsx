import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  HelpCircle,
  PlusCircle,
  CheckCircle2,
  Clock,
  Code2,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const StudentDoubtsPage: React.FC = () => {
  const { doubts, askDoubt, courses, showToast } = useLms();
  const [isAsking, setIsAsking] = useState(false);

  // Form states
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please provide a title and explanation for your doubt.', 'error');
      return;
    }
    const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];
    askDoubt({
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      batch: selectedCourse.batch || 'Batch A1',
      title,
      description,
      codeSnippet: codeSnippet.trim() ? codeSnippet : undefined,
      priority
    });
    setTitle('');
    setDescription('');
    setCodeSnippet('');
    setIsAsking(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Direct Faculty Doubt Desk
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Submit mathematical, conceptual, or code debugging queries directly to course professors.
          </p>
        </div>

        <button
          onClick={() => setIsAsking(!isAsking)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> {isAsking ? 'Close Editor' : 'Ask New Doubt'}
        </button>
      </div>

      {/* New Doubt Form */}
      {isAsking && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#BDCAC0]/80 rounded-xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#006B47]" /> Create Doubt Ticket
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Related Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Urgency Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                <option value="LOW">Low (Conceptual Inquiry)</option>
                <option value="MEDIUM">Medium (Assignment Blocker)</option>
                <option value="HIGH">High (Exam/Urgent Lab Bug)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Doubt Title / Subject
            </label>
            <input
              type="text"
              placeholder="e.g. Matrix dimension mismatch in forward pass backprop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Detailed Description & What You Tried
            </label>
            <textarea
              rows={3}
              placeholder="Explain the theoretical roadblock or steps that produced unexpected behavior..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#006B47]" /> Code Snippet or Traceback (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="def compute_loss(y_true, y_pred): ..."
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-[#191c1e] text-[#8DF7C1] font-mono border border-[#BDCAC0] rounded-lg p-2.5 text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAsking(false)}
              className="px-4 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-xs font-bold text-[#404943] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold text-white rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Doubt
            </button>
          </div>
        </form>
      )}

      {/* Doubt Tickets List */}
      <div className="space-y-4">
        {doubts.length === 0 ? (
          <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-12 text-center text-[#707972] text-xs">
            No doubts raised yet. Reach out whenever you hit a conceptual challenge!
          </div>
        ) : (
          doubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 shadow-2xs space-y-4 hover:border-[#BDCAC0] transition-colors"
            >
              {/* Top metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BDCAC0]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider">
                    {doubt.courseTitle}
                  </span>
                  <span className="text-[10px] bg-[#F7F9FB] border border-[#BDCAC0]/60 px-2 py-0.5 rounded font-mono text-[#707972]">
                    {doubt.batch}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doubt.priority === 'HIGH'
                        ? 'bg-[#ffdad6] text-[#BA1A1A]'
                        : doubt.priority === 'MEDIUM'
                        ? 'bg-[#EF9F13]/20 text-[#EF9F13]'
                        : 'bg-[#F7F9FB] text-[#707972]'
                    }`}
                  >
                    {doubt.priority} Urgency
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {doubt.status === 'RESOLVED' ? (
                    <span className="bg-[#8af5be]/50 text-[#00714b] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Resolved by {doubt.answeredBy}
                    </span>
                  ) : (
                    <span className="bg-[#EF9F13]/20 text-[#EF9F13] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> In Faculty Review Queue
                    </span>
                  )}
                  <span className="text-[11px] text-[#707972]">{doubt.createdAt}</span>
                </div>
              </div>

              {/* Doubt Body */}
              <div>
                <h3 className="font-bold text-base text-[#191c1e] font-display">{doubt.title}</h3>
                <p className="text-xs text-[#404943] mt-1.5 leading-relaxed">{doubt.description}</p>
              </div>

              {/* Code Snippet if present */}
              {doubt.codeSnippet && (
                <div className="bg-[#191c1e] rounded-lg p-3 overflow-x-auto border border-[#BDCAC0]/40">
                  <pre className="text-xs font-mono text-[#8DF7C1] leading-relaxed">
                    {doubt.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Faculty Solution Block */}
              {doubt.status === 'RESOLVED' && doubt.answer && (
                <div className="p-4 bg-[#71DBA6]/15 border border-[#71DBA6]/50 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#005034]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#006B47]" /> Official Faculty Answer ({doubt.answeredBy})
                    </span>
                    <span className="text-[10px] text-[#707972] font-normal">{doubt.answeredAt}</span>
                  </div>
                  <p className="text-xs text-[#191c1e] leading-relaxed pl-5.5">{doubt.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
