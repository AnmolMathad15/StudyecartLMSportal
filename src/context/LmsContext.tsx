import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Course,
  Quiz,
  QuizAttempt,
  Doubt,
  Assignment,
  LiveClass,
  Certificate,
  NotificationItem,
  Category,
  ActivityLog,
  Announcement
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_CATEGORIES,
  INITIAL_DOUBTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_LIVE_CLASSES,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_QUIZZES,
  INITIAL_CERTIFICATES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANNOUNCEMENTS
} from '../mocks/initialData';

interface LmsContextType {
  // Auth state
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  signup: (name: string, email: string, role: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  
  // Navigation
  currentRoute: string;
  navigate: (route: string) => void;
  
  // Course state
  courses: Course[];
  enrolledCourseIds: string[];
  enrollInCourse: (courseId: string) => void;
  addCourse: (courseData: Partial<Course>) => Course | null;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  toggleLessonCompletion: (courseId: string, moduleId: string, lessonId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string, completed?: boolean) => void;
  
  // Doubts state
  doubts: Doubt[];
  askDoubt: (doubt: Omit<Doubt, 'id' | 'createdAt' | 'status' | 'studentId' | 'studentName' | 'studentAvatar'>) => void;
  resolveDoubt: (doubtId: string, answer: string) => void;
  
  // Assignments state
  assignments: Assignment[];
  evaluateAssignment: (assignmentId: string, score: number, feedback: string) => void;
  submitAssignment: (courseId: string, courseTitle: string, batch: string, title: string, fileUrl: string) => void;
  
  // Quizzes state
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => Quiz | null;
  submitQuiz: (quizId: string, answers: { questionId: string; selectedOption: number }[]) => QuizAttempt;
  
  // Live classes
  liveClasses: LiveClass[];
  scheduleLiveClass: (liveClass: Omit<LiveClass, 'id'>) => void;
  
  // Certificates
  certificates: Certificate[];
  issueCertificate: (courseId: string, courseTitle: string, studentId: string, studentName: string) => Certificate;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Categories & Announcements & Activity
  categories: Category[];
  addCategory: (name: string, description: string, iconName: string) => void;
  deleteCategory: (id: string) => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'authorName'>) => void;
  activityLogs: ActivityLog[];
  
