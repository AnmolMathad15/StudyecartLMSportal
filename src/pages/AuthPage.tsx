import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  GraduationCap,
  BookOpen,
  Shield,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const { login, signup, navigate, currentRole } = useLms();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      login(email || 'aris.thorne@faculty.studyecart.edu', role);
    } else {
      signup(name || 'Sarah Jenkins', email || 'sarah.j@student.studyecart.edu', role);
    }
  };

  const handleQuickLogin = (demoRole: UserRole, demoEmail: string) => {
    login(demoEmail, demoRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#BDCAC0]/80 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#71DBA6] mx-auto bg-white flex items-center justify-center shadow-xs">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVNZleRrP2-QjELmBaqG3AFjmbijCnGfBuQPPgavgMzCm6tDKoE8YLr_ToPJ3Jht9778v5D-fkGZnTFjxJaJ5wUfZS2h06IhyO2lzLORvlrBsixgQuLN6JvfiQ8Z0wxxJ4CcH6DyAbGO6D-plTc018xnwaBwVL-BCMi3yTgVGgJi4yxAVzxZ1sj1cDJmR4xQg15ce4m2Haa5bYN32PbAVXXKoYn_vp9KVtdCOFq_R1d_bnylYczEqimIyoM0yt8YAtZKk"
              alt="StudyEcart"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#191c1e] font-display">
            {isLoginMode ? 'Welcome to StudyEcart' : 'Create Academic Account'}
          </h2>
          <p className="text-xs text-[#707972]">
            {isLoginMode ? 'Sign in to access your course studios & portals' : 'Join thousands of engineering students and faculty'}
          </p>
        </div>

        {/* Quick Demo Personas */}
        <div className="space-y-2 p-3.5 bg-[#F7F9FB] rounded-xl border border-[#BDCAC0]/60 text-xs">
          <p className="font-bold text-[#191c1e] text-[11px] uppercase tracking-wider">
            Quick Persona 1-Click Access
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleQuickLogin('INSTRUCTOR', 'aris.thorne@faculty.studyecart.edu')}
              className="p-2 bg-white border border-[#BDCAC0]/70 rounded-lg text-center hover:border-[#006B47] hover:bg-[#71DBA6]/10 transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 mx-auto text-[#006B47] mb-1" />
              <span className="font-bold block text-[11px] text-[#191c1e]">Mentor</span>
              <span className="text-[9px] text-[#707972]">Dr. Aris</span>
            </button>

            <button
              onClick={() => handleQuickLogin('STUDENT', 'sarah.j@student.studyecart.edu')}
              className="p-2 bg-white border border-[#BDCAC0]/70 rounded-lg text-center hover:border-[#006B47] hover:bg-[#71DBA6]/10 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 mx-auto text-[#006B47] mb-1" />
              <span className="font-bold block text-[11px] text-[#191c1e]">Student</span>
              <span className="text-[9px] text-[#707972]">Sarah J.</span>
            </button>

            <button
              onClick={() => handleQuickLogin('ADMIN', 'admin@studyecart.edu')}
              className="p-2 bg-white border border-[#BDCAC0]/70 rounded-lg text-center hover:border-[#006B47] hover:bg-[#71DBA6]/10 transition-all cursor-pointer"
            >
              <Shield className="w-4 h-4 mx-auto text-[#006B47] mb-1" />
              <span className="font-bold block text-[11px] text-[#191c1e]">Admin</span>
              <span className="text-[9px] text-[#707972]">Root Console</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-[#404943] mb-1">Full Legal Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1">Academic Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg text-xs text-[#191c1e] focus:outline-none focus:border-[#006B47]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#404943] mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-[#F7F9FB] border border-[#BDCAC0] rounded-lg p-2 text-xs font-semibold text-[#191c1e] focus:outline-none"
            >
              <option value="STUDENT">Student / Learner</option>
              <option value="INSTRUCTOR">Faculty Mentor / Instructor</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#006B47] hover:bg-[#005034] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>{isLoginMode ? 'Sign In to Portal' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#BDCAC0]/40">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-xs text-[#006B47] hover:underline font-semibold cursor-pointer"
          >
            {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
