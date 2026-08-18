import React, { useState } from 'react';
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

// Instructor Pages
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
  const { currentRoute, currentRole } = useLms();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if player mode or auth mode
  const isLearningPlayer = currentRoute.startsWith('/student/player/') || currentRoute.startsWith('/student/learning/');
  const isPublicLanding = currentRoute === '/' || currentRoute === '/landing' || currentRoute === '/login' || currentRoute === '/signup';

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

    // 3. Student Routes
    if (currentRoute === '/student/dashboard') {
      return <StudentDashboard />;
    }
    if (currentRoute === '/student/my-learning' || currentRoute === '/student/courses') {
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
    if (currentRoute === '/student/live-classes' || currentRoute === '/student/live-schedule') {
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

    // 4. Instructor / Mentor Routes
    if (currentRoute === '/instructor/dashboard') {
      return <InstructorDashboard />;
    }
    if (currentRoute === '/instructor/courses') {
      return <InstructorCoursesPage />;
    }
    if (currentRoute === '/instructor/courses/new' || currentRoute.startsWith('/instructor/courses/edit/')) {
      return <CourseBuilderPage />;
    }
    if (currentRoute === '/instructor/assignments') {
      return <InstructorAssignmentsPage />;
    }
    if (currentRoute === '/instructor/quizzes') {
      return <InstructorQuizzesPage />;
    }
    if (currentRoute === '/instructor/live') {
      return <InstructorLiveClassesPage />;
    }
    if (currentRoute === '/instructor/doubts') {
      return <InstructorDoubtsPage />;
    }
    if (currentRoute === '/instructor/attendance') {
      return <InstructorAttendancePage />;
    }
    if (currentRoute === '/instructor/analytics') {
      return <InstructorAnalyticsPage />;
    }
    if (currentRoute === '/instructor/announcements') {
      return <InstructorAnnouncementsPage />;
    }
    if (currentRoute === '/instructor/students') {
      return <InstructorStudentsPage />;
    }
    if (currentRoute === '/instructor/calendar') {
      return <InstructorCalendarPage />;
    }
    if (currentRoute === '/instructor/content-library') {
      return <ContentLibraryPage />;
    }
    if (currentRoute === '/instructor/profile') {
      return <InstructorProfilePage />;
    }

    // 5. Admin Routes
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

export default function App() {
  return (
    <LmsProvider>
      <AppContent />
    </LmsProvider>
  );
}
