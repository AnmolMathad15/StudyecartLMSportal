import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  Users,
  MessageSquare,
  Send,
  Plus,
  Radio,
  Clock,
  CheckCircle2,
  Settings,
  Sparkles,
  X,
  Play,
  Share2,
  FileText
} from 'lucide-react';

export const InstructorLiveClassesPage: React.FC = () => {
  const { liveClasses, scheduleLiveClass, showToast } = useLms();
  const [activeTab, setActiveTab] = useState<'schedule' | 'studio' | 'recordings'>('schedule');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Studio Chat
  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string; isMentor?: boolean }[]
  >([
    { sender: 'Sarah J.', text: 'Good morning Dr. Aris! Ready for pipeline parallelism bubbles.', time: '10:01 AM' },
    { sender: 'Mike T.', text: 'Audio and slide deck are crystal clear.', time: '10:02 AM' },
    { sender: 'Alex R.', text: 'Could you please re-derive the 1F1B scheduling bubble ratio?', time: '10:03 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Schedule modal state
  const [courseTitle, setCourseTitle] = useState('Python for Data Science & ML');
  const [topic, setTopic] = useState('Gradient Descent Convergence Proof & Convexity');
  const [batch, setBatch] = useState('Batch B2');
  const [startTime, setStartTime] = useState('04:00 PM');
  const [expectedStudents, setExpectedStudents] = useState(50);

  // Recordings mock
  const pastRecordings = [
    { title: 'Lecture 12: Matrix Factorization & SVD', date: 'Oct 14, 2024', duration: '1h 15m', students: 48, url: '#' },
    { title: 'Lecture 11: Eigen-decomposition Proofs', date: 'Oct 10, 2024', duration: '58m', students: 52, url: '#' },
    { title: 'Lab Walkthrough: CUDA Kernel Profiling', date: 'Oct 07, 2024', duration: '1h 30m', students: 44, url: '#' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        sender: 'Dr. Aris (Mentor)',
        text: newMessage,
        time: 'Just now',
        isMentor: true
      }
    ]);
    setNewMessage('');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleLiveClass({
      courseId: 'course-ds-101',
      courseTitle,
      topic,
      batch,
      instructorName: 'Dr. Aris',
      startTime,
      duration: '60 mins session',
      expectedStudents,
      status: 'UPCOMING'
    });
    setIsScheduleOpen(false);
    showToast('Live class session scheduled successfully');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Interactive Teaching Studio
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{liveClasses.length} Scheduled Sessions</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Live Broadcast & Teaching Studio
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Conduct high-fidelity interactive sessions, share whiteboards, and engage live cohorts in real-time.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule New Class
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#BDCAC0]/40 gap-4">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'schedule'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Scheduled Sessions</span>
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'studio'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Live Studio (Broadcaster)</span>
        </button>
        <button
          onClick={() => setActiveTab('recordings')}
          className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'recordings'
              ? 'border-[#006B47] text-[#006B47]'
              : 'border-transparent text-[#707972] hover:text-[#191c1e]'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Recordings Archive</span>
        </button>
      </div>

      {/* TAB 1: Scheduled Sessions */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveClasses.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 shadow-2xs flex flex-col justify-between ${
                item.status === 'LIVE' ? 'border-[#006B47] ring-2 ring-[#71DBA6]/40' : 'border-[#BDCAC0]/70'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                      item.status === 'LIVE'
                        ? 'bg-[#BA1A1A] text-white animate-pulse'
                        : 'bg-[#f2f4f6] text-[#404943]'
                    }`}
                  >
                    {item.status === 'LIVE' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                    {item.status === 'LIVE' ? 'Live in 15m' : 'Upcoming'}
                  </span>

                  <span className="bg-[#e7e8eb] text-[#191c1e] px-2 py-0.5 rounded text-[11px] font-bold">
                    {item.batch}
                  </span>
                </div>

                <h4 className="font-bold text-base text-[#191c1e] font-display mb-1">
                  {item.courseTitle}
                </h4>
                <p className="text-xs text-[#404943] mb-4">{item.topic}</p>
              </div>

              <div className="pt-3 border-t border-[#BDCAC0]/40 space-y-3">
                <div className="flex justify-between text-xs text-[#707972]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#006B47]" /> {item.startTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#006B47]" /> {item.expectedStudents} Students
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab('studio')}
                  className="w-full bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-95"
                >
                  <Video className="w-4 h-4" /> Enter Studio Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Live Broadcast Studio */}
      {activeTab === 'studio' && (
        <div className="bg-[#191c1e] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#404943] grid grid-cols-1 lg:grid-cols-4 min-h-[580px]">
          {/* Main Stage */}
          <div className="lg:col-span-3 p-5 flex flex-col justify-between relative bg-black/40">
            {/* Live Header */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="bg-[#BA1A1A] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse uppercase tracking-wider font-mono">
                  <span className="w-2 h-2 bg-white rounded-full"></span> On Air
                </span>
                <span className="text-xs text-[#eff1f3] bg-black/60 px-3 py-1 rounded-lg font-mono">
                  Data Structures 101 • Intro to Binary Trees (Batch B2)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8DF7C1] bg-black/60 px-3 py-1 rounded-lg font-bold">
                <Users className="w-4 h-4" /> 45 Students Connected
              </div>
            </div>

            {/* Simulated Stage Visual */}
            <div className="my-auto flex flex-col items-center justify-center text-center p-8">
              {isVideoOn ? (
                <div className="relative w-full max-w-xl aspect-video rounded-2xl bg-gradient-to-br from-[#005034] via-[#006B47] to-[#003722] border-2 border-[#71DBA6]/40 flex flex-col items-center justify-center p-6 shadow-2xl">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew"
                    alt="Dr. Aris"
                    className="w-24 h-24 rounded-full border-4 border-[#8DF7C1] object-cover mb-3 shadow-lg"
                  />
                  <h4 className="font-bold text-lg text-white font-display">Dr. Aris (Broadcasting)</h4>
                  <p className="text-xs text-[#8DF7C1]">Audio Input: High Fidelity • 1080p 60fps</p>
                </div>
              ) : (
                <div className="w-full max-w-xl aspect-video rounded-2xl bg-[#2e3133] border border-[#404943] flex flex-col items-center justify-center">
                  <VideoOff className="w-12 h-12 text-[#707972] mb-2" />
                  <p className="text-xs text-[#707972]">Camera feed muted</p>
                </div>
              )}
            </div>

            {/* Studio Controls Bar */}
            <div className="bg-[#2e3133]/95 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between z-10 border border-[#404943]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isMicOn ? 'bg-[#006B47] text-white' : 'bg-[#BA1A1A] text-white'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  {isMicOn ? 'Mute' : 'Unmute'}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isVideoOn ? 'bg-[#006B47] text-white' : 'bg-[#BA1A1A] text-white'
                  }`}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  {isVideoOn ? 'Stop Video' : 'Start Video'}
                </button>

                <button
                  onClick={() => {
                    setIsScreenSharing(!isScreenSharing);
                    showToast(isScreenSharing ? 'Screen share stopped' : 'Sharing desktop canvas', 'info');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isScreenSharing ? 'bg-[#EF9F13] text-white' : 'bg-[#404943] text-white hover:bg-[#707972]'
                  }`}
                >
                  <ScreenShare className="w-4 h-4" />
                  {isScreenSharing ? 'Sharing Screen' : 'Share Screen'}
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveTab('schedule');
                  showToast('Live session ended. Recording saved to library.');
                }}
                className="bg-[#BA1A1A] hover:bg-[#93000a] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                End Session
              </button>
            </div>
          </div>

          {/* Live Chat Panel */}
          <div className="border-t lg:border-t-0 lg:border-l border-[#404943] bg-[#2e3133] flex flex-col h-[580px]">
            <div className="p-3.5 border-b border-[#404943] flex items-center justify-between">
              <span className="font-bold text-xs text-white flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#8DF7C1]" /> Live Q&A Stream
              </span>
              <span className="text-[10px] text-[#eff1f3] bg-[#006B47] px-2 py-0.5 rounded-full font-bold">
                Active
              </span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-xs ${
                    msg.isMentor ? 'bg-[#005034] text-white ml-2' : 'bg-[#191c1e] text-[#eff1f3] mr-2'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#8DF7C1] text-[11px]">{msg.sender}</span>
                    <span className="text-[9px] text-[#707972]">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#404943] flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Broadcast reply to cohort..."
                className="flex-1 bg-[#191c1e] border border-[#404943] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#8DF7C1]"
              />
              <button
                type="submit"
                className="bg-[#006B47] text-white p-2.5 rounded-xl hover:bg-[#005034] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: Past Recordings Archive */}
      {activeTab === 'recordings' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#BDCAC0]/40 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#191c1e] font-display">Session Recordings & Replays</h3>
              <p className="text-xs text-[#707972]">Auto-recorded live classes processed for student on-demand playback.</p>
            </div>
          </div>

          <div className="space-y-3">
            {pastRecordings.map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#F7F9FB] rounded-2xl border border-[#BDCAC0]/50 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#006B47] text-white flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#191c1e]">{rec.title}</h4>
                    <p className="text-[11px] text-[#707972]">{rec.date} • {rec.duration} • {rec.students} Attendees</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('Recording link copied to clipboard', 'info')}
                    className="px-3 py-1.5 bg-white border border-[#BDCAC0]/60 rounded-xl font-bold text-[#006B47] hover:bg-[#71DBA6]/10 flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#BDCAC0]/50 pb-3">
              <h3 className="font-bold text-base text-[#191c1e]">Schedule Live Broadcast</h3>
              <button onClick={() => setIsScheduleOpen(false)} className="text-[#707972] hover:text-[#191c1e]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Topic / Agenda</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#191c1e] mb-1">Batch</label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#191c1e] mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-4 py-2 font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006B47] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#005034]"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
