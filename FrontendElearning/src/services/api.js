import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || ''; // Utilise le proxy Vite en développement

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur pour gérer les erreurs de connexion
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      console.error('❌ Impossible de se connecter au backend. Assurez-vous que le serveur backend est démarré sur le port 5001.');
      error.message = 'Le serveur backend n\'est pas accessible. Veuillez démarrer le backend avec "npm run dev" dans le dossier racine.';
    }
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getAllUsers: () => api.get('/users/getAllUsers'),
  getUserById: (id) => api.get(`/users/getUserById/${id}`),
  updateUser: (id, data) => api.put(`/users/updateUser/${id}`, data),
  updateProfile: (id, formData) => api.put(`/users/modifierProfil/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteUser: (id) => api.delete(`/users/deleteUserById/${id}`),
  searchUsers: (firstname) => api.get('/users/searchUsersByFirstName', { params: { firstname } }),
};

// Course API
export const courseAPI = {
  getAllCours: () => api.get('/cours/getAllCours'),
  addCours: (data) => api.post('/cours/addCours', data),
  deleteCours: (id) => api.delete(`/cours/deleteCoursById/${id}`),
};

// Comment API
export const commentAPI = {
  getAllComments: () => api.get('/commentaire/getAllComments'),
  addCommentaire: (data) => api.post('/commentaire/addCommentaire', data),
  deleteCommentaire: (id) => api.delete(`/commentaire/deleteCommentaireById/${id}`),
};

// Payment API
export const paymentAPI = {
  addPaiement: (data) => api.post('/p/add', data),
};

export default api;

