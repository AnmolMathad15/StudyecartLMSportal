import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Star,
  Sparkles,
  AlertCircle,
  DollarSign,
  Users,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Course } from '../types';

export const AdminCoursesPage: React.FC = () => {
  const { courses, updateCourse, deleteCourse, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Course inspection & rejection modal state
  const [reviewingCourse, setReviewingCourse] = useState<Course | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'PUBLISHED' && c.published) ||
      (filterStatus === 'DRAFT' && !c.published);

    const matchesCategory = filterCategory === 'ALL' || c.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprove = (courseId: string) => {
    updateCourse(courseId, { published: true });
    showToast('Course approved and published to the public catalog!', 'success');
    if (reviewingCourse?.id === courseId) {
      setReviewingCourse(null);
    }
  };

  const handleReject = () => {
    if (!reviewingCourse) return;
    if (!rejectionReason.trim()) {
      showToast('Please provide a reason for course rejection.', 'error');
      return;
    }
    updateCourse(reviewingCourse.id, { published: false });
    showToast(`Course rejected: "${rejectionReason}". Feedback sent to mentor.`, 'info');
    setShowRejectDialog(false);
    setRejectionReason('');
    setReviewingCourse(null);
  };

  const handleToggleFeatured = (course: Course) => {
    updateCourse(course.id, { featured: !course.featured });
    showToast(course.featured ? 'Removed from featured banner.' : 'Course marked as Featured!', 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-[#006B47]" /> Course Directory & Approval Governance
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Review submitted curricula, verify academic syllabus standards, approve public listings, or request revisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#8af5be]/40 text-[#005034] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#006B47]" /> {courses.length} Accredited Curricula
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search curricula or mentor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#707972]" />
            <span className="text-[11px] font-bold text-[#707972]">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent font-semibold text-xs text-[#191c1e] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published & Live</option>
              <option value="DRAFT">Pending / Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-2.5 py-1.5 text-xs">
            <span className="text-[11px] font-bold text-[#707972]">Discipline:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent font-semibold text-xs text-[#191c1e] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Disciplines</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses List Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FB] text-[#404943] font-bold border-b border-[#BDCAC0]/60 uppercase tracking-wider">
              <tr>
                <th className="p-4">Course Program</th>
                <th className="p-4">Lead Mentor</th>
                <th className="p-4">Category & Modules</th>
                <th className="p-4">Tuition</th>
                <th className="p-4">Enrollment</th>
                <th className="p-4">Review Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/40">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F9FB]/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-[#BDCAC0] flex-shrink-0">
                        <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-sm text-[#191c1e]">{c.title}</p>
                          {c.featured && (
                            <span className="bg-[#EF9F13]/20 text-[#945800] text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" /> Featured
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#707972]">{c.level} • {c.duration}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img src={c.instructorAvatar} alt={c.instructorName} className="w-6 h-6 rounded-full object-cover border border-[#BDCAC0]" />
                      <span className="font-semibold text-[#191c1e]">{c.instructorName}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-[#191c1e]">{c.category}</p>
                    <p className="text-[11px] text-[#707972] flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#006B47]" /> {c.modules?.length || 0} Modules ({c.totalLessons || 0} Lessons)
                    </p>
                  </td>

                  <td className="p-4 font-mono font-bold text-sm text-[#191c1e]">
                    ${c.price}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-[#006B47]">{c.enrolledStudents}</span>
                    <span className="text-[11px] text-[#707972]"> students</span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        c.published
                          ? 'bg-[#8af5be]/50 text-[#00714b]'
                          : 'bg-[#ffdad6] text-[#BA1A1A]'
                      }`}
                    >
                      {c.published ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {c.published ? 'Approved & Live' : 'Under Review / Draft'}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setReviewingCourse(c)}
                        className="px-2.5 py-1.5 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#006B47] rounded-lg text-xs font-bold border border-[#BDCAC0]/60 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Review Syllabus"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>

                      {c.published ? (
                        <button
                          onClick={() => updateCourse(c.id, { published: false })}
                          className="px-2.5 py-1.5 bg-[#ffdad6]/40 hover:bg-[#ffdad6] text-[#BA1A1A] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(c.id)}
                          className="px-2.5 py-1.5 bg-[#006B47] hover:bg-[#005034] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleFeatured(c)}
                        className={`p-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                          c.featured
                            ? 'bg-[#EF9F13]/20 border-[#EF9F13] text-[#945800]'
                            : 'bg-[#F7F9FB] border-[#BDCAC0]/60 text-[#707972] hover:text-[#EF9F13]'
                        }`}
                        title={c.featured ? 'Unfeature' : 'Feature Course'}
                      >
                        <Star className={`w-3.5 h-3.5 ${c.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Detail Inspection Modal */}
      {reviewingCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#BDCAC0]/60 pb-4">
              <div>
                <span className="text-[10px] font-bold bg-[#8af5be]/40 text-[#005034] px-2.5 py-1 rounded-md uppercase">
                  {reviewingCourse.category}
                </span>
                <h3 className="text-xl font-bold text-[#191c1e] font-display mt-2">
                  {reviewingCourse.title}
                </h3>
                <p className="text-xs text-[#707972] mt-0.5">
                  Authored by <strong className="text-[#191c1e]">{reviewingCourse.instructorName}</strong> • {reviewingCourse.level}
                </p>
              </div>
              <button
                onClick={() => setReviewingCourse(null)}
                className="p-1.5 hover:bg-[#F7F9FB] rounded-lg text-[#707972]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#404943] mb-1">
                  Course Subtitle & Abstract
                </h4>
                <p className="text-[#191c1e] bg-[#F7F9FB] p-3 rounded-xl border border-[#BDCAC0]/40 leading-relaxed">
                  {reviewingCourse.subtitle || reviewingCourse.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#404943] mb-1">
                  Curriculum Structure ({reviewingCourse.modules?.length || 0} Modules)
                </h4>
                <div className="space-y-2">
                  {reviewingCourse.modules?.map((m, idx) => (
                    <div key={m.id || idx} className="bg-[#F7F9FB] p-3 rounded-xl border border-[#BDCAC0]/40">
                      <div className="font-bold text-[#191c1e] flex items-center justify-between">
                        <span>Module {idx + 1}: {m.title}</span>
                        <span className="text-[#707972] text-[11px] font-normal">{m.duration} • {m.lessons.length} lessons</span>
                      </div>
                      <div className="mt-2 space-y-1 pl-3 border-l-2 border-[#006B47]">
                        {m.lessons.map((l, lIdx) => (
                          <div key={l.id || lIdx} className="text-[11px] text-[#404943] flex items-center justify-between">
                            <span>{l.title} ({l.type})</span>
                            <span className="text-[#707972] font-mono">{l.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F7F9FB] p-3 rounded-xl border border-[#BDCAC0]/40">
                <div>
                  <span className="text-[#707972] block text-[10px] uppercase font-bold">Standard Tuition</span>
                  <span className="text-base font-bold font-mono text-[#006B47]">${reviewingCourse.price}</span>
                </div>
                <div>
                  <span className="text-[#707972] block text-[10px] uppercase font-bold">Current Enrolled</span>
                  <span className="text-base font-bold font-mono text-[#191c1e]">{reviewingCourse.enrolledStudents} students</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-[#BDCAC0]/60 pt-4 flex items-center justify-between">
              <button
                onClick={() => setShowRejectDialog(true)}
                className="px-4 py-2 bg-[#ffdad6]/40 hover:bg-[#ffdad6] text-[#BA1A1A] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Reject / Request Revisions
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReviewingCourse(null)}
                  className="px-4 py-2 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#404943] rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApprove(reviewingCourse.id)}
                  className="px-5 py-2 bg-[#006B47] hover:bg-[#005034] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" /> Approve & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#BA1A1A]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold text-base font-display">Provide Rejection Feedback</h3>
            </div>
            <p className="text-xs text-[#707972]">
              Specify required improvements before this course can be approved for student enrollment:
            </p>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Please add minimum 3 module quizzes and expand the differential calculus video duration..."
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-3 text-xs text-[#191c1e] focus:outline-none focus:border-[#BA1A1A]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="px-4 py-2 bg-[#F7F9FB] text-xs font-bold text-[#404943] rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 bg-[#BA1A1A] hover:bg-[#93000a] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
