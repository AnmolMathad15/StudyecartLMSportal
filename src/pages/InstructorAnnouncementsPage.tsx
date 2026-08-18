import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Megaphone,
  Plus,
  Send,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  BookOpen,
  Pin,
  Tag
} from 'lucide-react';

export const InstructorAnnouncementsPage: React.FC = () => {
  const { announcements, createAnnouncement, showToast } = useLms();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('Python for Data Science & ML');
  const [batch, setBatch] = useState('Batch B2');
  const [message, setMessage] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      showToast('Please fill in both title and message content', 'error');
      return;
    }

    createAnnouncement({
      courseId: 'course-ds-101',
      courseTitle,
      title,
      content: message,
      authorName: 'Dr. Aris (Mentor)',
      targetRole: 'STUDENT',
      priority: isUrgent ? 'URGENT' : 'NORMAL'
    });

    setTitle('');
    setMessage('');
    setIsCreating(false);
    showToast('Cohort announcement published and broadcasted to enrolled students');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Cohort Communications
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{announcements.length} Published Broadcasts</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Course Announcements & Cohort Broadcasts
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Transmit urgent schedule changes, lab milestones, and syllabus updates directly to enrolled student notifications.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {/* Creation Drawer/Modal */}
      {isCreating && (
        <div className="bg-white border-2 border-[#006B47]/40 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-[#BDCAC0]/40 pb-3">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#006B47]" /> Broadcast New Announcement
            </h3>
            <button onClick={() => setIsCreating(false)} className="text-xs font-bold text-[#707972] hover:text-[#191c1e]">
              Cancel
            </button>
          </div>

          <form onSubmit={handlePost} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Announcement Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule Change: Live Lab moved to 4 PM Thursday"
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Target Course</label>
                <select
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                >
                  <option value="Python for Data Science & ML">Python for Data Science & ML</option>
                  <option value="Advanced Mathematics for Machine Learning">Advanced Mathematics for Machine Learning</option>
                  <option value="All Courses">All My Active Courses</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Target Batch</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="Batch B2"
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Broadcast Message Body *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type clear instructions, links, or reminders for your cohort..."
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-[#BA1A1A]">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-[#BA1A1A] focus:ring-[#BA1A1A]"
                />
                Mark as High Priority / Urgent Notification
              </label>

              <button
                type="submit"
                className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Publish Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.priority === 'URGENT' ? (
                  <span className="bg-[#BA1A1A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Urgent
                  </span>
                ) : (
                  <span className="bg-[#006B47] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    General
                  </span>
                )}
                <span className="text-xs font-semibold text-[#006B47] bg-[#8af5be]/30 px-2.5 py-0.5 rounded-md">
                  {item.courseTitle}
                </span>
              </div>

              <span className="text-xs text-[#707972] flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#006B47]" /> {item.createdAt}
              </span>
            </div>

            <h3 className="font-bold text-base text-[#191c1e] font-display">{item.title}</h3>
            <p className="text-xs md:text-sm text-[#404943] leading-relaxed">{item.content}</p>

            <div className="pt-3 border-t border-[#BDCAC0]/40 flex justify-between items-center text-xs text-[#707972]">
              <span>Posted by <strong>{item.authorName}</strong></span>
              <span className="bg-[#f2f4f6] px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#404943]">
                Delivered to all enrolled students
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
