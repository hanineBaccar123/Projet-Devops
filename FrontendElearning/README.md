# Frontend E-Learning - React + Vite

Application frontend pour la plateforme e-learning, construite avec React et Vite.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Configuration

Assurez-vous que votre backend est configuré pour accepter les requêtes depuis `http://localhost:5173` (port par défaut de Vite).

Si votre backend utilise un port différent de 5000, modifiez la configuration dans `vite.config.js`.

### Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/      # Composants réutilisables
│   │   └── Navbar.jsx
│   ├── context/         # Context React (Auth)
│   │   └── AuthContext.jsx
│   ├── pages/           # Pages de l'application
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── AddCourse.jsx
│   │   └── Profile.jsx
│   ├── services/        # Services API
│   │   └── api.js
│   ├── App.jsx          # Composant principal
│   └── main.jsx         # Point d'entrée
└── vite.config.js       # Configuration Vite
```

## 🔑 Fonctionnalités

- **Authentification** : Connexion et inscription
- **Gestion des cours** : Affichage, ajout, suppression de cours
- **Commentaires** : Ajout et affichage de commentaires sur les cours
- **Profil utilisateur** : Modification du profil avec upload d'image
- **Rôles** : Support des rôles étudiant, enseignant et administrateur

## 🔌 API Backend

L'application communique avec le backend via les endpoints suivants :

- `/users/*` - Gestion des utilisateurs
- `/cours/*` - Gestion des cours
- `/commentaire/*` - Gestion des commentaires
- `/p/*` - Gestion des paiements

## 🛠️ Technologies utilisées

- React 19
- Vite 7
- React Router DOM 7
- Axios
- CSS3

## 📝 Notes

- Les mots de passe doivent contenir au moins 12 caractères (conformément au backend)
- Les images de profil sont stockées dans le dossier `public/images` du backend
- Le proxy Vite est configuré pour rediriger les requêtes API vers le backend
