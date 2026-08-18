import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  GraduationCap,
  Sparkles,
  Plus,
  Mail,
  Calendar,
  MoreVertical,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UserRole } from '../types';

export const AdminUsersPage: React.FC = () => {
  const { users, updateUserStatus, updateUserRole, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'>('ALL');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const studentsCount = users.filter((u) => u.role === 'STUDENT').length;
  const mentorsCount = users.filter((u) => u.role === 'INSTRUCTOR').length;
  const adminsCount = users.filter((u) => u.role === 'ADMIN').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#006B47]" /> User Governance & Directory
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Global management of student accounts, faculty appointments, administrative privileges, and account security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#8af5be]/40 text-[#005034] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#006B47]" /> {users.length} Total Registered Identities
          </span>
        </div>
      </div>

      {/* Role Distribution Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setRoleFilter(roleFilter === 'STUDENT' ? 'ALL' : 'STUDENT')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            roleFilter === 'STUDENT'
              ? 'bg-[#006B47] text-white border-[#006B47] shadow-sm'
              : 'bg-white border-[#BDCAC0]/70 text-[#191c1e] hover:border-[#006B47]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Learners / Students</span>
            <GraduationCap className={`w-5 h-5 ${roleFilter === 'STUDENT' ? 'text-white' : 'text-[#006B47]'}`} />
          </div>
          <p className="text-2xl font-bold font-display mt-2">{studentsCount}</p>
          <p className={`text-[11px] mt-1 ${roleFilter === 'STUDENT' ? 'text-white/80' : 'text-[#707972]'}`}>
            Enrolled in active cohorts
          </p>
        </button>

        <button
          onClick={() => setRoleFilter(roleFilter === 'INSTRUCTOR' ? 'ALL' : 'INSTRUCTOR')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            roleFilter === 'INSTRUCTOR'
              ? 'bg-[#006B47] text-white border-[#006B47] shadow-sm'
              : 'bg-white border-[#BDCAC0]/70 text-[#191c1e] hover:border-[#006B47]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Faculty & Mentors</span>
            <UserCheck className={`w-5 h-5 ${roleFilter === 'INSTRUCTOR' ? 'text-white' : 'text-[#006B47]'}`} />
          </div>
          <p className="text-2xl font-bold font-display mt-2">{mentorsCount}</p>
          <p className={`text-[11px] mt-1 ${roleFilter === 'INSTRUCTOR' ? 'text-white/80' : 'text-[#707972]'}`}>
            Accredited course instructors
          </p>
        </button>

        <button
          onClick={() => setRoleFilter(roleFilter === 'ADMIN' ? 'ALL' : 'ADMIN')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            roleFilter === 'ADMIN'
              ? 'bg-[#006B47] text-white border-[#006B47] shadow-sm'
              : 'bg-white border-[#BDCAC0]/70 text-[#191c1e] hover:border-[#006B47]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">System Administrators</span>
            <Shield className={`w-5 h-5 ${roleFilter === 'ADMIN' ? 'text-white' : 'text-[#006B47]'}`} />
          </div>
          <p className="text-2xl font-bold font-display mt-2">{adminsCount}</p>
          <p className={`text-[11px] mt-1 ${roleFilter === 'ADMIN' ? 'text-white/80' : 'text-[#707972]'}`}>
            Full governance authority
          </p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#707972]" />
            <span className="text-[11px] font-bold text-[#707972]">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="bg-transparent font-semibold text-xs text-[#191c1e] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="INSTRUCTOR">Mentors</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-2.5 py-1.5 text-xs">
            <span className="text-[11px] font-bold text-[#707972]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent font-semibold text-xs text-[#191c1e] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FB] text-[#404943] font-bold border-b border-[#BDCAC0]/60 uppercase tracking-wider">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Assigned Role (RBAC)</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Governance Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/40">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F9FB]/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#BDCAC0] flex-shrink-0">
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#191c1e]">{u.name}</p>
                        <p className="text-[11px] text-[#707972] flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {u.email}
                        </p>
                        {u.title && <p className="text-[10px] text-[#006B47] font-semibold">{u.title}</p>}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                      className="bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg px-2.5 py-1 text-xs font-bold text-[#191c1e] focus:outline-none focus:border-[#006B47] cursor-pointer"
                    >
                      <option value="STUDENT">Student</option>
                      <option value="INSTRUCTOR">Faculty / Mentor</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                  </td>

                  <td className="p-4 font-mono text-[#707972]">{u.joinedDate}</td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        u.status === 'ACTIVE'
                          ? 'bg-[#8af5be]/50 text-[#00714b]'
                          : u.status === 'SUSPENDED'
                          ? 'bg-[#ffdad6] text-[#BA1A1A]'
                          : 'bg-[#e1e2e5] text-[#404943]'
                      }`}
                    >
                      {u.status === 'ACTIVE' && <CheckCircle2 className="w-3 h-3" />}
                      {u.status === 'SUSPENDED' && <AlertTriangle className="w-3 h-3" />}
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.status === 'ACTIVE' ? (
                        <button
                          onClick={() => updateUserStatus(u.id, 'SUSPENDED')}
                          className="px-3 py-1.5 bg-[#ffdad6]/40 hover:bg-[#ffdad6] text-[#BA1A1A] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Suspend Access
                        </button>
                      ) : (
                        <button
                          onClick={() => updateUserStatus(u.id, 'ACTIVE')}
                          className="px-3 py-1.5 bg-[#71DBA6]/20 hover:bg-[#71DBA6]/40 text-[#005034] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Reinstate
                        </button>
                      )}

                      <button
                        onClick={() => showToast(`Password reset link dispatched to ${u.email}`, 'info')}
                        className="px-2.5 py-1.5 bg-[#F7F9FB] hover:bg-[#e7e8eb] text-[#404943] rounded-lg text-xs font-medium border border-[#BDCAC0]/60 transition-colors cursor-pointer"
                        title="Send Password Reset"
                      >
                        Reset PW
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-[#707972]">
            <Users className="w-8 h-8 mx-auto mb-2 text-[#BDCAC0]" />
            <p className="text-sm font-semibold">No users matching filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
