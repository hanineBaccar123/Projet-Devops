import axios from 'axios';

// Assurez-vous que VITE_API_URL est bien défini dans votre .env
// Exemple: VITE_API_URL=http://localhost:5001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Pour envoyer les cookies ou JWT
});

// Intercepteur pour gérer les erreurs de connexion
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le backend n'est pas accessible
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      console.error(`❌ Impossible de se connecter au backend sur ${API_URL}. Assurez-vous que le serveur backend est démarré.`);
      error.message = `Le serveur backend n'est pas accessible (${API_URL}). Veuillez démarrer le backend avec "npm run dev".`;
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
