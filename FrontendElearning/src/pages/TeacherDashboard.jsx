import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseAPI.getAllCours();
      const allCourses = response.data.CoursList || [];
      setCourses(allCourses);
      setMyCourses(allCourses);
    } catch (err) {
      console.error('Erreur lors du chargement des cours', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    
    try {
      await courseAPI.deleteCours(courseId);
      loadCourses();
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

  const stats = {
    totalCourses: myCourses.length,
    totalStudents: 0,
    averageRating: 4.5,
  };

  return (
    <div className="teacher-dashboard-modern">
      {/* Header Section */}
      <div className="teacher-header-modern">
        <div className="teacher-header-content">
          <div>
            <h1 className="teacher-title-modern">Tableau de bord Enseignant</h1>
            <p className="teacher-subtitle">Gérez vos cours et suivez vos étudiants</p>
          </div>
          <Link to="/courses/add" className="btn-teacher-primary">
            + Créer un nouveau cours
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="teacher-stats-modern">
        <div className="stat-card-teacher">
          <div className="stat-icon-teacher">📚</div>
          <div className="stat-content-teacher">
            <div className="stat-value-teacher">{stats.totalCourses}</div>
            <div className="stat-label-teacher">Mes cours</div>
          </div>
        </div>
        <div className="stat-card-teacher">
          <div className="stat-icon-teacher">👥</div>
          <div className="stat-content-teacher">
            <div className="stat-value-teacher">{stats.totalStudents}</div>
            <div className="stat-label-teacher">Étudiants inscrits</div>
          </div>
        </div>
        <div className="stat-card-teacher">
          <div className="stat-icon-teacher">⭐</div>
          <div className="stat-content-teacher">
            <div className="stat-value-teacher">{stats.averageRating}</div>
            <div className="stat-label-teacher">Note moyenne</div>
          </div>
        </div>
      </div>

      {/* My Courses Section */}
      <section className="teacher-section-modern">
        <div className="section-header-teacher-modern">
          <div>
            <h2 className="section-title-teacher">Mes Cours</h2>
            <p className="section-subtitle-teacher">Gérez tous vos cours créés</p>
          </div>
          <Link to="/courses/add" className="btn-teacher-link">+ Ajouter un cours</Link>
        </div>

        {myCourses.length === 0 ? (
          <div className="empty-state-teacher">
            <div className="empty-icon-teacher">📚</div>
            <p>Vous n'avez pas encore créé de cours</p>
            <Link to="/courses/add" className="btn-teacher-primary">
              Créer votre premier cours
            </Link>
          </div>
        ) : (
          <div className="teacher-courses-grid-modern">
            {myCourses.map((course) => (
              <div key={course._id} className="teacher-course-card-modern">
                <CourseCard course={course} />
                <div className="course-actions-teacher-modern">
                  <Link to={`/courses/${course._id}`} className="btn-action-edit-modern">
                    Modifier
                  </Link>
                  <button 
                    onClick={() => handleDeleteCourse(course._id)} 
                    className="btn-action-delete-modern"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Courses Section */}
      <section className="teacher-section-modern">
        <div className="section-header-teacher-modern">
          <div>
            <h2 className="section-title-teacher">Tous les cours</h2>
            <p className="section-subtitle-teacher">Consultez tous les cours disponibles sur la plateforme</p>
          </div>
        </div>

        <div className="recommended-courses-teacher">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
