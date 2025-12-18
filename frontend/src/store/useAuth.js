import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export const useAuth = create((set) => ({
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,

  login: (token) => {
    const decoded = jwtDecode(token);
    localStorage.setItem('token', token);
    set({ 
      token, 
      isAuthenticated: true, 
      user: decoded // This 'decoded' object contains 'is_superuser'
    });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null });
  }
}));