import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
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
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  SlidersHorizontal,
  FolderKanban
} from 'lucide-react';

export const InstructorCoursesPage: React.FC = () => {
  const { courses, deleteCourse, updateCourse, navigate, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'PENDING' | 'UNPUBLISHED'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'students' | 'rating' | 'title'>('updated');

  const categories = ['All', 'Data Science & AI', 'Mathematics & Algorithms', 'Software Engineering', 'Cloud & DevOps'];
  const batches = ['All', 'Batch B2', 'Batch A1', 'Batch S3'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesBatch = selectedBatch === 'All' || course.batch === selectedBatch;

    if (activeTab === 'PUBLISHED') return matchesSearch && matchesCat && matchesBatch && course.published;
    if (activeTab === 'DRAFT') return matchesSearch && matchesCat && matchesBatch && !course.published;
    if (activeTab === 'PENDING') return matchesSearch && matchesCat && matchesBatch && !course.published;
    if (activeTab === 'UNPUBLISHED') return matchesSearch && matchesCat && matchesBatch && !course.published;
    return matchesSearch && matchesCat && matchesBatch;
  }).sort((a, b) => {
    if (sortBy === 'students') return b.enrolledStudents - a.enrolledStudents;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return (b.updatedAt || '').localeCompare(a.updatedAt || '');
  });

  const handleTogglePublish = (course: Course) => {
    updateCourse(course.id, { published: !course.published });
    showToast(course.published ? `Course "${course.title}" moved to unlisted draft.` : `Course "${course.title}" published to catalog!`);
  };

  const handleDelete = (courseId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Course Management
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{courses.length} Authored Courses</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            My Courses & Syllabi
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Manage course curriculum, syllabus modules, video lectures, student cohorts, and approval requests.
          </p>
        </div>

        <button
          onClick={() => navigate('/mentor/courses/builder')}
          className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* Tabs Filter Bar (All, Published, Draft, Pending Approval, Unpublished) */}
      <div className="flex flex-wrap gap-2 border-b border-[#BDCAC0]/40 pb-3">
        {[
          { id: 'ALL', label: 'All Courses', count: courses.length },
          { id: 'PUBLISHED', label: 'Published & Active', count: courses.filter(c => c.published).length },
          { id: 'DRAFT', label: 'Drafts', count: courses.filter(c => !c.published).length },
          { id: 'PENDING', label: 'Pending Review', count: 1 },
          { id: 'UNPUBLISHED', label: 'Archived / Unlisted', count: 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#006B47] text-white shadow-2xs'
                : 'bg-white text-[#404943] hover:bg-[#f2f4f6] border border-[#BDCAC0]/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-[#e7e8eb] text-[#191c1e]'
            }`}>
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
            placeholder="Search by course title, syllabus topic, or keywords..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl text-xs md:text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-[#707972] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl px-3 py-2 text-xs font-semibold text-[#191c1e] focus:outline-hidden"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Batch Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#707972]">Cohort:</span>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl px-3 py-2 text-xs font-semibold text-[#191c1e] focus:outline-hidden"
          >
            {batches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#707972] flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl px-3 py-2 text-xs font-semibold text-[#191c1e] focus:outline-hidden"
          >
            <option value="updated">Recently Updated</option>
            <option value="students">Most Students</option>
            <option value="rating">Highest Rating</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid of Courses */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-[#707972] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#191c1e] font-display">No courses found</h3>
          <p className="text-xs text-[#707972] mt-1 max-w-md mx-auto">
            Try adjusting your search criteria or create a new course using the curriculum builder.
          </p>
          <button
            onClick={() => navigate('/mentor/courses/builder')}
            className="mt-4 bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Build Course Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Status Badges */}
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3.5 bg-[#f2f4f6]">
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
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                      course.published
                        ? 'bg-[#8af5be] text-[#005034]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#191c1e] font-display line-clamp-1 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-[#404943] line-clamp-2 mb-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Metadata Roster */}
                <div className="space-y-2 mb-4 pt-2 border-t border-[#BDCAC0]/30 text-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#707972]">Curriculum Ready:</span>
                    <span className="font-bold text-[#006B47]">{course.syllabusCompletion || 75}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006B47] rounded-full"
                      style={{ width: `${course.syllabusCompletion || 75}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#707972] pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#006B47]" /> {course.enrolledStudents} Students
                    </span>
                    <span>⭐ {course.rating.toFixed(1)} ({course.reviewCount || 34} reviews)</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#707972]">
                    <span>Modules: {course.modules.length}</span>
                    <span>Batch: {course.batch || 'Batch A1'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-2 pt-3 border-t border-[#BDCAC0]/40">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate('/mentor/courses/builder')}
                    className="px-3 py-2 bg-[#F7F9FB] hover:bg-[#71DBA6]/20 text-[#006B47] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 border border-[#BDCAC0]/50"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Curriculum
                  </button>
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="px-3 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#191c1e] font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 border border-[#BDCAC0]/50"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleTogglePublish(course)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                      course.published
                        ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/40'
                        : 'text-[#006B47] hover:bg-[#71DBA6]/20'
                    }`}
                  >
                    {course.published ? 'Unpublish' : 'Publish Course'}
                  </button>

                  <button
                    onClick={() => handleDelete(course.id, course.title)}
                    className="text-[#ba1a1a] hover:bg-[#ffdad6]/40 p-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Delete Course"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
