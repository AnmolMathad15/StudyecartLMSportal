/**
 * Centralized API Client Abstraction
 * Designed for immediate seamless integration with Java Spring Boot REST endpoints.
 * In development, reads/writes through reactive persistent mock store.
 */

export const API_BASE_URL = '/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export async function simulateNetworkDelay<T>(data: T, delayMs: number = 200): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}
