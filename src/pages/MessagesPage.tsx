import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  MessageSquare,
  Send,
  Search,
  CheckCircle2,
  Clock,
  User as UserIcon,
  Sparkles,
  Paperclip
} from 'lucide-react';

interface Conversation {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  mentorTitle: string;
  courseTitle: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMentor: boolean;
  }[];
}

export const MessagesPage: React.FC = () => {
  const { currentUser, showToast } = useLms();

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      mentorName: 'Dr. Aris',
      mentorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
      mentorTitle: 'Senior Mentor — Data Structures',
      courseTitle: 'Data Structures & Algorithms in Java',
      lastMessage: 'Your recursive tree implementation looked solid! Check the updated notes for tree rotation benchmarks.',
      lastTime: '10:30 AM',
      unreadCount: 1,
      messages: [
        {
          id: 'm1',
          sender: 'Sarah Jenkins',
          text: 'Hello Dr. Aris, I had a quick question regarding the time complexity of the self-balancing AVL rotation logic.',
          time: 'Yesterday',
          isMentor: false
        },
        {
          id: 'm2',
          sender: 'Dr. Aris',
          text: 'Great question Sarah! The key is that single and double rotations execute in constant O(1) time because they only rearrange pointers.',
          time: 'Yesterday',
          isMentor: true
        },
        {
          id: 'm3',
          sender: 'Dr. Aris',
          text: 'Your recursive tree implementation looked solid! Check the updated notes for tree rotation benchmarks.',
          time: '10:30 AM',
          isMentor: true
        }
      ]
    },
    {
      id: 'conv-2',
      mentorName: 'Elena Rostova',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      mentorTitle: 'Lead Instructor — Python ML',
      courseTitle: 'Python for Data Science & Machine Learning',
      lastMessage: 'The NumPy vectorization lab has been updated. Feel free to submit when ready!',
      lastTime: 'Oct 14',
      unreadCount: 0,
      messages: [
        {
          id: 'm4',
          sender: 'Elena Rostova',
          text: 'The NumPy vectorization lab has been updated. Feel free to submit when ready!',
          time: 'Oct 14',
          isMentor: true
        }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser?.name || 'Sarah Jenkins',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMentor: false
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: newMsg.text,
            lastTime: newMsg.time,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputText('');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.mentorName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
          Mentor Direct Messaging
        </h1>
        <p className="text-sm text-[#404943] mt-1">
          Chat directly with your course professors and faculty teaching assistants.
        </p>
      </div>

      {/* Chat Window Container */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl shadow-2xs grid grid-cols-1 md:grid-cols-3 h-[600px] overflow-hidden">
        {/* Left Side: Conversations List */}
        <div className="border-r border-[#BDCAC0]/60 flex flex-col">
          {/* Search bar */}
          <div className="p-3.5 border-b border-[#BDCAC0]/60 bg-[#F7F9FB]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mentors or courses..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#BDCAC0] rounded-xl text-xs focus:outline-none focus:border-[#006B47]"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#BDCAC0]/40">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setConversations((prev) =>
                      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 ${
                    isActive ? 'bg-[#71DBA6]/15 border-l-4 border-l-[#006B47]' : 'hover:bg-[#F7F9FB]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#BDCAC0] flex-shrink-0 bg-[#F7F9FB]">
                    <img src={conv.mentorAvatar} alt={conv.mentorName} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#191c1e] truncate">{conv.mentorName}</h4>
                      <span className="text-[10px] text-[#707972]">{conv.lastTime}</span>
                    </div>
                    <p className="text-[10px] text-[#006B47] font-semibold truncate">{conv.courseTitle}</p>
                    <p className="text-xs text-[#404943] truncate mt-1">{conv.lastMessage}</p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#006B47] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Thread */}
        {activeConv ? (
          <div className="md:col-span-2 flex flex-col h-full bg-[#f8faf9]/40">
            {/* Header */}
            <div className="p-4 border-b border-[#BDCAC0]/60 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#006B47]">
                  <img src={activeConv.mentorAvatar} alt={activeConv.mentorName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#191c1e] flex items-center gap-1.5">
                    {activeConv.mentorName}
                    <span className="bg-[#8af5be]/50 text-[#00714b] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Faculty Mentor
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#707972]">{activeConv.courseTitle}</p>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeConv.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isMentor ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      m.isMentor
                        ? 'bg-white border border-[#BDCAC0]/70 text-[#191c1e] rounded-tl-none'
                        : 'bg-[#006B47] text-white rounded-tr-none'
                    }`}
                  >
                    {m.isMentor && (
                      <span className="text-[10px] font-bold text-[#006B47] block mb-1">
                        {activeConv.mentorName}
                      </span>
                    )}
                    <p>{m.text}</p>
                  </div>
                  <span className="text-[10px] text-[#707972] mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#BDCAC0]/60 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${activeConv.mentorName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#006B47]"
              />
              <button
                type="submit"
                className="bg-[#006B47] hover:bg-[#005034] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center p-8 text-center text-[#707972]">
            Select a mentor conversation to view messages.
          </div>
        )}
      </div>
    </div>
  );
};
