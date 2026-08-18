export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  department?: string;
  bio?: string;
  phone?: string;
  joinedDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  emailVerified?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  videoUrl?: string;
  content?: string;
  completed?: boolean;
  resources?: { name: string; size: string; url: string }[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  duration: string;
  lessons: Lesson[];
}

export type CourseStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'UNPUBLISHED' | 'REJECTED';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle?: string;
  batch?: string;
  rating: number;
  reviewCount: number;
  enrolledStudents: number;
  syllabusCompletion?: number;
  price: number;
  originalPrice?: number;
  duration: string;
  totalLessons: number;
  published: boolean;
  status: CourseStatus;
  adminFeedback?: string;
  featured?: boolean;
  modules: Module[];
  requirements: string[];
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  enrolledAt: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  lastAccessedLesson?: string;
  lastAccessedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScore: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  status: 'PUBLISHED' | 'DRAFT';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  userAnswers: { questionId: string; selectedOption: number; isCorrect: boolean }[];
}

export interface Doubt {
  id: string;
  courseId: string;
  courseTitle: string;
  batch: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  title: string;
  description: string;
  codeSnippet?: string;
  status: 'PENDING' | 'RESOLVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
}

export type AssignmentStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'UNDER_REVIEW' | 'GRADED' | 'LATE';

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  batch: string;
  title: string;
  instructions?: string;
  deadline?: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  submittedAt?: string;
  fileUrl?: string;
  status: AssignmentStatus;
  score?: number;
  maxScore: number;
  feedback?: string;
  resubmissionAllowed?: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  courseId?: string;
  courseTitle?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface LiveClass {
  id: string;
  courseId: string;
  courseTitle: string;
  topic: string;
  batch: string;
  instructorName: string;
  startTime: string;
  duration: string;
  expectedStudents: number;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  meetingLink?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  downloadUrl?: string;
  status: 'VALID' | 'REVOKED';
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  category: 'ENROLLMENT' | 'ASSIGNMENT' | 'QUIZ' | 'MESSAGE' | 'ANNOUNCEMENT' | 'CERTIFICATE' | 'SYSTEM';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  courseCount: number;
  description: string;
  active: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'ASSIGNMENT' | 'DOUBT' | 'EVALUATION' | 'SYSTEM' | 'ENROLLMENT' | 'COURSE_APPROVAL' | 'USER_MGMT';
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  description?: string;
  statusColor?: 'emerald' | 'amber' | 'gray' | 'red';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole?: 'ALL' | 'STUDENT' | 'INSTRUCTOR';
  targetBatch?: string;
  courseTitle?: string;
  authorName: string;
  authorRole: UserRole;
  createdAt: string;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
}

