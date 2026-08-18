import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Award, PlusCircle, Search, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export const AdminCertificatesPage: React.FC = () => {
  const { certificates, issueCertificate, courses, showToast } = useLms();
  const [isIssuing, setIsIssuing] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [grade, setGrade] = useState('A+ (Distinction)');

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const selCourse = courses.find((c) => c.id === courseId);
    if (!studentName.trim() || !selCourse) return;

    issueCertificate({
      studentId: 'stu-' + Date.now(),
      studentName,
      courseId: selCourse.id,
      courseTitle: selCourse.title,
      grade
    });
    setStudentName('');
    setStudentEmail('');
    setIsIssuing(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Institutional Certificate Registry
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Issue, revoke, and verify tamper-proof digital certificates for graduating scholars.
          </p>
        </div>

        <button
          onClick={() => setIsIssuing(!isIssuing)}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> {isIssuing ? 'Cancel' : 'Issue Verified Certificate'}
        </button>
      </div>

      {isIssuing && (
        <form
          onSubmit={handleIssue}
          className="bg-white border border-[#BDCAC0]/80 rounded-2xl p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <h3 className="font-bold text-base text-[#191c1e] font-display">
            Issue New Verified Credential
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Student Full Legal Name
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Select Completed Program
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
              Graduation Grade & Honors
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsIssuing(false)}
              className="px-4 py-2 bg-[#F7F9FB] text-xs font-bold text-[#404943] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#006B47] hover:bg-[#005034] text-xs font-bold text-white rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" /> Issue & Sign Credential
            </button>
          </div>
        </form>
      )}

      {/* Certificates Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FB] border-b border-[#BDCAC0]/60 text-[#404943] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Certificate ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Course Program</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/40">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-[#F7F9FB]">
                  <td className="p-4 font-mono font-bold text-[#006B47]">{cert.certificateNumber}</td>
                  <td className="p-4 font-bold text-[#191c1e]">{cert.studentName}</td>
                  <td className="p-4 text-[#404943]">{cert.courseTitle}</td>
                  <td className="p-4 font-semibold text-[#191c1e]">{cert.grade}</td>
                  <td className="p-4 text-[#707972] font-mono">{cert.issueDate}</td>
                  <td className="p-4">
                    <span className="bg-[#8af5be]/50 text-[#00714b] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> Verifiable
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
