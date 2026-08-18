import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  ShieldAlert,
  Server,
  Mail,
  Lock,
  Database,
  Save,
  CheckCircle2,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Globe,
  Sliders
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useLms();

  // Platform Governance Settings
  const [platformName, setPlatformName] = useState('StudyEcart Learning Management System');
  const [supportEmail, setSupportEmail] = useState('governance@studyecart.edu');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [studentRegistrationOpen, setStudentRegistrationOpen] = useState(true);
  const [mentorApplicationsOpen, setMentorApplicationsOpen] = useState(true);
  const [requireCourseApproval, setRequireCourseApproval] = useState(true);
  const [maxUploadSizeMb, setMaxUploadSizeMb] = useState(150);

  // Security Policies
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(120);
  const [enforceTwoFactor, setEnforceTwoFactor] = useState(false);
  const [passwordMinLength, setPasswordMinLength] = useState(8);

  // Email SMTP
  const [smtpHost, setSmtpHost] = useState('smtp.mailgun.org');
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpUser, setSmtpUser] = useState('postmaster@studyecart.edu');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform governance configurations saved successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display flex items-center gap-2.5">
          <ShieldAlert className="w-7 h-7 text-[#006B47]" /> System Compliance & Governance Settings
        </h1>
        <p className="text-sm text-[#404943] mt-1">
          Configure institutional parameters, user onboarding toggles, security thresholds, and system integration services.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Institutional Configuration */}
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#006B47]" /> Institutional Identity & Onboarding Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Governance & Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="divide-y divide-[#BDCAC0]/40 pt-2 space-y-3">
            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Maintenance Mode</h4>
                <p className="text-[11px] text-[#707972]">
                  When active, non-admin users will see an institutional maintenance banner.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className="cursor-pointer"
              >
                {maintenanceMode ? (
                  <ToggleRight className="w-8 h-8 text-[#BA1A1A]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#BDCAC0]" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Open Student Self-Registration</h4>
                <p className="text-[11px] text-[#707972]">
                  Allow prospective learners to sign up for public catalogs without invitation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStudentRegistrationOpen(!studentRegistrationOpen)}
                className="cursor-pointer"
              >
                {studentRegistrationOpen ? (
                  <ToggleRight className="w-8 h-8 text-[#006B47]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#BDCAC0]" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Open Mentor / Faculty Applications</h4>
                <p className="text-[11px] text-[#707972]">
                  Accept incoming educator credentials for review in the verification queue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMentorApplicationsOpen(!mentorApplicationsOpen)}
                className="cursor-pointer"
              >
                {mentorApplicationsOpen ? (
                  <ToggleRight className="w-8 h-8 text-[#006B47]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#BDCAC0]" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Mandatory Course Approval Gate</h4>
                <p className="text-[11px] text-[#707972]">
                  Require admin approval before any newly created course is published to students.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRequireCourseApproval(!requireCourseApproval)}
                className="cursor-pointer"
              >
                {requireCourseApproval ? (
                  <ToggleRight className="w-8 h-8 text-[#006B47]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#BDCAC0]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security & Authentication Policies */}
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#006B47]" /> Access Security & Token Lifetimes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                JWT Session Inactivity Timeout (Minutes)
              </label>
              <input
                type="number"
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Minimum Password Complexity (Characters)
              </label>
              <input
                type="number"
                value={passwordMinLength}
                onChange={(e) => setPasswordMinLength(Number(e.target.value))}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>
          </div>
        </div>

        {/* Storage & Integration */}
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5">
          <h3 className="font-bold text-base text-[#191c1e] font-display flex items-center gap-2">
            <Database className="w-5 h-5 text-[#006B47]" /> Storage & Email Dispatch Gateway
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Max Media File Size (MB)
              </label>
              <input
                type="number"
                value={maxUploadSizeMb}
                onChange={(e) => setMaxUploadSizeMb(Number(e.target.value))}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                SMTP Host Server
              </label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                SMTP Port
              </label>
              <input
                type="number"
                value={smtpPort}
                onChange={(e) => setSmtpPort(Number(e.target.value))}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>
          </div>
        </div>

        {/* Form Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" /> Save Governance Parameters
          </button>
        </div>
      </form>
    </div>
  );
};
