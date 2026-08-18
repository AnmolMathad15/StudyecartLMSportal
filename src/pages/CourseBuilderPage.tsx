import React, { useState, useEffect } from 'react';
import { useLms } from '../context/LmsContext';
import { Module, Lesson, Course, LessonResource } from '../types';
import { MentorApiService } from '../services/api';
import {
  Plus,
  Trash2,
  Video,
  FileText,
  HelpCircle,
  Paperclip,
  CheckCircle2,
  Save,
  ArrowLeft,
  Sparkles,
  Layers,
  Clock,
  Code2,
  Upload,
  BookOpen,
  FileCheck,
  Eye,
  Send,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Play,
  Award,
  DollarSign,
  Tag,
  Check,
  ExternalLink,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

const PRESET_THUMBNAILS = [
  { name: 'Data Science & AI', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80' },
  { name: 'Software Engineering', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80' },
  { name: 'Mathematics & Algorithms', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80' },
  { name: 'Cloud & DevOps', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80' },
  { name: 'Cybersecurity', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80' }
];

const SAMPLE_VIDEOS = [
  { label: 'Sample Video 1 (Big Buck Bunny)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { label: 'Sample Video 2 (Elephants Dream)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { label: 'Sample Video 3 (For Bigger Blazes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { label: 'Sample Video 4 (Tears of Steel)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
  { label: 'Sample Video 5 (Sintel)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
];

export const CourseBuilderPage: React.FC = () => {
  const { courses, createDraftCourse, updateCourse, submitCourseForApproval, publishCourse, currentRoute, navigate, showToast } = useLms();

  // Extract courseId from current route if editing (e.g. /instructor/courses/edit/course-ds-101 or /instructor/courses/builder/course-ds-101)
  const isNewRoute = currentRoute === '/instructor/courses/new' || currentRoute === '/mentor/courses/builder';
  const routeParts = currentRoute.split('/');
  const routeCourseId = !isNewRoute && routeParts.length >= 4 ? routeParts[routeParts.length - 1] : null;

  // Active loaded course state
  const [courseId, setCourseId] = useState<string | null>(routeCourseId);
  const existingCourse = courses.find((c) => c.id === courseId) || null;

  const [activeTab, setActiveTab] = useState<'info' | 'curriculum' | 'settings' | 'validation' | 'preview'>('info');

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Data Science & AI');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Intermediate');
  const [language, setLanguage] = useState('English');
  const [batch, setBatch] = useState('Batch B1');
  const [price, setPrice] = useState(99);
  const [originalPrice, setOriginalPrice] = useState(199);
  const [duration, setDuration] = useState('10 Weeks');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80');
  const [certificateEligible, setCertificateEligible] = useState(true);

  // Dynamic lists
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [newOutcome, setNewOutcome] = useState('');
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [newAudience, setNewAudience] = useState('');

  // Curriculum Modules & Lessons
  const [modules, setModules] = useState<Module[]>([]);

  // Active editing lesson modal state
  const [editingLessonInfo, setEditingLessonInfo] = useState<{ moduleId: string; lesson: Lesson } | null>(null);

  // Rejection notice dismiss
  const [showRejectionBanner, setShowRejectionBanner] = useState(true);

  // Initialize course data from existing or create draft
  useEffect(() => {
    if (existingCourse) {
      setTitle(existingCourse.title || '');
      setSubtitle(existingCourse.subtitle || '');
      setDescription(existingCourse.description || '');
      setCategory(existingCourse.category || 'Data Science & AI');
      setLevel(existingCourse.level || 'Intermediate');
      setLanguage(existingCourse.language || 'English');
      setBatch(existingCourse.batch || 'Batch B1');
      setPrice(existingCourse.price || 0);
      setOriginalPrice(existingCourse.originalPrice || 0);
      setDuration(existingCourse.duration || '8 Weeks');
      setThumbnail(existingCourse.thumbnail || '');
      setCertificateEligible(existingCourse.certificateEligible ?? true);
      setRequirements(existingCourse.requirements || []);
      setLearningOutcomes(existingCourse.learningOutcomes || []);
      setTargetAudience(existingCourse.targetAudience || []);
      setModules(existingCourse.modules || []);
    } else if (isNewRoute && !courseId) {
      // Auto-create a real Draft course in LMS DB
      const draft = createDraftCourse({
        title: 'New Course Syllabus',
        category: 'Data Science & AI',
        batch: 'Batch B1'
      });
      setCourseId(draft.id);
      setTitle(draft.title);
      setSubtitle(draft.subtitle);
      setDescription(draft.description);
      setRequirements(draft.requirements);
      setLearningOutcomes(draft.learningOutcomes);
      setModules(draft.modules);
    }
  }, [courseId, existingCourse, isNewRoute]);

  // Handle saving form to database
  const handleSaveDraft = () => {
    if (!courseId) return;
    const totalLes = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
    const updated = updateCourse(courseId, {
      title,
      subtitle,
      description,
      category,
      level,
      language,
      batch,
      price: Number(price),
      originalPrice: Number(originalPrice),
      duration,
      thumbnail,
      certificateEligible,
      requirements,
      learningOutcomes,
      targetAudience,
      modules,
      totalLessons: totalLes
    });

    if (updated) {
      showToast('Course draft saved to database.', 'success');
    }
  };

  // Handle Submit for Approval
  const handleSubmitApproval = () => {
    if (!courseId) return;
    handleSaveDraft();

    const currentCourse = courses.find((c) => c.id === courseId);
    if (!currentCourse) return;

    // Use validation service
    const validation = MentorApiService.validateCourseSyllabus({
      ...currentCourse,
      title,
      description,
      category,
      thumbnail,
      modules
    });

    if (!validation.valid) {
      setActiveTab('validation');
      showToast(`Please fix ${validation.errors.length} curriculum issue(s) before submission.`, 'error');
      return;
    }

    const res = submitCourseForApproval(courseId);
    if (res.success) {
      navigate('/instructor/courses');
    }
  };

  // Module actions
  const handleAddModule = () => {
    const newMod: Module = {
      id: `mod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `Module ${modules.length + 1}: New Topic Area`,
      description: 'Comprehensive topic syllabus, lectures, and hands-on exercises.',
      duration: '1h 30m',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: 'Lesson 1: Introduction & Concepts',
          duration: '20 mins',
          type: 'video',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          content: 'Detailed conceptual overview and lecture foundations.',
          completed: false
        }
      ]
    };
    const updated = [...modules, newMod];
    setModules(updated);
    if (courseId) updateCourse(courseId, { modules: updated });
    showToast('New module added to curriculum.', 'success');
  };

  const handleUpdateModuleTitle = (modId: string, newTitle: string) => {
    const updated = modules.map((m) => (m.id === modId ? { ...m, title: newTitle } : m));
    setModules(updated);
  };

  const handleUpdateModuleDesc = (modId: string, newDesc: string) => {
    const updated = modules.map((m) => (m.id === modId ? { ...m, description: newDesc } : m));
    setModules(updated);
  };

  const handleDeleteModule = (modId: string) => {
    if (modules.length <= 1) {
      showToast('Course must retain at least 1 module.', 'error');
      return;
    }
    const updated = modules.filter((m) => m.id !== modId);
    setModules(updated);
    if (courseId) updateCourse(courseId, { modules: updated });
    showToast('Module removed.', 'info');
  };

  // Lesson actions
  const handleAddLesson = (modId: string, type: 'video' | 'article' | 'quiz' | 'assignment' = 'video') => {
    const targetMod = modules.find((m) => m.id === modId);
    if (!targetMod) return;

    const newLes: Lesson = {
      id: `les-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${targetMod.lessons.length + 1}.1 New ${type.toUpperCase()} Lesson`,
      duration: type === 'quiz' ? '15 mins' : type === 'assignment' ? '45 mins' : '25 mins',
      type,
      videoUrl: type === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : undefined,
      content: 'Detailed lecture material, reference notes, and examples.',
      completed: false,
      resources: []
    };

    const updated = modules.map((m) => {
      if (m.id !== modId) return m;
      return { ...m, lessons: [...m.lessons, newLes] };
    });

    setModules(updated);
    if (courseId) updateCourse(courseId, { modules: updated });
    setEditingLessonInfo({ moduleId: modId, lesson: newLes });
    showToast(`New ${type} lesson added.`, 'success');
  };

  const handleDeleteLesson = (modId: string, lesId: string) => {
    const updated = modules.map((m) => {
      if (m.id !== modId) return m;
      return { ...m, lessons: m.lessons.filter((l) => l.id !== lesId) };
    });
    setModules(updated);
    if (courseId) updateCourse(courseId, { modules: updated });
    showToast('Lesson deleted.', 'info');
  };

  const handleSaveLessonModal = (updatedLesson: Lesson) => {
    if (!editingLessonInfo) return;
    const { moduleId } = editingLessonInfo;
    const updated = modules.map((m) => {
      if (m.id !== moduleId) return m;
      return {
        ...m,
        lessons: m.lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
      };
    });
    setModules(updated);
    if (courseId) updateCourse(courseId, { modules: updated });
    setEditingLessonInfo(null);
    showToast('Lesson changes saved.', 'success');
  };

  // Requirements & Outcomes list helpers
  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      setLearningOutcomes([...learningOutcomes, newOutcome.trim()]);
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  };

  // Compute live validation
  const validationResult = MentorApiService.validateCourseSyllabus({
    id: courseId || 'draft',
    title,
    subtitle,
    description,
    category,
    level,
    thumbnail,
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: '',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    price: Number(price),
    duration,
    totalLessons: modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0),
    published: false,
    status: existingCourse?.status || 'DRAFT',
    modules,
    requirements,
    learningOutcomes,
    createdAt: '',
    updatedAt: ''
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/instructor/courses')}
            className="p-2 text-[#404943] hover:text-[#006B47] hover:bg-[#8af5be]/20 rounded-xl transition-all cursor-pointer"
            title="Back to My Courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#006B47] bg-[#8af5be]/30 px-2.5 py-0.5 rounded-md uppercase">
                Curriculum Builder
              </span>
              <span className="text-xs text-[#707972]">•</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  existingCourse?.status === 'PUBLISHED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : existingCourse?.status === 'PENDING_APPROVAL'
                    ? 'bg-amber-100 text-amber-800 animate-pulse'
                    : existingCourse?.status === 'REJECTED'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {existingCourse?.status || 'DRAFT'}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#191c1e] font-display mt-0.5 truncate max-w-xl">
              {title || 'Untitled Course Syllabus'}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <button
            onClick={handleSaveDraft}
            className="bg-[#e7e8ea] hover:bg-[#d8dadc] text-[#191c1e] font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4 text-[#404943]" /> Save Draft
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className="bg-white border border-[#BDCAC0]/80 hover:bg-[#F2F4F7] text-[#191c1e] font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#006B47]" /> Student Preview
          </button>

          {existingCourse?.status === 'APPROVED' ? (
            <button
              onClick={() => courseId && publishCourse(courseId)}
              className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> Publish Now
            </button>
          ) : (
            <button
              onClick={handleSubmitApproval}
              disabled={existingCourse?.status === 'PENDING_APPROVAL'}
              className={`font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 ${
                existingCourse?.status === 'PENDING_APPROVAL'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-not-allowed opacity-80'
                  : 'bg-[#006B47] hover:bg-[#005034] text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              {existingCourse?.status === 'PENDING_APPROVAL' ? 'Under Admin Review' : 'Submit for Approval'}
            </button>
          )}
        </div>
      </div>

      {/* Rejection Alert Banner if revision requested */}
      {existingCourse?.status === 'REJECTED' && existingCourse.rejectionReason && showRejectionBanner && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-3 text-rose-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-rose-950">Revision Feedback from Academic Committee</h3>
              <p className="text-xs md:text-sm text-rose-800 mt-1 leading-relaxed">
                "{existingCourse.rejectionReason}"
              </p>
              <p className="text-xs text-rose-600 mt-2 font-medium">
                Please address the points above in your syllabus and modules before resubmitting.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRejectionBanner(false)}
            className="text-rose-400 hover:text-rose-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Course Builder Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#BDCAC0]/60 pb-3">
        {[
          { id: 'info', label: '1. Basic Information', icon: BookOpen },
          { id: 'curriculum', label: '2. Curriculum & Lessons', icon: Layers, badge: `${modules.length} Modules` },
          { id: 'settings', label: '3. Pricing & Outcomes', icon: DollarSign },
          {
            id: 'validation',
            label: '4. Quality Checklist',
            icon: FileCheck,
            alert: !validationResult.valid ? `${validationResult.errors.length}` : undefined
          },
          { id: 'preview', label: '5. Student Preview', icon: Eye }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#006B47] text-white shadow-xs'
                  : 'bg-white text-[#404943] hover:bg-[#8af5be]/20 hover:text-[#006B47] border border-[#BDCAC0]/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#404943]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {tab.alert && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-rose-500 text-white animate-pulse">
                  {tab.alert}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BASIC INFORMATION */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
              <h2 className="text-lg font-bold text-[#191c1e] font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#006B47]" /> Primary Course Details
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Course Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced Distributed Systems & Cloud Microservices"
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-4 py-3 text-sm font-medium text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Subtitle / One-line Summary
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Master high-performance concurrency, Raft consensus, and Spring Cloud fabrics."
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-4 py-3 text-sm font-medium text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Comprehensive Course Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an in-depth academic overview of the topics covered, laboratory exercises, and milestones..."
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl p-4 text-sm font-medium text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white transition-all leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white"
                  >
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Mathematics & Algorithms">Mathematics & Algorithms</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Cybersecurity & Networks">Cybersecurity & Networks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e] focus:outline-none focus:border-[#006B47] focus:bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Instruction Language
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Target Cohort / Batch
                  </label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Batch B1"
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Expected Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="12 Weeks"
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cover Thumbnail & Presets */}
          <div className="space-y-6">
            <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-[#191c1e] font-display">Course Cover Thumbnail</h3>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-[#BDCAC0]/60 group">
                <img
                  src={thumbnail || PRESET_THUMBNAILS[0].url}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3 py-2 text-xs font-medium text-[#191c1e]"
                />
              </div>

              <div>
                <span className="block text-xs font-bold text-[#707972] mb-2">Or choose a preset visual:</span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_THUMBNAILS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setThumbnail(preset.url)}
                      className={`text-[11px] font-bold p-2 rounded-lg border text-left truncate transition-all cursor-pointer ${
                        thumbnail === preset.url
                          ? 'border-[#006B47] bg-[#8af5be]/20 text-[#006B47]'
                          : 'border-[#BDCAC0]/60 bg-gray-50 text-[#404943] hover:bg-gray-100'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM & MODULES BUILDER */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-[#191c1e] font-display flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#006B47]" /> Syllabus Hierarchy & Content Modules
              </h2>
              <p className="text-xs text-[#707972] mt-0.5">
                Organize your course into topic modules, video lectures, coding assignments, and quizzes.
              </p>
            </div>

            <button
              onClick={handleAddModule}
              className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" /> Add Topic Module
            </button>
          </div>

          {/* Module List */}
          <div className="space-y-5">
            {modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-5 shadow-2xs space-y-4 hover:border-[#006B47]/50 transition-all"
              >
                {/* Module Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F2F4F7] p-3.5 rounded-xl">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-[#006B47] text-white font-bold text-xs flex items-center justify-center font-mono shrink-0">
                      {modIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={mod.title}
                      onChange={(e) => handleUpdateModuleTitle(mod.id, e.target.value)}
                      className="bg-transparent font-bold text-sm md:text-base text-[#191c1e] border-b border-transparent hover:border-[#006B47] focus:border-[#006B47] focus:outline-none flex-1"
                      placeholder="Module Title..."
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-medium text-[#707972] bg-white px-2.5 py-1 rounded-lg border border-[#BDCAC0]/60">
                      {mod.lessons.length} Lesson{mod.lessons.length === 1 ? '' : 's'}
                    </span>
                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Module Description */}
                <div>
                  <input
                    type="text"
                    value={mod.description || ''}
                    onChange={(e) => handleUpdateModuleDesc(mod.id, e.target.value)}
                    placeholder="Short description of module objectives..."
                    className="w-full text-xs text-[#404943] bg-transparent border-b border-dashed border-[#BDCAC0]/60 py-1 px-1 focus:outline-none focus:border-[#006B47]"
                  />
                </div>

                {/* Lessons in Module */}
                <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-[#BDCAC0]/40">
                  {mod.lessons.map((les, lesIdx) => (
                    <div
                      key={les.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-[#8af5be]/10 border border-[#BDCAC0]/50 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="p-2 rounded-lg bg-white shadow-2xs border border-[#BDCAC0]/40 shrink-0">
                          {les.type === 'video' ? (
                            <Video className="w-4 h-4 text-[#006B47]" />
                          ) : les.type === 'quiz' ? (
                            <HelpCircle className="w-4 h-4 text-purple-600" />
                          ) : les.type === 'assignment' ? (
                            <Code2 className="w-4 h-4 text-amber-600" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-600" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs md:text-sm text-[#191c1e] truncate">{les.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#707972]">
                            <span className="capitalize font-medium">{les.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" /> {les.duration}
                            </span>
                            {les.resources && les.resources.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-[#006B47] font-semibold flex items-center gap-0.5">
                                  <Paperclip className="w-3 h-3" /> {les.resources.length} resource(s)
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => setEditingLessonInfo({ moduleId: mod.id, lesson: les })}
                          className="text-xs font-bold text-[#006B47] bg-[#8af5be]/30 hover:bg-[#8af5be]/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                        >
                          Edit Content & Media
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(mod.id, les.id)}
                          className="p-1.5 text-[#707972] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-bold text-[#707972]">Add to Module:</span>
                    <button
                      onClick={() => handleAddLesson(mod.id, 'video')}
                      className="text-xs font-bold text-[#006B47] bg-white border border-[#006B47]/30 hover:bg-[#8af5be]/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" /> + Video Lesson
                    </button>
                    <button
                      onClick={() => handleAddLesson(mod.id, 'article')}
                      className="text-xs font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> + Article / Notes
                    </button>
                    <button
                      onClick={() => handleAddLesson(mod.id, 'assignment')}
                      className="text-xs font-bold text-amber-700 bg-white border border-amber-200 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" /> + Lab Assignment
                    </button>
                    <button
                      onClick={() => handleAddLesson(mod.id, 'quiz')}
                      className="text-xs font-bold text-purple-700 bg-white border border-purple-200 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" /> + Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRICING, OUTCOMES & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Outcomes */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-[#006B47]" /> Learning Outcomes (What Students Learn)
            </h3>
            <p className="text-xs text-[#707972]">
              Specific practical skills and competencies learners will achieve upon completion.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddOutcome()}
                placeholder="e.g. Design fault-tolerant distributed cache layers"
                className="flex-1 bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#191c1e]"
              />
              <button
                onClick={handleAddOutcome}
                className="bg-[#006B47] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005034] transition-all cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50 border border-[#BDCAC0]/50 text-xs font-medium text-[#191c1e]"
                >
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006B47] shrink-0" />
                    {outcome}
                  </span>
                  <button
                    onClick={() => handleRemoveOutcome(idx)}
                    className="text-gray-400 hover:text-rose-500 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#006B47]" /> Prerequisites & Requirements
            </h3>
            <p className="text-xs text-[#707972]">
              Background knowledge or software tools needed before taking this course.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRequirement()}
                placeholder="e.g. Basic familiarity with Java or C++ and command-line tools"
                className="flex-1 bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#191c1e]"
              />
              <button
                onClick={handleAddRequirement}
                className="bg-[#006B47] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005034] transition-all cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50 border border-[#BDCAC0]/50 text-xs font-medium text-[#191c1e]"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B47]"></span>
                    {req}
                  </span>
                  <button
                    onClick={() => handleRemoveRequirement(idx)}
                    className="text-gray-400 hover:text-rose-500 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Certification Settings */}
          <div className="lg:col-span-2 bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#006B47]" /> Pricing & Accreditation Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Course Enrollment Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min={0}
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-[#191c1e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Original Listing Price ($) (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    min={0}
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-[#191c1e]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="certEligible"
                  checked={certificateEligible}
                  onChange={(e) => setCertificateEligible(e.target.checked)}
                  className="w-4 h-4 accent-[#006B47] rounded cursor-pointer"
                />
                <label htmlFor="certEligible" className="text-xs font-bold text-[#191c1e] cursor-pointer">
                  Issue Verified Course Certificate upon 100% completion
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUALITY & VALIDATION CHECKLIST */}
      {activeTab === 'validation' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#191c1e] font-display flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#006B47]" /> Syllabus Quality & Approval Compliance
            </h2>
            <p className="text-xs text-[#707972] mt-0.5">
              Automated institutional checks verify that all modules, lessons, video sources, and learning outcomes meet StudyEcart publishing standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Checklist Items */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${title.length >= 5 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              {title.length >= 5 ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Course Title Length</h4>
                <p className="text-xs text-[#404943] mt-0.5">{title ? `"${title}" (${title.length} chars)` : 'Missing title (min 5 chars)'}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3 ${description.length >= 20 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              {description.length >= 20 ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Detailed Description</h4>
                <p className="text-xs text-[#404943] mt-0.5">{description.length >= 20 ? `Detailed syllabus provided (${description.length} chars)` : 'Description too brief (min 20 chars)'}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3 ${modules.length >= 1 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              {modules.length >= 1 ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Curriculum Modules</h4>
                <p className="text-xs text-[#404943] mt-0.5">{modules.length} Module(s) configured</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3 ${thumbnail ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              {thumbnail ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Cover Thumbnail</h4>
                <p className="text-xs text-[#404943] mt-0.5">{thumbnail ? 'Cover visual attached' : 'Thumbnail missing'}</p>
              </div>
            </div>
          </div>

          {/* Validation Errors summary */}
          {validationResult.errors.length > 0 ? (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
              <h4 className="font-bold text-xs text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Issues preventing submission ({validationResult.errors.length}):
              </h4>
              <ul className="list-disc list-inside text-xs text-rose-800 space-y-1">
                {validationResult.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-xs">All Curriculum Quality Checks Passed!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your course is fully prepared for institutional review and publication.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: STUDENT PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#BDCAC0]/60 pb-4">
            <div>
              <span className="text-xs font-bold text-[#006B47] uppercase font-mono">Student View Simulation</span>
              <h2 className="text-xl font-bold text-[#191c1e] font-display mt-0.5">{title}</h2>
            </div>
            <span className="text-xs bg-[#8af5be]/40 text-[#005034] font-bold px-3 py-1 rounded-full">
              {category} • {level}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black relative shadow-sm">
                <video
                  controls
                  poster={thumbnail}
                  src={modules[0]?.lessons[0]?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-base text-[#191c1e] font-display">About this Course</h3>
                <p className="text-xs md:text-sm text-[#404943] mt-2 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* Learning Outcomes */}
              {learningOutcomes.length > 0 && (
                <div>
                  <h4 className="font-bold text-sm text-[#191c1e]">What you'll learn</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#404943]">
                        <Check className="w-4 h-4 text-[#006B47] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Syllabus Accordion Simulation */}
            <div className="space-y-4">
              <div className="bg-[#F2F4F7] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#191c1e] font-display">${price}</span>
                  {originalPrice > price && (
                    <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
                  )}
                </div>
                <button
                  disabled
                  className="w-full bg-[#006B47] text-white font-bold text-xs py-2.5 rounded-xl opacity-90 cursor-not-allowed"
                >
                  Enroll Now (Preview Mode)
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-[#404943] uppercase tracking-wider">
                  Course Content ({modules.length} Modules)
                </h4>
                {modules.map((m, i) => (
                  <div key={m.id} className="border border-[#BDCAC0]/60 rounded-xl p-3 bg-gray-50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#191c1e]">
                      <span>{m.title}</span>
                      <span className="text-[#707972] font-normal">{m.lessons.length} lessons</span>
                    </div>
                    <div className="space-y-1 pl-2 text-[11px] text-[#404943]">
                      {m.lessons.map((l) => (
                        <div key={l.id} className="flex items-center gap-2 py-0.5">
                          {l.type === 'video' ? <Play className="w-3 h-3 text-[#006B47]" /> : <FileText className="w-3 h-3 text-blue-600" />}
                          <span className="truncate">{l.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LESSON MODAL */}
      {editingLessonInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#BDCAC0]/60 pb-3">
              <h3 className="font-bold text-lg text-[#191c1e] font-display flex items-center gap-2">
                {editingLessonInfo.lesson.type === 'video' ? <Video className="w-5 h-5 text-[#006B47]" /> : <FileText className="w-5 h-5 text-blue-600" />}
                Edit {editingLessonInfo.lesson.type.toUpperCase()} Lesson Content
              </h3>
              <button
                onClick={() => setEditingLessonInfo(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={editingLessonInfo.lesson.title}
                  onChange={(e) =>
                    setEditingLessonInfo({
                      ...editingLessonInfo,
                      lesson: { ...editingLessonInfo.lesson, title: e.target.value }
                    })
                  }
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingLessonInfo.lesson.duration}
                    onChange={(e) =>
                      setEditingLessonInfo({
                        ...editingLessonInfo,
                        lesson: { ...editingLessonInfo.lesson, duration: e.target.value }
                      })
                    }
                    placeholder="30 mins"
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                    Lesson Type
                  </label>
                  <select
                    value={editingLessonInfo.lesson.type}
                    onChange={(e) =>
                      setEditingLessonInfo({
                        ...editingLessonInfo,
                        lesson: { ...editingLessonInfo.lesson, type: e.target.value as any }
                      })
                    }
                    className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#191c1e]"
                  >
                    <option value="video">Video Stream</option>
                    <option value="article">Reading Article</option>
                    <option value="assignment">Hands-on Assignment</option>
                    <option value="quiz">Concept Quiz</option>
                  </select>
                </div>
              </div>

              {editingLessonInfo.lesson.type === 'video' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                      Video Stream MP4 / HLS URL
                    </label>
                    <input
                      type="text"
                      value={editingLessonInfo.lesson.videoUrl || ''}
                      onChange={(e) =>
                        setEditingLessonInfo({
                          ...editingLessonInfo,
                          lesson: { ...editingLessonInfo.lesson, videoUrl: e.target.value }
                        })
                      }
                      placeholder="https://commondatastorage.googleapis.com/..."
                      className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#191c1e]"
                    />
                  </div>

                  <div>
                    <span className="block text-[11px] font-bold text-[#707972] mb-1.5">Or choose a test media sample:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_VIDEOS.map((vid, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setEditingLessonInfo({
                              ...editingLessonInfo,
                              lesson: { ...editingLessonInfo.lesson, videoUrl: vid.url }
                            })
                          }
                          className="text-[11px] bg-gray-100 hover:bg-[#8af5be]/30 text-[#404943] px-2.5 py-1 rounded-lg border border-[#BDCAC0]/50 cursor-pointer"
                        >
                          {vid.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#404943] uppercase tracking-wider mb-1.5">
                  Educational Notes & Theoretical Content
                </label>
                <textarea
                  rows={4}
                  value={editingLessonInfo.lesson.content || ''}
                  onChange={(e) =>
                    setEditingLessonInfo({
                      ...editingLessonInfo,
                      lesson: { ...editingLessonInfo.lesson, content: e.target.value }
                    })
                  }
                  placeholder="Detailed lecture notes, mathematical proofs, or assignment instructions..."
                  className="w-full bg-[#F2F4F7] border border-[#BDCAC0]/80 rounded-xl p-3 text-xs font-medium text-[#191c1e]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#BDCAC0]/60 pt-4">
              <button
                type="button"
                onClick={() => setEditingLessonInfo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#404943] hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveLessonModal(editingLessonInfo.lesson)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#006B47] hover:bg-[#005034] text-white shadow-xs"
              >
                Save Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
