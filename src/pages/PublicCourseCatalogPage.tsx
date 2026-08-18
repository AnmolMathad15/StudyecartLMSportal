import React, { useState, useMemo } from 'react';
import { useLms } from '../context/LmsContext';
import { CourseCard } from '../components/CourseCard';
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  Filter,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const PublicCourseCatalogPage: React.FC = () => {
  const { courses, categories, navigate } = useLms();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
      const matchLevel = selectedLevel === 'ALL' || c.level === selectedLevel;
      const matchSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchLevel && matchSearch && c.published;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.enrolledStudents - a.enrolledStudents;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [courses, selectedCategory, selectedLevel, searchQuery, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#006B47] to-[#005034] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-white/20 backdrop-blur-xs text-[#8DF7C1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Academic Course Catalog
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Explore World-Class Engineering Programs
          </h1>
          <p className="text-sm md:text-base text-[#BDCAC0] leading-relaxed">
            Gain mastery in Data Science, Machine Learning, Applied Calculus, and System Architectures with hands-on labs and live faculty mentorship.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl p-4 md:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or professor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm focus:outline-none focus:border-[#006B47] transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#404943]">
              <Filter className="w-4 h-4 text-[#707972]" />
              <span>Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg px-2.5 py-1.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                <option value="ALL">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#404943]">
              <ArrowUpDown className="w-4 h-4 text-[#707972]" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg px-2.5 py-1.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                <option value="popular">Most Enrolled</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newly Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#006B47] text-white shadow-xs'
                : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/40'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#006B47] text-white shadow-xs'
                  : 'bg-[#F7F9FB] text-[#404943] hover:bg-[#BDCAC0]/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#191c1e] font-display">
            Available Curricula ({filteredCourses.length})
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-[#BDCAC0]/60 rounded-xl p-12 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-[#BDCAC0] mx-auto" />
            <h3 className="text-base font-bold text-[#191c1e]">No matching courses found</h3>
            <p className="text-xs text-[#707972]">
              Try relaxing your search terms or selecting a different discipline filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} mode="public" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
