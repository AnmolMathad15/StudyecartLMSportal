import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  BookOpen,
  Play,
  Flame,
  Award,
  Clock,
  Video,
  FileCheck,
  FileQuestion,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bell,
  Send,
  X
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    enrolledCourseIds,
    quizzes,
    liveClasses,
    assignments,
    certificates,
    doubts,
    notifications,
    navigate,
    askDoubt,
    showToast
  } = useLms();

  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [doubtTitle, setDoubtTitle] = useState('');
  const [doubtDesc, setDoubtDesc] = useState('');
  const [doubtCourseId, setDoubtCourseId] = useState(courses[0]?.id || '');

  // Filter student enrolled courses
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const primaryCourse = enrolledCourses[0] || courses[0];

  // Helper calculations for learning overview
  const totalEnrolled = enrolledCourses.length;
  const completedCoursesCount = enrolledCourses.filter((c) => {
    const total = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const done = c.modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);
    return total > 0 && done >= total;
  }).length;
  const inProgressCoursesCount = totalEnrolled - completedCoursesCount;
  const earnedCertsCount = certificates.length;

  // Recommended courses (courses the student is not yet enrolled in)
  const recommendedCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id)).slice(0, 2);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Recent student activity feed
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Completed Lesson',
      detail: 'AVL Tree Rotations Proofs & Implementation in Java',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-[#006B47] bg-[#71DBA6]/20'
    },
    {
      id: 'act-2',
      title: 'Submitted Assignment',
      detail: 'Assignment 2: Vectorized NumPy Operations (Grade: 96/100)',
      time: 'Yesterday',
      icon: FileCheck,
      color: 'text-[#006B47] bg-[#71DBA6]/20'
    },
    {
      id: 'act-3',
      title: 'Completed Quiz',
      detail: 'Binary Search Tree Balancing Benchmark Quiz',
      time: '2 days ago',
      icon: FileQuestion,
      color: 'text-[#EF9F13] bg-[#EF9F13]/20'
    },
    {
      id: 'act-4',
      title: 'Attended Live Studio Lecture',
      detail: 'Graph Algorithms & Shortest Path Proofs with Dr. Aris',
      time: '3 days ago',
      icon: Video,
      color: 'text-[#005034] bg-[#8af5be]/30'
    }
  ];

  const handleDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtTitle.trim() || !doubtDesc.trim()) {
      showToast('Please provide a doubt title and explanation.', 'error');
      return;
    }

    const selCourse = courses.find((c) => c.id === doubtCourseId) || courses[0];

    askDoubt({
      courseId: selCourse.id,
      courseTitle: selCourse.title,
      studentId: currentUser?.id || 'std-1',
      studentName: currentUser?.name || 'Sarah Jenkins',
      studentAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      batch: 'Batch B2',
      title: doubtTitle,
      description: doubtDesc,
      priority: 'HIGH'
    });

    setIsDoubtModalOpen(false);
    setDoubtTitle('');
    setDoubtDesc('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Welcome Section */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006B47] shadow-sm bg-[#F7F9FB]">
              <img
                src={
                  currentUser?.avatar ||
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
                }
                alt={currentUser?.name || 'Sarah'}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#8af5be] border-2 border-white"></span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#707972] uppercase tracking-wider block">
              Learner Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
              {getGreeting()}, <span className="text-[#006B47]">{currentUser?.name || 'Sarah'}</span> 👋
            </h1>
            <p className="text-xs md:text-sm text-[#404943] mt-0.5">
              Continue your learning journey. You're on track with your weekly study schedule!
            </p>
          </div>
        </div>

        {/* Quick Streak & Doubt Trigger */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/60 px-4 py-2 rounded-xl">
            <Flame className="w-5 h-5 text-[#EF9F13] fill-[#EF9F13]" />
            <div>
              <p className="text-xs font-bold text-[#191c1e]">7-Day Study Streak</p>
              <p className="text-[10px] text-[#707972]">Top 5% active learner</p>
            </div>
          </div>

          <button
            onClick={() => setIsDoubtModalOpen(true)}
            className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <HelpCircle className="w-4 h-4" /> Ask a Doubt
          </button>
        </div>
      </div>

      {/* 2. Learning Overview (Student Metrics ONLY) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#191c1e] font-display">Learning Overview</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex justify-between items-center text-[#707972]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Courses Enrolled</span>
              <BookOpen className="w-4 h-4 text-[#006B47]" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">{totalEnrolled}</p>
            <p className="text-[11px] text-[#707972]">Active matriculations</p>
          </div>

          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex justify-between items-center text-[#707972]">
              <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
              <Clock className="w-4 h-4 text-[#EF9F13]" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">{inProgressCoursesCount}</p>
            <p className="text-[11px] text-[#707972]">Ongoing curriculum</p>
          </div>

          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex justify-between items-center text-[#707972]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-[#006B47]" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">{completedCoursesCount}</p>
            <p className="text-[11px] text-[#006B47] font-semibold">100% syllabus cleared</p>
          </div>

          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex justify-between items-center text-[#707972]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Certificates Earned</span>
              <Award className="w-4 h-4 text-[#006B47]" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">{earnedCertsCount}</p>
            <p className="text-[11px] text-[#707972]">Verified credentials</p>
          </div>
        </div>
      </div>

      {/* 3. Continue Learning (Prominent Course Cards) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#191c1e] font-display">Continue Learning</h2>
            <p className="text-xs text-[#707972]">Pick up right where you left off in your active courses</p>
          </div>
          <button
            onClick={() => navigate('/student/my-learning')}
            className="text-xs text-[#006B47] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Enrolled <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledCourses.slice(0, 2).map((course) => {
            const allLessons = course.modules.flatMap((m) => m.lessons);
            const totalLessons = allLessons.length;
            const completedLessons = allLessons.filter((l) => l.completed).length;
            const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const currentLesson = allLessons.find((l) => !l.completed) || allLessons[0];

            return (
              <div
                key={course.id}
                className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 relative border border-[#BDCAC0]/50">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#006B47] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h3 className="font-bold text-sm md:text-base text-[#191c1e] truncate leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#707972]">
                      Mentor: <strong className="text-[#191c1e]">{course.instructorName}</strong>
                    </p>

                    {currentLesson && (
                      <div className="text-[11px] text-[#404943] truncate bg-[#F7F9FB] px-2.5 py-1 rounded-md border border-[#BDCAC0]/40">
                        <span className="font-semibold text-[#006B47]">Next: </span>
                        {currentLesson.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar and button */}
                <div className="space-y-2 pt-2 border-t border-[#BDCAC0]/40">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#707972] font-mono">{completedLessons}/{totalLessons} Lessons</span>
                    <span className="text-[#006B47] font-bold">{percentage}%</span>
                  </div>

                  <div className="w-full h-2 bg-[#e1e2e5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006B47] rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-[11px] text-[#707972]">Last accessed today</span>
                    <button
                      onClick={() => navigate(`/student/learning/${course.id}`)}
                      className="bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Upcoming Section & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Live Classes, Quizzes & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#006B47]" /> Upcoming Schedule & Deadlines
              </h3>
              <button
                onClick={() => navigate('/student/live-classes')}
                className="text-xs text-[#006B47] font-bold hover:underline"
              >
                Full Schedule
              </button>
            </div>

            <div className="space-y-3">
              {/* Live class reminder */}
              {liveClasses.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#BA1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Live Broadcast
                      </span>
                      <span className="text-xs font-bold text-[#006B47]">{item.courseTitle}</span>
                    </div>
                    <h4 className="font-bold text-xs text-[#191c1e]">{item.topic}</h4>
                    <p className="text-[11px] text-[#707972] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.startTime} ({item.duration}) with {item.instructorName}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/student/live-classes')}
                    className="bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto cursor-pointer"
                  >
                    Join Live Class
                  </button>
                </div>
              ))}

              {/* Assignment deadline */}
              {assignments.slice(0, 1).map((asg) => (
                <div
                  key={asg.id}
                  className="p-3.5 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#EF9F13]/20 text-[#855300] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FileCheck className="w-3 h-3" /> Assignment Due
                      </span>
                      <span className="text-xs font-bold text-[#006B47]">{asg.courseTitle}</span>
                    </div>
                    <h4 className="font-bold text-xs text-[#191c1e]">{asg.title}</h4>
                    <p className="text-[11px] text-[#707972] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due Date: {asg.dueDate} (Max Marks: {asg.maxMarks})
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/student/assignments')}
                    className="bg-white border border-[#006B47] text-[#006B47] hover:bg-[#71DBA6]/10 text-xs font-bold px-3.5 py-1.5 rounded-lg self-start sm:self-auto cursor-pointer"
                  >
                    Submit Assignment
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Recommended Courses */}
          {recommendedCourses.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#006B47]" /> Recommended for You
                </h3>
                <button
                  onClick={() => navigate('/student/explore')}
                  className="text-xs text-[#006B47] font-bold hover:underline"
                >
                  Explore Catalog
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white border border-[#BDCAC0]/70 rounded-xl p-4 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2.5">
                        <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {rec.level}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#191c1e] line-clamp-1">{rec.title}</h4>
                      <p className="text-[11px] text-[#707972] mt-0.5">{rec.instructorName}</p>
                    </div>

                    <button
                      onClick={() => navigate(`/student/courses/${rec.id}`)}
                      className="w-full py-2 bg-[#F7F9FB] hover:bg-[#006B47] text-[#191c1e] hover:text-white text-xs font-bold rounded-lg transition-all border border-[#BDCAC0]/60 cursor-pointer"
                    >
                      View Curriculum
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Recent Activity Timeline & Notifications */}
        <div className="space-y-6">
          {/* 6. Recent Activity Timeline */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#006B47]" /> Recent Activity
            </h3>

            <div className="space-y-3.5">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#191c1e]">{act.title}</p>
                      <p className="text-[11px] text-[#404943] truncate">{act.detail}</p>
                      <span className="text-[10px] text-[#707972] font-mono">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7. Notifications Preview */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#191c1e] font-display flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#006B47]" /> Recent Alerts
              </h3>
              <button
                onClick={() => navigate('/student/notifications')}
                className="text-[11px] text-[#006B47] font-bold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => navigate('/student/notifications')}
                  className="p-2.5 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/40 text-xs hover:border-[#006B47] transition-colors cursor-pointer space-y-0.5"
                >
                  <p className="font-bold text-[#191c1e] line-clamp-1">{notif.title}</p>
                  <p className="text-[11px] text-[#707972] line-clamp-1">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ask a Doubt Modal */}
      {isDoubtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#BDCAC0]/50 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#006B47]" />
                <h3 className="font-bold text-base text-[#191c1e]">Ask Faculty Mentor</h3>
              </div>
              <button onClick={() => setIsDoubtModalOpen(false)} className="text-[#707972] hover:text-[#191c1e]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoubtSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Related Course *</label>
                <select
                  value={doubtCourseId}
                  onChange={(e) => setDoubtCourseId(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs font-semibold text-[#191c1e]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Question / Doubt Headline *</label>
                <input
                  type="text"
                  required
                  value={doubtTitle}
                  onChange={(e) => setDoubtTitle(e.target.value)}
                  placeholder="e.g. Clarification on AVL rotation balance factors"
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Detailed Explanation / Code *</label>
                <textarea
                  rows={4}
                  required
                  value={doubtDesc}
                  onChange={(e) => setDoubtDesc(e.target.value)}
                  placeholder="Explain exactly what you are trying to solve..."
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsDoubtModalOpen(false)}
                  className="px-4 py-2 font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006B47] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-[#005034] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Doubt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
