import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Menu items selon le rôle
  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/profile', label: 'Profil', icon: '👤' },
        { path: '/courses/add', label: 'Créer un cours', icon: '➕' },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { path: '/dashboard', label: 'Mes Cours', icon: '📚' },
        { path: '/courses/add', label: 'Créer un cours', icon: '➕' },
        { path: '/profile', label: 'Profil', icon: '👤' },
      ];
    } else {
      // Student
      return [
        { path: '/dashboard', label: 'Mes Cours', icon: '📚' },
        { path: '/dashboard', label: 'Explorer', icon: '🔍' },
        { path: '/profile', label: 'Profil', icon: '👤' },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">Academia</h2>
        <div className="sidebar-role-badge">
          {user?.role === 'admin' ? '👑 Admin' : user?.role === 'teacher' ? '👨‍🏫 Enseignant' : '🎓 Étudiant'}
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
            key={`${item.path}-${index}`}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link to="/profile" className="sidebar-item">
          <span className="sidebar-icon">⚙️</span>
          <span className="sidebar-label">Paramètres</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

