import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI, userAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesRes, usersRes] = await Promise.all([
        courseAPI.getAllCours(),
        userAPI.getAllUsers(),
      ]);

      const coursesList = coursesRes.data.CoursList || [];
      const usersList = usersRes.data.usersList || [];

      setCourses(coursesList);
      setUsers(usersList);

      setStats({
        totalCourses: coursesList.length,
        totalUsers: usersList.length,
        totalTeachers: usersList.filter(u => u.role === 'teacher').length,
        totalStudents: usersList.filter(u => u.role === 'student').length,
      });
    } catch (err) {
      console.error('Erreur lors du chargement des données', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      await userAPI.deleteUser(userId);
      loadData();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    
    try {
      await courseAPI.deleteCours(courseId);
      loadData();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Tableau de bord Administrateur</h1>
          <p>Gérez tous les aspects de la plateforme</p>
        </div>
        <Link to="/courses/add" className="btn-primary-large">
          + Créer un cours
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="admin-stats-grid">
        <div className="stat-card admin">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Cours totaux</div>
          </div>
        </div>
        <div className="stat-card admin">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Utilisateurs totaux</div>
          </div>
        </div>
        <div className="stat-card admin">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTeachers}</div>
            <div className="stat-label">Enseignants</div>
          </div>
        </div>
        <div className="stat-card admin">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalStudents}</div>
            <div className="stat-label">Étudiants</div>
          </div>
        </div>
      </div>

      <div className="admin-content-grid">
        {/* Courses Management */}
        <section className="admin-section">
          <div className="section-header-admin">
            <h2>Gestion des Cours</h2>
            <Link to="/courses/add" className="btn-link">+ Ajouter</Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom du cours</th>
                  <th>Niveau</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, 5).map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div className="table-course-name">{course.name}</div>
                    </td>
                    <td><span className="table-badge">{course.level}</span></td>
                    <td className="course-price-cell">{course.prix}€</td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/courses/${course._id}`} className="btn-action-view">Voir</Link>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)} 
                          className="btn-action-delete"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Users Management */}
        <section className="admin-section">
          <div className="section-header-admin">
            <h2>Gestion des Utilisateurs</h2>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="table-user-info">
                        <div className="user-avatar-small">
                          {u.firstname?.[0]}{u.lastname?.[0]}
                        </div>
                        <div>
                          <div className="table-user-name">{u.firstname} {u.lastname}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role === 'admin' ? 'Admin' : u.role === 'teacher' ? 'Enseignant' : 'Étudiant'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteUser(u._id)} 
                        className="btn-action-delete"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

