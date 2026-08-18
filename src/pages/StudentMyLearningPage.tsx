import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Course } from '../types';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';

export const StudentMyLearningPage: React.FC = () => {
  const { courses, enrolledCourseIds, navigate } = useLms();
  const [activeTab, setActiveTab] = useState<'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter only courses the student is enrolled in
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  const getCourseStatus = (course: Course): 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
      0
    );
    if (completedLessons === 0) return 'NOT_STARTED';
    if (completedLessons >= totalLessons && totalLessons > 0) return 'COMPLETED';
    return 'IN_PROGRESS';
  };

  const getCourseProgress = (course: Course) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = course.modules.reduce(
      (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
      0
    );
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    return { totalLessons, completedLessons, percentage };
  };

  const filteredCourses = enrolledCourses.filter((course) => {
    const status = getCourseStatus(course);
    const matchesTab = activeTab === 'ALL' || status === activeTab;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalEnrolled = enrolledCourses.length;
  const inProgressCount = enrolledCourses.filter((c) => getCourseStatus(c) === 'IN_PROGRESS').length;
  const completedCount = enrolledCourses.filter((c) => getCourseStatus(c) === 'COMPLETED').length;
  const notStartedCount = enrolledCourses.filter((c) => getCourseStatus(c) === 'NOT_STARTED').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            My Learning
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Track your ongoing courses, review completed curricula, and resume lessons.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/explore')}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" /> Explore More Courses
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-4 md:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'ALL'
                  ? 'bg-[#006B47] text-white shadow-2xs'
                  : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/30'
              }`}
            >
              All Courses ({totalEnrolled})
            </button>
            <button
              onClick={() => setActiveTab('IN_PROGRESS')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'IN_PROGRESS'
                  ? 'bg-[#006B47] text-white shadow-2xs'
                  : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/30'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'COMPLETED'
                  ? 'bg-[#006B47] text-white shadow-2xs'
                  : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/30'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setActiveTab('NOT_STARTED')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'NOT_STARTED'
                  ? 'bg-[#006B47] text-white shadow-2xs'
                  : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/30'
              }`}
            >
              Not Started ({notStartedCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search enrolled courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs focus:outline-none focus:border-[#006B47]"
            />
          </div>
        </div>
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#BDCAC0] mx-auto" />
          <h3 className="text-lg font-bold text-[#191c1e] font-display">No courses found</h3>
          <p className="text-xs text-[#707972] max-w-md mx-auto">
            {searchQuery
              ? 'No enrolled courses match your search criteria. Try a different term.'
              : 'You have not enrolled in any courses in this category yet.'}
          </p>
          <button
            onClick={() => navigate('/student/explore')}
            className="px-5 py-2.5 bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Browse Course Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const { totalLessons, completedLessons, percentage } = getCourseProgress(course);
            const status = getCourseStatus(course);

            // Find current active lesson
            const allLessons = course.modules.flatMap((m) => m.lessons);
            const nextUncompletedLesson = allLessons.find((l) => !l.completed) || allLessons[0];

            return (
              <div
                key={course.id}
                className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {status === 'COMPLETED' && (
                        <span className="bg-[#8af5be] text-[#005034] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                      {status === 'IN_PROGRESS' && (
                        <span className="bg-[#006B47] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                          In Progress
                        </span>
                      )}
                      {status === 'NOT_STARTED' && (
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                          Not Started
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-[#8DF7C1] font-bold uppercase tracking-wider block">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-sm leading-snug line-clamp-1">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#707972]">
                      <span>Mentor: <strong className="text-[#191c1e]">{course.instructorName}</strong></span>
                      <span className="font-mono">{completedLessons}/{totalLessons} Lessons</span>
                    </div>

                    {/* Next Lesson Tracker */}
                    {nextUncompletedLesson && status !== 'COMPLETED' && (
                      <div className="p-2.5 bg-[#F7F9FB] rounded-lg border border-[#BDCAC0]/40 text-xs">
                        <span className="text-[10px] font-bold text-[#707972] uppercase tracking-wider block">
                          Current Lesson:
                        </span>
                        <p className="font-semibold text-[#191c1e] truncate mt-0.5">
                          {nextUncompletedLesson.title}
                        </p>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#707972]">Course Progress</span>
                        <span className="text-[#006B47] font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#e1e2e5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006B47] rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate(`/student/learning/${course.id}`)}
                    className="w-full py-2.5 bg-[#006B47] hover:bg-[#005034] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {status === 'COMPLETED' ? 'Review Lessons' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
