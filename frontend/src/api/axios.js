import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// ───────────────────────────────────────────────
// Automatically attach token
// ───────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ❌ IMPORTANT FIX: DO NOT force Content-Type for FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ───────────────────────────────────────────────
// Automatically refresh token on 401
// ───────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    const is401 = error.response?.status === 401;
    const isLogin = original.url.includes('users/login/');
    const isRefresh = original.url.includes('users/token/refresh/');

    if (is401 && !original._retry && !isLogin && !isRefresh) {
      original._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          'http://127.0.0.1:8000/api/users/token/refresh/',
          { refresh: refreshToken }
        );

        // Save new access token
        localStorage.setItem('token', data.access);

        // Retry original request
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch (err) {
        // Refresh failed → force logout
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;