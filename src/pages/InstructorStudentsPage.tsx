import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Users,
  Search,
  Mail,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Filter,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  X,
  FileCheck,
  FileQuestion
} from 'lucide-react';

export const InstructorStudentsPage: React.FC = () => {
  const { users, courses, showToast } = useLms();
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const students = users.filter((u) => u.role === 'STUDENT');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleMessage = (studentName: string) => {
    showToast(`Direct communication channel opened with ${studentName}`, 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
              Cohort Management
            </span>
            <span className="text-xs text-[#707972]">•</span>
            <span className="text-xs text-[#707972]">{students.length} Enrolled Learners</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Enrolled Cohort Learners
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Track student milestones, lab submissions, attendance consistency, and direct communication.
          </p>
        </div>

        <div className="bg-[#006B47]/10 text-[#006B47] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-2xs">
          <Users className="w-4 h-4" /> {students.length} Active Learners
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-[#707972] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search learners by name or institutional email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl text-xs focus:outline-hidden focus:border-[#006B47]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#707972]">Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-[#F7F9FB] border border-[#BDCAC0]/60 rounded-xl px-3 py-2 text-xs text-[#191c1e] font-semibold focus:outline-hidden"
            >
              <option value="ALL">All Cohorts</option>
              <option value="Batch A1">Batch A1 (Foundations)</option>
              <option value="Batch B2">Batch B2 (Deep Learning)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f4f6] text-[#404943] font-bold border-b border-[#BDCAC0]/50 uppercase tracking-wider">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Primary Batch</th>
                <th className="p-4">Syllabus Progress</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Academic Standing</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/30">
              {filteredStudents.map((s, idx) => {
                const progress = 88 - idx * 8;
                const attendance = 96 - idx * 3;
                const isRisk = progress < 60;

                return (
                  <tr key={s.id} className="hover:bg-[#F7F9FB] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-[#BDCAC0]/80 flex-shrink-0">
                        <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-[#191c1e] text-sm">{s.name}</p>
                        <p className="text-[#707972] text-[11px]">{s.email}</p>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-[#191c1e]">
                      {idx % 2 === 0 ? 'Batch A1' : 'Batch B2'}
                    </td>

                    <td className="p-4">
                      <div className="w-32">
                        <div className="flex justify-between text-[11px] font-bold mb-1">
                          <span className="text-[#006B47]">{progress}%</span>
                          <span className="text-[#707972]">Completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isRisk ? 'bg-[#EF9F13]' : 'bg-[#006B47]'}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-[#006B47]">
                      {attendance}%
                    </td>

                    <td className="p-4">
                      {isRisk ? (
                        <span className="bg-[#ffdad6]/60 text-[#ba1a1a] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Needs Nudge
                        </span>
                      ) : (
                        <span className="bg-[#8af5be]/50 text-[#00714b] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> In Good Standing
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setSelectedStudent({ ...s, progress, attendance })}
                          className="px-2.5 py-1.5 bg-white hover:bg-[#f2f4f6] text-[#006B47] text-xs font-bold rounded-lg border border-[#BDCAC0]/60 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleMessage(s.name)}
                          className="p-1.5 bg-[#F7F9FB] hover:bg-[#006B47] hover:text-white text-[#191c1e] rounded-lg transition-colors cursor-pointer"
                          title="Message Student"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Drawer Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-[#BDCAC0] rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#BDCAC0]/40 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#006B47]"
                />
                <div>
                  <h3 className="font-bold text-base text-[#191c1e] font-display">{selectedStudent.name}</h3>
                  <p className="text-xs text-[#707972]">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-[#707972] hover:text-[#191c1e]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50">
                <span className="text-[#707972] font-semibold">Course Progress</span>
                <p className="text-lg font-bold text-[#006B47] mt-0.5">{selectedStudent.progress}%</p>
              </div>
              <div className="p-3 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50">
                <span className="text-[#707972] font-semibold">Attendance Rate</span>
                <p className="text-lg font-bold text-[#006B47] mt-0.5">{selectedStudent.attendance}%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-sm text-[#191c1e]">Recent Lab Milestones</h4>
              <div className="p-3 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/50 space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Lab 1: Matrix Inversion Sockets</span>
                  <span className="text-[#006B47]">Score: 95/100</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Quiz 2: Spectral Graph Decompositions</span>
                  <span className="text-[#006B47]">Score: 88%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#BDCAC0]/40">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-semibold text-[#404943] hover:bg-[#f2f4f6] rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleMessage(selectedStudent.name);
                  setSelectedStudent(null);
                }}
                className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Send Direct Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
