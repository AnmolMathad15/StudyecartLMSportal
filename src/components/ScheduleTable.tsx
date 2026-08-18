import React from 'react';
import { useLms } from '../context/LmsContext';
import { Video, BookOpen, Clock } from 'lucide-react';

export const ScheduleTable: React.FC = () => {
  const { liveClasses, navigate, showToast } = useLms();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg md:text-xl text-[#191c1e] font-display">
          Upcoming Schedule
        </h3>
        <button
          onClick={() => navigate('/instructor/live')}
          className="text-xs text-[#006B47] hover:underline font-semibold"
        >
          Manage All Sessions
        </button>
      </div>

      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f4f6] border-b border-[#BDCAC0]/60">
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider">
                Time
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider">
                Topic
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider hidden sm:table-cell">
                Batch
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#BDCAC0]/40">
            {liveClasses.map((item, index) => (
              <tr key={item.id} className="hover:bg-[#F7F9FB] transition-colors group">
                <td className="py-4 px-4">
                  <div className="font-bold text-sm text-[#191c1e]">{item.startTime}</div>
                  <div
                    className={`text-xs font-semibold ${
                      item.status === 'LIVE' ? 'text-[#006B47] animate-pulse' : 'text-[#707972]'
                    }`}
                  >
                    {item.duration}
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="font-bold text-sm text-[#191c1e] group-hover:text-[#006B47] transition-colors">
                    {item.courseTitle}
                  </div>
                  <div className="text-xs text-[#404943] truncate max-w-[240px]">
                    {item.topic}
                  </div>
                </td>

                <td className="py-4 px-4 hidden sm:table-cell">
                  <span className="bg-[#e7e8eb] text-[#191c1e] px-2.5 py-1 rounded text-xs font-semibold">
                    {item.batch}
                  </span>
                </td>

                <td className="py-4 px-4 text-right">
                  {item.status === 'LIVE' || index === 0 ? (
                    <button
                      onClick={() => navigate('/instructor/live')}
                      className="bg-[#006B47] text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#005034] transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      Join Studio
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast(`Pre-flight checks ready for ${item.topic}`, 'info')}
                      className="border border-[#BDCAC0] text-[#006B47] hover:bg-[#71DBA6]/10 font-bold text-xs px-4 py-2 rounded-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Prep
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
