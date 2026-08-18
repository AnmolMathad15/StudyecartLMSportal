/**
 * StudyEcart REST API Client & Java Spring Boot Contract
 * 
 * Target Backend:
 * - Framework: Java 21 + Spring Boot 3.3
 * - Security: Spring Security 6 (JWT Filter Chain + @PreAuthorize("hasRole('MENTOR')"))
 * - Persistence: Spring Data JPA / Hibernate
 * - Database: MySQL 8.0
 * 
 * Endpoints:
 * - POST   /api/mentor/courses                 -> Create new course (DRAFT)
 * - GET    /api/mentor/courses                 -> Get all mentor's courses
 * - GET    /api/mentor/courses/{id}            -> Get course by ID with syllabus
 * - PUT    /api/mentor/courses/{id}            -> Update course metadata
 * - DELETE /api/mentor/courses/{id}            -> Soft delete / Hard delete course (if 0 enrollments)
 * - POST   /api/mentor/courses/{id}/modules    -> Add curriculum module
 * - PUT    /api/mentor/modules/{id}            -> Update module details
 * - DELETE /api/mentor/modules/{id}            -> Delete module and its cascade lessons
 * - POST   /api/mentor/modules/{id}/lessons    -> Add lesson (video, article, quiz, assignment)
 * - PUT    /api/mentor/lessons/{id}            -> Update lesson details
 * - DELETE /api/mentor/lessons/{id}            -> Delete lesson
 * - POST   /api/mentor/courses/{id}/submit-approval -> Validate & transition to PENDING_APPROVAL
 * - POST   /api/mentor/courses/{id}/publish    -> Publish approved course
 * - POST   /api/mentor/courses/{id}/unpublish  -> Move to unpublished
 * - GET    /api/mentor/courses/{id}/students   -> Get enrolled students for this course
 * - GET    /api/mentor/courses/{id}/analytics  -> Get deep course analytics
 */

import { Course, Module, Lesson, CourseStatus } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface CourseValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class MentorApiService {
  /**
   * Validate course against platform publication quality criteria
   */
  static validateCourseSyllabus(course: Course): CourseValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!course.title || course.title.trim().length < 5) {
      errors.push('Course title must be at least 5 characters.');
    }
    if (!course.description || course.description.trim().length < 20) {
      errors.push('Detailed description must be at least 20 characters.');
    }
    if (!course.category) {
      errors.push('Course category must be selected.');
    }
    if (!course.thumbnail) {
      errors.push('Course cover thumbnail is required.');
    }
    if (!course.modules || course.modules.length === 0) {
      errors.push('Course must contain at least 1 module in the curriculum.');
    } else {
      course.modules.forEach((mod, mIdx) => {
        if (!mod.title || mod.title.trim().length === 0) {
          errors.push(`Module ${mIdx + 1} must have a valid title.`);
        }
        if (!mod.lessons || mod.lessons.length === 0) {
          errors.push(`Module ${mIdx + 1} ("${mod.title || 'Untitled'}") has no lessons.`);
        } else {
          mod.lessons.forEach((les, lIdx) => {
            if (!les.title || les.title.trim().length === 0) {
              errors.push(`Module ${mIdx + 1}, Lesson ${lIdx + 1} has an empty title.`);
            }
            if (les.type === 'video' && !les.videoUrl) {
              errors.push(`Module ${mIdx + 1}, Lesson "${les.title || lIdx + 1}" is missing a video stream URL.`);
            }
          });
        }
      });
    }

    if (!course.requirements || course.requirements.length === 0) {
      warnings.push('Adding prerequisites helps students choose appropriate courses.');
    }
    if (!course.learningOutcomes || course.learningOutcomes.length === 0) {
      warnings.push('Adding learning outcomes improves course enrollment rates.');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
}
