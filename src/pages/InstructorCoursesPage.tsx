import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Course, CourseStatus } from '../types';
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Users,
  Star,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  SlidersHorizontal,
  FolderKanban,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  DollarSign,
  Share2,
  ShieldCheck,
  BarChart2
} from 'lucide-react';

export const InstructorCoursesPage: React.FC = () => {
  const {
    courses,
    deleteCourse,
    submitCourseForApproval,
    publishCourse,
    unpublishCourse,
    createDraftCourse,
    navigate,
    showToast
  } = useLms();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PUBLISHED' | 'PENDING_APPROVAL' | 'DRAFT' | 'REJECTED' | 'UNPUBLISHED'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'students' | 'rating' | 'title'>('updated');

  const categories = ['All', 'Data Science & AI', 'Mathematics & Algorithms', 'Software Engineering', 'Cloud & DevOps', 'Cybersecurity & Networks'];
  const batches = ['All', 'Batch B1', 'Batch B2', 'Batch A1', 'Batch S3'];

  // Metrics calculations
  const totalCourses = courses.length;
  const publishedCount = courses.filter((c) => c.status === 'PUBLISHED' || c.published).length;
  const pendingCount = courses.filter((c) => c.status === 'PENDING_APPROVAL').length;
  const draftCount = courses.filter((c) => c.status === 'DRAFT' || (!c.status && !c.published)).length;
  const rejectedCount = courses.filter((c) => c.status === 'REJECTED').length;
  const totalEnrolled = courses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0);
  const totalRevenue = courses.reduce((acc, c) => acc + (c.enrolledStudents || 0) * (c.price || 0), 0);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.instructorName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesBatch = selectedBatch === 'All' || course.batch === selectedBatch;

    const courseStatus = course.status || (course.published ? 'PUBLISHED' : 'DRAFT');

    if (activeTab === 'PUBLISHED') return matchesSearch && matchesCat && matchesBatch && (courseStatus === 'PUBLISHED' || course.published);
    if (activeTab === 'PENDING_APPROVAL') return matchesSearch && matchesCat && matchesBatch && courseStatus === 'PENDING_APPROVAL';
    if (activeTab === 'DRAFT') return matchesSearch && matchesCat && matchesBatch && courseStatus === 'DRAFT';
    if (activeTab === 'REJECTED') return matchesSearch && matchesCat && matchesBatch && courseStatus === 'REJECTED';
    if (activeTab === 'UNPUBLISHED') return matchesSearch && matchesCat && matchesBatch && courseStatus === 'UNPUBLISHED';

    return matchesSearch && matchesCat && matchesBatch;
  }).sort((a, b) => {
    if (sortBy === 'students') return b.enrolledStudents - a.enrolledStudents;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return (b.updatedAt || '').localeCompare(a.updatedAt || '');
  });

  const handleCreateNew = () => {
    const newDraft = createDraftCourse({
      title: 'New Course Syllabus',
      category: 'Data Science & AI',
      batch: 'Batch B1'
    });
    navigate(`/instructor/courses/edit/${newDraft.id}`);
  };

  const handleDelete = (course: Course) => {
    if (course.enrolledStudents > 0) {
      showToast(`Cannot delete "${course.title}": ${course.enrolledStudents} students are currently enrolled. Unpublish instead.`, 'error');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete "${course.title}"?`)) {
      const res = deleteCourse(course.id);
      if (!res.success) {
        showToast(res.message, 'error');
      }
    }
  };

  const handleSubmitForApproval = (courseId: string) => {
    const res = submitCourseForApproval(courseId);
    if (!res.success) {
      showToast(`Cannot submit: ${res.errors.join(' ')}`, 'error');
      navigate(`/instructor/courses/edit/${courseId}`);
    }
  };

  const getStatusBadge = (status?: CourseStatus, published?: boolean) => {
    const effectiveStatus = status || (published ? 'PUBLISHED' : 'DRAFT');
    switch (effectiveStatus) {
      case 'PUBLISHED':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Live & Published</span>;
      case 'PENDING_APPROVAL':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><Clock className="w-3 h-3" /> Under Review</span>;
      case 'APPROVED':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Approved</span>;
      case 'REJECTED':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Revision Needed</span>;
      case 'UNPUBLISHED':
        return <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Unlisted</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Draft</span>;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Mentor Academic Portal
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{totalCourses} Authored Courses</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Course Management & Syllabi
          </h1>
          <p className="text-xs md:text-sm text-[#404943] mt-1">
            Create, build curricula, submit for institutional approval, manage student cohorts, and monitor course analytics.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Total Courses</span>
            <BookOpen className="w-4 h-4 text-[#006B47]" />
          </div>
          <p className="text-xl font-bold text-[#191c1e] font-display">{totalCourses}</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Live & Active</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-emerald-700 font-display">{publishedCount}</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Under Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-bold text-amber-700 font-display">{pendingCount}</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Drafts / Revisions</span>
            <Edit className="w-4 h-4 text-[#404943]" />
          </div>
          <p className="text-xl font-bold text-[#191c1e] font-display">{draftCount + rejectedCount}</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Active Learners</span>
            <Users className="w-4 h-4 text-[#006B47]" />
          </div>
          <p className="text-xl font-bold text-[#191c1e] font-display">{totalEnrolled.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#707972] mb-1">
            <span className="text-xs font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-[#191c1e] font-display">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex flex-wrap gap-2 border-b border-[#BDCAC0]/50 pb-3">
        {[
          { id: 'ALL', label: 'All Courses', count: totalCourses },
          { id: 'PUBLISHED', label: 'Published & Live', count: publishedCount },
          { id: 'PENDING_APPROVAL', label: 'Pending Review', count: pendingCount },
          { id: 'DRAFT', label: 'Drafts', count: draftCount },
          { id: 'REJECTED', label: 'Needs Revision', count: rejectedCount },
          { id: 'UNPUBLISHED', label: 'Unlisted', count: courses.filter((c) => c.status === 'UNPUBLISHED').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#006B47] text-white shadow-2xs'
                : 'bg-white text-[#404943] hover:bg-[#8af5be]/20 hover:text-[#006B47] border border-[#BDCAC0]/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-[#191c1e]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by title, syllabus module, instructor or topic..."
            className="w-full pl-10 pr-4 py-2 bg-[#F2F4F7] border border-[#BDCAC0]/70 rounded-xl text-xs md:text-sm text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white"
          />
        </div>

        {/* Category & Batch & Sort */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#707972]">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#F2F4F7] border border-[#BDCAC0]/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#191c1e] focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#707972]">Cohort:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-[#F2F4F7] border border-[#BDCAC0]/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#191c1e] focus:outline-none"
            >
              {batches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#707972]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#F2F4F7] border border-[#BDCAC0]/70 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#191c1e] focus:outline-none"
            >
              <option value="updated">Recently Updated</option>
              <option value="students">Most Students</option>
              <option value="rating">Highest Rating</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-12 text-center shadow-2xs">
          <BookOpen className="w-12 h-12 text-[#707972] mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-[#191c1e] font-display">No courses found</h3>
          <p className="text-xs text-[#707972] mt-1 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'All'
              ? 'No courses matched your current filter criteria. Try resetting filters.'
              : 'You have not created any courses in this tab yet. Start building your first course syllabus!'}
          </p>
          <button
            onClick={handleCreateNew}
            className="mt-4 bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" /> Create Course Syllabus
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-[#006B47]/40"
            >
              <div>
                {/* Thumbnail with Status Badges */}
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3.5 bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    {getStatusBadge(course.status, course.published)}
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#191c1e] font-display line-clamp-1 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-[#404943] line-clamp-2 mb-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Rejection Notice if applicable */}
                {course.status === 'REJECTED' && course.rejectionReason && (
                  <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800">
                    <span className="font-bold">Admin Feedback: </span>
                    {course.rejectionReason}
                  </div>
                )}

                {/* Course Metadata Summary */}
                <div className="space-y-2 mb-4 pt-2 border-t border-[#BDCAC0]/40 text-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#707972]">Curriculum Readiness:</span>
                    <span className="font-bold text-[#006B47]">
                      {course.modules.length >= 1 ? '100%' : 'Needs Modules'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006B47] rounded-full"
                      style={{ width: `${course.modules.length >= 1 ? 100 : 25}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#707972] pt-1">
                    <span className="flex items-center gap-1 font-semibold text-[#191c1e]">
                      <Users className="w-3.5 h-3.5 text-[#006B47]" /> {course.enrolledStudents} Students
                    </span>
                    <span className="font-semibold text-amber-600">
                      ⭐ {course.rating > 0 ? course.rating.toFixed(1) : 'New'} ({course.reviewCount || 0} reviews)
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#707972]">
                    <span>Modules: <strong className="text-[#191c1e]">{course.modules.length}</strong> ({course.totalLessons} lessons)</span>
                    <span>Cohort: <strong className="text-[#191c1e]">{course.batch || 'Batch B1'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-[#BDCAC0]/40">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/instructor/courses/edit/${course.id}`)}
                    className="px-3 py-2 bg-[#8af5be]/20 hover:bg-[#8af5be]/40 text-[#006B47] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 border border-[#006B47]/20"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit Syllabus
                  </button>

                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="px-3 py-2 bg-[#F2F4F7] hover:bg-[#e7e8eb] text-[#191c1e] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 border border-[#BDCAC0]/50"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {course.status === 'DRAFT' || course.status === 'REJECTED' || !course.status ? (
                    <button
                      onClick={() => handleSubmitForApproval(course.id)}
                      className="text-xs font-bold text-[#006B47] hover:text-[#005034] hover:bg-[#8af5be]/20 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit for Review
                    </button>
                  ) : course.status === 'PENDING_APPROVAL' ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      Pending Admin Decision
                    </span>
                  ) : course.published ? (
                    <button
                      onClick={() => unpublishCourse(course.id)}
                      className="text-[11px] font-bold text-amber-700 hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => publishCourse(course.id)}
                      className="text-[11px] font-bold text-[#006B47] hover:bg-[#8af5be]/20 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Publish Live
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(course)}
                    className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                    title={course.enrolledStudents > 0 ? 'Cannot delete active course' : 'Delete Course'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
