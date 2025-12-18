import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // 🎯 Ensure this matches your Django URL + trailing slash
  headers: {
    'Content-Type': 'application/json',
  }
});

// REQUEST: Attach token to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// RESPONSE: Handle errors without "Logout Loops"
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // 🛡️ Only redirect if it's a 401 and NOT already on the login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      
      // Check if we already tried to refresh/retry to avoid infinite loops
      if (!originalRequest._retry) {
        console.warn("🔒 Access Denied: Session potentially expired.");
        
        // Clear local storage and bounce to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;