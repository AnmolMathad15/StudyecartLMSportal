import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Users, Search, Filter, BookOpen, CheckCircle2, Shield } from 'lucide-react';

export const AdminEnrollmentsPage: React.FC = () => {
  const { courses, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');

  // Roster of enrollments
  const enrollments = [
    {
      id: 'enr-1',
      studentName: 'Sarah Jenkins',
      email: 'sarah.jenkins@student.studyecart.edu',
      courseTitle: 'Data Structures & Algorithms in Java',
      batch: 'Batch Alpha (Fall 2026)',
      progress: 68,
      status: 'ACTIVE',
      enrolledOn: '2026-08-10'
    },
    {
      id: 'enr-2',
      studentName: 'Liam Patel',
      email: 'liam.patel@student.studyecart.edu',
      courseTitle: 'Python for Data Science & Machine Learning',
      batch: 'Batch ML-2',
      progress: 42,
      status: 'ACTIVE',
      enrolledOn: '2026-08-12'
    },
    {
      id: 'enr-3',
      studentName: 'Elena Rostova',
      email: 'elena.rostova@alumni.studyecart.edu',
      courseTitle: 'Multivariable Calculus & Differential Geometry',
      batch: 'Batch Math-1',
      progress: 100,
      status: 'COMPLETED',
      enrolledOn: '2026-07-01'
    },
    {
      id: 'enr-4',
      studentName: 'Marcus Aurelius',
      email: 'marcus.a@student.studyecart.edu',
      courseTitle: 'System Design & Scalable Cloud Architecture',
      batch: 'Cohort Sys-4',
      progress: 85,
      status: 'ACTIVE',
      enrolledOn: '2026-08-01'
    }
  ];

  const filtered = enrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Student Enrollment Roster
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Global view of all cohort matriculations, student progress, and active course access.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scholars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#BDCAC0] rounded-xl text-xs focus:outline-none focus:border-[#006B47]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FB] border-b border-[#BDCAC0]/60 text-[#404943] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Course Program</th>
                <th className="p-4">Cohort Batch</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Status</th>
                <th className="p-4">Enrolled Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/40">
              {filtered.map((enr) => (
                <tr key={enr.id} className="hover:bg-[#F7F9FB]">
                  <td className="p-4">
                    <p className="font-bold text-[#191c1e]">{enr.studentName}</p>
                    <p className="text-[11px] text-[#707972]">{enr.email}</p>
                  </td>
                  <td className="p-4 text-[#404943] font-medium">{enr.courseTitle}</td>
                  <td className="p-4 font-mono text-[#707972]">{enr.batch}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#e1e2e5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006B47] rounded-full"
                          style={{ width: `${enr.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[#006B47] font-bold">{enr.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        enr.status === 'COMPLETED'
                          ? 'bg-[#8af5be]/50 text-[#00714b]'
                          : 'bg-[#71DBA6]/20 text-[#005034]'
                      }`}
                    >
                      {enr.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#707972]">{enr.enrolledOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
