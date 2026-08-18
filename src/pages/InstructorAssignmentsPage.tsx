import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Assignment } from '../types';
import {
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Code2,
  FileText,
  Award,
  Send,
  X,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

export const InstructorAssignmentsPage: React.FC = () => {
  const { assignments, evaluateAssignment, courses, showToast } = useLms();
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'PENDING' | 'EVALUATED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [score, setScore] = useState<number>(95);
  const [feedback, setFeedback] = useState('');

  const filteredAssignments = assignments.filter((a) => {
    const matchesBatch = selectedBatch === 'All' || a.batch === selectedBatch;
    const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBatch && matchesStatus && matchesSearch;
  });

  const pendingCount = assignments.filter((a) => a.status === 'PENDING').length;
  const gradedCount = assignments.filter((a) => a.status === 'EVALUATED').length;

  const handleOpenEvaluation = (assign: Assignment) => {
    setActiveAssignment(assign);
    setScore(assign.score || 90);
    setFeedback(assign.feedback || 'Excellent adherence to the mathematical specification and clean code comments.');
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignment) return;
    evaluateAssignment(activeAssignment.id, score, feedback);
    setActiveAssignment(null);
  };

  const handleRequestResubmission = () => {
    if (!activeAssignment) return;
    evaluateAssignment(activeAssignment.id, 0, `Resubmission requested: ${feedback || 'Please fix edge cases and resubmit.'}`);
    setActiveAssignment(null);
    showToast('Resubmission request sent to learner', 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Laboratory & Code Grading
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{assignments.length} Total Submissions</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Assignment Evaluation Queue
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Inspect source code, grade algorithmic implementations, and give detailed rubric feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#BDCAC0]/70 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span className="text-[#707972]">Pending Review:</span>
            <span className="bg-[#EF9F13] text-white px-2 py-0.5 rounded-full font-mono">
              {pendingCount}
            </span>
          </div>
          <div className="bg-white border border-[#BDCAC0]/70 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span className="text-[#707972]">Evaluated:</span>
            <span className="bg-[#006B47] text-white px-2 py-0.5 rounded-full font-mono">
              {gradedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, assignment, or course..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-[#F7F9FB] p-1 rounded-xl border border-[#BDCAC0]/50">
          {(['ALL', 'PENDING', 'EVALUATED'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedStatus === s
                  ? 'bg-white text-[#006B47] shadow-2xs'
                  : 'text-[#707972] hover:text-[#191c1e]'
              }`}
            >
              {s === 'ALL' ? 'All Submissions' : s === 'PENDING' ? 'Pending' : 'Graded'}
            </button>
          ))}
        </div>

        {/* Batch Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#707972]">Batch:</span>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl px-3 py-2 text-xs font-semibold text-[#191c1e] focus:outline-hidden"
          >
            <option value="All">All Batches</option>
            <option value="Batch B2">Batch B2 (Deep Learning)</option>
            <option value="Batch A1">Batch A1 (Calculus)</option>
          </select>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f2f4f6] border-b border-[#BDCAC0]/60">
              <th className="py-3.5 px-4 font-bold text-[#404943] uppercase tracking-wider">
                Student
              </th>
              <th className="py-3.5 px-4 font-bold text-[#404943] uppercase tracking-wider">
                Assignment Title
              </th>
              <th className="py-3.5 px-4 font-bold text-[#404943] uppercase tracking-wider hidden md:table-cell">
                Course & Batch
              </th>
              <th className="py-3.5 px-4 font-bold text-[#404943] uppercase tracking-wider">
                Submitted At
              </th>
              <th className="py-3.5 px-4 font-bold text-[#404943] uppercase tracking-wider text-right">
                Evaluation Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#BDCAC0]/30">
            {filteredAssignments.map((assign) => (
              <tr key={assign.id} className="hover:bg-[#F7F9FB] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={assign.studentAvatar}
                      alt={assign.studentName}
                      className="w-9 h-9 rounded-full object-cover border border-[#BDCAC0]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#191c1e]">{assign.studentName}</div>
                      <div className="text-[11px] text-[#707972] font-mono flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-[#006B47]" /> {assign.fileUrl}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="font-bold text-sm text-[#191c1e] line-clamp-1">
                    {assign.title}
                  </div>
                  {assign.feedback && (
                    <p className="text-[11px] text-[#707972] line-clamp-1 mt-0.5">
                      Feedback: {assign.feedback}
                    </p>
                  )}
                </td>

                <td className="py-4 px-4 hidden md:table-cell">
                  <span className="text-xs text-[#404943] font-medium">{assign.courseTitle}</span>
                  <span className="ml-2 bg-[#e7e8eb] text-[#191c1e] px-2 py-0.5 rounded text-[10px] font-bold">
                    {assign.batch}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className="text-xs text-[#707972] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#006B47]" /> {assign.submittedAt}
                  </span>
                </td>

                <td className="py-4 px-4 text-right">
                  {assign.status === 'EVALUATED' ? (
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006B47] bg-[#8af5be]/40 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Grade: {assign.score}/{assign.maxScore}
                      </span>
                      <button
                        onClick={() => handleOpenEvaluation(assign)}
                        className="text-xs text-[#707972] hover:text-[#006B47] underline font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenEvaluation(assign)}
                      className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> Evaluate Lab
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Modal */}
      {activeAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#F7F9FB] border-b border-[#BDCAC0]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#006B47]" />
                <h3 className="font-bold text-base text-[#191c1e] font-display">
                  Evaluate Submission — {activeAssignment.studentName}
                </h3>
              </div>
              <button
                onClick={() => setActiveAssignment(null)}
                className="p-1 text-[#707972] hover:text-[#191c1e] rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="p-5 space-y-4 text-xs">
              <div className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl p-3.5 space-y-1.5">
                <p><strong>Assignment:</strong> {activeAssignment.title}</p>
                <p><strong>Course:</strong> {activeAssignment.courseTitle} ({activeAssignment.batch})</p>
                <p className="flex items-center gap-1.5 text-[#006B47] font-mono pt-1">
                  <Code2 className="w-4 h-4" /> Submitted File: <strong>{activeAssignment.fileUrl}</strong>
                </p>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">
                  Awarded Score (Max {activeAssignment.maxScore}) *
                </label>
                <input
                  type="number"
                  min="0"
                  max={activeAssignment.maxScore}
                  required
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-base font-bold text-[#005034] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">
                  Mentor Feedback & Code Review Comments
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback on algorithmic complexity, edge handling, and style..."
                  className="w-full px-3 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#BDCAC0]/40">
                <button
                  type="button"
                  onClick={handleRequestResubmission}
                  className="px-3 py-2 text-xs font-bold text-[#BA1A1A] hover:bg-[#ffdad6]/30 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Request Resubmission
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveAssignment(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Grade
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
