import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle2,
  PlayCircle,
  FileText,
  HelpCircle,
  Award,
  ShieldCheck,
  ArrowRight,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  X,
  RotateCcw
} from 'lucide-react';

interface CourseDetailsPageProps {
  courseId?: string;
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ courseId }) => {
  const { courses, enrolledCourseIds, enrollInCourse, navigate, currentRoute, showToast } = useLms();

  const activeId = courseId || currentRoute.split('/').pop() || courses[0].id;
  const course = courses.find((c) => c.id === activeId) || courses[0];

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  // Video preview modal
  const [previewVideo, setPreviewVideo] = useState<{ title: string; url: string } | null>(null);

  const toggleModule = (idx: number) => {
    setOpenModuleIndex(openModuleIndex === idx ? null : idx);
  };

  const handleEnroll = () => {
    if (isEnrolled) {
      navigate(`/student/player/${course.id}`);
    } else {
      enrollInCourse(course.id);
      navigate(`/student/player/${course.id}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Course link copied to clipboard!', 'info');
  };

  const handlePlayPreview = (title: string, url?: string) => {
    const videoUrl =
      url ||
      course.modules?.[0]?.lessons?.[0]?.videoUrl ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    setPreviewVideo({ title, url: videoUrl });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Hero Header */}
      <div className="bg-[#191c1e] text-white rounded-2xl p-6 md:p-10 shadow-lg border border-[#BDCAC0]/30 relative overflow-hidden">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#006B47] text-[#8DF7C1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category}
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {course.level} Level
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {course.batch || 'Batch A1'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold font-display leading-tight">
            {course.title}
          </h1>

          <p className="text-[#BDCAC0] text-sm md:text-base leading-relaxed">
            {course.subtitle || course.description}
          </p>

          {/* Social Proof & Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#BDCAC0] pt-2">
            <div className="flex items-center gap-1.5 text-[#8DF7C1] font-bold">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span>{course.rating}</span>
              <span className="text-[#BDCAC0] font-normal">({course.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{course.enrolledStudents} Students Enrolled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{course.totalLessons} Lessons</span>
            </div>
          </div>

          {/* Mentor Profile Preview */}
          <div className="flex items-center gap-3 pt-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-11 h-11 rounded-full border-2 border-[#006B47] object-cover"
            />
            <div>
              <p className="text-xs text-[#BDCAC0]">Primary Course Mentor</p>
              <p className="text-sm font-bold text-white">{course.instructorName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details (2 col) vs Sticky Enrollment Card (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Syllabus & Learning Outcomes */}
        <div className="lg:col-span-2 space-y-8">
          {/* What You Will Learn Card */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-lg font-bold text-[#191c1e] font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#006B47]" /> What You Will Master
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-[#404943]">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006B47] flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Syllabus / Curriculum Accordion */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#BDCAC0]/40 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#191c1e] font-display">
                  Curriculum & Video Lessons
                </h3>
                <p className="text-xs text-[#707972]">
                  {course.modules.length} Modules • {course.totalLessons} Lectures • Full Interactive Playback
                </p>
              </div>
              <button
                onClick={() =>
                  setOpenModuleIndex(openModuleIndex !== null ? null : 0)
                }
                className="text-xs text-[#006B47] font-bold hover:underline cursor-pointer"
              >
                {openModuleIndex !== null ? 'Collapse all' : 'Expand all'}
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => {
                const isOpen = openModuleIndex === mIdx;
                return (
                  <div
                    key={module.id}
                    className="border border-[#BDCAC0]/70 rounded-xl overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => toggleModule(mIdx)}
                      className="w-full p-4 bg-[#F7F9FB] hover:bg-[#eceef0] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-[#191c1e] font-display">
                          {module.title}
                        </h4>
                        <p className="text-xs text-[#707972] mt-0.5">
                          {module.lessons.length} Lessons • {module.duration}
                        </p>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#707972]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#707972]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-[#BDCAC0]/30 bg-white">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3.5 flex items-center justify-between text-xs text-[#404943] hover:bg-[#F7F9FB] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-[#006B47] flex-shrink-0" />
                              <div>
                                <span className="font-medium text-[#191c1e]">{lesson.title}</span>
                                {lesson.content && (
                                  <p className="text-[11px] text-[#707972] line-clamp-1">{lesson.content}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handlePlayPreview(lesson.title, lesson.videoUrl)}
                                className="text-[10px] font-bold text-[#006B47] bg-[#71DBA6]/20 px-2 py-0.5 rounded hover:bg-[#006B47] hover:text-white transition-colors cursor-pointer"
                              >
                                Preview
                              </button>
                              <span className="text-[#707972] font-mono text-[11px]">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Requirements & Description */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-lg font-bold text-[#191c1e] font-display">Prerequisites</h3>
            <div className="text-xs md:text-sm text-[#404943] space-y-2">
              <ul className="space-y-1.5 list-disc list-inside">
                {course.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B47]"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Enrollment Box */}
        <div className="space-y-6">
          <div className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-6 shadow-md space-y-5 sticky top-24">
            <div className="relative rounded-xl overflow-hidden aspect-video border border-[#BDCAC0]/50 shadow-inner group">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <button
                  onClick={() => handlePlayPreview(`${course.title} - Official Trailer`)}
                  className="w-14 h-14 rounded-full bg-[#006B47] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
                <span className="text-white text-xs font-bold mt-2 drop-shadow">Watch Trailer Preview</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#191c1e] font-display">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-[#707972] line-through font-mono">
                    ${course.originalPrice}
                  </span>
                )}
                <span className="ml-auto bg-[#8af5be]/50 text-[#00714b] text-[11px] font-bold px-2 py-0.5 rounded">
                  Cohort Enrolling
                </span>
              </div>
              <p className="text-[11px] text-[#707972]">30-Day Academic Guarantee with Verified Certificate</p>
            </div>

            <button
              onClick={handleEnroll}
              className="w-full py-3.5 bg-[#006B47] hover:bg-[#005034] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isEnrolled ? (
                <>Continue Learning <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Enroll & Start Learning <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <button
              onClick={handleShare}
              className="w-full py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#404943] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Curriculum
            </button>

            <div className="space-y-2 pt-2 border-t border-[#BDCAC0]/40 text-xs text-[#404943]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#006B47]" />
                <span>Full lifetime access to studio records</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#006B47]" />
                <span>Faculty-signed verifiable certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#006B47]" />
                <span>Priority doubt resolution within 2 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#191c1e] text-white rounded-2xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl space-y-0 animate-in fade-in zoom-in-95">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-[#8DF7C1] fill-current" /> {previewVideo.title}
              </h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1 text-[#BDCAC0] hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black relative">
              <video
                src={previewVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-[#23272a] flex items-center justify-between">
              <p className="text-xs text-[#BDCAC0]">
                Enroll today to unlock full lifetime access and interactive code sandboxes.
              </p>
              <button
                onClick={() => {
                  setPreviewVideo(null);
                  handleEnroll();
                }}
                className="bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Start Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
