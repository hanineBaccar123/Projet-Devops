import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstname?.[0] || ''}${user.lastname?.[0] || ''}`.toUpperCase() || 'U';
  };

  const getRoleLabel = () => {
    const roles = {
      student: '🎓 Étudiant',
      teacher: '👨‍🏫 Enseignant',
      admin: '👑 Administrateur'
    };
    return roles[user?.role] || 'Utilisateur';
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-welcome">
          <h1>Bienvenue, {user?.firstname || 'Utilisateur'}!</h1>
          <p>Boostez vos compétences pour briller dans votre vie</p>
        </div>
        
        <div className="header-search">
          <input
            type="text"
            placeholder="Rechercher des cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="header-actions">
          <button className="header-icon-btn">
            <span>🔔</span>
          </button>
          <button className="header-icon-btn">
            <span>⚙️</span>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">
              {user?.user_image ? (
                <img 
                  src={`http://localhost:5001/images/${user.user_image}`} 
                  alt={user.firstname}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="avatar-fallback" style={{ display: user?.user_image ? 'none' : 'flex' }}>
                {getInitials()}
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-name">{user?.firstname} {user?.lastname}</div>
              <div className="profile-role">{getRoleLabel()}</div>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Déconnexion">
              🚪
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

