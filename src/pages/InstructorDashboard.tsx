import React from 'react';
import { useLms } from '../context/LmsContext';
import { MetricCard } from '../components/MetricCard';
import { CourseCard } from '../components/CourseCard';
import { CalendarWidget } from '../components/CalendarWidget';
import { RecentActivityFeed } from '../components/RecentActivityFeed';
import { ScheduleTable } from '../components/ScheduleTable';
import {
  GraduationCap,
  Users,
  MessageSquare,
  FileCheck2,
  Plus,
  ArrowRight,
  Sparkles,
  Video,
  FileQuestion,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';

export const InstructorDashboard: React.FC = () => {
  const { currentUser, courses, doubts, assignments, quizzes, liveClasses, navigate } = useLms();

  const publishedCourses = courses.filter((c) => c.published);
  const draftCourses = courses.filter((c) => !c.published);
  const pendingDoubts = doubts.filter((d) => d.status === 'PENDING');
  const pendingAssignments = assignments.filter((a) => a.status === 'PENDING');
  const upcomingLiveCount = liveClasses.filter((l) => l.status === 'UPCOMING' || l.status === 'LIVE').length;
  const totalStudentsCount = courses.reduce((acc, c) => acc + c.enrolledStudents, 0);

  // Compute average course syllabus completion
  const avgCompletion = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + (c.syllabusCompletion || 0), 0) / courses.length)
    : 78;

  return (
    <div className="space-y-8 relative overflow-hidden pb-12">
      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8DF7C1]/15 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      {/* Header with Persona and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-widest bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Mentor Command Center
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs font-semibold text-[#707972]">Academic Term 2024–2025</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#191c1e] tracking-tight font-display">
            Welcome back, <span className="text-[#006B47]">{currentUser?.name || 'Dr. Aris'}</span>
          </h2>
          <p className="text-sm md:text-base text-[#404943] mt-1.5 leading-relaxed">
            Manage your courses, conduct live broadcasts, evaluate submissions, and answer student queries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/mentor/announcements')}
            className="bg-white border border-[#BDCAC0] text-[#006B47] hover:bg-[#71DBA6]/10 font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" /> New Announcement
          </button>
          <button
            onClick={() => navigate('/mentor/courses/builder')}
            className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4" /> Create Course
          </button>
        </div>
      </div>

      {/* Teaching Command Center — Action Shortcuts */}
      <section className="bg-gradient-to-r from-[#003722] via-[#005034] to-[#006B47] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8DF7C1] animate-ping" />
            <h3 className="text-xs font-bold text-[#8DF7C1] uppercase tracking-wider font-mono">
              Action Required Today
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Action 1: Pending Evaluations */}
            <div
              onClick={() => navigate('/mentor/assignments')}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all cursor-pointer group backdrop-blur-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#8DF7C1] font-bold mb-1">
                <span>Assignments Queue</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-2xl font-bold font-display">{pendingAssignments.length} to Evaluate</p>
              <p className="text-[11px] text-white/80 mt-1">Pending laboratory submissions</p>
            </div>

            {/* Action 2: Unanswered Doubts */}
            <div
              onClick={() => navigate('/mentor/doubts')}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all cursor-pointer group backdrop-blur-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#EF9F13] font-bold mb-1">
                <span>Student Q&A</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-2xl font-bold font-display">{pendingDoubts.length} Open Doubts</p>
              <p className="text-[11px] text-white/80 mt-1">Students waiting for explanation</p>
            </div>

            {/* Action 3: Live Classes Today */}
            <div
              onClick={() => navigate('/mentor/live-classes')}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all cursor-pointer group backdrop-blur-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#8DF7C1] font-bold mb-1">
                <span>Live Broadcast</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-2xl font-bold font-display">{upcomingLiveCount} Scheduled</p>
              <p className="text-[11px] text-white/80 mt-1">Next session in 45 minutes</p>
            </div>

            {/* Action 4: Course Builder Progress */}
            <div
              onClick={() => navigate('/mentor/courses/builder')}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 transition-all cursor-pointer group backdrop-blur-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#8DF7C1] font-bold mb-1">
                <span>Curriculum Status</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-2xl font-bold font-display">{avgCompletion}% Ready</p>
              <p className="text-[11px] text-white/80 mt-1">Average syllabus development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary KPI Metrics Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg md:text-xl text-[#191c1e] font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#006B47]" /> Teaching & Cohort Overview
          </h3>
          <span className="text-xs text-[#707972]">Auto-synced with MySQL Database</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={GraduationCap}
            value={publishedCourses.length || 4}
            label="Active Courses"
            iconColor="text-[#006B47]"
            onClick={() => navigate('/mentor/courses')}
          />
          <MetricCard
            icon={Users}
            value={totalStudentsCount || 284}
            label="Total Enrolled Students"
            iconColor="text-[#006B47]"
            onClick={() => navigate('/mentor/students')}
          />
          <MetricCard
            icon={MessageSquare}
            value={pendingDoubts.length || 5}
            label="Pending Doubts"
            iconColor="text-[#EF9F13]"
            onClick={() => navigate('/mentor/doubts')}
          />
          <MetricCard
            icon={FileCheck2}
            value={pendingAssignments.length || 12}
            label="Pending Evaluations"
            iconColor="text-[#006B47]"
            onClick={() => navigate('/mentor/assignments')}
          />
        </div>
      </section>

      {/* Secondary Teaching Analytics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
        <div className="border-r border-[#BDCAC0]/40 last:border-0 pr-4">
          <span className="text-[11px] font-bold text-[#707972] uppercase tracking-wider">Published Courses</span>
          <p className="text-2xl font-bold text-[#006B47] font-display mt-0.5">{publishedCourses.length}</p>
          <span className="text-[10px] text-[#707972]">{draftCourses.length} in Draft Status</span>
        </div>
        <div className="border-r border-[#BDCAC0]/40 last:border-0 pr-4 pl-2">
          <span className="text-[11px] font-bold text-[#707972] uppercase tracking-wider">Active Quizzes</span>
          <p className="text-2xl font-bold text-[#191c1e] font-display mt-0.5">{quizzes.length}</p>
          <span className="text-[10px] text-[#006B47] font-bold">88.4% Pass Rate</span>
        </div>
        <div className="border-r border-[#BDCAC0]/40 last:border-0 pr-4 pl-2">
          <span className="text-[11px] font-bold text-[#707972] uppercase tracking-wider">Avg Syllabus Progress</span>
          <p className="text-2xl font-bold text-[#006B47] font-display mt-0.5">{avgCompletion}%</p>
          <span className="text-[10px] text-[#707972]">Across all active modules</span>
        </div>
        <div className="pl-2">
          <span className="text-[11px] font-bold text-[#707972] uppercase tracking-wider">Student Engagement</span>
          <p className="text-2xl font-bold text-[#006B47] font-display mt-0.5">94.2%</p>
          <span className="text-[10px] text-[#006B47] font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> Top 5% Mentors
          </span>
        </div>
      </div>

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main 2 Cols: Course Overview & Live Schedule */}
        <div className="xl:col-span-2 space-y-8">
          {/* Mentor Courses Overview */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg md:text-xl text-[#191c1e] font-display">
                  My Authored Courses
                </h3>
                <p className="text-xs text-[#707972]">Courses designed and taught by you.</p>
              </div>
              <button
                onClick={() => navigate('/mentor/courses')}
                className="text-[#006B47] font-bold text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer"
              >
                Manage All Courses <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-video mb-3 bg-[#f2f4f6]">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                        {course.category}
                      </span>
                      <span className="absolute top-2.5 right-2.5 bg-[#8af5be] text-[#005034] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {course.batch || 'Batch A1'}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#191c1e] font-display line-clamp-1 mb-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#404943] line-clamp-2 mb-3">
                      {course.description}
                    </p>

                    {/* Progress & Stats */}
                    <div className="space-y-2 mb-4 pt-2 border-t border-[#BDCAC0]/30">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#707972]">Content Syllabus Progress:</span>
                        <span className="font-bold text-[#006B47]">{course.syllabusCompletion || 75}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006B47] rounded-full"
                          style={{ width: `${course.syllabusCompletion || 75}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#707972]">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#006B47]" /> {course.enrolledStudents} Enrolled
                        </span>
                        <span>⭐ {course.rating.toFixed(1)} Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#BDCAC0]/40">
                    <button
                      onClick={() => navigate('/mentor/courses/builder')}
                      className="px-3 py-2 bg-[#F7F9FB] hover:bg-[#71DBA6]/20 text-[#006B47] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Builder
                    </button>
                    <button
                      onClick={() => navigate('/mentor/students')}
                      className="px-3 py-2 bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" /> Students
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Live Classes Schedule */}
          <ScheduleTable />
        </div>

        {/* Sidebar 1 Col: Calendar & Activity Feed */}
        <div className="space-y-6">
          <CalendarWidget />
          <RecentActivityFeed />
        </div>
      </div>
    </div>
  );
};
