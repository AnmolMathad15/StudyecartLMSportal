import React from 'react';
import { useLms } from '../context/LmsContext';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Video,
  FileCheck,
  FileQuestion,
  HelpCircle,
  Award,
  Megaphone,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  FolderKanban,
  Users,
  CalendarCheck,
  BarChart3,
  Calendar,
  Layers,
  ShieldAlert,
  Sparkles,
  LineChart,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { currentRoute, navigate, currentRole, logout, doubts, assignments, notifications } = useLms();

  const pendingDoubtsCount = doubts.filter((d) => d.status === 'PENDING').length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'PENDING').length;
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  // Student Navigation Items
  const studentMainItems: NavItem[] = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Explore Courses', path: '/student/explore', icon: Compass },
    { label: 'My Learning', path: '/student/my-learning', icon: BookOpen },
    { label: 'Live Classes', path: '/student/live-classes', icon: Video },
    { label: 'Assignments', path: '/student/assignments', icon: FileCheck },
    { label: 'Quizzes & Tests', path: '/student/quizzes', icon: FileQuestion },
    {
      label: 'My Doubts',
      path: '/student/doubts',
      icon: HelpCircle,
      badge: pendingDoubtsCount > 0 ? String(pendingDoubtsCount) : undefined,
      badgeColor: 'bg-[#EF9F13] text-white'
    },
    { label: 'Certificates', path: '/student/certificates', icon: Award },
    { label: 'Announcements', path: '/student/announcements', icon: Megaphone }
  ];

  const studentPersonalItems: NavItem[] = [
    { label: 'Messages', path: '/student/messages', icon: MessageSquare },
    {
      label: 'Notifications',
      path: '/student/notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? String(unreadNotifCount) : undefined,
      badgeColor: 'bg-[#006B47] text-white'
    },
    { label: 'Profile & Settings', path: '/student/profile', icon: User }
  ];

  // Mentor / Instructor Navigation Items (Dedicated Educator Workspace)
  const mentorMainItems: NavItem[] = [
    { label: 'Dashboard', path: '/mentor/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/mentor/courses', icon: BookOpen },
    { label: 'Course Builder', path: '/mentor/courses/builder', icon: Sparkles },
    { label: 'Students', path: '/mentor/students', icon: Users },
    {
      label: 'Assignments',
      path: '/mentor/assignments',
      icon: FileCheck,
      badge: pendingAssignmentsCount > 0 ? String(pendingAssignmentsCount) : undefined,
      badgeColor: 'bg-[#006B47] text-white'
    },
    { label: 'Quizzes & Tests', path: '/mentor/quizzes', icon: FileQuestion },
    { label: 'Live Classes', path: '/mentor/live-classes', icon: Video },
    {
      label: 'My Doubts',
      path: '/mentor/doubts',
      icon: HelpCircle,
      badge: pendingDoubtsCount > 0 ? String(pendingDoubtsCount) : undefined,
      badgeColor: 'bg-[#EF9F13] text-white'
    },
    { label: 'Messages', path: '/mentor/messages', icon: MessageSquare },
    { label: 'Announcements', path: '/mentor/announcements', icon: Megaphone }
  ];

  const mentorAnalyticsItems: NavItem[] = [
    { label: 'Course Analytics', path: '/mentor/analytics', icon: BarChart3 },
    { label: 'Student Performance', path: '/mentor/analytics/students', icon: LineChart }
  ];

  const mentorPersonalItems: NavItem[] = [
    {
      label: 'Notifications',
      path: '/mentor/notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? String(unreadNotifCount) : undefined,
      badgeColor: 'bg-[#006B47] text-white'
    },
    { label: 'Mentor Profile', path: '/mentor/profile', icon: User },
    { label: 'Settings', path: '/mentor/settings', icon: Settings }
  ];

  // Admin Menu items
  const adminMainItems: NavItem[] = [
    { label: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Governance', path: '/admin/users', icon: Users },
    { label: 'Courses & Approvals', path: '/admin/courses', icon: BookOpen },
    { label: 'Enrollment Roster', path: '/admin/enrollments', icon: CalendarCheck },
    { label: 'Mentor Directory', path: '/admin/mentors', icon: Users },
    { label: 'Category & Tags', path: '/admin/categories', icon: Layers },
    { label: 'Certificates Registry', path: '/admin/certificates', icon: Award },
    { label: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'System Broadcasts', path: '/admin/announcements', icon: Megaphone },
    { label: 'Roles & Permissions', path: '/admin/roles', icon: ShieldAlert },
    { label: 'System Compliance', path: '/admin/settings', icon: Settings },
    { label: 'Audit Trail Logs', path: '/admin/audit-logs', icon: Layers }
  ];

  const isActive = (path: string) => {
    // Student matches
    if (path === '/student/dashboard' && (currentRoute === '/student/dashboard' || currentRoute === '/student')) return true;
    if (path === '/student/explore' && (currentRoute === '/student/explore' || currentRoute === '/courses')) return true;
    if (path === '/student/my-learning' && (currentRoute === '/student/my-learning' || currentRoute === '/student/courses')) return true;
    if (path === '/student/live-classes' && (currentRoute === '/student/live-classes' || currentRoute === '/student/live-schedule')) return true;
    if (path === '/student/assignments' && currentRoute.startsWith('/student/assignments')) return true;
    if (path === '/student/quizzes' && (currentRoute.startsWith('/student/quizzes') || currentRoute.startsWith('/student/quiz'))) return true;
    if (path === '/student/doubts' && currentRoute.startsWith('/student/doubts')) return true;
    if (path === '/student/certificates' && currentRoute.startsWith('/student/certificates')) return true;
    if (path === '/student/announcements' && currentRoute.startsWith('/student/announcements')) return true;
    if (path === '/student/messages' && currentRoute.startsWith('/student/messages')) return true;
    if (path === '/student/notifications' && currentRoute.startsWith('/student/notifications')) return true;
    if (path === '/student/profile' && (currentRoute === '/student/profile' || currentRoute === '/student/settings' || currentRoute === '/settings')) return true;

    // Mentor / Instructor matches
    if (path === '/mentor/dashboard' && (currentRoute === '/mentor/dashboard' || currentRoute === '/instructor/dashboard' || currentRoute === '/mentor' || currentRoute === '/instructor')) return true;
    if (path === '/mentor/courses' && (currentRoute === '/mentor/courses' || currentRoute === '/instructor/courses')) return true;
    if (path === '/mentor/courses/builder' && (currentRoute === '/mentor/courses/builder' || currentRoute === '/mentor/courses/create' || currentRoute === '/instructor/courses/new' || currentRoute.includes('builder') || currentRoute.includes('create'))) return true;
    if (path === '/mentor/students' && (currentRoute === '/mentor/students' || currentRoute === '/instructor/students')) return true;
    if (path === '/mentor/assignments' && (currentRoute.startsWith('/mentor/assignments') || currentRoute.startsWith('/instructor/assignments'))) return true;
    if (path === '/mentor/quizzes' && (currentRoute.startsWith('/mentor/quizzes') || currentRoute.startsWith('/instructor/quizzes'))) return true;
    if (path === '/mentor/live-classes' && (currentRoute.startsWith('/mentor/live') || currentRoute.startsWith('/instructor/live'))) return true;
    if (path === '/mentor/doubts' && (currentRoute.startsWith('/mentor/doubts') || currentRoute.startsWith('/instructor/doubts'))) return true;
    if (path === '/mentor/messages' && (currentRoute.startsWith('/mentor/messages') || currentRoute === '/instructor/messages')) return true;
    if (path === '/mentor/announcements' && (currentRoute.startsWith('/mentor/announcements') || currentRoute.startsWith('/instructor/announcements'))) return true;
    if (path === '/mentor/analytics' && (currentRoute === '/mentor/analytics' || currentRoute === '/instructor/analytics')) return true;
    if (path === '/mentor/analytics/students' && currentRoute === '/mentor/analytics/students') return true;
    if (path === '/mentor/notifications' && (currentRoute === '/mentor/notifications' || currentRoute === '/instructor/notifications')) return true;
    if (path === '/mentor/profile' && (currentRoute === '/mentor/profile' || currentRoute === '/instructor/profile')) return true;
    if (path === '/mentor/settings' && (currentRoute === '/mentor/settings' || currentRoute === '/instructor/settings')) return true;

    // Admin matches
    if (path === '/admin/dashboard' && currentRoute === '/admin/dashboard') return true;
    return currentRoute === path || currentRoute.startsWith(path + '/');
  };

  const renderNavSection = (title: string, items: NavItem[]) => (
    <div>
      <div className="text-[11px] font-bold text-[#707972] uppercase tracking-wider px-3 mb-1.5">
        {title}
      </div>
      <div className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                active
                  ? 'bg-[#8af5be] text-[#005034] font-bold shadow-2xs'
                  : 'text-[#404943] hover:bg-[#71DBA6]/10 hover:text-[#006B47] font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#005034]' : 'text-[#707972]'}`} />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <nav
        className={`fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 bg-white border-r border-[#BDCAC0]/60 z-40 flex flex-col py-4 px-3 overflow-y-auto transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={onCloseMobile}
            className="p-1 text-[#404943] hover:text-[#006B47] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Banner with logo lockup */}
        <div className="mb-4 px-3 pt-1">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#BDCAC0]/40">
            <div className="w-9 h-9 rounded-xl bg-[#006B47] text-white flex items-center justify-center font-bold text-base font-display flex-shrink-0 shadow-xs">
              S
            </div>
            <div>
              <div className="font-bold text-sm text-[#005034] tracking-tight leading-none font-display">StudyEcart LMS</div>
              <span className="text-[10px] text-[#707972] tracking-wider uppercase font-semibold">
                {currentRole === 'STUDENT' ? 'Student Learning Portal' : currentRole === 'INSTRUCTOR' ? 'Mentor Teaching Hub' : 'Admin Operations'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        {currentRole === 'STUDENT' ? (
          <div className="space-y-4 flex-1">
            {renderNavSection('Main', studentMainItems)}
            <div className="pt-2 border-t border-[#BDCAC0]/40">
              {renderNavSection('Personal', studentPersonalItems)}
            </div>
          </div>
        ) : currentRole === 'INSTRUCTOR' ? (
          <div className="space-y-4 flex-1">
            {renderNavSection('Main', mentorMainItems)}
            <div className="pt-2 border-t border-[#BDCAC0]/40">
              {renderNavSection('Analytics', mentorAnalyticsItems)}
            </div>
            <div className="pt-2 border-t border-[#BDCAC0]/40">
              {renderNavSection('Personal', mentorPersonalItems)}
            </div>
          </div>
        ) : (
          <div className="space-y-1 flex-1">
            {renderNavSection('Admin Operations', adminMainItems)}
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-auto pt-4 border-t border-[#BDCAC0]/40 space-y-1">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-[#BA1A1A] hover:bg-[#ffdad6]/40 transition-colors text-left font-bold cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#BA1A1A]" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};
