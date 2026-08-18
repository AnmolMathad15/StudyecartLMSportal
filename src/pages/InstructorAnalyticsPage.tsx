import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  TrendingUp,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  LineChart,
  BarChart3,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

export const InstructorAnalyticsPage: React.FC = () => {
  const { courses } = useLms();
  const [activeView, setActiveView] = useState<'courses' | 'performance'>('courses');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Academic Analytics
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">Live Cohort Telemetry</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Academic Analytics & Cohort Insights
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Detailed metrics on student engagement, syllabus retention, dropout risk, and assessment scores.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-white border border-[#BDCAC0]/70 p-1 rounded-xl shadow-2xs">
          <button
            onClick={() => setActiveView('courses')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeView === 'courses' ? 'bg-[#006B47] text-white' : 'text-[#707972] hover:text-[#191c1e]'
            }`}
          >
            Course Analytics
          </button>
          <button
            onClick={() => setActiveView('performance')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeView === 'performance' ? 'bg-[#006B47] text-white' : 'text-[#707972] hover:text-[#191c1e]'
            }`}
          >
            Student Performance
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
          <div className="flex justify-between items-center text-xs text-[#707972] mb-2 font-bold">
            <span>AVERAGE COMPLETION</span>
            <TrendingUp className="w-4 h-4 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">84.2%</p>
          <p className="text-xs text-[#006B47] font-semibold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +4.8% from last cohort
          </p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
          <div className="flex justify-between items-center text-xs text-[#707972] mb-2 font-bold">
            <span>MEDIAN TEST SCORE</span>
            <Award className="w-4 h-4 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">88 / 100</p>
          <p className="text-xs text-[#006B47] font-semibold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Top decile in Data Science
          </p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
          <div className="flex justify-between items-center text-xs text-[#707972] mb-2 font-bold">
            <span>DOUBT RESOLUTION SPEED</span>
            <CheckCircle2 className="w-4 h-4 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">1.4 hrs</p>
          <p className="text-xs text-[#707972] mt-1">Average mentor response latency</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs">
          <div className="flex justify-between items-center text-xs text-[#707972] mb-2 font-bold">
            <span>AT-RISK LEARNERS</span>
            <AlertTriangle className="w-4 h-4 text-[#EF9F13]" />
          </div>
          <p className="text-3xl font-bold text-[#EF9F13] font-display">3 Students</p>
          <p className="text-xs text-[#EF9F13] font-semibold mt-1">Nudge triggered automatically</p>
        </div>
      </div>

      {activeView === 'courses' ? (
        /* Course Breakdown Table */
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-lg text-[#191c1e] font-display">
            Cohort Progress Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f4f6] border-b border-[#BDCAC0]/60 text-[11px] font-bold text-[#404943] uppercase">
                  <th className="p-3.5">Course</th>
                  <th className="p-3.5">Batch</th>
                  <th className="p-3.5">Enrolled</th>
                  <th className="p-3.5">Syllabus Progress</th>
                  <th className="p-3.5">Avg Quiz Score</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BDCAC0]/30 text-xs">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F7F9FB]">
                    <td className="p-3.5 font-bold text-[#191c1e]">{c.title}</td>
                    <td className="p-3.5 font-semibold text-[#006B47]">{c.batch || 'Batch B2'}</td>
                    <td className="p-3.5">{c.enrolledStudents} Students</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#006B47]">{c.syllabusCompletion}%</span>
                        <div className="w-20 h-1.5 bg-[#e1e2e5] rounded-full">
                          <div
                            className="h-full bg-[#006B47] rounded-full"
                            style={{ width: `${c.syllabusCompletion}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-[#191c1e]">91.4%</td>
                    <td className="p-3.5">
                      <span className="bg-[#8af5be]/40 text-[#00714b] font-bold px-2.5 py-0.5 rounded-full">
                        On Track
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Student Performance View */
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-lg text-[#191c1e] font-display">
            Cohort Assessment Distribution & Grade Curve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50">
              <span className="text-[#707972] font-semibold">Grade A (90%+)</span>
              <p className="text-2xl font-bold text-[#006B47] mt-1">42% of Cohort</p>
              <p className="text-[#707972] mt-0.5">Exemplary mathematical derivations</p>
            </div>
            <div className="p-4 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50">
              <span className="text-[#707972] font-semibold">Grade B (75%–89%)</span>
              <p className="text-2xl font-bold text-[#191c1e] mt-1">46% of Cohort</p>
              <p className="text-[#707972] mt-0.5">Satisfactory implementation</p>
            </div>
            <div className="p-4 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50">
              <span className="text-[#707972] font-semibold">Under 70% (Remedial)</span>
              <p className="text-2xl font-bold text-[#EF9F13] mt-1">12% of Cohort</p>
              <p className="text-[#707972] mt-0.5">Extra tutoring lab scheduled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
