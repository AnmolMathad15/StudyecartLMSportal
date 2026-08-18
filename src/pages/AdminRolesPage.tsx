import React from 'react';
import { Shield, Lock, CheckCircle2, XCircle, Users, Sparkles, KeyRound } from 'lucide-react';

export const AdminRolesPage: React.FC = () => {
  const permissionsMatrix = [
    {
      module: 'Student Learning & Participation',
      permissions: [
        { name: 'Browse & Discover Public Catalog', student: true, mentor: true, admin: true },
        { name: 'Enroll in Courses & Batches', student: true, mentor: false, admin: true },
        { name: 'Watch Video Lectures & Complete Lessons', student: true, mentor: false, admin: true },
        { name: 'Submit Assignments & Lab Work', student: true, mentor: false, admin: false },
        { name: 'Attempt Quizzes & Online Tests', student: true, mentor: false, admin: false },
        { name: 'Ask Doubts in Course Q&A Desk', student: true, mentor: false, admin: false },
        { name: 'Attend Live Broadcast Studio Sessions', student: true, mentor: false, admin: true },
        { name: 'Earn & Download Verified Certificates', student: true, mentor: false, admin: true }
      ]
    },
    {
      module: 'Faculty & Mentorship Operations',
      permissions: [
        { name: 'Create & Author New Courses', student: false, mentor: true, admin: true },
        { name: 'Manage Curriculum, Modules & Lessons', student: false, mentor: true, admin: true },
        { name: 'Schedule & Broadcast Live Classes', student: false, mentor: true, admin: true },
        { name: 'Author Quizzes & Question Banks', student: false, mentor: true, admin: true },
        { name: 'Grade & Evaluate Student Assignments', student: false, mentor: true, admin: true },
        { name: 'Answer Student Doubt Tickets', student: false, mentor: true, admin: true },
        { name: 'Broadcast Cohort Announcements', student: false, mentor: true, admin: true },
        { name: 'View Course-Level Telemetry & Grades', student: false, mentor: true, admin: true }
      ]
    },
    {
      module: 'Institutional Platform Governance (Admin Only)',
      permissions: [
        { name: 'Platform-Wide User Lifecycle (Suspend/Activate)', student: false, mentor: false, admin: true },
        { name: 'Role Assignment & Privilege Escalation', student: false, mentor: false, admin: true },
        { name: 'Course Review, Approval & Catalog Rejection', student: false, mentor: false, admin: true },
        { name: 'Taxonomy & Academic Department Control', student: false, mentor: false, admin: true },
        { name: 'Institutional Certificate Signing & Override', student: false, mentor: false, admin: true },
        { name: 'System Maintenance & Registration Toggles', student: false, mentor: false, admin: true },
        { name: 'Immutable Security Audit Trail Inspection', student: false, mentor: false, admin: true },
        { name: 'Platform-Wide Financial & Telemetry Intelligence', student: false, mentor: false, admin: true }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <KeyRound className="w-7 h-7 text-[#006B47]" /> Roles & Access Control Matrix (RBAC)
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Enforced Role-Based Access Control policies ensuring strict separation of Student, Mentor, and Admin duties.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#8af5be]/40 text-[#005034] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#006B47]" /> Spring Security Enforced
          </span>
        </div>
      </div>

      {/* Role Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-[#8af5be]/40 text-[#00714b] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              ROLE_STUDENT
            </span>
            <Users className="w-5 h-5 text-[#006B47]" />
          </div>
          <h3 className="font-bold text-base text-[#191c1e] font-display">Student / Learner</h3>
          <p className="text-xs text-[#707972] leading-relaxed">
            Consumes educational materials, attends live broadcasts, submits tasks, takes quizzes, and tracks personal progress.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#006B47]">
            ✓ Strictly zero content authoring or user management access.
          </div>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-[#71DBA6]/20 text-[#005034] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              ROLE_INSTRUCTOR
            </span>
            <Sparkles className="w-5 h-5 text-[#006B47]" />
          </div>
          <h3 className="font-bold text-base text-[#191c1e] font-display">Mentor / Faculty</h3>
          <p className="text-xs text-[#707972] leading-relaxed">
            Authors curriculum modules, conducts live lecture studios, grades student submissions, and resolves doubt tickets.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#006B47]">
            ✓ Restricted exclusively to own courses and cohort learners.
          </div>
        </div>

        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-[#006B47] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              ROLE_ADMIN
            </span>
            <Shield className="w-5 h-5 text-[#006B47]" />
          </div>
          <h3 className="font-bold text-base text-[#191c1e] font-display">Platform Administrator</h3>
          <p className="text-xs text-[#707972] leading-relaxed">
            Global governance, user role modification, course syllabus approval, institutional certificates, and audit logs.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#006B47]">
            ✓ Complete oversight; does not act as student or mentor.
          </div>
        </div>
      </div>

      {/* Permissions Matrix Tables */}
      <div className="space-y-6">
        {permissionsMatrix.map((section, sIdx) => (
          <div key={sIdx} className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
            <div className="p-4 bg-[#F7F9FB] border-b border-[#BDCAC0]/60 flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#191c1e] font-display">{section.module}</h3>
              <span className="text-xs text-[#707972] font-mono">RBAC Policy Guard</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f2f4f6] text-[#404943] font-bold border-b border-[#BDCAC0]/50 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Permission Capability</th>
                    <th className="p-4 text-center w-36">Student</th>
                    <th className="p-4 text-center w-36">Mentor / Faculty</th>
                    <th className="p-4 text-center w-36">Administrator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BDCAC0]/30">
                  {section.permissions.map((perm, pIdx) => (
                    <tr key={pIdx} className="hover:bg-[#F7F9FB] transition-colors">
                      <td className="p-4 font-semibold text-[#191c1e]">{perm.name}</td>
                      <td className="p-4 text-center">
                        {perm.student ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8af5be]/50 text-[#00714b]">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f4f6] text-[#BDCAC0]">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {perm.mentor ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8af5be]/50 text-[#00714b]">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f4f6] text-[#BDCAC0]">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {perm.admin ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8af5be]/50 text-[#00714b]">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f4f6] text-[#BDCAC0]">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
