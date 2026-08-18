import React, { useState, useRef, useEffect } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Users,
  MessageSquare,
  Hand,
  Send,
  Radio,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Share2,
  Mic,
  MicOff,
  Tv
} from 'lucide-react';

export const StudentLivePage: React.FC = () => {
  const { liveClasses, currentUser, showToast } = useLms();

  const [activeSession, setActiveSession] = useState(
    liveClasses.find((l) => l.status === 'LIVE') || liveClasses[0]
  );

  // Live video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);

  // Chat message state
  const [messages, setMessages] = useState<
    { id: string; sender: string; avatar?: string; text: string; time: string; isMentor?: boolean }[]
  >([
    {
      id: '1',
      sender: 'Dr. Aris',
      text: 'Welcome everyone! Today we will implement vectorized backprop gradients in NumPy.',
      time: '10:02 AM',
      isMentor: true
    },
    {
      id: '2',
      sender: 'Elena Rostova',
      text: 'Good morning Dr. Aris! Can you review the chain rule shape transposition?',
      time: '10:04 AM'
    },
    {
      id: '3',
      sender: 'Liam Patel',
      text: 'Are slides available in the content library?',
      time: '10:05 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [handRaised, setHandRaised] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [activeSession]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: currentUser?.name || 'Sarah Jenkins',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  const handleRaiseHand = () => {
    const next = !handRaised;
    setHandRaised(next);
    if (next) {
      showToast('Hand raised! The mentor will invite you to speak shortly.', 'info');
    } else {
      showToast('Hand lowered.', 'info');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2">
            <Radio className="w-6 h-6 text-[#BA1A1A] animate-pulse" /> Live Broadcast Studio
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Real-time interactive lecture sessions with synchronized screen broadcasting & live Q&A.
          </p>
        </div>

        {/* Schedule pill */}
        <div className="flex items-center gap-2 bg-white border border-[#BDCAC0]/70 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#191c1e]">
          <Calendar className="w-4 h-4 text-[#006B47]" />
          <span>{liveClasses.length} Scheduled Sessions</span>
        </div>
      </div>

      {/* Main Studio Player & Interactive Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Video Broadcast */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative flex flex-col justify-between p-3 sm:p-4 shadow-xl border border-black/80 group select-none">
            {/* Live Video Canvas */}
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlayPause}
              />
            </div>

            {/* Live Indicator Overlay */}
            <div className="flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="bg-[#BA1A1A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Live Broadcast
                </span>
                <span className="bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#8DF7C1]" /> {activeSession.expectedStudents || 85} Learners Connected
                </span>
              </div>
              <span className="bg-black/60 backdrop-blur-xs text-[#8DF7C1] font-mono text-xs px-2.5 py-0.5 rounded-md border border-white/10 hidden sm:inline-block">
                Ultra HD • Low Latency
              </span>
            </div>

            {/* Video Footer Controls */}
            <div className="z-10 bg-black/75 backdrop-blur-md p-3 rounded-xl flex items-center justify-between text-white text-xs border border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPause}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white cursor-pointer"
                  title={isPlaying ? 'Pause Stream' : 'Resume Stream'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-white truncate max-w-xs">{activeSession.topic}</p>
                  <p className="text-[10px] sm:text-[11px] text-[#BDCAC0]">{activeSession.courseTitle} • {activeSession.instructorName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-white cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#BA1A1A]" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleRaiseHand}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    handRaised
                      ? 'bg-[#EF9F13] text-white shadow-xs'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <Hand className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-white cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-5 shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider">
                {activeSession.batch}
              </span>
              <span className="text-xs text-[#707972] font-mono">Duration: {activeSession.duration}</span>
            </div>
            <h3 className="text-xl font-bold text-[#191c1e] font-display">{activeSession.topic}</h3>
            <p className="text-xs text-[#404943] leading-relaxed">
              In this session, we dissect theoretical proofs, analyze computational bottlenecks, and perform live interactive coding walkthroughs with real-time Q&A.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Live Classroom Chat & Scheduled Sessions */}
        <div className="space-y-4">
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-[#BDCAC0]/40 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#006B47]" />
                <h3 className="font-bold text-sm text-[#191c1e]">Classroom Live Chat</h3>
              </div>
              <span className="text-[11px] text-[#006B47] font-bold bg-[#71DBA6]/20 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl space-y-1 ${
                    msg.isMentor
                      ? 'bg-[#71DBA6]/15 border border-[#006B47]/30'
                      : 'bg-[#F7F9FB] border border-[#BDCAC0]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#191c1e] flex items-center gap-1">
                      {msg.sender}
                      {msg.isMentor && (
                        <span className="bg-[#006B47] text-white text-[9px] px-1.5 py-0.2 rounded uppercase font-bold">
                          Mentor
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-[#707972] font-mono">{msg.time}</span>
                  </div>
                  <p className="text-[#404943] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Send chat message form */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-[#BDCAC0]/40 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask Dr. Aris or chat with peers..."
                className="flex-1 px-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
              <button
                type="submit"
                className="p-2 bg-[#006B47] hover:bg-[#005034] text-white rounded-xl cursor-pointer transition-colors shadow-2xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
