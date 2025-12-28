import type { AuthData } from './types';

const AUTH_KEY = 'ems_auth';

export function getAuth(): AuthData | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthData;
  } catch {
    return null;
  }
}

export function setAuth(authData: AuthData): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return getAuth() !== null;
}

