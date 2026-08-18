import React, { useState, useEffect } from 'react';
import { LmsProvider, useLms } from './context/LmsContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

// Public & Shared Pages
import { LandingPage } from './pages/LandingPage';
import { PublicCourseCatalogPage } from './pages/PublicCourseCatalogPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { LearningPlayerPage } from './pages/LearningPlayerPage';
import { AuthPage } from './pages/AuthPage';

// Student Pages
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentMyLearningPage } from './pages/StudentMyLearningPage';
import { StudentQuizPage } from './pages/StudentQuizPage';
import { StudentAssignmentsPage } from './pages/StudentAssignmentsPage';
import { StudentDoubtsPage } from './pages/StudentDoubtsPage';
import { StudentLivePage } from './pages/StudentLivePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { StudentAnnouncementsPage } from './pages/StudentAnnouncementsPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

// Instructor / Mentor Pages
import { InstructorDashboard } from './pages/InstructorDashboard';
import { InstructorCoursesPage } from './pages/InstructorCoursesPage';
import { CourseBuilderPage } from './pages/CourseBuilderPage';
import { InstructorAssignmentsPage } from './pages/InstructorAssignmentsPage';
import { InstructorQuizzesPage } from './pages/InstructorQuizzesPage';
import { InstructorLiveClassesPage } from './pages/InstructorLiveClassesPage';
import { InstructorDoubtsPage } from './pages/InstructorDoubtsPage';
import { InstructorAttendancePage } from './pages/InstructorAttendancePage';
import { InstructorAnalyticsPage } from './pages/InstructorAnalyticsPage';
import { InstructorAnnouncementsPage } from './pages/InstructorAnnouncementsPage';
import { InstructorStudentsPage } from './pages/InstructorStudentsPage';
import { InstructorCalendarPage } from './pages/InstructorCalendarPage';
import { InstructorProfilePage } from './pages/InstructorProfilePage';
import { ContentLibraryPage } from './pages/ContentLibraryPage';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminCoursesPage } from './pages/AdminCoursesPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminRolesPage } from './pages/AdminRolesPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { AdminAnnouncementsPage } from './pages/AdminAnnouncementsPage';
import { AdminCertificatesPage } from './pages/AdminCertificatesPage';
import { AdminEnrollmentsPage } from './pages/AdminEnrollmentsPage';
import { AdminMentorsPage } from './pages/AdminMentorsPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';

