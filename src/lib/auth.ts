import type { User, UserRole } from '@/types';

// In a real application, this would interact with localStorage/sessionStorage and an API.
// For now, we'll simulate a logged-in user.

const SIMULATED_USER_KEY = 'chainwatch_simulated_user';

export const getSimulatedUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const storedUser = localStorage.getItem(SIMULATED_USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const simulateLogin = (email: string, role: UserRole): User => {
  const user: User = {
    id: Date.now().toString(),
    email,
    role,
    name: email.split('@')[0] || 'User',
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(user));
  }
  return user;
};

export const simulateLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SIMULATED_USER_KEY);
  }
};
