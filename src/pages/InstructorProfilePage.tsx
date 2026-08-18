import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import {
  UserCheck,
  Mail,
  Award,
  BookOpen,
  Save,
  CheckCircle2,
  Shield,
  Upload,
  Globe,
  Github,
  Linkedin,
  GraduationCap,
  Users,
  Star
} from 'lucide-react';

export const InstructorProfilePage: React.FC = () => {
  const { currentUser, showToast } = useLms();
  const [name, setName] = useState(currentUser?.name || 'Dr. Aris Thorne');
  const [email, setEmail] = useState(currentUser?.email || 'aris.thorne@faculty.studyecart.com');
  const [title, setTitle] = useState(currentUser?.title || 'Lead Professor & Algorithms Researcher');
  const [department, setDepartment] = useState('Computer Science & Machine Intelligence');
  const [experienceYears, setExperienceYears] = useState(12);
  const [bio, setBio] = useState(
    currentUser?.bio ||
      'PhD in Computer Science & Applied Mathematics from Stanford. Over 12 years of research and teaching experience in statistical learning, high-performance distributed systems, and graph neural networks.'
  );
  const [github, setGithub] = useState('https://github.com/aris-thorne-research');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/aris-thorne');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Mentor credentials and faculty profile saved successfully');
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#006B47] uppercase tracking-wider bg-[#8af5be]/30 px-2.5 py-0.5 rounded-full font-mono">
            Faculty Profile
          </span>
          <span className="text-xs text-[#707972]">•</span>
          <span className="text-xs text-[#707972]">Academic Credentials</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
          Mentor Profile & Teaching Credentials
        </h2>
        <p className="text-sm text-[#404943] mt-1">
          Update public teaching credentials, academic qualifications, research statements, and contact channels.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar & Header Card */}
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={
                currentUser?.avatar ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew'
              }
              alt="Faculty Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#8DF7C1] shadow-md"
            />
            <button
              type="button"
              onClick={() => showToast('Avatar upload dialog opened', 'info')}
              className="absolute bottom-0 right-0 bg-[#006B47] text-white p-1.5 rounded-full hover:bg-[#005034] shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h3 className="text-xl font-bold text-[#191c1e] font-display">{name}</h3>
              <span className="bg-[#8af5be]/50 text-[#00714b] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Faculty
              </span>
            </div>
            <p className="text-xs text-[#006B47] font-semibold">{title}</p>
            <p className="text-xs text-[#707972]">{department}</p>
            
            {/* Quick stats badge bar */}
            <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start text-xs font-semibold text-[#404943]">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#006B47]" /> 4 Active Courses
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#006B47]" /> 284 Learners
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#EF9F13] fill-[#EF9F13]" /> 4.9 Rating
              </span>
            </div>
          </div>
        </div>

        {/* Edit Fields */}
        <div className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#191c1e] mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] mb-1">Institutional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] mb-1">Academic Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] mb-1">Teaching Experience (Years)</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#191c1e] mb-1">Biography & Research Statement</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-sm text-[#191c1e] focus:outline-hidden focus:border-[#006B47]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] mb-1">GitHub / Code Repository</label>
              <div className="relative">
                <Github className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e] font-mono focus:outline-hidden focus:border-[#006B47]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] mb-1">LinkedIn Profile</label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-[#707972] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F9FB] border border-[#BDCAC0]/70 rounded-xl text-xs text-[#191c1e] font-mono focus:outline-hidden focus:border-[#006B47]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#BDCAC0]/40">
            <button
              type="submit"
              className="bg-[#006B47] text-white hover:bg-[#005034] font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
