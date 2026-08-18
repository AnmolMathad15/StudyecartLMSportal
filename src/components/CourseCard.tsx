import React from 'react';
import { Course } from '../types';
import { useLms } from '../context/LmsContext';
import { Star, Clock, BookOpen, CheckCircle, Users } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  mode?: 'instructor' | 'student' | 'public';
  onAction?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, mode, onAction }) => {
  const { currentRole, navigate, enrolledCourseIds, enrollInCourse } = useLms();

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const activeMode = mode || (currentRole === 'INSTRUCTOR' ? 'instructor' : currentRole === 'STUDENT' ? 'student' : 'public');

  const handleButtonClick = () => {
    if (onAction) {
      onAction();
      return;
    }

    if (activeMode === 'instructor') {
      navigate(`/instructor/courses/${course.id}/edit`);
    } else if (activeMode === 'student') {
      if (isEnrolled) {
        navigate(`/student/learning/${course.id}`);
      } else {
        enrollInCourse(course.id);
      }
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  const completion = course.syllabusCompletion || 0;

  return (
    <div className="bg-white border border-[#BDCAC0]/70 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group">
      {/* Thumbnail */}
      <div className="h-36 bg-[#f2f4f6] relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.batch && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md font-semibold text-xs text-[#005034] shadow-2xs border border-[#BDCAC0]/40">
            {course.batch}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#005034]/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-white">
          {course.level}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#707972] mb-1.5">
            <span className="font-medium text-[#006B47]">{course.category}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-[#EF9F13] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#EF9F13]" /> {course.rating}
            </span>
            <span className="text-[11px]">({course.reviewCount})</span>
          </div>

          <h4
            onClick={() => navigate(`/courses/${course.id}`)}
            className="font-bold text-base md:text-lg leading-snug text-[#191c1e] hover:text-[#006B47] transition-colors cursor-pointer line-clamp-2 mb-2 font-display"
          >
            {course.title}
          </h4>

          {course.subtitle && (
            <p className="text-xs text-[#404943] line-clamp-2 mb-4 leading-relaxed">
              {course.subtitle}
            </p>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-[#BDCAC0]/30 space-y-3">
          {/* Syllabus Completion bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#404943]">Syllabus Completion</span>
              <span className="text-[#006B47] font-bold">{completion}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#006B47] rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>

          {/* Card footer: avatars & action button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex -space-x-2 items-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
              <div className="w-7 h-7 rounded-full bg-[#e1e2e5] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#404943]">
                +{course.enrolledStudents > 50 ? course.enrolledStudents - 2 : '32'}
              </div>
            </div>

            <button
              onClick={handleButtonClick}
              className={`font-semibold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeMode === 'instructor'
                  ? 'bg-white border border-[#BDCAC0] text-[#006B47] hover:bg-[#71DBA6]/15 active:scale-95'
                  : isEnrolled
                  ? 'bg-[#006B47] text-white hover:bg-[#005034] shadow-xs active:scale-95'
                  : 'bg-[#8af5be] text-[#00714b] hover:bg-[#71DBA6] font-bold active:scale-95'
              }`}
            >
              {activeMode === 'instructor'
                ? 'Manage'
                : isEnrolled
                ? 'Continue'
                : `Enroll • $${course.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
