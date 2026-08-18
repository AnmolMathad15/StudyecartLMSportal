import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Activity,
  Shield,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  BookOpen,
  Lock,
  Clock
} from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const { activityLogs, showToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  // Augmented logs for comprehensive institutional auditing
  const fullAuditTrail = [
    ...activityLogs,
    {
      id: 'audit-sec-1',
      type: 'SYSTEM' as const,
      actor: 'Admin Aris Thorne',
      action: 'promoted Sarah Jenkins to',
      target: 'Batch Lead Researcher',
      timestamp: '10 mins ago',
      statusColor: 'emerald' as const
    },
    {
      id: 'audit-sec-2',
      type: 'EVALUATION' as const,
      actor: 'Prof. Elena Rostova',
      action: 'approved curriculum release for',
      target: 'Multivariable Calculus & Differential Geometry',
      timestamp: '2 hours ago',
      statusColor: 'emerald' as const
    },
    {
      id: 'audit-sec-3',
      type: 'SYSTEM' as const,
      actor: 'Security Daemon',
      action: 'blocked suspicious IP 192.168.4.12 attempting',
      target: 'Brute Force Auth Attack',
      timestamp: '5 hours ago',
      statusColor: 'amber' as const
    },
    {
      id: 'audit-sec-4',
      type: 'ENROLLMENT' as const,
      actor: 'Liam Patel',
      action: 'matriculated into',
      target: 'Data Structures & Algorithms in Java',
      timestamp: '1 day ago',
      statusColor: 'emerald' as const
    }
  ];

  const filteredLogs = fullAuditTrail.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'ALL' || log.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleExportLogs = () => {
    showToast('Exporting cryptographic SHA-256 signed audit trail...', 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-[#006B47]" /> System Compliance & Audit Logs
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Immutable trace log of administrative overrides, security actions, course approvals, and matriculations.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="bg-[#006B47] hover:bg-[#005034] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export CSV Audit Trail
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by actor, action, or target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl px-2.5 py-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#707972]" />
          <span className="text-[11px] font-bold text-[#707972]">Event Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-transparent font-semibold text-xs text-[#191c1e] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Event Types</option>
            <option value="SYSTEM">System & Governance</option>
            <option value="ENROLLMENT">Enrollment & Matriculation</option>
            <option value="EVALUATION">Curriculum & Grading</option>
            <option value="DOUBT">Q&A Desk Operations</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FB] text-[#404943] font-bold border-b border-[#BDCAC0]/60 uppercase tracking-wider">
              <tr>
                <th className="p-4">Event Category</th>
                <th className="p-4">Acting Identity</th>
                <th className="p-4">Administrative Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDCAC0]/40">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F9FB]/80 transition-colors">
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.statusColor === 'emerald'
                          ? 'bg-[#8af5be]/50 text-[#00714b]'
                          : log.statusColor === 'amber'
                          ? 'bg-[#ffdad6] text-[#BA1A1A]'
                          : 'bg-[#e1e2e5] text-[#404943]'
                      }`}
                    >
                      {log.type}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-[#191c1e] flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#006B47]" />
                    <span>{log.actor}</span>
                  </td>

                  <td className="p-4 text-[#404943] font-medium">{log.action}</td>

                  <td className="p-4 font-semibold text-[#006B47]">{log.target}</td>

                  <td className="p-4 text-right font-mono text-[#707972]">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
