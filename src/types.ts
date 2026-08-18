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
  joinedDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export type CourseStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'UNPUBLISHED';

export interface LessonResource {
  name: string;
  size: string;
  url: string;
  type?: 'pdf' | 'ppt' | 'zip' | 'doc' | 'code' | 'link';
  uploadedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  videoUrl?: string;
  content?: string;
  completed?: boolean;
  order?: number;
  resources?: LessonResource[];
  quizId?: string;
  assignmentId?: string;
  subtitlesUrl?: string;
  notes?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  duration: string;
  order?: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language?: string;
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
  isFree?: boolean;
  duration: string;
  totalLessons: number;
  published: boolean;
  status: CourseStatus;
  rejectionReason?: string;
  submissionDate?: string;
  approvalDate?: string;
  featured?: boolean;
  certificateEligible?: boolean;
  targetAudience?: string[];
  skills?: string[];
  modules: Module[];
  requirements: string[];
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
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

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  batch: string;
  title: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  submittedAt: string;
  fileUrl: string;
  status: 'PENDING' | 'EVALUATED';
  score?: number;
  maxScore: number;
  feedback?: string;
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
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
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
}

export interface ActivityLog {
  id: string;
  type: 'ASSIGNMENT' | 'DOUBT' | 'EVALUATION' | 'SYSTEM' | 'ENROLLMENT';
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  statusColor?: 'emerald' | 'amber' | 'gray';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetBatch: string;
  courseTitle: string;
  authorName: string;
  createdAt: string;
  priority: 'NORMAL' | 'HIGH';
}
