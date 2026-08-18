import React from 'react';
import { useLms } from '../context/LmsContext';
import { BarChart3, Users, BookOpen, Award, TrendingUp, DollarSign } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { courses } = useLms();

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
          Campus Analytics & Operational Intelligence
        </h1>
        <p className="text-sm text-[#404943] mt-1">
          High-level institutional telemetry across enrollment rates, completion metrics, and revenue.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-[#707972]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Active Learners</span>
            <Users className="w-5 h-5 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">12,480</p>
          <p className="text-xs text-[#006B47] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% this quarter
          </p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-[#707972]">
            <span className="text-xs font-bold uppercase tracking-wider">Published Curricula</span>
            <BookOpen className="w-5 h-5 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">{courses.length}</p>
          <p className="text-xs text-[#707972]">Active accredited programs</p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-[#707972]">
            <span className="text-xs font-bold uppercase tracking-wider">Certificates Issued</span>
            <Award className="w-5 h-5 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">3,890</p>
          <p className="text-xs text-[#006B47] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 94.2% completion rate
          </p>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-[#707972]">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Matriculation</span>
            <DollarSign className="w-5 h-5 text-[#006B47]" />
          </div>
          <p className="text-3xl font-bold text-[#191c1e] font-display">$849,200</p>
          <p className="text-xs text-[#006B47] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18% YOY Growth
          </p>
        </div>
      </div>

      {/* Program Distribution */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-lg text-[#191c1e] font-display">Program Enrollment Distribution</h3>
        <div className="space-y-4">
          {courses.map((c) => (
            <div key={c.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#191c1e]">{c.title}</span>
                <span className="text-[#707972] font-mono">{c.enrolledStudents} students ({c.rating} ★)</span>
              </div>
              <div className="w-full h-2.5 bg-[#e1e2e5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006B47] rounded-full"
                  style={{ width: `${Math.min(100, (c.enrolledStudents / 5000) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
