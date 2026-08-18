import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const InstructorCalendarPage: React.FC = () => {
  const { liveClasses, scheduleLiveClass, courses, showToast } = useLms();
  const [currentMonth, setCurrentMonth] = useState('August 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New event state
  const [topic, setTopic] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [time, setTime] = useState('10:00 AM - 11:30 AM');
  const [batch, setBatch] = useState('Batch A1');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    const crs = courses.find((c) => c.id === courseId) || courses[0];
    scheduleLiveClass({
      courseId: crs.id,
      courseTitle: crs.title,
      topic,
      batch,
      instructorName: 'Dr. Aris',
      startTime: time,
      duration: '90 mins',
      expectedStudents: 48,
      status: 'UPCOMING'
    });
    setTopic('');
    setIsModalOpen(false);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Faculty Academic Calendar
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Manage lecture broadcasts, office hours, laboratory evaluations, and live Q&A sessions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule Studio Session
        </button>
      </div>

      {/* Modal for adding session */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-[#BDCAC0] rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4"
          >
            <h3 className="font-bold text-base text-[#191c1e] font-display">
              Schedule Faculty Broadcast
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2 text-xs font-semibold text-[#191c1e]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1">Session Topic</label>
              <input
                type="text"
                placeholder="e.g. Convolutional Kernel Optimization"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2 text-xs text-[#191c1e]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1">Target Batch</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2 text-xs text-[#191c1e]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1">Time Slot</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2 text-xs text-[#191c1e]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-xs font-bold text-[#404943] rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold text-white rounded-lg shadow-xs"
              >
                Confirm & Sync
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Calendar Grid Frame */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-6 shadow-2xs space-y-6">
        {/* Month Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-[#191c1e] font-display">{currentMonth}</h3>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[#F7F9FB] rounded-lg text-[#707972] cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-[#F7F9FB] rounded-lg text-[#707972] cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-xs font-bold text-[#707972] uppercase tracking-wider pb-2 border-b border-[#BDCAC0]/40">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Calendar Day Tiles */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const hasEvent = d === 17 || d === 19 || d === 22;
            const isToday = d === 17;
            return (
              <div
                key={d}
                className={`min-h-[90px] p-2 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-[#8af5be]/20 border-[#006B47] shadow-xs'
                    : hasEvent
                    ? 'bg-[#F7F9FB] border-[#BDCAC0]'
                    : 'bg-white border-[#BDCAC0]/40 hover:bg-[#F7F9FB]/50'
                }`}
              >
                <span className={`font-bold ${isToday ? 'text-[#006B47]' : 'text-[#191c1e]'}`}>
                  {d} {isToday && '• Today'}
                </span>

                {hasEvent && (
                  <div className="bg-[#006B47] text-white p-1 rounded text-[10px] font-semibold truncate mt-1">
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" /> Live Studio
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
