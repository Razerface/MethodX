import { User } from '../types';

const STORAGE_KEY = 'news_aggregator_user';

export const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  isPremium: false,
  preferences: {
    topics: ['technology', 'business'],
    darkMode: false,
  },
  dailyPostsCount: 0,
  viewedArticles: 0,
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const login = (): void => {
  saveUser(mockUser);
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const togglePremium = (): void => {
  const user = getUser();
  if (user) {
    user.isPremium = !user.isPremium;
    saveUser(user);
  }
};