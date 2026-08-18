import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Bell,
  CheckCircle2,
  Clock,
  BookOpen,
  FileCheck,
  Award,
  Video,
  HelpCircle,
  Megaphone,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigate } = useLms();
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'ASSIGNMENT' | 'QUIZ' | 'LIVE' | 'DOUBT'>('ALL');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <Award className="w-5 h-5 text-[#006B47]" />;
      case 'WARNING':
        return <Clock className="w-5 h-5 text-[#EF9F13]" />;
      case 'ALERT':
        return <Video className="w-5 h-5 text-[#BA1A1A]" />;
      default:
        return <Bell className="w-5 h-5 text-[#006B47]" />;
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'UNREAD') return !item.read;
    if (filter === 'ASSIGNMENT') return item.title.toLowerCase().includes('assignment') || item.message.toLowerCase().includes('assignment');
    if (filter === 'QUIZ') return item.title.toLowerCase().includes('quiz') || item.message.toLowerCase().includes('score');
    if (filter === 'LIVE') return item.title.toLowerCase().includes('live') || item.message.toLowerCase().includes('broadcast');
    if (filter === 'DOUBT') return item.title.toLowerCase().includes('doubt') || item.message.toLowerCase().includes('mentor');
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (item: typeof notifications[0]) => {
    markNotificationAsRead(item.id);
    if (item.link) {
      navigate(item.link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Notifications
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Stay updated with course announcements, live sessions, assignment evaluations, and mentor replies.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="bg-white border border-[#006B47] text-[#006B47] hover:bg-[#71DBA6]/10 text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'ALL' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('UNREAD')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'UNREAD' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('LIVE')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'LIVE' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          Live Classes
        </button>
        <button
          onClick={() => setFilter('ASSIGNMENT')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'ASSIGNMENT' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          Assignments
        </button>
        <button
          onClick={() => setFilter('QUIZ')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'QUIZ' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          Quizzes
        </button>
        <button
          onClick={() => setFilter('DOUBT')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            filter === 'DOUBT' ? 'bg-[#006B47] text-white shadow-2xs' : 'bg-white text-[#404943] border border-[#BDCAC0]/60'
          }`}
        >
          Mentor Responses
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-12 text-center space-y-3">
            <Bell className="w-12 h-12 text-[#BDCAC0] mx-auto" />
            <h3 className="text-base font-bold text-[#191c1e]">No notifications found</h3>
            <p className="text-xs text-[#707972]">You're all caught up with your study updates!</p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !item.read
                  ? 'bg-white border-[#006B47] shadow-sm ring-1 ring-[#006B47]/20'
                  : 'bg-white border-[#BDCAC0]/60 hover:border-[#BDCAC0]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    !item.read ? 'bg-[#71DBA6]/20' : 'bg-[#F7F9FB]'
                  }`}
                >
                  {getNotificationIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#191c1e]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#006B47] inline-block"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#404943] leading-relaxed">{item.message}</p>
                  <p className="text-[10px] text-[#707972] font-mono pt-1">{item.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!item.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead(item.id);
                    }}
                    className="text-xs text-[#006B47] font-bold hover:underline"
                  >
                    Mark read
                  </button>
                )}
                {item.link && (
                  <ArrowRight className="w-4 h-4 text-[#707972]" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
