import React, { useState, useRef, useEffect } from 'react';
import { useLms } from '../context/LmsContext';
import { Course, Module, Lesson } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Minimize2,
  RotateCcw,
  FastForward,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Award,
  Video,
  Send,
  MessageSquare,
  Sparkles,
  BookOpen,
  Subtitles,
  Settings,
  Tv,
  Repeat,
  Share2,
  Search,
  Bookmark,
  Plus,
  Trash2,
  Check,
  Radio,
  Sliders,
  ExternalLink,
  Layers
} from 'lucide-react';

interface LearningPlayerPageProps {
  courseId?: string;
}

interface PersonalNote {
  id: string;
  timestamp: number;
  timeFormatted: string;
  text: string;
  createdAt: string;
}

interface TranscriptItem {
  id: string;
  startSec: number;
  endSec: number;
  speaker: string;
  text: string;
}

const SAMPLE_FALLBACK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
];

export const LearningPlayerPage: React.FC<LearningPlayerPageProps> = ({ courseId }) => {
  const { courses, currentRoute, markLessonComplete, askDoubt, navigate, showToast } = useLms();

  // Extract ID from route if not explicitly passed
  const activeCourseId = courseId || currentRoute.split('/').pop() || courses[0]?.id || 'course-ds-101';
  const course = courses.find((c) => c.id === activeCourseId) || courses[0];

  const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || 'les-1-1');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules?.[0]?.id || 'mod-1']: true
  });

  // Curriculum search filter
  const [curriculumSearch, setCurriculumSearch] = useState('');

  // Video element and playback state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState<'1080p HD' | '720p HD' | '480p SD' | 'Auto'>('1080p HD');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showAutoAdvanceOverlay, setShowAutoAdvanceOverlay] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(5);

  // Quick skip feedback animation
  const [skipFeedback, setSkipFeedback] = useState<{ text: string; side: 'left' | 'right' } | null>(null);

  // Active tab under player: 'overview' | 'transcript' | 'resources' | 'notes' | 'doubts'
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'resources' | 'notes' | 'doubts'>('overview');

  // Doubt submission state
  const [doubtText, setDoubtText] = useState('');

  // Student timestamped personal notes
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>([
    {
      id: 'note-1',
      timestamp: 45,
      timeFormatted: '00:45',
      text: 'Key formula: Memory layout strides determine SIMD vector acceleration efficiency.',
      createdAt: 'Today, 10:14 AM'
    },
    {
      id: 'note-2',
      timestamp: 180,
      timeFormatted: '03:00',
      text: 'Remember to verify C-contiguous vs Fortran order before passing to GPU kernels.',
      createdAt: 'Today, 10:22 AM'
    }
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0] || {
    id: 'les-default',
    title: '1.1 Introduction to Lecture',
    duration: '25 mins',
    type: 'video' as const,
    videoUrl: SAMPLE_FALLBACK_VIDEOS[0],
    content: 'Welcome to this interactive lecture session.',
    completed: false
  };

  const activeLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);

  // Determine active video source (deterministic fallback if lesson has no URL)
  const getActiveVideoSrc = () => {
    if (activeLesson.videoUrl && activeLesson.videoUrl.startsWith('http')) {
      return activeLesson.videoUrl;
    }
    const idx = Math.abs(activeLessonIndex >= 0 ? activeLessonIndex : 0) % SAMPLE_FALLBACK_VIDEOS.length;
    return SAMPLE_FALLBACK_VIDEOS[idx];
  };

  const currentVideoSrc = getActiveVideoSrc();

  // Progress metrics
  const completedLessonsCount = allLessons.filter((l) => l.completed).length;
  const totalLessonsCount = allLessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  // Formatted duration helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate synchronized mock transcript for this active lesson
  const mockTranscript: TranscriptItem[] = [
    {
      id: 'tr-1',
      startSec: 0,
      endSec: 25,
      speaker: course.instructorName || 'Dr. Aris',
      text: `Welcome back everyone. In this session on "${activeLesson.title}", we will break down core algorithmic mechanics and formalize our proofs.`
    },
    {
      id: 'tr-2',
      startSec: 25,
      endSec: 75,
      speaker: course.instructorName || 'Dr. Aris',
      text: 'First, let us examine the fundamental theorem and mathematical invariants governing this data structure.'
    },
    {
      id: 'tr-3',
      startSec: 75,
      endSec: 150,
      speaker: course.instructorName || 'Dr. Aris',
      text: 'Notice how cache locality and memory strides directly dictate execution latency in production systems.'
    },
    {
      id: 'tr-4',
      startSec: 150,
      endSec: 240,
      speaker: course.instructorName || 'Dr. Aris',
      text: 'Now let us step through the concrete code implementation and trace pointer transitions step by step.'
    },
    {
      id: 'tr-5',
      startSec: 240,
      endSec: 360,
      speaker: course.instructorName || 'Dr. Aris',
      text: 'Observe that the time complexity remains strictly bounded under all adversary edge cases.'
    },
    {
      id: 'tr-6',
      startSec: 360,
      endSec: 600,
      speaker: course.instructorName || 'Dr. Aris',
      text: 'Before moving to the next module, ensure you download the attached problem set and verify your solution in our lab.'
    }
  ];

  // Active transcript item based on currentTime
  const activeTranscriptItem = mockTranscript.find(
    (t) => currentTime >= t.startSec && currentTime < t.endSec
  ) || mockTranscript[0];

  // Effect: Sync video playback attributes when videoRef or activeLesson changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [playbackSpeed, volume, isMuted, activeLessonId]);

  // Effect: When active lesson changes, load new video and play smoothly
  useEffect(() => {
    setShowAutoAdvanceOverlay(false);
    setAutoAdvanceCountdown(5);
    setCurrentTime(0);
    setIsLoading(true);

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          // Autoplay policy fallback: pause smoothly without breaking UI
          setIsPlaying(false);
          setIsLoading(false);
        });
    }

    // Auto-expand module containing this lesson
    const parentModule = course.modules?.find((m) => m.lessons.some((l) => l.id === activeLessonId));
    if (parentModule) {
      setExpandedModules((prev) => ({ ...prev, [parentModule.id]: true }));
    }
  }, [activeLessonId, course.id]);

  // Keyboard navigation listener (Space to play/pause, Left/Right for 10s seek, M for mute, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(10);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume((prev) => {
          const next = Math.min(1, prev + 0.1);
          if (videoRef.current) videoRef.current.volume = next;
          setIsMuted(false);
          return next;
        });
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume((prev) => {
          const next = Math.max(0, prev - 0.1);
          if (videoRef.current) videoRef.current.volume = next;
          return next;
        });
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setShowCaptions((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume, isMuted, isFullscreen]);

  // Auto-advance countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAutoAdvanceOverlay && autoAdvance && autoAdvanceCountdown > 0) {
      timer = setTimeout(() => {
        setAutoAdvanceCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showAutoAdvanceOverlay && autoAdvance && autoAdvanceCountdown === 0) {
      handleNextLesson();
    }
    return () => clearTimeout(timer);
  }, [showAutoAdvanceOverlay, autoAdvanceCountdown, autoAdvance]);

  // Playback Control Handlers
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error', err);
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.max(0, Math.min(duration || 100, videoRef.current.currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);

    // Show feedback animation
    setSkipFeedback({
      text: `${seconds > 0 ? '+' : ''}${seconds}s`,
      side: seconds > 0 ? 'right' : 'left'
    });
    setTimeout(() => setSkipFeedback(null), 700);
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    const bounded = Math.max(0, Math.min(duration || 100, seconds));
    videoRef.current.currentTime = bounded;
    setCurrentTime(bounded);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    showToast(`Playback speed set to ${speed}x`, 'info');
  };

  const handleQualityChange = (q: '1080p HD' | '720p HD' | '480p SD' | 'Auto') => {
    setQuality(q);
    setShowQualityMenu(false);
    showToast(`Stream resolution switched to ${q}`, 'success');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const togglePip = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPipActive(false);
      } else if (videoRef.current !== document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setIsPipActive(true);
      }
    } catch (err) {
      showToast('Picture-in-Picture mode not supported in this browser.', 'warning');
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Automatically mark current lesson completed
    if (!activeLesson.completed) {
      markLessonComplete(course.id, activeLesson.id, true);
      showToast(`Lesson completed! Progress updated.`, 'success');
    }

    if (activeLessonIndex < allLessons.length - 1) {
      if (autoAdvance) {
        setShowAutoAdvanceOverlay(true);
        setAutoAdvanceCountdown(5);
      }
    } else {
      showToast('Congratulations! You completed the entire course curriculum!', 'success');
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Buffer tracking
    if (videoRef.current.buffered.length > 0) {
      setBufferedEnd(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
    }

    // Auto mark complete when reaching 95% of video
    if (duration > 0 && cur / duration > 0.95 && !activeLesson.completed) {
      markLessonComplete(course.id, activeLesson.id, true);
    }
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleNextLesson = () => {
    setShowAutoAdvanceOverlay(false);
    if (activeLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[activeLessonIndex + 1];
      setActiveLessonId(nextLesson.id);
      showToast(`Now playing: ${nextLesson.title}`, 'info');
    } else {
      showToast('You have reached the end of this curriculum!', 'success');
      navigate('/student/certificates');
    }
  };

  const handlePrevLesson = () => {
    setShowAutoAdvanceOverlay(false);
    if (activeLessonIndex > 0) {
      const prevLesson = allLessons[activeLessonIndex - 1];
      setActiveLessonId(prevLesson.id);
      showToast(`Now playing: ${prevLesson.title}`, 'info');
    }
  };

  const handleToggleComplete = () => {
    const nextStatus = !activeLesson.completed;
    markLessonComplete(course.id, activeLesson.id, nextStatus);
    showToast(
      nextStatus ? 'Marked lesson as completed ✓' : 'Marked lesson as incomplete',
      nextStatus ? 'success' : 'info'
    );
  };

  const handleAddPersonalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;

    const newNote: PersonalNote = {
      id: `note-${Date.now()}`,
      timestamp: currentTime,
      timeFormatted: formatTime(currentTime),
      text: newNoteInput.trim(),
      createdAt: 'Just now'
    };

    setPersonalNotes((prev) => [newNote, ...prev]);
    setNewNoteInput('');
    showToast(`Note saved at ${formatTime(currentTime)}!`, 'success');
  };

  const handleDeleteNote = (id: string) => {
    setPersonalNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Note deleted.', 'info');
  };

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    askDoubt({
      courseId: course.id,
      courseTitle: course.title,
      studentId: 'user-student-1',
      studentName: 'Sarah Jenkins',
      studentAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      batch: course.batch || 'Batch B2',
      title: `Question on ${activeLesson.title}`,
      description: doubtText,
      priority: 'HIGH'
    });

    showToast(`Your doubt ticket has been dispatched to ${course.instructorName}!`, 'success');
    setDoubtText('');
  };

  // Filtered curriculum based on search input
  const filteredModules = (course.modules || []).map((m) => ({
    ...m,
    lessons: m.lessons.filter((l) =>
      curriculumSearch
        ? l.title.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
          m.title.toLowerCase().includes(curriculumSearch.toLowerCase())
        : true
    )
  })).filter((m) => m.lessons.length > 0);

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Navigation Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 md:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/student/my-learning')}
            className="p-2.5 text-[#404943] hover:text-[#006B47] hover:bg-[#F7F9FB] rounded-xl transition-colors cursor-pointer border border-[#BDCAC0]/50"
            title="Back to My Courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-[#006B47] uppercase tracking-wider bg-[#71DBA6]/20 px-2.5 py-0.5 rounded-full">
                {course.category}
              </span>
              <span className="text-xs text-[#707972]">
                Mentor: <strong className="text-[#191c1e]">{course.instructorName}</strong>
              </span>
              <span className="text-xs text-[#707972]">• {course.batch || 'Cohort 2024'}</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#191c1e] font-display mt-0.5">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress Bar & Actions */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="hidden sm:block text-right pr-2">
            <div className="flex items-center justify-end gap-1.5">
              <p className="text-xs font-bold text-[#191c1e]">{progressPercent}% Completed</p>
              <span className="text-[10px] text-[#707972] font-mono">
                ({completedLessonsCount}/{totalLessonsCount})
              </span>
            </div>
            <div className="w-32 h-2 bg-[#e1e2e5] rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-[#006B47] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleToggleComplete}
            className={`font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
              activeLesson?.completed
                ? 'bg-[#006B47] text-white shadow-xs'
                : 'bg-white border-2 border-[#006B47] text-[#006B47] hover:bg-[#71DBA6]/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {activeLesson?.completed ? 'Lesson Completed ✓' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      {/* 2. Main Arena: Dedicated Video Player (2 cols) & Curriculum Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Video Player & Synced Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Container with Rich Controls & Overlays */}
          <div
            ref={containerRef}
            className="bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl relative flex flex-col justify-between border border-black/80 group select-none"
          >
            {/* HTML5 Native Video Tag */}
            <div
              className="relative w-full h-full flex items-center justify-center cursor-pointer bg-black"
              onClick={togglePlayPause}
              onDoubleClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX < rect.width / 2) {
                  seekRelative(-10);
                } else {
                  seekRelative(10);
                }
              }}
            >
              <video
                ref={videoRef}
                src={currentVideoSrc}
                poster={course.thumbnail}
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration);
                  setIsLoading(false);
                }}
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleVideoEnded}
              />

              {/* Loading buffering spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none">
                  <div className="w-12 h-12 border-4 border-[#8DF7C1]/30 border-t-[#8DF7C1] rounded-full animate-spin"></div>
                </div>
              )}

              {/* Quick Seek Feedback Ripple Animation */}
              {skipFeedback && (
                <div
                  className={`absolute z-30 flex items-center justify-center bg-black/70 backdrop-blur-xs text-[#8DF7C1] font-bold text-sm px-4 py-2 rounded-xl border border-white/20 animate-in fade-in zoom-in duration-200 pointer-events-none ${
                    skipFeedback.side === 'left' ? 'left-12' : 'right-12'
                  }`}
                >
                  {skipFeedback.side === 'left' ? <RotateCcw className="w-5 h-5 mr-1.5" /> : <FastForward className="w-5 h-5 mr-1.5" />}
                  {skipFeedback.text}
                </div>
              )}

              {/* Big Center Play / Pause Indicator on hover or when paused */}
              {!isPlaying && !isLoading && !showAutoAdvanceOverlay && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20 transition-all pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-[#006B47]/90 hover:bg-[#006B47] text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </div>
                  <p className="text-white font-bold text-sm mt-3 drop-shadow">Click to Play Lecture</p>
                  <p className="text-[#BDCAC0] text-xs font-mono drop-shadow">{activeLesson.title}</p>
                </div>
              )}

              {/* Auto-Advance Next Lecture Overlay */}
              {showAutoAdvanceOverlay && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-30 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#006B47] text-[#8DF7C1] flex items-center justify-center mb-3 shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-[#8DF7C1] uppercase tracking-wider">
                    Lecture Completed ✓
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mt-1 max-w-md">
                    Up Next: {allLessons[activeLessonIndex + 1]?.title || 'Next Module'}
                  </h3>
                  <p className="text-xs text-[#BDCAC0] mt-1">
                    Auto-playing in <strong className="text-white font-mono text-sm">{autoAdvanceCountdown}s</strong>
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={handleNextLesson}
                      className="px-5 py-2.5 bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-105"
                    >
                      <Play className="w-4 h-4 fill-current" /> Play Next Now
                    </button>
                    <button
                      onClick={() => {
                        setShowAutoAdvanceOverlay(false);
                        seekTo(0);
                      }}
                      className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Replay Lesson
                    </button>
                    <button
                      onClick={() => setShowAutoAdvanceOverlay(false)}
                      className="px-3 py-2.5 text-[#BDCAC0] hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Synchronized Closed Captions Overlay */}
              {showCaptions && (
                <div className="absolute bottom-16 left-4 right-4 text-center z-20 pointer-events-none">
                  <div className="inline-block bg-black/85 backdrop-blur-md text-[#8DF7C1] font-mono text-xs md:text-sm px-5 py-2 rounded-xl border border-white/20 shadow-lg max-w-xl">
                    <span className="text-white font-semibold mr-1">[{activeTranscriptItem.speaker}]:</span>
                    &quot;{activeTranscriptItem.text}&quot;
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Control Bar */}
            <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-4 text-white space-y-2.5 z-20 transition-opacity">
              {/* Scrub Seekbar */}
              <div className="relative group/seeker flex items-center">
                {/* Buffer Track */}
                <div className="absolute left-0 right-0 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/30 transition-all duration-300"
                    style={{ width: `${duration > 0 ? (bufferedEnd / duration) * 100 : 0}%` }}
                  ></div>
                </div>

                {/* Main Progress Seek Slider */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className="w-full h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer accent-[#8DF7C1] relative z-10"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs">
                {/* Left controls: Play/Pause, Rewind 10, FastForward 10, Time */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={togglePlayPause}
                    className="p-1.5 hover:text-[#8DF7C1] transition-transform hover:scale-110 cursor-pointer rounded-lg bg-white/10"
                    title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={() => seekRelative(-10)}
                    className="p-1 text-[#BDCAC0] hover:text-white transition-colors cursor-pointer"
                    title="Rewind 10s (Left Arrow)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => seekRelative(10)}
                    className="p-1 text-[#BDCAC0] hover:text-white transition-colors cursor-pointer"
                    title="Forward 10s (Right Arrow)"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  {/* Current / Duration Timer */}
                  <div className="flex items-center gap-1 text-[11px] text-[#BDCAC0] font-mono ml-1">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Volume Slider */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[#BDCAC0] ml-2">
                    <button
                      onClick={toggleMute}
                      className="hover:text-white cursor-pointer"
                      title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-[#BA1A1A]" />
                      ) : volume < 0.5 ? (
                        <Volume1 className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-16 h-1 bg-white/30 rounded accent-[#8DF7C1] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Right controls: Speed, Quality, Captions, PiP, Fullscreen */}
                <div className="flex items-center gap-2 sm:gap-3 relative">
                  {/* Speed Selector */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => handleSpeedChange(Number(e.target.value))}
                    className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold rounded-lg px-2 py-1 border border-white/20 focus:outline-none cursor-pointer"
                    title="Playback Speed"
                  >
                    <option value={0.5} className="text-black">0.5x</option>
                    <option value={0.75} className="text-black">0.75x</option>
                    <option value={1} className="text-black">1.0x Normal</option>
                    <option value={1.25} className="text-black">1.25x</option>
                    <option value={1.5} className="text-black">1.5x</option>
                    <option value={1.75} className="text-black">1.75x</option>
                    <option value={2} className="text-black">2.0x</option>
                  </select>

                  {/* Quality Button & Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowQualityMenu(!showQualityMenu)}
                      className="bg-white/15 hover:bg-white/25 text-[#8DF7C1] text-[11px] font-bold px-2 py-1 rounded-lg border border-white/20 flex items-center gap-1 cursor-pointer"
                      title="Resolution Quality"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{quality.split(' ')[0]}</span>
                    </button>

                    {showQualityMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-[#191c1e] border border-white/20 rounded-xl p-1.5 shadow-2xl w-32 space-y-1 z-30">
                        <span className="text-[10px] font-bold text-[#707972] uppercase tracking-wider px-2 py-0.5 block">
                          Quality
                        </span>
                        {(['1080p HD', '720p HD', '480p SD', 'Auto'] as const).map((q) => (
                          <button
                            key={q}
                            onClick={() => handleQualityChange(q)}
                            className={`w-full text-left px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                              quality === q ? 'bg-[#006B47] text-white font-bold' : 'text-[#BDCAC0] hover:bg-white/10'
                            }`}
                          >
                            <span>{q}</span>
                            {quality === q && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Subtitles Toggle */}
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      showCaptions
                        ? 'bg-[#006B47] text-white border-[#8DF7C1]'
                        : 'bg-white/10 border-white/20 text-[#BDCAC0] hover:text-white'
                    }`}
                    title="Toggle Captions (C)"
                  >
                    <Subtitles className="w-4 h-4" />
                  </button>

                  {/* Picture-in-Picture Toggle */}
                  <button
                    onClick={togglePip}
                    className="p-1.5 bg-white/10 hover:bg-white/20 text-[#BDCAC0] hover:text-white rounded-lg border border-white/20 cursor-pointer hidden sm:block"
                    title="Picture-in-Picture"
                  >
                    <Tv className="w-4 h-4" />
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 bg-white/10 hover:bg-white/20 text-[#BDCAC0] hover:text-white rounded-lg border border-white/20 cursor-pointer"
                    title="Fullscreen (F)"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Details Card & Workspace Tabs */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 md:p-6 shadow-2xs space-y-5">
            {/* Title & Previous / Next Navigation Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#BDCAC0]/40 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#006B47] uppercase tracking-wider bg-[#71DBA6]/20 px-2 py-0.5 rounded">
                    Active Lecture
                  </span>
                  <span className="text-xs text-[#707972]">
                    Module: {course.modules?.find((m) => m.lessons.some((l) => l.id === activeLesson.id))?.title || 'Core Syllabus'}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#191c1e] font-display mt-1">
                  {activeLesson.title}
                </h2>
                <p className="text-xs text-[#707972] mt-0.5">
                  Duration: {activeLesson.duration} • 1080p Studio HD • {allLessons.indexOf(activeLesson) + 1} of {allLessons.length}
                </p>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeLessonIndex === 0}
                  className="px-3.5 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold rounded-xl text-[#191c1e] transition-colors flex items-center gap-1 cursor-pointer border border-[#BDCAC0]/50"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <button
                  onClick={handleNextLesson}
                  className="px-4 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold rounded-xl text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                >
                  Next Lecture <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-Tabs: Overview | Transcript | Notes & Bookmarks | Handouts | Ask Doubt */}
            <div className="flex items-center gap-2 border-b border-[#BDCAC0]/40 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#006B47] text-white shadow-2xs'
                    : 'text-[#404943] hover:bg-[#F7F9FB]'
                }`}
              >
                Overview & Summary
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'transcript'
                    ? 'bg-[#006B47] text-white shadow-2xs'
                    : 'text-[#404943] hover:bg-[#F7F9FB]'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" /> Synchronized Transcript
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-[#006B47] text-white shadow-2xs'
                    : 'text-[#404943] hover:bg-[#F7F9FB]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" /> Personal Notes ({personalNotes.length})
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'resources'
                    ? 'bg-[#006B47] text-white shadow-2xs'
                    : 'text-[#404943] hover:bg-[#F7F9FB]'
                }`}
              >
                <Download className="w-3.5 h-3.5" /> Resources & Files ({activeLesson.resources?.length || 2})
              </button>
              <button
                onClick={() => setActiveTab('doubts')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'doubts'
                    ? 'bg-[#006B47] text-white shadow-2xs'
                    : 'text-[#404943] hover:bg-[#F7F9FB]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" /> Ask Doubt
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs md:text-sm text-[#404943] leading-relaxed animate-in fade-in">
                <p>
                  {activeLesson.content ||
                    'In this lecture session, we systematically decompose theoretical invariants, develop rigorous mathematical formulations, and build step-by-step implementations in our laboratory code sandbox.'}
                </p>
                <div className="p-4 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/40 space-y-2">
                  <h4 className="font-bold text-xs text-[#191c1e] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#006B47]" /> Key Pedagogical Objectives:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#404943] list-disc list-inside">
                    <li>Maintain balanced invariants to guarantee logarithmic execution overheads.</li>
                    <li>Always verify structural pointer updates during double rotation passes.</li>
                    <li>Execute the attached laboratory exercise before moving on to the next module.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Synchronized Transcript */}
            {activeTab === 'transcript' && (
              <div className="space-y-3 text-xs animate-in fade-in">
                <div className="flex justify-between items-center bg-[#F7F9FB] p-3 rounded-xl border border-[#BDCAC0]/40">
                  <p className="text-[#707972]">
                    Click any timestamp to jump the video directly to that segment of the lecture.
                  </p>
                  <span className="font-mono text-[11px] font-bold text-[#006B47]">
                    Live Synced Track
                  </span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 divide-y divide-[#BDCAC0]/30">
                  {mockTranscript.map((t) => {
                    const isCurrent = currentTime >= t.startSec && currentTime < t.endSec;
                    return (
                      <div
                        key={t.id}
                        onClick={() => seekTo(t.startSec)}
                        className={`pt-2.5 p-2 rounded-xl transition-all cursor-pointer flex gap-3 items-start ${
                          isCurrent
                            ? 'bg-[#71DBA6]/20 border-l-4 border-l-[#006B47] text-[#005034] font-medium'
                            : 'hover:bg-[#F7F9FB] text-[#404943]'
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            seekTo(t.startSec);
                          }}
                          className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold cursor-pointer ${
                            isCurrent
                              ? 'bg-[#006B47] text-white'
                              : 'bg-[#BDCAC0]/30 text-[#191c1e] hover:bg-[#006B47] hover:text-white'
                          }`}
                        >
                          {formatTime(t.startSec)}
                        </button>
                        <div className="flex-1">
                          <span className="font-bold text-[11px] block text-[#191c1e]">{t.speaker}</span>
                          <p className="mt-0.5 leading-relaxed">{t.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Personal Notes & Timestamps */}
            {activeTab === 'notes' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Note creation form */}
                <form onSubmit={handleAddPersonalNote} className="space-y-2.5 bg-[#F7F9FB] p-4 rounded-xl border border-[#BDCAC0]/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#191c1e] flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-[#006B47]" /> Add Timestamped Note
                    </span>
                    <button
                      type="button"
                      onClick={() => seekTo(currentTime)}
                      className="text-[11px] font-mono bg-[#006B47]/10 text-[#006B47] font-bold px-2 py-0.5 rounded"
                    >
                      Capture at {formatTime(currentTime)}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder={`Take a note on what Dr. Aris is explaining right now at ${formatTime(currentTime)}...`}
                    className="w-full p-2.5 bg-white border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Save Note
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {personalNotes.length === 0 ? (
                    <p className="text-xs text-[#707972] text-center py-6">No personal notes yet for this lecture.</p>
                  ) : (
                    personalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 bg-white border border-[#BDCAC0]/60 rounded-xl flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => seekTo(note.timestamp)}
                              className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#006B47] text-white rounded hover:bg-[#005034] cursor-pointer flex items-center gap-1"
                              title="Jump to timestamp"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" /> {note.timeFormatted}
                            </button>
                            <span className="text-[10px] text-[#707972]">{note.createdAt}</span>
                          </div>
                          <p className="text-[#191c1e] leading-snug">{note.text}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-[#707972] hover:text-[#BA1A1A] p-1 cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-xs text-[#707972]">
                  Download verified laboratory slides, notebooks, and problem files for this session:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeLesson.resources || [
                    { name: `${activeLesson.title.slice(0, 25)}_slides.pdf`, size: '3.4 MB', url: '#' },
                    { name: `${activeLesson.title.slice(0, 25)}_lab_code.zip`, size: '1.2 MB', url: '#' }
                  ]).map((res, idx) => (
                    <a
                      key={idx}
                      href="#download"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast(`Downloaded ${res.name}`, 'info');
                      }}
                      className="p-3 bg-[#F7F9FB] border border-[#BDCAC0]/60 hover:border-[#006B47] rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[#006B47]" />
                        <div>
                          <p className="font-bold text-[#191c1e] truncate">{res.name}</p>
                          <p className="text-[10px] text-[#707972]">{res.size} • Verified Material</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-[#006B47]" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Ask Doubt */}
            {activeTab === 'doubts' && (
              <form onSubmit={handleSendDoubt} className="space-y-3 text-xs animate-in fade-in">
                <p className="text-[#707972]">
                  Have a question on this specific lecture? Post your inquiry directly to <strong>{course.instructorName}</strong>:
                </p>
                <textarea
                  rows={3}
                  required
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder="Type your question or paste code snippet here..."
                  className="w-full p-3 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#006B47] hover:bg-[#005034] text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Doubt Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right 1 Col: Course Curriculum Accordion Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 md:p-5 shadow-2xs space-y-4 sticky top-20">
            {/* Header & Filter */}
            <div className="flex justify-between items-center border-b border-[#BDCAC0]/40 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#191c1e] font-display">
                  Course Curriculum
                </h3>
                <span className="text-[11px] text-[#707972]">
                  {completedLessonsCount} of {totalLessonsCount} Completed
                </span>
              </div>

              {/* Autoplay next toggle */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#404943]">
                <span>Autoplay</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !autoAdvance;
                    setAutoAdvance(next);
                    showToast(next ? 'Autoplay next lecture enabled' : 'Autoplay disabled', 'info');
                  }}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                    autoAdvance ? 'bg-[#006B47]' : 'bg-[#BDCAC0]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      autoAdvance ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* Curriculum Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search lectures & topics..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredModules.map((mod, mIdx) => {
                const isExpanded = expandedModules[mod.id] ?? (mIdx === 0);
                const modCompletedCount = mod.lessons.filter((l) => l.completed).length;

                return (
                  <div key={mod.id} className="border border-[#BDCAC0]/60 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-3.5 bg-[#F7F9FB] hover:bg-[#eceef0] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="pr-2">
                        <h4 className="font-bold text-xs text-[#191c1e] line-clamp-1">{mod.title}</h4>
                        <span className="text-[10px] text-[#707972]">
                          {modCompletedCount}/{mod.lessons.length} Done • {mod.duration}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#707972] flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#707972] flex-shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-[#BDCAC0]/30 bg-white">
                        {mod.lessons.map((les) => {
                          const isCurrent = les.id === activeLessonId;
                          return (
                            <div
                              key={les.id}
                              onClick={() => setActiveLessonId(les.id)}
                              className={`p-3 flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors ${
                                isCurrent
                                  ? 'bg-[#71DBA6]/20 font-bold text-[#005034] border-l-4 border-l-[#006B47]'
                                  : 'hover:bg-[#F7F9FB] text-[#404943]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {les.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#006B47] flex-shrink-0" />
                                ) : isCurrent ? (
                                  <div className="flex items-center gap-0.5 flex-shrink-0">
                                    <span className="w-1 h-3 bg-[#006B47] animate-pulse"></span>
                                    <span className="w-1 h-4 bg-[#006B47] animate-pulse delay-75"></span>
                                    <span className="w-1 h-2 bg-[#006B47] animate-pulse delay-150"></span>
                                  </div>
                                ) : (
                                  <Circle className="w-4 h-4 text-[#BDCAC0] flex-shrink-0" />
                                )}
                                <span className="truncate">{les.title}</span>
                              </div>
                              <span className="text-[10px] text-[#707972] font-mono flex-shrink-0">
                                {les.duration}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