const AppContent: React.FC = () => {
  const { currentRoute, currentRole, isAuthenticated, navigate, showToast } = useLms();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if player mode or auth mode
  const isLearningPlayer = currentRoute.startsWith('/student/player/') || currentRoute.startsWith('/student/learning/');
  const isPublicLanding = currentRoute === '/' || currentRoute === '/landing' || currentRoute === '/login' || currentRoute === '/signup';

  // Role Authorization Guard: Verify user has permission to view the requested role area
  useEffect(() => {
    // 1. Student attempting to access Mentor or Admin routes
    if (currentRole === 'STUDENT') {
      if (currentRoute.startsWith('/mentor') || currentRoute.startsWith('/instructor') || currentRoute.startsWith('/admin')) {
        showToast('Access Denied: Student account cannot access faculty or administrative portals.', 'error');
        navigate('/student/dashboard');
      }
    }
    // 2. Mentor attempting to access Admin routes
    else if (currentRole === 'INSTRUCTOR') {
      if (currentRoute.startsWith('/admin')) {
        showToast('Access Denied: Administrative governance requires super-admin authorization.', 'error');
        navigate('/mentor/dashboard');
      }
    }
  }, [currentRoute, currentRole, navigate, showToast]);

  const renderRoute = () => {
    // 1. Public catalog & landing routes
    if (currentRoute === '/' || currentRoute === '/landing') {
      return <LandingPage />;
    }
    if (currentRoute === '/login' || currentRoute === '/signup') {
      return <AuthPage />;
    }
    if (currentRoute === '/courses' || currentRoute === '/student/explore') {
      return <PublicCourseCatalogPage />;
    }
    if (currentRoute.startsWith('/courses/')) {
      const courseId = currentRoute.replace('/courses/', '');
      return <CourseDetailsPage courseId={courseId} />;
    }
    if (currentRoute.startsWith('/student/courses/')) {
      const courseId = currentRoute.replace('/student/courses/', '');
      return <CourseDetailsPage courseId={courseId} />;
    }

    // 2. Learning Player (Dedicated video learning environment)
    if (currentRoute.startsWith('/student/player/')) {
      const courseId = currentRoute.replace('/student/player/', '');
      return <LearningPlayerPage courseId={courseId} />;
    }
    if (currentRoute.startsWith('/student/learning/')) {
      const courseId = currentRoute.replace('/student/learning/', '');
      return <LearningPlayerPage courseId={courseId} />;
    }

    // 3. Student Routes (Student role only)
    if (currentRoute === '/student/dashboard' || currentRoute === '/student') {
      return <StudentDashboard />;
    }
    if (currentRoute === '/student/my-learning') {
      return <StudentMyLearningPage />;
    }
    if (currentRoute.startsWith('/student/quizzes') || currentRoute.startsWith('/student/quiz/')) {
      const quizId = currentRoute.split('/').pop();
      return <StudentQuizPage quizId={quizId} />;
    }
    if (currentRoute === '/student/assignments') {
      return <StudentAssignmentsPage />;
    }
    if (currentRoute === '/student/doubts') {
      return <StudentDoubtsPage />;
    }
    if (currentRoute === '/student/live-classes' || currentRoute === '/student/live-schedule' || currentRoute === '/student/live') {
      return <StudentLivePage />;
    }
    if (currentRoute === '/student/certificates') {
      return <CertificatesPage />;
    }
    if (currentRoute === '/student/announcements') {
      return <StudentAnnouncementsPage />;
    }
    if (currentRoute === '/student/messages') {
      return <MessagesPage />;
    }
    if (currentRoute === '/student/notifications') {
      return <NotificationsPage />;
    }
    if (currentRoute === '/student/profile' || currentRoute === '/student/settings') {
      return <SettingsPage />;
    }

    // 4. Instructor / Mentor Routes (Mentor & Admin roles)
    if (currentRoute === '/instructor/dashboard' || currentRoute === '/mentor/dashboard' || currentRoute === '/mentor') {
      return <InstructorDashboard />;
    }
    if (currentRoute === '/instructor/courses' || currentRoute === '/mentor/courses') {
      return <InstructorCoursesPage />;
    }
    if (
      currentRoute === '/instructor/courses/new' ||
      currentRoute === '/mentor/courses/create' ||
      currentRoute === '/mentor/courses/builder' ||
      currentRoute.startsWith('/instructor/courses/edit/') ||
      currentRoute.startsWith('/mentor/courses/edit/') ||
      currentRoute.startsWith('/instructor/courses/builder/') ||
      currentRoute.startsWith('/mentor/courses/builder/')
    ) {
      return <CourseBuilderPage />;
    }
    if (currentRoute === '/instructor/assignments' || currentRoute === '/mentor/assignments') {
      return <InstructorAssignmentsPage />;
    }
    if (currentRoute === '/instructor/quizzes' || currentRoute === '/mentor/quizzes') {
      return <InstructorQuizzesPage />;
    }
    if (currentRoute === '/instructor/live' || currentRoute === '/instructor/live-classes' || currentRoute === '/mentor/live' || currentRoute === '/mentor/live-classes') {
      return <InstructorLiveClassesPage />;
    }
    if (currentRoute === '/instructor/doubts' || currentRoute === '/mentor/doubts') {
      return <InstructorDoubtsPage />;
    }
    if (currentRoute === '/instructor/attendance' || currentRoute === '/mentor/attendance') {
      return <InstructorAttendancePage />;
    }
    if (currentRoute === '/instructor/analytics' || currentRoute === '/mentor/analytics' || currentRoute === '/mentor/analytics/students') {
      return <InstructorAnalyticsPage />;
    }
    if (currentRoute === '/instructor/announcements' || currentRoute === '/mentor/announcements') {
      return <InstructorAnnouncementsPage />;
    }
    if (currentRoute === '/instructor/students' || currentRoute === '/mentor/students') {
      return <InstructorStudentsPage />;
    }
    if (currentRoute === '/instructor/calendar' || currentRoute === '/mentor/calendar') {
      return <InstructorCalendarPage />;
    }
    if (currentRoute === '/instructor/content-library' || currentRoute === '/mentor/content-library') {
      return <ContentLibraryPage />;
    }
    if (currentRoute === '/instructor/profile' || currentRoute === '/mentor/profile') {
      return <InstructorProfilePage />;
    }
    if (currentRoute === '/instructor/settings' || currentRoute === '/mentor/settings') {
      return <SettingsPage />;
    }
    if (currentRoute === '/mentor/messages' || currentRoute === '/instructor/messages') {
      return <MessagesPage />;
    }
    if (currentRoute === '/mentor/notifications' || currentRoute === '/instructor/notifications') {
      return <NotificationsPage />;
    }

    // 5. Admin Routes (Admin role only)
    if (currentRoute === '/admin/dashboard' || currentRoute === '/admin') {
      return <AdminDashboard />;
    }
    if (currentRoute === '/admin/users' || currentRoute === '/admin/students') {
      return <AdminUsersPage />;
    }
    if (currentRoute === '/admin/courses') {
      return <AdminCoursesPage />;
    }
    if (currentRoute === '/admin/categories') {
      return <AdminCategoriesPage />;
    }
    if (currentRoute === '/admin/enrollments') {
      return <AdminEnrollmentsPage />;
    }
    if (currentRoute === '/admin/mentors') {
      return <AdminMentorsPage />;
    }
    if (currentRoute === '/admin/certificates') {
      return <AdminCertificatesPage />;
    }
    if (currentRoute === '/admin/announcements') {
      return <AdminAnnouncementsPage />;
    }
    if (currentRoute === '/admin/analytics') {
      return <AdminAnalyticsPage />;
    }
    if (currentRoute === '/admin/roles') {
      return <AdminRolesPage />;
    }
    if (currentRoute === '/admin/settings') {
      return <AdminSettingsPage />;
    }
    if (currentRoute === '/admin/audit-logs' || currentRoute === '/admin/logs') {
      return <AdminAuditLogsPage />;
    }

    // Fallback: Default based on role
    if (currentRole === 'STUDENT') return <StudentDashboard />;
    if (currentRole === 'ADMIN') return <AdminDashboard />;
    return <InstructorDashboard />;
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#191c1e] flex flex-col font-sans selection:bg-[#71DBA6] selection:text-[#005034]">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Main Container */}
      <div className="flex flex-1 pt-[72px]">
        {/* Persistent Side Navigation */}
        <Sidebar
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Route Content */}
        <main
          className={`flex-1 transition-all duration-200 ${
            isLearningPlayer
              ? 'p-3 sm:p-6 md:ml-64 max-w-7xl w-full mx-auto'
              : 'p-4 md:p-8 md:ml-64 max-w-7xl w-full mx-auto'
          }`}
        >
          {renderRoute()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <Toast />
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <LmsProvider>
      <AppContent />
    </LmsProvider>
  );
}

export default App;
