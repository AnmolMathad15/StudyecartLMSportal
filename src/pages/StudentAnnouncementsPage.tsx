import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Megaphone,
  Bell,
  Clock,
  CheckCircle2,
  Filter,
  Calendar,
  AlertCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const StudentAnnouncementsPage: React.FC = () => {
  const { announcements, courses, showToast } = useLms();
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');
  const [readAnnouncements, setReadAnnouncements] = useState<Record<string, boolean>>({});

  const filteredAnnouncements = announcements.filter((item) => {
    if (selectedCourseFilter === 'ALL') return true;
    return item.courseTitle === selectedCourseFilter;
  });

  const toggleMarkRead = (id: string) => {
    const nextState = !readAnnouncements[id];
    setReadAnnouncements((prev) => ({ ...prev, [id]: nextState }));
    showToast(nextState ? 'Marked as read' : 'Marked as unread', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Course & Platform Announcements
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Official announcements, schedule updates, assignment notifications, and study alerts from your professors.
          </p>
        </div>

        {/* Filter by course */}
        <div className="flex items-center gap-2 bg-white border border-[#BDCAC0]/70 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#191c1e] self-start sm:self-auto">
          <Filter className="w-4 h-4 text-[#006B47]" />
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="bg-transparent text-xs font-bold text-[#191c1e] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Enrolled Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-12 text-center space-y-3">
            <Megaphone className="w-12 h-12 text-[#BDCAC0] mx-auto" />
            <h3 className="text-base font-bold text-[#191c1e]">No announcements in this course</h3>
            <p className="text-xs text-[#707972]">Check back later for new broadcast notices.</p>
          </div>
        ) : (
          filteredAnnouncements.map((item) => {
            const isRead = readAnnouncements[item.id];
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-6 shadow-2xs space-y-3 transition-all ${
                  item.priority === 'HIGH'
                    ? 'border-[#EF9F13] ring-1 ring-[#EF9F13]/20'
                    : 'border-[#BDCAC0]/70'
                }`}
              >
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BDCAC0]/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider">
                      {item.courseTitle}
                    </span>
                    <span className="text-[10px] bg-[#F7F9FB] border border-[#BDCAC0]/60 px-2 py-0.5 rounded font-mono text-[#707972]">
                      {item.targetBatch}
                    </span>
                    {item.priority === 'HIGH' && (
                      <span className="bg-[#ffdad6] text-[#BA1A1A] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Urgent Notice
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#707972]">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {item.createdAt}
                    </span>
                    <button
                      onClick={() => toggleMarkRead(item.id)}
                      className={`text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        isRead ? 'text-[#006B47]' : 'text-[#707972] hover:text-[#191c1e]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRead ? 'Read ✓' : 'Mark as read'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-[#191c1e] font-display mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#404943] leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#707972]">
                  <span>Posted by: <strong className="text-[#191c1e]">{item.authorName}</strong> (Course Mentor)</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
