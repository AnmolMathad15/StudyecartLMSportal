import React, { useState } from 'react';
import { useLms } from '../context/LmsContext';
import { Users, PlusCircle, Star, BookOpen, Mail, ShieldCheck } from 'lucide-react';

export const AdminMentorsPage: React.FC = () => {
  const { showToast } = useLms();
  const [mentors] = useState([
    {
      id: 'm-1',
      name: 'Dr. Aris Thorne',
      title: 'Distinguished Professor of Algorithms & AI',
      email: 'aris.thorne@faculty.studyecart.edu',
      rating: 4.9,
      coursesCount: 3,
      studentsCount: 3420,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew'
    },
    {
      id: 'm-2',
      name: 'Prof. Elena Rostova',
      title: 'Senior Fellow in Applied Mathematics',
      email: 'elena.rostova@faculty.studyecart.edu',
      rating: 4.8,
      coursesCount: 2,
      studentsCount: 1890,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 'm-3',
      name: 'Dr. Marcus Vance',
      title: 'Principal Systems Architect',
      email: 'marcus.vance@faculty.studyecart.edu',
      rating: 4.95,
      coursesCount: 2,
      studentsCount: 2150,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    }
  ]);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] font-display">
            Faculty & Mentor Directory
          </h1>
          <p className="text-sm text-[#404943] mt-1">
            Manage professorial appointments, teaching assignments, and mentor ratings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white border border-[#BDCAC0]/70 rounded-2xl p-6 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#006B47]">
                  <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#191c1e] font-display">{mentor.name}</h3>
                  <p className="text-xs text-[#707972]">{mentor.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#707972]">
                <Mail className="w-3.5 h-3.5" />
                <span>{mentor.email}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#F7F9FB] p-3 rounded-xl border border-[#BDCAC0]/40 text-center text-xs">
                <div>
                  <p className="font-bold text-[#191c1e]">{mentor.coursesCount}</p>
                  <p className="text-[10px] text-[#707972]">Courses</p>
                </div>
                <div>
                  <p className="font-bold text-[#191c1e]">{mentor.studentsCount}</p>
                  <p className="text-[10px] text-[#707972]">Scholars</p>
                </div>
                <div>
                  <p className="font-bold text-[#EF9F13] flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-current" /> {mentor.rating}
                  </p>
                  <p className="text-[10px] text-[#707972]">Rating</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="w-full py-2 bg-[#71DBA6]/20 text-[#005034] text-xs font-bold rounded-lg flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Faculty Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
