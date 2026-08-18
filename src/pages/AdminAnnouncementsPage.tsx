import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Megaphone,
  PlusCircle,
  Clock,
  Send,
  Trash2,
  AlertCircle
} from 'lucide-react';

export const AdminAnnouncementsPage: React.FC = () => {
  const { announcements, addAnnouncement, courses, showToast } = useLms();
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetBatch, setTargetBatch] = useState('All Batches');
  const [courseTitle, setCourseTitle] = useState('System-Wide Campus Broadcast');
  const [priority, setPriority] = useState<'NORMAL' | 'HIGH'>('NORMAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Please fill out announcement title and content.', 'error');
      return;
    }
    addAnnouncement({
      title,
      content,
      targetBatch,
      courseTitle,
      priority
    });
    setTitle('');
    setContent('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            System & Campus Broadcasts
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Publish institutional notices, server maintenance bulletins, and cross-cohort bulletins.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> {isCreating ? 'Cancel Broadcast' : 'New Broadcast'}
        </button>
      </div>

      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <h3 className="font-bold text-base text-[#191c1e] font-display">
            Create System Broadcast Announcement
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Broadcast Scope / Channel
              </label>
              <select
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                <option value="System-Wide Campus Broadcast">System-Wide Campus Broadcast</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Target Audience Cohort
              </label>
              <input
                type="text"
                value={targetBatch}
                onChange={(e) => setTargetBatch(e.target.value)}
                placeholder="e.g. All Students & Faculty, or Batch A1"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scheduled Maintenance & Semester Exam Roster"
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Announcement Body
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detailed announcement text..."
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="highPriorityAdmin"
              checked={priority === 'HIGH'}
              onChange={(e) => setPriority(e.target.checked ? 'HIGH' : 'NORMAL')}
              className="w-4 h-4 accent-[#BA1A1A] cursor-pointer"
            />
            <label htmlFor="highPriorityAdmin" className="text-xs font-bold text-[#BA1A1A] cursor-pointer">
              Mark as High Urgency Alert
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-xs font-bold text-[#404943] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold text-white rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Dispatch System Broadcast
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#BDCAC0]/40 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#006B47]">{item.courseTitle}</span>
                <span className="bg-[#F7F9FB] border border-[#BDCAC0]/60 px-2 py-0.5 rounded font-mono text-[#707972]">
                  {item.targetBatch}
                </span>
                {item.priority === 'HIGH' && (
                  <span className="bg-[#ffdad6] text-[#BA1A1A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              <span className="text-[#707972] font-mono">{item.createdAt}</span>
            </div>

            <h3 className="font-bold text-base text-[#191c1e] font-display">{item.title}</h3>
            <p className="text-xs text-[#404943] leading-relaxed">{item.content}</p>
            <p className="text-[11px] text-[#707972] pt-2">Dispatched by: <strong>{item.authorName}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};
