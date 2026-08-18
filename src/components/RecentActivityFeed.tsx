import React from 'react';
import { useLms } from '../context/LmsContext';
import { Check, ArrowRight } from 'lucide-react';

export const RecentActivityFeed: React.FC = () => {
  const { activityLogs, navigate } = useLms();

  return (
    <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-xs flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base text-[#191c1e] font-display">Recent Activity</h3>
        <span className="text-[10px] text-[#006B47] bg-[#8af5be]/30 px-2 py-0.5 rounded-full font-bold uppercase">
          Live Feed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-5 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-[#BDCAC0]/40">
        {activityLogs.map((log) => (
          <div key={log.id} className="relative pl-8 group">
            {/* Dot marker */}
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#BDCAC0] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              {log.statusColor === 'emerald' && (
                <div className="w-2 h-2 bg-[#006B47] rounded-full"></div>
              )}
              {log.statusColor === 'amber' && (
                <div className="w-2 h-2 bg-[#EF9F13] rounded-full"></div>
              )}
              {log.statusColor === 'gray' && (
                <Check className="w-2.5 h-2.5 text-[#404943]" />
              )}
            </div>

            <p className="text-[11px] font-semibold text-[#707972] mb-0.5">{log.timestamp}</p>
            <p className="text-xs text-[#191c1e] leading-relaxed">
              <strong className="text-[#005034]">{log.actor}</strong> {log.action}{' '}
              <span className="text-[#404943] font-medium">{log.target}</span>
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/instructor/analytics')}
        className="w-full mt-4 py-2.5 text-center text-[#006B47] font-semibold text-xs hover:bg-[#71DBA6]/10 rounded-lg transition-colors border border-transparent hover:border-[#BDCAC0]/50 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        View Full Audit Log <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
