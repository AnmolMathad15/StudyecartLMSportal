import React from 'react';
import { useLms } from '../context/LmsContext';
import { MetricCard } from '../components/MetricCard';
import {
  ShieldCheck,
  Users,
  BookOpen,
  DollarSign,
  Layers,
  Activity,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Megaphone,
  KeyRound,
  Settings,
  Eye
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    courses,
    updateCourse,
    certificates,
    announcements,
    activityLogs,
    navigate,
    showToast
  } = useLms();

  const totalStudents = users.filter((u) => u.role === 'STUDENT').length;
  const totalInstructors = users.filter((u) => u.role === 'INSTRUCTOR').length;
  const totalRevenue = courses.reduce((acc, c) => acc + c.price * c.enrolledStudents, 0);
  const pendingCourses = courses.filter((c) => !c.published);

  const handleApproveCourse = (courseId: string) => {
    updateCourse(courseId, { published: true });
    showToast('Course approved and published to the public catalog!', 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-[#006B47]" /> Admin Governance Console
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Institutional overview, course approvals, user privilege governance, and academic telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#8af5be]/30 text-[#00714b] px-3.5 py-1.5 rounded-xl text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-[#006B47]" /> Enterprise Governance Active
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Platform Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}k`}
          change="+18.4% vs last quarter"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Registered Students"
          value={String(totalStudents)}
          change="Across 12 global batches"
          trend="neutral"
          icon={Users}
        />
        <MetricCard
          title="Accredited Mentors"
          value={String(totalInstructors)}
          change="100% faculty verified"
          trend="up"
          icon={UserCheck}
        />
        <MetricCard
          title="Active Curricula"
          value={String(courses.length)}
          change="All live & certified"
          trend="up"
          icon={BookOpen}
        />
      </div>

      {/* Pending Course Approvals Queue */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#EF9F13]" />
            <h2 className="font-bold text-base text-[#191c1e] font-display">
              Pending Course Approval Queue
            </h2>
            <span className="bg-[#EF9F13]/20 text-[#945800] text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingCourses.length} Pending
            </span>
          </div>

          <button
            onClick={() => navigate('/admin/courses')}
            className="text-xs font-bold text-[#006B47] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Full Directory <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingCourses.length > 0 ? (
          <div className="divide-y divide-[#BDCAC0]/40">
            {pendingCourses.map((c) => (
              <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded-lg overflow-hidden border border-[#BDCAC0] flex-shrink-0">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#191c1e]">{c.title}</h3>
                    <p className="text-xs text-[#707972]">
                      By <strong className="text-[#191c1e]">{c.instructorName}</strong> • {c.category} • {c.modules?.length || 0} modules
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => navigate('/admin/courses')}
                    className="px-3 py-1.5 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#006B47] rounded-lg text-xs font-bold border border-[#BDCAC0]/60 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Review
                  </button>
                  <button
                    onClick={() => handleApproveCourse(c.id)}
                    className="px-4 py-1.5 bg-[#006B47] hover:bg-[#005034] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-[#707972] bg-[#F7F9FB] rounded-xl border border-dashed border-[#BDCAC0]">
            <CheckCircle2 className="w-6 h-6 text-[#006B47] mx-auto mb-1" />
            All submitted curricula are fully reviewed and approved.
          </div>
        )}
      </div>

      {/* Governance Quick Launch Grid */}
      <div className="space-y-4">
        <h2 className="font-bold text-base text-[#191c1e] font-display">Governance & Operations Hub</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => navigate('/admin/users')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">User Governance</h3>
            <p className="text-xs text-[#707972]">
              Manage {users.length} accounts, update RBAC roles, and regulate access permissions.
            </p>
          </div>

          <div
            onClick={() => navigate('/admin/courses')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">Course Catalog & Approvals</h3>
            <p className="text-xs text-[#707972]">
              Review syllabi, approve curricula, toggle featured programs, and manage prices.
            </p>
          </div>

          <div
            onClick={() => navigate('/admin/enrollments')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">Enrollment Roster</h3>
            <p className="text-xs text-[#707972]">
              Track student progression rates, cohort batches, and matriculation records.
            </p>
          </div>

          <div
            onClick={() => navigate('/admin/categories')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">Category & Taxonomy</h3>
            <p className="text-xs text-[#707972]">
              Structure academic departments, course taxonomy, and specialization tracks.
            </p>
          </div>

          <div
            onClick={() => navigate('/admin/certificates')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">Certificates Registry</h3>
            <p className="text-xs text-[#707972]">
              Verify and issue {certificates.length} digital graduation certificates with tamper-proof IDs.
            </p>
          </div>

          <div
            onClick={() => navigate('/admin/roles')}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-5 shadow-2xs hover:border-[#006B47] transition-all cursor-pointer space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8af5be]/40 text-[#006B47] flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e] font-display">Roles & Permissions (RBAC)</h3>
            <p className="text-xs text-[#707972]">
              Enforce strict separation: Students learn, Mentors teach, Admins govern.
            </p>
          </div>
        </div>
      </div>

      {/* Recent System Audit Logs */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base text-[#191c1e] font-display">System Event Audit Trail</h2>
          <button
            onClick={() => navigate('/admin/audit-logs')}
            className="text-xs font-bold text-[#006B47] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Full Log Trail <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {activityLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/40 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-[#006B47]" />
                <span>
                  <strong className="text-[#191c1e]">{log.actor}</strong> {log.action}{' '}
                  <strong className="text-[#006B47]">{log.target}</strong>
                </span>
              </div>
              <span className="text-[#707972] font-mono text-[11px]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
