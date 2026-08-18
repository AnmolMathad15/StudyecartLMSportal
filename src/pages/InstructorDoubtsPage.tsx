import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Doubt } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  Send,
  Code2,
  Filter,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export const InstructorDoubtsPage: React.FC = () => {
  const { doubts, resolveDoubt, showToast } = useLms();
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoubtId, setActiveDoubtId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredDoubts = doubts.filter((d) => {
    const matchesBatch = selectedBatch === 'All' || d.batch === selectedBatch;
    const matchesStatus = selectedStatus === 'ALL' || d.status === selectedStatus;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBatch && matchesStatus && matchesSearch;
  });

  const pendingCount = doubts.filter((d) => d.status === 'PENDING').length;
  const resolvedCount = doubts.filter((d) => d.status === 'RESOLVED').length;

  const handleResolve = (doubtId: string) => {
    if (!replyText.trim()) {
      showToast('Please enter an explanation to resolve this doubt', 'error');
      return;
    }
    resolveDoubt(doubtId, replyText);
    setActiveDoubtId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Q&A Resolution Desk
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{doubts.length} Total Student Doubts</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Student Doubts & Technical Q&A
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Answer questions raised by learners across your active course cohorts and attach formulas or derivations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#BDCAC0]/70 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span className="text-[#707972]">High Priority:</span>
            <span className="bg-[#EF9F13] text-white px-2 py-0.5 rounded-full font-mono">
              {pendingCount}
            </span>
          </div>
          <div className="bg-white border border-[#BDCAC0]/70 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span className="text-[#707972]">Resolved:</span>
            <span className="bg-[#006B47] text-white px-2 py-0.5 rounded-full font-mono">
              {resolvedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubts by student, topic, or description..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-[#F7F9FB] p-1 rounded-xl border border-[#BDCAC0]/50">
          {(['ALL', 'PENDING', 'RESOLVED'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedStatus === s
                  ? 'bg-white text-[#006B47] shadow-2xs'
                  : 'text-[#707972] hover:text-[#191c1e]'
              }`}
            >
              {s === 'ALL' ? 'All Doubts' : s === 'PENDING' ? 'Unanswered' : 'Resolved'}
            </button>
          ))}
        </div>

        {/* Batch Selector */}
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

      {/* Doubts Feed */}
      <div className="space-y-4">
        {filteredDoubts.map((doubt) => {
          const isPending = doubt.status === 'PENDING';
          const isReplying = activeDoubtId === doubt.id;

          return (
            <div
              key={doubt.id}
              className={`bg-white border rounded-2xl p-6 shadow-2xs transition-all ${
                isPending ? 'border-[#EF9F13]/50 border-l-4 border-l-[#EF9F13]' : 'border-[#BDCAC0]/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doubt.studentAvatar}
                    alt={doubt.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-[#BDCAC0]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#191c1e]">{doubt.studentName}</h4>
                    <p className="text-xs text-[#707972]">
                      {doubt.courseTitle} • <span className="font-bold text-[#006B47]">{doubt.batch}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <span className="text-[11px] text-[#707972] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {doubt.createdAt}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isPending ? 'bg-[#EF9F13] text-white' : 'bg-[#8af5be] text-[#00714b]'
                    }`}
                  >
                    {doubt.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-base text-[#191c1e] mb-2 font-display">
                {doubt.title}
              </h3>
              <p className="text-xs md:text-sm text-[#404943] leading-relaxed mb-3">
                {doubt.description}
              </p>

              {/* Code Snippet */}
              {doubt.codeSnippet && (
                <div className="bg-[#191c1e] text-[#eff1f3] rounded-xl p-3.5 font-mono text-xs mb-4 overflow-x-auto border border-[#404943]">
                  <div className="text-[10px] text-[#8DF7C1] mb-1 font-sans font-bold flex items-center gap-1">
                    <Code2 className="w-3 h-3" /> Submitted Code Sample:
                  </div>
                  <pre>{doubt.codeSnippet}</pre>
                </div>
              )}

              {/* Resolved Answer if present */}
              {doubt.answer && (
                <div className="bg-[#71DBA6]/10 border border-[#71DBA6]/50 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#006B47] mb-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Mentor Answer by {doubt.answeredBy || 'Dr. Aris'}:
                  </div>
                  <p className="text-xs text-[#191c1e] leading-relaxed">
                    {doubt.answer}
                  </p>
                </div>
              )}

              {/* Action / Reply Bar */}
              {isPending && (
                <div className="pt-2">
                  {!isReplying ? (
                    <button
                      onClick={() => {
                        setActiveDoubtId(doubt.id);
                        setReplyText(
                          'Yes, the associative law strictly holds because the product matrix element $((AB)C)_{ij} = \\sum_l (AB)_{il} C_{lj} = \\sum_l (\\sum_k A_{ik} B_{kl}) C_{lj} = \\sum_k A_{ik} (\\sum_l B_{kl} C_{lj}) = (A(BC))_{ij}$. Compatible matrix inner dimensions guarantee associativity.'
                        );
                      }}
                      className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Resolve & Send Explanation
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2 border-t border-[#BDCAC0]/40">
                      <label className="block text-xs font-bold text-[#191c1e]">
                        Authoritative Mentor Solution:
                      </label>
                      <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Provide rigorous step-by-step mathematical or code explanation..."
                        className="w-full p-3 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setActiveDoubtId(null)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleResolve(doubt.id)}
                          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" /> Post Solution
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
