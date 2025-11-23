import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import HomePage from './HomePage';

const Dashboard = () => {
  const { user } = useAuth();

  // Pour les étudiants, afficher la page d'accueil moderne
  if (user?.role === 'student') {
    return <HomePage />;
  }
  
  // Afficher le dashboard approprié selon le rôle
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'teacher') {
    return <TeacherDashboard />;
  } else {
    return <HomePage />;
  }
};

export default Dashboard;
