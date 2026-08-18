import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  User as UserIcon,
  Mail,
  Shield,
  Bell,
  Palette,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  Smartphone,
  Sparkles
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, currentRole, enrolledCourseIds, certificates, logout, showToast } = useLms();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance'>('profile');

  // Student Profile fields
  const [name, setName] = useState(currentUser?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(currentUser?.email || 'sarah.jenkins@student.studyecart.edu');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [studentId, setStudentId] = useState('STU-2026-8941');
  const [bio, setBio] = useState('Computer Science & Machine Learning undergraduate. Enthusiastic about deep learning architectures, algorithms, and distributed systems.');
  const [learningGoal, setLearningGoal] = useState('Mastering Large-Scale Data Systems & Completing Full-Stack AI Certifications');

  // Notification Preferences
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifLiveReminders, setNotifLiveReminders] = useState(true);
  const [notifAssignmentGrades, setNotifAssignmentGrades] = useState(true);
  const [notifDoubtReplies, setNotifDoubtReplies] = useState(true);
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information updated successfully!', 'success');
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    showToast('Password changed securely.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const isStudent = currentRole === 'STUDENT' || !currentUser?.title?.includes('Professor');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
          {isStudent ? 'Student Profile & Settings' : 'Account & Platform Settings'}
        </h1>
        <p className="text-sm text-[#404943] mt-1">
          {isStudent
            ? 'Manage your learner profile, preferences, credentials, and notification triggers.'
            : 'Configure your account settings and preferences.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#BDCAC0]/60 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#006B47] text-white shadow-2xs'
              : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          <UserIcon className="w-4 h-4" /> Personal Information
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#006B47] text-white shadow-2xs'
              : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#006B47] text-white shadow-2xs'
              : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          <Lock className="w-4 h-4" /> Security & Password
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-[#006B47] text-white shadow-2xs'
              : 'text-[#404943] hover:bg-[#F7F9FB]'
          }`}
        >
          <Palette className="w-4 h-4" /> Preferences
        </button>
      </div>

      {/* Profile Form */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Profile Summary Card */}
          <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#006B47] bg-[#F7F9FB] shadow-md">
                <img
                  src={
                    currentUser?.avatar ||
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
                  }
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-[#8af5be] border-2 border-white w-5 h-5 rounded-full"></span>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-[#191c1e] font-display">{name}</h2>
                <span className="bg-[#8af5be]/50 text-[#00714b] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Student Account
                </span>
              </div>
              <p className="text-xs text-[#707972]">{email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[#404943]">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#006B47]" /> {enrolledCourseIds.length} Enrolled Courses
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#006B47]" /> {certificates.length} Certificates
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-[#707972]">
                  ID: {studentId}
                </span>
              </div>
            </div>
          </div>

          {/* Form Details */}
          <form onSubmit={handleSaveProfile} className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-[#191c1e] font-display">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                  Student Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                  Official Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  disabled
                  className="w-full bg-[#e7e8eb]/60 border border-[#BDCAC0]/60 rounded-xl p-2.5 text-xs text-[#707972] font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Current Learning Goals
              </label>
              <input
                type="text"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Student Bio & Study Interests
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Profile Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in">
          <h3 className="font-bold text-base text-[#191c1e] font-display">Notification Preferences</h3>
          <p className="text-xs text-[#707972]">
            Control which study alerts and updates you receive via push and email.
          </p>

          <div className="divide-y divide-[#BDCAC0]/40 space-y-4 pt-2">
            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Live Class Countdown Alerts</h4>
                <p className="text-[11px] text-[#707972]">Receive reminder 15 minutes before live lectures start.</p>
              </div>
              <input
                type="checkbox"
                checked={notifLiveReminders}
                onChange={(e) => setNotifLiveReminders(e.target.checked)}
                className="w-4 h-4 accent-[#006B47] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Assignment Evaluations & Grades</h4>
                <p className="text-[11px] text-[#707972]">Get notified when your mentor reviews and grades your submission.</p>
              </div>
              <input
                type="checkbox"
                checked={notifAssignmentGrades}
                onChange={(e) => setNotifAssignmentGrades(e.target.checked)}
                className="w-4 h-4 accent-[#006B47] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Faculty Doubt Responses</h4>
                <p className="text-[11px] text-[#707972]">Instant alerts when a course mentor answers your doubt tickets.</p>
              </div>
              <input
                type="checkbox"
                checked={notifDoubtReplies}
                onChange={(e) => setNotifDoubtReplies(e.target.checked)}
                className="w-4 h-4 accent-[#006B47] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <h4 className="font-bold text-xs text-[#191c1e]">Course Announcements</h4>
                <p className="text-[11px] text-[#707972]">Receive updates on curriculum releases, lab files, and exams.</p>
              </div>
              <input
                type="checkbox"
                checked={notifAnnouncements}
                onChange={(e) => setNotifAnnouncements(e.target.checked)}
                className="w-4 h-4 accent-[#006B47] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => showToast('Notification preferences saved!', 'success')}
              className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4 animate-in fade-in">
          <h3 className="font-bold text-base text-[#191c1e] font-display">Change Password</h3>
          <p className="text-xs text-[#707972]">
            Ensure your StudyEcart account is secured with a strong password.
          </p>

          <div className="space-y-3 max-w-md pt-2">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </div>
        </form>
      )}

      {/* Appearance / Preferences Tab */}
      {activeTab === 'appearance' && (
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in">
          <h3 className="font-bold text-base text-[#191c1e] font-display">Portal Appearance & Language</h3>

          <div className="space-y-4 max-w-md pt-2">
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Theme Scheme
              </label>
              <select className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none">
                <option value="light">StudyEcart High-Contrast Mint (Default)</option>
                <option value="system">Follow Operating System Theme</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1 uppercase tracking-wider">
                Portal Language
              </label>
              <select className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-xl p-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none">
                <option value="en">English (US)</option>
                <option value="uk">English (UK)</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="pt-4 border-t border-[#BDCAC0]/40">
              <button
                onClick={logout}
                className="w-full py-2.5 bg-[#ffdad6]/40 hover:bg-[#ffdad6] text-[#BA1A1A] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign Out of All Devices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
