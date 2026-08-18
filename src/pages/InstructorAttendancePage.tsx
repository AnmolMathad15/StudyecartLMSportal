import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  CalendarCheck,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';

export const InstructorAttendancePage: React.FC = () => {
  const { showToast } = useLms();
  const [selectedBatch, setSelectedBatch] = useState('Batch B2');

  const studentsList = [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@student.studyecart.com', presentDays: 18, totalDays: 20, pct: '90%' },
    { id: '2', name: 'Mike Turner', email: 'mike.t@student.studyecart.com', presentDays: 19, totalDays: 20, pct: '95%' },
    { id: '3', name: 'Alex Rivera', email: 'alex.r@student.studyecart.com', presentDays: 17, totalDays: 20, pct: '85%' },
    { id: '4', name: 'Emma Watson', email: 'emma.w@student.studyecart.com', presentDays: 20, totalDays: 20, pct: '100%' },
    { id: '5', name: 'Rahul Sharma', email: 'rahul.s@student.studyecart.com', presentDays: 16, totalDays: 20, pct: '80%' },
    { id: '6', name: 'Priya Nair', email: 'priya.n@student.studyecart.com', presentDays: 19, totalDays: 20, pct: '95%' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Batch Attendance & Compliance Log
          </h2>
          <p className="text-sm text-[#404943] mt-1">
            Track student session participation, lecture attendance, and institutional compliance records.
          </p>
        </div>

        <button
          onClick={() => showToast('Attendance report exported to CSV')}
          className="bg-white border border-[#BDCAC0] text-[#006B47] hover:bg-[#71DBA6]/10 font-bold text-xs md:text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      {/* Batch Selector */}
      <div className="flex gap-2 border-b border-[#BDCAC0]/40 pb-2">
        {['Batch B2 (Python / Data Science)', 'Batch A1 (Linear Algebra & Calculus)'].map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBatch(b.includes('B2') ? 'Batch B2' : 'Batch A1')}
            className={`text-xs px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              selectedBatch.includes('B2') && b.includes('B2')
                ? 'bg-[#006B47] text-white shadow-2xs'
                : selectedBatch.includes('A1') && b.includes('A1')
                ? 'bg-[#006B47] text-white shadow-2xs'
                : 'bg-white text-[#404943] hover:bg-[#f2f4f6] border border-[#BDCAC0]/60'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f4f6] border-b border-[#BDCAC0]/60">
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider">
                Student Name
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider">
                Sessions Attended
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider">
                Attendance Rate
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-[#404943] uppercase tracking-wider text-right">
                Today (Oct 24) Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#BDCAC0]/30">
            {studentsList.map((stu) => (
              <tr key={stu.id} className="hover:bg-[#F7F9FB] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-sm text-[#191c1e]">{stu.name}</div>
                  <div className="text-xs text-[#707972]">{stu.email}</div>
                </td>
                <td className="py-3.5 px-4 text-xs font-semibold text-[#191c1e]">
                  {stu.presentDays} / {stu.totalDays} sessions
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#006B47]">{stu.pct}</span>
                    <div className="w-24 h-1.5 bg-[#e1e2e5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#006B47] rounded-full" style={{ width: stu.pct }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00714b] bg-[#8af5be] px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
