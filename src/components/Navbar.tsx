import React, { useState, useRef, useEffect } from 'react';
import { useLms } from '../context/LmsContext';
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  User as UserIcon,
  BookOpen,
  GraduationCap,
  Shield,
  LogOut,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    currentUser,
    currentRole,
    switchRole,
    logout,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsSearchOpen,
    navigate,
    currentRoute
  } = useLms();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPortalTitle = () => {
    switch (currentRole) {
      case 'INSTRUCTOR':
        return 'StudyEcart Mentor Portal';
      case 'STUDENT':
        return 'StudyEcart Student Portal';
      case 'ADMIN':
        return 'StudyEcart Admin Portal';
      default:
        return 'StudyEcart LMS';
    }
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white fixed top-0 w-full h-[72px] z-50 border-b border-[#BDCAC0]/60 shadow-xs flex justify-between items-center px-4 md:px-8 transition-all">
      {/* Brand & Toggle */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="md:hidden text-[#404943] hover:text-[#006B47] p-2 rounded-lg hover:bg-[#f2f4f6] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div
          onClick={() => {
            if (currentRole === 'INSTRUCTOR') navigate('/instructor/dashboard');
            else if (currentRole === 'ADMIN') navigate('/admin/dashboard');
            else if (currentRole === 'STUDENT') navigate('/student/dashboard');
            else navigate('/');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#71DBA6] flex-shrink-0 bg-white flex items-center justify-center shadow-xs">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVNZleRrP2-QjELmBaqG3AFjmbijCnGfBuQPPgavgMzCm6tDKoE8YLr_ToPJ3Jht9778v5D-fkGZnTFjxJaJ5wUfZS2h06IhyO2lzLORvlrBsixgQuLN6JvfiQ8Z0wxxJ4CcH6DyAbGO6D-plTc018xnwaBwVL-BCMi3yTgVGgJi4yxAVzxZ1sj1cDJmR4xQg15ce4m2Haa5bYN32PbAVXXKoYn_vp9KVtdCOFq_R1d_bnylYczEqimIyoM0yt8YAtZKk"
              alt="StudyEcart Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-bold text-lg md:text-xl text-[#006B47] tracking-tight flex items-center gap-2">
            {getPortalTitle()}
          </h1>
        </div>
      </div>

      {/* Action Controls & Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search courses, lessons and doubts"
          className="text-[#404943] hover:text-[#006B47] hover:bg-[#f2f4f6] p-2.5 rounded-full relative transition-colors flex items-center gap-2"
          title="Search (Cmd+K)"
        >
          <Search className="w-5 h-5" />
          <span className="hidden lg:inline text-xs text-[#707972] bg-[#f2f4f6] px-2 py-0.5 rounded-md border border-[#BDCAC0]/50 font-mono">
            ⌘K
          </span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notifications"
            className="text-[#404943] hover:text-[#006B47] hover:bg-[#f2f4f6] p-2.5 rounded-full relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#BA1A1A] rounded-full border-2 border-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#BDCAC0] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3.5 bg-[#F7F9FB] border-b border-[#BDCAC0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#191c1e]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#006B47] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#006B47] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#eceef0]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-[#707972]">No notifications yet</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.link) {
                          navigate(notif.link);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-[#f2f4f6] cursor-pointer transition-colors flex gap-3 ${
                        !notif.read ? 'bg-[#71DBA6]/10' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {notif.type === 'ALERT' && <Radio className="w-4 h-4 text-[#BA1A1A]" />}
                        {notif.type === 'WARNING' && <AlertTriangle className="w-4 h-4 text-[#EF9F13]" />}
                        {notif.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-[#006B47]" />}
                        {notif.type === 'INFO' && <Bell className="w-4 h-4 text-[#006B47]" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#191c1e]">{notif.title}</p>
                        <p className="text-xs text-[#404943] mt-0.5 leading-relaxed">{notif.message}</p>
                        <span className="text-[10px] text-[#707972] mt-1 block">{notif.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-7 w-px bg-[#BDCAC0] hidden md:block"></div>

        {/* User Profile Pill & Dropdown */}
        {currentUser ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 hover:bg-[#f2f4f6] p-1.5 rounded-full transition-all pr-3 border border-transparent hover:border-[#BDCAC0]"
            >
              <div className="w-9 h-9 rounded-full bg-[#006B47] flex items-center justify-center text-white text-sm font-semibold overflow-hidden border border-[#71DBA6]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-bold text-[#191c1e] leading-tight">{currentUser.name}</div>
                <div className="text-xs text-[#404943] leading-none">
                  {currentUser.title || (currentUser.role === 'INSTRUCTOR' ? 'Senior Mentor' : currentUser.role)}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#404943] hidden md:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#BDCAC0] rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-[#eceef0] mb-1">
                  <p className="text-sm font-bold text-[#191c1e]">{currentUser.name}</p>
                  <p className="text-xs text-[#707972] truncate">{currentUser.email}</p>
                  <span className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8af5be] text-[#00714b]">
                    Role: {currentRole}
                  </span>
                </div>

                {/* Role Switcher */}
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#707972] uppercase tracking-wider">
                  Switch Portal Role
                </div>
                <div className="space-y-0.5 mb-2">
                  <button
                    onClick={() => handleRoleChange('INSTRUCTOR')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      currentRole === 'INSTRUCTOR' ? 'bg-[#006B47] text-white font-semibold' : 'text-[#191c1e] hover:bg-[#f2f4f6]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Mentor Portal
                    </span>
                    {currentRole === 'INSTRUCTOR' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                  </button>

                  <button
                    onClick={() => handleRoleChange('STUDENT')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      currentRole === 'STUDENT' ? 'bg-[#006B47] text-white font-semibold' : 'text-[#191c1e] hover:bg-[#f2f4f6]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Student Portal
                    </span>
                    {currentRole === 'STUDENT' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                  </button>

                  <button
                    onClick={() => handleRoleChange('ADMIN')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      currentRole === 'ADMIN' ? 'bg-[#006B47] text-white font-semibold' : 'text-[#191c1e] hover:bg-[#f2f4f6]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Admin Portal
                    </span>
                    {currentRole === 'ADMIN' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                  </button>
                </div>

                <div className="border-t border-[#eceef0] pt-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (currentRole === 'STUDENT') navigate('/student/profile');
                      else if (currentRole === 'INSTRUCTOR') navigate('/instructor/profile');
                      else navigate('/admin/settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#191c1e] hover:bg-[#f2f4f6] rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#707972]" /> Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#BA1A1A] hover:bg-[#ffdad6]/40 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="text-xs md:text-sm font-semibold text-[#006B47] hover:bg-[#f2f4f6] px-3.5 py-2 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-xs md:text-sm font-semibold bg-[#006B47] text-white hover:bg-[#005034] px-4 py-2 rounded-lg transition-colors shadow-xs"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
