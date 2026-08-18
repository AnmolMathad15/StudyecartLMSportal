import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useLms } from '../context/LmsContext';

export const CalendarWidget: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const { showToast } = useLms();

  const days = [
    { num: 29, current: false },
    { num: 30, current: false },
    { num: 1, current: false },
    { num: 2, current: true },
    { num: 3, current: true },
    { num: 4, current: true },
    { num: 5, current: true },
    { num: 6, current: true },
    { num: 7, current: true },
    { num: 8, current: true },
    { num: 9, current: true },
    { num: 10, current: true },
    { num: 11, current: true },
    { num: 12, current: true },
    { num: 13, current: true },
    { num: 14, current: true },
    { num: 15, current: true },
    { num: 16, current: true },
    { num: 17, current: true },
    { num: 18, current: true },
    { num: 19, current: true },
    { num: 20, current: true },
    { num: 21, current: true, hasAmberDot: true, event: 'Linear Algebra Quiz Submission' },
    { num: 22, current: true },
    { num: 23, current: true, hasEmeraldDot: true, event: 'Data Science Midterm Prep Live' },
    { num: 24, current: true, isHighlight: true, event: 'Data Structures 101 Live Studio (10:00 AM)' },
    { num: 25, current: true },
    { num: 26, current: true },
    { num: 27, current: true },
    { num: 28, current: true },
    { num: 29, current: true },
    { num: 30, current: true },
    { num: 31, current: true },
    { num: 1, current: false },
    { num: 2, current: false }
  ];

  const handleDayClick = (dayObj: typeof days[0]) => {
    if (dayObj.current) {
      setSelectedDay(dayObj.num);
      if (dayObj.event) {
        showToast(`October ${dayObj.num}: ${dayObj.event}`, 'info');
      }
    }
  };

  return (
    <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm text-[#191c1e] flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-[#006B47]" /> October 2024
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => showToast('Previous month')}
            className="text-[#404943] hover:text-[#006B47] p-1 rounded hover:bg-[#f2f4f6] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Next month')}
            className="text-[#404943] hover:text-[#006B47] p-1 rounded hover:bg-[#f2f4f6] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((d) => (
          <div key={d} className="font-bold text-[10px] text-[#707972] py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((d, index) => {
          const isSelected = d.current && selectedDay === d.num;
          return (
            <div
              key={index}
              onClick={() => handleDayClick(d)}
              className={`py-1.5 rounded relative transition-all cursor-pointer select-none ${
                !d.current
                  ? 'text-[#707972] opacity-30 cursor-default'
                  : isSelected
                  ? 'bg-[#006B47] text-white font-bold shadow-xs scale-105 z-10'
                  : 'hover:bg-[#f2f4f6] text-[#191c1e]'
              }`}
            >
              {d.num}
              {d.hasAmberDot && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#EF9F13] rounded-full"></span>
              )}
              {d.hasEmeraldDot && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#006B47] rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
