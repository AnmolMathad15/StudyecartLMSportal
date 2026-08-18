import { Course, Module, Lesson } from '../types';
import { simulateNetworkDelay } from './apiClient';

/**
 * Course Service - Interfaces with /api/courses and /api/student/courses
 */
export const courseService = {
  async getAllCourses(category?: string): Promise<Course[]> {
    const courses = JSON.parse(localStorage.getItem('studyecart_courses') || '[]');
    if (category && category !== 'All') {
      return simulateNetworkDelay(courses.filter((c: Course) => c.category === category));
    }
    return simulateNetworkDelay(courses);
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    const courses: Course[] = JSON.parse(localStorage.getItem('studyecart_courses') || '[]');
    return simulateNetworkDelay(courses.find((c) => c.id === id));
  },

  async enrollCourse(courseId: string, studentId: string): Promise<{ success: boolean; message: string }> {
    return simulateNetworkDelay({
      success: true,
      message: `Enrolled student ${studentId} in course ${courseId}`
    });
  },

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    return simulateNetworkDelay(courseData as Course);
  }
};
