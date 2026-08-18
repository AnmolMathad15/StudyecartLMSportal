import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Module, Lesson, Course } from '../types';
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
  FileQuestion,
  Eye,
  Send,
  AlertCircle,
  X
} from 'lucide-react';

export const CourseBuilderPage: React.FC = () => {
  const { addCourse, navigate, showToast } = useLms();

  const [activeTab, setActiveTab] = useState<'info' | 'curriculum' | 'resources' | 'preview'>('info');

  // Metadata
  const [title, setTitle] = useState('Scalable Distributed Systems & High-Performance AI');
  const [subtitle, setSubtitle] = useState('Architect high-throughput, fault-tolerant distributed machine learning pipelines.');
  const [description, setDescription] = useState(
    'In this comprehensive course, learners delve into the core mathematical principles, distributed storage architectures (Ceph, Lustre), MPI/NCCL interconnects, and cluster autoscaling that power modern foundation models.'
  );
  const [category, setCategory] = useState('Data Science & AI');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Advanced');
  const [batch, setBatch] = useState('Batch B3');
  const [price, setPrice] = useState(149);
  const [language, setLanguage] = useState('English');
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
  );

  // Prerequisites & Outcomes
  const [requirements, setRequirements] = useState<string[]>([
    'Solid grasp of linear algebra, matrix rank, and eigenvalues',
    'Comfortable with high-level Python and basic C++ systems programming'
  ]);
  const [newRequirement, setNewRequirement] = useState('');

  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([
    'Design and deploy multi-node distributed training pipelines',
    'Benchmark network bandwidth bottlenecks using NCCL tests',
    'Implement asynchronous parameter synchronization algorithms'
  ]);
  const [newOutcome, setNewOutcome] = useState('');

  // Curriculum Modules
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'mod-1',
      title: 'Module 1: Foundations of Distributed Data Parallelism',
      description: 'Synchronous vs asynchronous gradient aggregation and ring-AllReduce topology.',
      duration: '2h 15m',
      lessons: [
        {
          id: 'les-1-1',
          title: '1.1 Gradient Aggregation & Mathematical Consistency',
          duration: '35 mins',
          type: 'video',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          content: 'Thorough mathematical breakdown of parameter updates across distributed nodes.',
          completed: false,
          resources: [{ name: 'gradient_derivation.pdf', size: '2.4 MB', url: '#' }]
        },
        {
          id: 'les-1-2',
          title: '1.2 Ring-AllReduce vs Tree-AllReduce Benchmarks',
          duration: '40 mins',
          type: 'video',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          content: 'Network bandwidth modeling and latency saturation.',
          completed: false
        },
        {
          id: 'les-1-3',
          title: '1.3 Lab Assignment: Ring-AllReduce in Python',
          duration: '60 mins',
          type: 'assignment',
          content: 'Implement a simulated ring communication protocol using TCP sockets.',
          completed: false
        }
      ]
    },
    {
      id: 'mod-2',
      title: 'Module 2: Pipeline Parallelism & Activation Checkpointing',
      description: 'Partitioning deep neural network layers across multiple accelerators.',
      duration: '3h 00m',
      lessons: [
        {
          id: 'les-2-1',
          title: '2.1 1F1B Scheduling & Bubble Reduction Analysis',
          duration: '45 mins',
          type: 'video',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          content: 'Minimizing pipeline bubbles through micro-batch scheduling.',
          completed: false
        },
        {
          id: 'les-2-2',
          title: '2.2 Quiz: Parallelism Tradeoffs & Efficiency',
          duration: '25 mins',
          type: 'quiz',
          content: 'Concept check on pipeline bubble ratios and memory footprint.',
          completed: false
        }
      ]
    }
  ]);

  // Selected Lesson Editing Modal
  const [editingLesson, setEditingLesson] = useState<{ modId: string; lesson: Lesson } | null>(null);

  // Handlers for Requirements
  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequirement.trim()) return;
    setRequirements([...requirements, newRequirement.trim()]);
    setNewRequirement('');
  };
  const handleRemoveRequirement = (idx: number) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  // Handlers for Outcomes
  const handleAddOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutcome.trim()) return;
    setLearningOutcomes([...learningOutcomes, newOutcome.trim()]);
    setNewOutcome('');
  };
  const handleRemoveOutcome = (idx: number) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== idx));
  };

  // Module Handlers
  const handleAddModule = () => {
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: `Module ${modules.length + 1}: Tensor Parallelism & Megatron-LM`,
      description: 'Splitting matrix multiplications across GPUs via row and column slicing.',
      duration: '2h 30m',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: `${modules.length + 1}.1 Column-Parallel Linear Layer Derivation`,
          duration: '30 mins',
          type: 'video',
          completed: false
        }
      ]
    };
    setModules([...modules, newMod]);
    showToast('New module added to curriculum');
  };

  const handleRemoveModule = (modId: string) => {
    if (modules.length === 1) {
      showToast('A course must have at least one module', 'error');
      return;
    }
    setModules(modules.filter((m) => m.id !== modId));
  };

  const handleAddLesson = (modId: string) => {
    const targetMod = modules.find((m) => m.id === modId);
    const modIdx = modules.findIndex((m) => m.id === modId) + 1;
    const lessonIdx = (targetMod?.lessons.length || 0) + 1;

    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: `${modIdx}.${lessonIdx} New Lesson Topic`,
      duration: '25 mins',
      type: 'video',
      completed: false
    };

    setModules(
      modules.map((m) => (m.id === modId ? { ...m, lessons: [...m.lessons, newLesson] } : m))
    );
  };

  const handleRemoveLesson = (modId: string, lesId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id !== modId) return m;
        return { ...m, lessons: m.lessons.filter((l) => l.id !== lesId) };
      })
    );
  };

  const handleSaveLessonEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;
    setModules(
      modules.map((m) => {
        if (m.id !== editingLesson.modId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) => (l.id === editingLesson.lesson.id ? editingLesson.lesson : l))
        };
      })
    );
    setEditingLesson(null);
    showToast('Lesson updated');
  };

  const handleSaveCourse = (status: 'DRAFT' | 'PENDING' | 'PUBLISHED') => {
    if (!title.trim()) {
      showToast('Please enter a course title', 'error');
      return;
    }

    addCourse({
      title,
      subtitle,
      description,
      category,
      level,
      batch,
      price,
      thumbnail,
      modules,
      requirements,
      learningOutcomes
    });

    if (status === 'PUBLISHED') {
      showToast('Course published directly to the active catalog!');
    } else if (status === 'PENDING') {
      showToast('Course submitted for Admin approval review.');
    } else {
      showToast('Course draft saved successfully.');
    }

    navigate('/mentor/courses');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#BDCAC0]/60 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/mentor/courses')}
            className="p-2 text-[#404943] hover:text-[#006B47] hover:bg-[#f2f4f6] rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#006B47] bg-[#8af5be]/30 px-2 py-0.5 rounded-md uppercase font-mono">
                Authoring Studio
              </span>
              <span className="text-xs text-[#707972]">•</span>
              <span className="text-xs text-[#707972]">{modules.length} Modules</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
              Course Builder & Curriculum Studio
            </h2>
          </div>
        </div>

        {/* Top Save & Publish Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSaveCourse('DRAFT')}
            className="px-4 py-2 text-xs font-bold text-[#404943] bg-white hover:bg-[#f2f4f6] border border-[#BDCAC0]/70 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSaveCourse('PENDING')}
            className="px-4 py-2 text-xs font-bold text-[#006B47] bg-[#71DBA6]/20 hover:bg-[#71DBA6]/30 border border-[#006B47]/30 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Submit for Approval
          </button>
          <button
            type="button"
            onClick={() => handleSaveCourse('PUBLISHED')}
            className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" /> Publish Live
          </button>
        </div>
      </div>

      {/* Builder Navigation Tabs */}
      <div className="flex border-b border-[#BDCAC0]/40 gap-4 overflow-x-auto pb-1">
        {[
          { id: 'info', label: '1. Basic Info & Outcomes', icon: Layers },
          { id: 'curriculum', label: '2. Curriculum & Lessons', icon: BookOpen },
          { id: 'resources', label: '3. Handouts & Labs', icon: Paperclip },
          { id: 'preview', label: '4. Student Preview', icon: Eye }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`pb-3 px-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === t.id
                  ? 'border-[#006B47] text-[#006B47]'
                  : 'border-transparent text-[#707972] hover:text-[#191c1e]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Basic Information & Target Audience */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2 border-b border-[#BDCAC0]/40 pb-3">
              <Layers className="w-4 h-4 text-[#006B47]" /> Course Meta & Catalog Visibility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Computing & High Performance AI"
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Subtitle / Short Pitch</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Master parallel pipelines, CUDA acceleration, and scalable architecture."
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Academic Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                >
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Mathematics & Algorithms">Mathematics & Algorithms</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Cybersecurity & Networks">Cybersecurity & Networks</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Assigned Cohort Batch</label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="Batch B3"
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Skill Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Tuition / Fee (USD)</label>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Course Thumbnail URL</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e] focus:outline-hidden"
                  />
                  <img
                    src={thumbnail}
                    alt="Preview"
                    className="w-12 h-10 rounded-lg object-cover border border-[#BDCAC0]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-[#191c1e] mb-1">Course Syllabus & Overview</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide rigorous description of the curriculum, learning goals, and methodologies..."
                  className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
                />
              </div>
            </div>
          </div>

          {/* Prerequisites & Learning Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prerequisites */}
            <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-[#191c1e] font-display flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006B47]" /> Course Prerequisites
              </h4>

              <div className="space-y-2">
                {requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50 text-xs"
                  >
                    <span className="text-[#191c1e] font-medium">• {req}</span>
                    <button
                      onClick={() => handleRemoveRequirement(idx)}
                      className="text-[#BA1A1A] p-1 hover:bg-[#ffdad6]/40 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddRequirement} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add a required skill or background..."
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e]"
                />
                <button
                  type="submit"
                  className="bg-[#006B47] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#005034]"
                >
                  Add
                </button>
              </form>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-sm text-[#191c1e] font-display flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006B47]" /> Key Learning Outcomes
              </h4>

              <div className="space-y-2">
                {learningOutcomes.map((out, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50 text-xs"
                  >
                    <span className="text-[#191c1e] font-medium">✓ {out}</span>
                    <button
                      onClick={() => handleRemoveOutcome(idx)}
                      className="text-[#BA1A1A] p-1 hover:bg-[#ffdad6]/40 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddOutcome} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add a measurable learning outcome..."
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e]"
                />
                <button
                  type="submit"
                  className="bg-[#006B47] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#005034]"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Curriculum & Lessons */}
      {activeTab === 'curriculum' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#191c1e] font-display">
                Curriculum Modules & Lessons
              </h3>
              <p className="text-xs text-[#707972]">
                Structure lecture units, video streams, lab assignments, and gated assessments.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddModule}
              className="bg-white border border-[#006B47] text-[#006B47] hover:bg-[#71DBA6]/10 font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Module
            </button>
          </div>

          {modules.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#BDCAC0]/40 pb-3">
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setModules(
                        modules.map((m) => (m.id === mod.id ? { ...m, title: newTitle } : m))
                      );
                    }}
                    className="font-bold text-base text-[#191c1e] bg-transparent border-b border-transparent hover:border-[#BDCAC0] focus:border-[#006B47] focus:outline-hidden w-full font-display"
                  />
                  <input
                    type="text"
                    value={mod.description || ''}
                    onChange={(e) => {
                      const newDesc = e.target.value;
                      setModules(
                        modules.map((m) => (m.id === mod.id ? { ...m, description: newDesc } : m))
                      );
                    }}
                    placeholder="Short unit summary..."
                    className="text-xs text-[#707972] bg-transparent border-b border-transparent hover:border-[#BDCAC0] focus:border-[#006B47] focus:outline-hidden w-full mt-0.5"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#707972] font-mono">{mod.lessons.length} Lessons</span>
                  <button
                    type="button"
                    onClick={() => handleAddLesson(mod.id)}
                    className="text-xs text-[#006B47] hover:underline font-bold flex items-center gap-1 cursor-pointer bg-[#8af5be]/30 px-3 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(mod.id)}
                    className="p-1 text-[#BA1A1A] hover:bg-[#ffdad6]/30 rounded-lg transition-colors cursor-pointer"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lessons List in Module */}
              <div className="space-y-2 pl-2">
                {mod.lessons.map((les) => {
                  return (
                    <div
                      key={les.id}
                      className="bg-[#F7F9FB] border border-[#BDCAC0]/50 rounded-xl p-3.5 flex items-center justify-between gap-3 group hover:border-[#006B47]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {les.type === 'video' ? (
                          <Video className="w-4 h-4 text-[#006B47]" />
                        ) : les.type === 'assignment' ? (
                          <FileCheck className="w-4 h-4 text-[#EF9F13]" />
                        ) : les.type === 'quiz' ? (
                          <FileQuestion className="w-4 h-4 text-[#006B47]" />
                        ) : (
                          <FileText className="w-4 h-4 text-[#707972]" />
                        )}

                        <div className="flex-1">
                          <span className="text-xs font-bold text-[#191c1e]">{les.title}</span>
                          <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.2 bg-[#e7e8eb] text-[#404943] rounded-md font-bold">
                            {les.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#707972] flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> {les.duration}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingLesson({ modId: mod.id, lesson: les })}
                          className="text-xs text-[#006B47] hover:underline font-bold px-2 py-1 bg-white border border-[#BDCAC0]/60 rounded-lg cursor-pointer"
                        >
                          Edit Content
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveLesson(mod.id, les.id)}
                          className="text-[#707972] hover:text-[#BA1A1A] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Attached Resources */}
      {activeTab === 'resources' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2 border-b border-[#BDCAC0]/40 pb-3">
            <Paperclip className="w-4 h-4 text-[#006B47]" /> Course Attachments, Slides & Jupyter Notebooks
          </h3>
          <p className="text-xs text-[#707972]">
            Upload downloadable laboratory materials, datasets, formulas, and slide decks available to enrolled students.
          </p>

          <div className="border-2 border-dashed border-[#BDCAC0] rounded-2xl p-8 text-center bg-[#F7F9FB] space-y-3">
            <Upload className="w-8 h-8 text-[#006B47] mx-auto" />
            <div>
              <p className="text-sm font-bold text-[#191c1e]">Drag and drop lab files here, or click to upload</p>
              <p className="text-xs text-[#707972]">Supports PDF, ZIP, IPYNB, CSV, and PPTX up to 100MB</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('File upload dialog opened', 'info')}
              className="bg-[#006B47] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005034] cursor-pointer"
            >
              Browse Files
            </button>
          </div>

          {/* List of active handouts */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-[#191c1e] uppercase tracking-wider">Active Course Handouts</h4>
            {[
              { name: 'Distributed_Systems_Lecture_Notes.pdf', size: '4.8 MB', downloads: 142 },
              { name: 'Ring_AllReduce_Python_Skeleton.zip', size: '1.2 MB', downloads: 98 },
              { name: 'NCCL_Benchmark_Scripts.ipynb', size: '320 KB', downloads: 74 }
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50 text-xs">
                <div className="flex items-center gap-2 font-mono text-[#191c1e]">
                  <FileText className="w-4 h-4 text-[#006B47]" />
                  <span>{f.name}</span>
                  <span className="text-[#707972]">({f.size})</span>
                </div>
                <span className="text-[#707972]">{f.downloads} Student Downloads</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Preview as Student */}
      {activeTab === 'preview' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#BDCAC0]/40 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#006B47]" /> Student View Simulation
              </h3>
              <p className="text-xs text-[#707972]">
                This is exactly how prospective and enrolled students will experience your course.
              </p>
            </div>
            <span className="bg-[#8af5be] text-[#005034] text-xs font-bold px-3 py-1 rounded-full">
              Live Preview Mode
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-black relative">
                <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 text-[#006B47] flex items-center justify-center shadow-lg">
                    <Video className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#191c1e] font-display">{title}</h1>
                <p className="text-sm text-[#404943] mt-1">{subtitle}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-[#191c1e]">Course Syllabus ({modules.length} Modules)</h4>
                {modules.map((m, idx) => (
                  <div key={m.id} className="border border-[#BDCAC0]/60 rounded-xl p-4 bg-[#F7F9FB]">
                    <h5 className="font-bold text-xs text-[#191c1e]">{m.title}</h5>
                    <p className="text-[11px] text-[#707972] mt-0.5">{m.description}</p>
                    <div className="mt-2 space-y-1.5">
                      {m.lessons.map((l) => (
                        <div key={l.id} className="text-xs text-[#404943] flex items-center gap-2 pl-2">
                          <Video className="w-3 h-3 text-[#006B47]" /> {l.title} ({l.duration})
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-2xl p-5 space-y-4 h-fit">
              <div className="text-2xl font-bold text-[#006B47] font-display">${price} USD</div>
              <p className="text-xs text-[#707972]">Full lifetime access to lectures, certificates, and live labs.</p>
              <button
                type="button"
                disabled
                className="w-full bg-[#006B47] text-white font-bold py-2.5 rounded-xl text-xs opacity-90"
              >
                Enroll Now (Preview)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Content Edit Drawer / Modal */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#BDCAC0]/50 pb-3">
              <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
                <Video className="w-4 h-4 text-[#006B47]" /> Edit Lesson Details
              </h3>
              <button onClick={() => setEditingLesson(null)} className="text-[#707972] hover:text-[#191c1e]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLessonEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Lesson Title *</label>
                <input
                  type="text"
                  required
                  value={editingLesson.lesson.title}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, title: e.target.value }
                    })
                  }
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#191c1e] mb-1">Lesson Type</label>
                  <select
                    value={editingLesson.lesson.type}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        lesson: { ...editingLesson.lesson, type: e.target.value as any }
                      })
                    }
                    className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs font-semibold"
                  >
                    <option value="video">Video Lecture</option>
                    <option value="reading">Reading / Article</option>
                    <option value="assignment">Problem Set / Lab</option>
                    <option value="quiz">Quiz Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#191c1e] mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingLesson.lesson.duration}
                    onChange={(e) =>
                      setEditingLesson({
                        ...editingLesson,
                        lesson: { ...editingLesson.lesson, duration: e.target.value }
                      })
                    }
                    placeholder="e.g. 35 mins"
                    className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Video Stream / File URL</label>
                <input
                  type="text"
                  value={editingLesson.lesson.videoUrl || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, videoUrl: e.target.value }
                    })
                  }
                  placeholder="https://..."
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] mb-1">Lecture Notes / Instructions</label>
                <textarea
                  rows={4}
                  value={editingLesson.lesson.content || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, content: e.target.value }
                    })
                  }
                  placeholder="Enter detailed educational text, formulas, or lab instructions..."
                  className="w-full p-2.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#BDCAC0]/40">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006B47] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#005034]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