  // Users (Admin)
  users: User[];
  updateUserStatus: (userId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  
  // Global search modal & toast
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const LmsContext = createContext<LmsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'studyecart_user',
  COURSES: 'studyecart_courses',
  ENROLLED: 'studyecart_enrolled',
  DOUBTS: 'studyecart_doubts',
  ASSIGNMENTS: 'studyecart_assignments',
  QUIZZES: 'studyecart_quizzes',
  ATTEMPTS: 'studyecart_quiz_attempts',
  LIVE: 'studyecart_live_classes',
  CERTIFICATES: 'studyecart_certificates',
  NOTIFICATIONS: 'studyecart_notifications',
  ANNOUNCEMENTS: 'studyecart_announcements',
  USERS: 'studyecart_users',
  CATEGORIES: 'studyecart_categories',
  ACTIVITY: 'studyecart_activity'
};

export const LmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from storage or default mocks
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    // Default to student persona Sarah Jenkins for the student-first experience
    return INITIAL_USERS[1] || INITIAL_USERS[0];
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname;
    return path && path !== '/' ? path : '/student/dashboard';
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_COURSES;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENROLLED);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return ['course-ds-101', 'course-calc-201', 'course-dsa-301'];
  });

  const [doubts, setDoubts] = useState<Doubt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOUBTS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_DOUBTS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_ASSIGNMENTS;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_QUIZZES;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [];
  });

  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIVE);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_LIVE_CLASSES;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_CERTIFICATES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_USERS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_CATEGORIES;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    else localStorage.removeItem(STORAGE_KEYS.USER);
  }, [currentUser]);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolledCourseIds)); }, [enrolledCourseIds]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(doubts)); }, [doubts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes)); }, [quizzes]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(quizAttempts)); }, [quizAttempts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LIVE, JSON.stringify(liveClasses)); }, [liveClasses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates)); }, [certificates]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLogs)); }, [activityLogs]);

  const currentRole: UserRole = currentUser?.role || 'GUEST';

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', route);
    }
  };

  // Auth functions
  const login = (email: string, role?: UserRole): boolean => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.name}!`);
      if (existing.role === 'INSTRUCTOR') navigate('/instructor/dashboard');
      else if (existing.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
      return true;
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: role || 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      showToast(`Welcome to StudyEcart, ${newUser.name}!`);
      if (newUser.role === 'INSTRUCTOR') navigate('/instructor/dashboard');
      else if (newUser.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
      return true;
    }
  };

  const signup = (name: string, email: string, role: UserRole): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: role === 'INSTRUCTOR' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      title: role === 'INSTRUCTOR' ? 'Mentor' : 'Learner',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created successfully as ${role}!`);
    if (role === 'INSTRUCTOR') navigate('/instructor/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/student/dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.');
    navigate('/login');
  };

  const switchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    showToast(`Switched active role to ${newRole}`);
    if (newRole === 'INSTRUCTOR') navigate('/instructor/dashboard');
    else if (newRole === 'ADMIN') navigate('/admin/dashboard');
    else if (newRole === 'STUDENT') navigate('/student/dashboard');
    else navigate('/');
  };

  // Course actions with RBAC guards
  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, enrolledStudents: c.enrolledStudents + 1 } : c))
      );
      showToast('Enrolled successfully! Course added to My Learning.');
    }
  };

  const addCourse = (courseData: Partial<Course>): Course | null => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can create courses.', 'error');
      return null;
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseData.title || 'Untitled Course',
      subtitle: courseData.subtitle || '',
      description: courseData.description || '',
      category: courseData.category || 'Data Science & AI',
      level: courseData.level || 'Beginner',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      instructorId: currentUser?.id || 'user-instructor-1',
      instructorName: currentUser?.name || 'Dr. Aris',
      instructorAvatar: currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
      instructorTitle: currentUser?.title || 'Senior Mentor',
      batch: courseData.batch || 'Batch A1',
      rating: 5.0,
      reviewCount: 0,
      enrolledStudents: 0,
      syllabusCompletion: 0,
      price: courseData.price ?? 99,
      originalPrice: courseData.originalPrice ?? 199,
      duration: courseData.duration || '8 Weeks',
      totalLessons: courseData.modules ? courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0,
      published: true,
      modules: courseData.modules || [],
      requirements: courseData.requirements || ['Basic curiosity and dedication'],
      learningOutcomes: courseData.learningOutcomes || ['Practical skill development'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCourses((prev) => [newCourse, ...prev]);
    showToast(`Course "${newCourse.title}" published successfully!`);
    return newCourse;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can modify courses.', 'error');
      return;
    }
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : c))
    );
    showToast('Course updated successfully!');
  };

  const deleteCourse = (courseId: string) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can delete courses.', 'error');
      return;
    }
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('Course deleted.');
  };

  const toggleLessonCompletion = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        let total = 0;
        let completedCount = 0;
        const newModules = course.modules.map((mod) => {
          const newLessons = mod.lessons.map((les) => {
            total++;
            if (mod.id === moduleId && les.id === lessonId) {
              const nextState = !les.completed;
              if (nextState) completedCount++;
              return { ...les, completed: nextState };
            }
            if (les.completed) completedCount++;
            return les;
          });
          return { ...mod, lessons: newLessons };
        });

        const newPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        return {
          ...course,
          modules: newModules,
          syllabusCompletion: newPercentage
        };
      })
    );
  };

  const markLessonComplete = (courseId: string, lessonId: string, completed?: boolean) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        let total = 0;
        let completedCount = 0;
        const newModules = course.modules.map((mod) => {
          const newLessons = mod.lessons.map((les) => {
            total++;
            if (les.id === lessonId) {
              const nextState = completed !== undefined ? completed : !les.completed;
              if (nextState) completedCount++;
              return { ...les, completed: nextState };
            }
            if (les.completed) completedCount++;
            return les;
          });
          return { ...mod, lessons: newLessons };
        });

        const newPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        return {
          ...course,
          modules: newModules,
          syllabusCompletion: newPercentage
        };
      })
    );
    showToast(completed ? 'Lesson marked as completed!' : 'Lesson updated.');
  };

  // Doubts actions
  const askDoubt = (doubtData: Omit<Doubt, 'id' | 'createdAt' | 'status' | 'studentId' | 'studentName' | 'studentAvatar'>) => {
    const newDoubt: Doubt = {
      ...doubtData,
      id: `doubt-${Date.now()}`,
      studentId: currentUser?.id || 'user-student-1',
      studentName: currentUser?.name || 'Sarah Jenkins',
      studentAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'PENDING',
      createdAt: 'Just now'
    };
    setDoubts((prev) => [newDoubt, ...prev]);
    setActivityLogs((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'DOUBT',
        actor: newDoubt.studentName,
        action: 'raised a new doubt in',
        target: newDoubt.courseTitle,
        timestamp: 'Just now',
        statusColor: 'amber'
      },
      ...prev
    ]);
    showToast('Your doubt has been submitted to the mentor queue.');
  };

  const resolveDoubt = (doubtId: string, answer: string) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can answer doubts.', 'error');
      return;
    }
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? {
              ...d,
              status: 'RESOLVED',
              answer,
              answeredBy: currentUser?.name || 'Dr. Aris',
              answeredAt: 'Just now'
            }
          : d
      )
    );
    showToast('Doubt marked as resolved.');
  };

  // Assignments actions
  const evaluateAssignment = (assignmentId: string, score: number, feedback: string) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can grade assignments.', 'error');
      return;
    }
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'EVALUATED',
              score,
              feedback
            }
          : a
      )
    );
    showToast(`Assignment evaluated successfully (Grade: ${score}/${100})`);
  };

  const submitAssignment = (courseId: string, courseTitle: string, batch: string, title: string, fileUrl: string) => {
    const newAssign: Assignment = {
      id: `assign-${Date.now()}`,
      courseId,
      courseTitle,
      batch,
      title,
      studentId: currentUser?.id || 'user-student-1',
      studentName: currentUser?.name || 'Sarah Jenkins',
      studentAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      submittedAt: 'Just now',
      fileUrl,
      status: 'PENDING',
      maxScore: 100
    };
    setAssignments((prev) => [newAssign, ...prev]);
    showToast('Assignment submitted successfully.');
  };

  // Quizzes actions
  const addQuiz = (quizData: Omit<Quiz, 'id'>): Quiz | null => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can author quizzes.', 'error');
      return null;
    }
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}`
    };
    setQuizzes((prev) => [newQuiz, ...prev]);
    showToast(`Quiz "${newQuiz.title}" created successfully!`);
    return newQuiz;
  };

  const submitQuiz = (quizId: string, answers: { questionId: string; selectedOption: number }[]): QuizAttempt => {
    const quiz = quizzes.find((q) => q.id === quizId);
    let totalScore = 0;
    let earnedScore = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const q = quiz?.questions.find((question) => question.id === ans.questionId);
      const isCorrect = q ? q.correctAnswerIndex === ans.selectedOption : false;
      const pts = q?.points || 20;
      totalScore += pts;
      if (isCorrect) earnedScore += pts;
      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect
      };
    });

    const percentage = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;
    const passed = percentage >= (quiz?.passingScore || 70);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId,
      userId: currentUser?.id || 'user-student-1',
      userName: currentUser?.name || 'Sarah Jenkins',
      score: earnedScore,
      totalScore,
      percentage,
      passed,
      completedAt: new Date().toISOString(),
      userAnswers: evaluatedAnswers
    };

    setQuizAttempts((prev) => [attempt, ...prev]);

    if (passed && quiz) {
      issueCertificate(quiz.courseId, quiz.courseTitle, attempt.userId, attempt.userName);
    }

    return attempt;
  };

  // Live classes actions
  const scheduleLiveClass = (liveData: Omit<LiveClass, 'id'>) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can schedule live classes.', 'error');
      return;
    }
    const newClass: LiveClass = {
      ...liveData,
      id: `live-${Date.now()}`
    };
    setLiveClasses((prev) => [newClass, ...prev]);
    showToast(`Live session "${newClass.topic}" scheduled!`);
  };

  // Certificates actions
  const issueCertificate = (courseId: string, courseTitle: string, studentId: string, studentName: string): Certificate => {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      courseId,
      courseTitle,
      studentId,
      studentName,
      instructorName: 'Dr. Aris',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      certificateNumber: `SEC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      grade: 'Distinction (Passed Assessment)'
    };
    setCertificates((prev) => [newCert, ...prev]);
    return newCert;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Categories
  const addCategory = (name: string, description: string, iconName: string) => {
    if (currentRole !== 'ADMIN') {
      showToast('Access denied. Only Admins can manage categories.', 'error');
      return;
    }
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      description,
      iconName,
      courseCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${name}" added.`);
  };

  const deleteCategory = (id: string) => {
    if (currentRole !== 'ADMIN') {
      showToast('Access denied. Only Admins can delete categories.', 'error');
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category deleted.');
  };

  // Announcements
  const addAnnouncement = (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'authorName'>) => {
    if (currentRole !== 'INSTRUCTOR' && currentRole !== 'ADMIN') {
      showToast('Access denied. Only Mentors and Admins can publish announcements.', 'error');
      return;
    }
    const newAnn: Announcement = {
      ...announcementData,
      id: `ann-${Date.now()}`,
      authorName: currentUser?.name || 'Dr. Aris',
      createdAt: 'Just now'
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast('Announcement posted to student portal.');
  };

  // Users (Admin)
  const updateUserStatus = (userId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => {
    if (currentRole !== 'ADMIN') {
      showToast('Access denied. Only Admins can update user status.', 'error');
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
    showToast(`User status updated to ${status}.`);
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    if (currentRole !== 'ADMIN') {
      showToast('Access denied. Only Admins can update user roles.', 'error');
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    showToast(`User role updated to ${role}.`);
  };

  return (
    <LmsContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        switchRole,
        currentRoute,
        navigate,
        courses,
        enrolledCourseIds,
        enrollInCourse,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleLessonCompletion,
        markLessonComplete,
        doubts,
        askDoubt,
        resolveDoubt,
        assignments,
        evaluateAssignment,
        submitAssignment,
        quizzes,
        quizAttempts,
        addQuiz,
        submitQuiz,
        liveClasses,
        scheduleLiveClass,
        certificates,
        issueCertificate,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        categories,
        addCategory,
        deleteCategory,
        announcements,
        addAnnouncement,
        activityLogs,
        users,
        updateUserStatus,
        updateUserRole,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </LmsContext.Provider>
  );
};

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) throw new Error('useLms must be used within an LmsProvider');
  return context;
};
