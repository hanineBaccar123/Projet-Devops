import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/dashboard' && user?.role === 'student';

  if (!user) {
    return <>{children}</>;
  }

  // Pour la page d'accueil étudiant, pas de sidebar/header
  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

