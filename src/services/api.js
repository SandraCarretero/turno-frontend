import axios from 'axios';

const API_BASE_URL = 'https://turno-backend-fhmm.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: credentials => api.post('/auth/login', credentials),
  register: async userData => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getMe: () => api.get('/auth/me'),
  verifyEmail: token => api.get(`/auth/verify-email/${token}`)
};

export const userAPI = {
  updateProfile: data => api.put('/users/profile', data),
  uploadAvatar: formData =>
    api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deleteUser: () => api.delete('/users/profile'),
  searchUsers: query => api.get(`/users/search?q=${query}`),
  sendFriendRequest: userId => api.post(`/users/friends/${userId}`),
  acceptFriendRequest: userId => api.put(`/users/friends/${userId}/accept`),
  getUserStats: () => api.get('/users/stats'),
  getUserProfile: async userId => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }
};

export const gameAPI = {
  searchGames: async query => {
    const response = await api.get(`/games/search?q=${query}`);
    return response.data;
  },
  getGameDetails: id => api.get(`/games/${id}`).then(res => res.data),
  addGameToCollection: gameData => api.post('/games/collection', gameData),
  removeGameFromCollection: gameId => api.delete(`/games/collection/${gameId}`),
  getPopularGames: async () => {
    const res = await api.get('/games/popular');
    return res.data;
  },
  getBestsellers: async () => {
    const res = await api.get('/games/bestsellers');
    return res.data;
  }
};

export const matchAPI = {
  createMatch: matchData => api.post('/matches', matchData),
  getMatches: () => api.get('/matches'),
  getMatch: matchId => api.get(`/matches/${matchId}`).then(res => res.data),
  updateMatch: (matchId, matchData) =>
    api.put(`/matches/${matchId}`, matchData),
  deleteMatch: matchId => api.delete(`/matches/${matchId}`),
  getMatchesByGameId: gameId => api.get(`/matches/game/${gameId}`)
};

export const notificationAPI = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  markAsRead: notificationId =>
    api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all')
};

export const guestAPI = {
  createGuest: async guestData => {
    try {
      console.log('Sending guest data:', guestData); 
      const response = await api.post('/guests', guestData);
      console.log('Guest creation response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Guest creation error:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getGuests: async () => {
    try {
      const response = await api.get('/guests');
      return response.data.guests || [];
    } catch (error) {
      console.error('Get guests error:', error);
      return [];
    }
  },
  searchGuests: async query => {
    try {
      const response = await api.get(
        `/guests/search?q=${encodeURIComponent(query)}`
      );
      return response.data.guests || [];
    } catch (error) {
      console.error('Search guests error:', error);
      return [];
    }
  },
  getGuest: async guestId => {
    const response = await api.get(`/guests/${guestId}`);
    return response.data;
  },
  updateGuest: (guestId, updateData) =>
    api.put(`/guests/${guestId}`, updateData),
  deleteGuest: guestId => api.delete(`/guests/${guestId}`),
  syncGuest: (guestId, targetUserId) =>
    api.post(`/guests/${guestId}/sync`, { targetUserId })
};

export default api;
