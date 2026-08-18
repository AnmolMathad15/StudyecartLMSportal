import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  FileCheck,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const StudentAssignmentsPage: React.FC = () => {
  const { assignments, submitAssignment, showToast, courses } = useLms();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'evaluated'>('all');

  // Submit form state
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('https://github.com/studyecart/student-submission-lab');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAssignments = assignments.filter((a) => {
    if (activeTab === 'pending') return a.status === 'PENDING';
    if (activeTab === 'evaluated') return a.status === 'EVALUATED';
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle.trim()) {
      showToast('Please enter an assignment title.', 'error');
      return;
    }
    const c = courses.find((crs) => crs.id === selectedCourseId) || courses[0];
    submitAssignment(c.id, c.title, c.batch || 'Batch A1', assignmentTitle, fileUrl);
    setAssignmentTitle('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Laboratory & Code Assignments
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Submit coursework solutions, access rubrics, and view faculty evaluation feedback.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitting(!isSubmitting)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" /> {isSubmitting ? 'Cancel Submission' : 'Submit Assignment'}
        </button>
      </div>

      {/* Submission Accordion Form */}
      {isSubmitting && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#BDCAC0]/80 rounded-xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#006B47]" /> New Laboratory Submission
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Select Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.batch || 'Batch A1'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Assignment / Lab Title
              </label>
              <input
                type="text"
                placeholder="e.g. Lab 4: Backpropagation Engine"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Artifact Link / Git Repository URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2.5 text-xs text-[#191c1e] font-mono focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsSubmitting(false)}
              className="px-4 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-xs font-bold text-[#404943] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold text-white rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit for Evaluation
            </button>
          </div>
        </form>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#BDCAC0]/50 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all' ? 'bg-[#006B47] text-white shadow-2xs' : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          All Submissions ({assignments.length})
        </button>
        <button
          onClick={() => setActiveTab('evaluated')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'evaluated' ? 'bg-[#006B47] text-white shadow-2xs' : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          Evaluated ({assignments.filter((a) => a.status === 'EVALUATED').length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pending' ? 'bg-[#006B47] text-white shadow-2xs' : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          Pending Review ({assignments.filter((a) => a.status === 'PENDING').length})
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-12 text-center text-[#707972] text-xs">
            No assignments found in this status category.
          </div>
        ) : (
          filteredAssignments.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#BDCAC0] transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#006B47] uppercase tracking-wider">
                    {item.courseTitle}
                  </span>
                  <span className="text-[10px] bg-[#F7F9FB] border border-[#BDCAC0]/60 px-2 py-0.5 rounded font-mono text-[#707972]">
                    {item.batch}
                  </span>
                  {item.status === 'EVALUATED' ? (
                    <span className="bg-[#8af5be]/50 text-[#00714b] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Evaluated
                    </span>
                  ) : (
                    <span className="bg-[#EF9F13]/20 text-[#EF9F13] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> In Review Queue
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-[#191c1e] font-display">{item.title}</h3>
                <p className="text-xs text-[#707972]">Submitted: {item.submittedAt}</p>

                {item.feedback && (
                  <div className="p-3 bg-[#F7F9FB] rounded-lg border border-[#BDCAC0]/40 text-xs text-[#404943] mt-2">
                    <span className="font-bold text-[#005034]">Faculty Feedback: </span>
                    {item.feedback}
                  </div>
                )}
              </div>

              {/* Score / Status Block */}
              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#BDCAC0]/40 pt-3 md:pt-0 md:pl-6">
                {item.status === 'EVALUATED' && item.score !== undefined ? (
                  <div className="text-center md:text-right">
                    <p className="text-2xl font-black text-[#006B47] font-display">
                      {item.score}<span className="text-xs text-[#707972]">/{item.maxScore}</span>
                    </p>
                    <p className="text-[10px] font-bold uppercase text-[#707972] tracking-wider">Final Grade</p>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-[#707972] italic">
                    Faculty grading in progress
                  </div>
                )}

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-xs font-bold text-[#191c1e] rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#006B47]" /> Artifact
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
