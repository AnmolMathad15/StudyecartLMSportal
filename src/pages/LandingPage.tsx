import React from 'react';
import { useLms } from '../context/LmsContext';
import { CourseCard } from '../components/CourseCard';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
  Users,
  CheckCircle2,
  BookOpen,
  Code2,
  Cpu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { courses, navigate, switchRole } = useLms();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden text-center md:text-left">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8DF7C1]/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#8af5be]/30 text-[#00714b] text-xs font-bold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#006B47]" /> Next-Gen Enterprise LMS
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[#191c1e] tracking-tight font-display leading-[1.1]">
              Master Engineering & AI with{' '}
              <span className="text-[#006B47] underline decoration-[#8DF7C1] decoration-4">StudyEcart</span>
            </h1>

            <p className="text-base md:text-lg text-[#404943] leading-relaxed">
              Experience cohort-based learning with live interactive studio broadcasts, direct faculty mentorship, automated code evaluations, and verified credentials.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={() => navigate('/courses')}
                className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  switchRole('INSTRUCTOR');
                  navigate('/instructor/dashboard');
                }}
                className="bg-white border border-[#BDCAC0] text-[#006B47] hover:bg-[#71DBA6]/10 font-bold text-sm md:text-base px-6 py-3.5 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                Faculty Studio Portal
              </button>
            </div>

            {/* Quick Demo Role Switcher */}
            <div className="pt-4 flex items-center gap-3 text-xs text-[#707972] justify-center md:justify-start">
              <span>Instant Persona Preview:</span>
              <button
                onClick={() => {
                  switchRole('STUDENT');
                  navigate('/student/dashboard');
                }}
                className="font-bold text-[#006B47] hover:underline cursor-pointer"
              >
                Student View
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  switchRole('INSTRUCTOR');
                  navigate('/instructor/dashboard');
                }}
                className="font-bold text-[#006B47] hover:underline cursor-pointer"
              >
                Instructor View (Figma)
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  switchRole('ADMIN');
                  navigate('/admin/dashboard');
                }}
                className="font-bold text-[#006B47] hover:underline cursor-pointer"
              >
                Admin Console
              </button>
            </div>
          </div>

          {/* Hero Banner Visual */}
          <div className="relative w-full max-w-md">
            <div className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-5 shadow-xl space-y-4 relative">
              <div className="flex items-center gap-3 border-b border-[#BDCAC0]/40 pb-3">
                <div className="w-10 h-10 rounded-full bg-[#006B47] flex items-center justify-center text-white font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#191c1e]">StudyEcart Live Engine</h4>
                  <p className="text-[11px] text-[#707972]">Real-time Academic Sync</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#F7F9FB] rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-[#191c1e]">High-Priority Doubts</span>
                  <span className="bg-[#EF9F13] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    5 Resolved Today
                  </span>
                </div>
                <div className="p-3 bg-[#F7F9FB] rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-[#191c1e]">Broadcast Studio</span>
                  <span className="bg-[#BA1A1A] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    Live in 15m
                  </span>
                </div>
                <div className="p-3 bg-[#F7F9FB] rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-[#191c1e]">Lab Auto-Grading</span>
                  <span className="bg-[#006B47] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    99.4% Accurate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
              Featured Academic Curricula
            </h2>
            <p className="text-sm text-[#404943] mt-1">
              Engineered with rigorous mathematical foundations and applied lab sessions.
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="text-[#006B47] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} mode="public" />
          ))}
        </div>
      </section>

      {/* Core Advantages Bento */}
      <section className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-8 md:p-12 shadow-2xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Built for Academic Excellence
          </h2>
          <p className="text-sm text-[#404943]">
            StudyEcart bridges the gap between deep theoretical knowledge and real-world execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/60 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#006B47]/10 flex items-center justify-center text-[#006B47]">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#191c1e] font-display">Live Interactive Studios</h3>
            <p className="text-xs text-[#404943] leading-relaxed">
              Connect directly with faculty via HD live streams with real-time screen sharing and synchronized Q&A desks.
            </p>
          </div>

          <div className="p-6 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/60 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EF9F13]/10 flex items-center justify-center text-[#EF9F13]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#191c1e] font-display">Fast Doubt Resolution</h3>
            <p className="text-xs text-[#404943] leading-relaxed">
              Submit code and mathematical doubts directly to professors with sub-2 hour guaranteed turnaround.
            </p>
          </div>

          <div className="p-6 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/60 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#006B47]/10 flex items-center justify-center text-[#006B47]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#191c1e] font-display">Verifiable Credentials</h3>
            <p className="text-xs text-[#404943] leading-relaxed">
              Earn tamper-proof certificates of mastery complete with unique certificate IDs and faculty chair seals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
