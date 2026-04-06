import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

/**
 * Checks if a JWT token is still valid (not expired).
 */
function isTokenValid(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

const storedToken = localStorage.getItem('token');
const validStored = storedToken && isTokenValid(storedToken) ? storedToken : null;

if (!validStored && storedToken) {
  // Token was there but expired — clean up proactively
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

export const useAuth = create((set, get) => ({
  token: validStored,
  isAuthenticated: !!validStored,
  user: validStored ? jwtDecode(validStored) : null,

  /**
   * Called after successful login.
   * Stores both access + refresh tokens.
   */
  login: (accessToken, refreshToken = null) => {
    const decoded = jwtDecode(accessToken);
    localStorage.setItem('token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    set({
      token: accessToken,
      isAuthenticated: true,
      user: decoded,
    });
  },

  /**
   * Clears auth state and removes tokens from storage.
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    set({ token: null, isAuthenticated: false, user: null });
  },
}));