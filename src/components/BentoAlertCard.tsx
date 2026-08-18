import React from 'react';
import { HelpCircle, FileCheck, Radio, Video, ArrowRight } from 'lucide-react';
import { useLms } from '../context/LmsContext';

export const BentoAlertCard: React.FC = () => {
  const { doubts, assignments, liveClasses, navigate } = useLms();

  const pendingDoubts = doubts.filter((d) => d.status === 'PENDING');
  const pendingAssignments = assignments.filter((a) => a.status === 'PENDING');
  const nextLiveClass = liveClasses.find((l) => l.status === 'LIVE' || l.status === 'UPCOMING') || liveClasses[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Doubts Alert */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EF9F13]"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-[#EF9F13]/10 flex items-center justify-center text-[#EF9F13]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="bg-[#EF9F13] text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
            High Priority
          </span>
        </div>
        <h3 className="font-bold text-xl text-[#191c1e] mb-1">
          {pendingDoubts.length} Pending Doubts
        </h3>
        <p className="text-xs text-[#404943] mb-6 line-clamp-2">
          From Advanced Calculus and Linear Algebra courses.
        </p>
        <button
          onClick={() => navigate('/instructor/doubts')}
          className="text-[#006B47] font-bold text-sm hover:text-[#005034] flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
        >
          Resolve Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Assignments Alert */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#006B47]"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-[#006B47]/10 flex items-center justify-center text-[#006B47]">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
        <h3 className="font-bold text-xl text-[#191c1e] mb-1">
          {pendingAssignments.length} Assignments
        </h3>
        <p className="text-xs text-[#404943] mb-6 line-clamp-2">
          Awaiting evaluation in Python for Data Science.
        </p>
        <button
          onClick={() => navigate('/instructor/assignments')}
          className="text-[#006B47] font-bold text-sm hover:text-[#005034] flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer"
        >
          Start Evaluating <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Live Class Alert */}
      <div className="bg-[#006B47] border border-[#005034] rounded-xl p-6 emerald-glow text-white relative overflow-hidden group flex flex-col justify-between">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 opacity-40 animate-shimmer pointer-events-none"></div>

        <div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <Radio className="w-6 h-6" />
            </div>
            <span className="bg-[#BA1A1A] text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Live in 15m
            </span>
          </div>

          <h3 className="font-bold text-xl text-white mb-1 relative z-10">
            {nextLiveClass ? nextLiveClass.courseTitle : 'Data Structures 101'}
          </h3>
          <p className="text-xs text-[#71DBA6] mb-6 relative z-10">
            {nextLiveClass ? `${nextLiveClass.batch} • ${nextLiveClass.expectedStudents} Students expected` : 'Batch B2 • 45 Students expected'}
          </p>
        </div>

        <button
          onClick={() => navigate('/instructor/live')}
          className="bg-white text-[#006B47] hover:bg-[#F7F9FB] w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 relative z-10 shadow-xs cursor-pointer active:scale-98"
        >
          <Video className="w-4 h-4" /> Join Studio
        </button>
      </div>
    </div>
  );
};
