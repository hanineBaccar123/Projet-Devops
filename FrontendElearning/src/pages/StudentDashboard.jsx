import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import StatsPanel from '../components/StatsPanel';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseAPI.getAllCours();
      const allCourses = response.data.CoursList || [];
      setCourses(allCourses);
      // Simuler les cours inscrits (dans un vrai système, cela viendrait du backend)
      setEnrolledCourses(allCourses.slice(0, 3));
    } catch (err) {
      console.error('Erreur lors du chargement des cours', err);
    } finally {
      setLoading(false);
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

  const recommendedCourses = courses.slice(0, 4);
  const progressData = [
    { course: 'UX Research & Case Study', progress: 80, level: 'Avancé', nextAssignment: '27 Avr 2024' },
    { course: 'Figma Advanced Prototype', progress: 60, level: 'Moyen', nextAssignment: '1 Avr 2024' },
    { course: 'UX Law Study', progress: 20, level: 'Débutant', nextAssignment: '26 Avr 2024' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Ongoing Courses with Progress */}
        <section className="dashboard-section student">
          <div className="section-header">
            <div>
              <h2>Mes cours en cours</h2>
              <p className="section-subtitle">Suivez votre progression dans vos cours</p>
            </div>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <p>Vous n'êtes inscrit à aucun cours pour le moment</p>
              <Link to="/dashboard" className="btn-primary">Explorer les cours</Link>
            </div>
          ) : (
            <div className="progress-courses-table">
              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Nom du cours</th>
                    <th>Instructeur</th>
                    <th>Progression</th>
                    <th>Niveau</th>
                    <th>Prochaine tâche</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((item, index) => {
                    const course = enrolledCourses[index] || courses[index];
                    if (!course) return null;
                    return (
                      <tr key={course._id || index}>
                        <td>
                          <div className="course-name-cell">
                            <div className="course-name">{item.course}</div>
                          </div>
                        </td>
                        <td>Instructeur {index + 1}</td>
                        <td>
                          <div className="progress-cell">
                            <div className="progress-bar-container">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{item.progress}%</span>
                          </div>
                        </td>
                        <td><span className="table-badge">{item.level}</span></td>
                        <td>{item.nextAssignment}</td>
                        <td>
                          <Link to={`/courses/${course._id}`} className="table-action-btn">
                            Continuer
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <section className="dashboard-section student">
            <div className="section-header">
              <div>
                <h2>Cours recommandés</h2>
                <p className="section-subtitle">
                  Basé sur votre activité d'apprentissage, nous avons sélectionné des cours personnalisés pour vous
                </p>
              </div>
              <button className="btn-link">Voir tout</button>
            </div>

            <div className="recommended-courses">
              {recommendedCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Topics */}
        <section className="dashboard-section student">
          <div className="section-header">
            <div>
              <h2>Sujets de cours populaires</h2>
              <p className="section-subtitle">
                Découvrez les sujets les plus populaires parmi les étudiants
              </p>
            </div>
            <button className="btn-link">Voir tout</button>
          </div>

          <div className="popular-topics">
            {['Développement Web', 'Design UI/UX', 'Data Science', 'Marketing Digital', 'Photographie'].map((topic, index) => (
              <div key={index} className="topic-card student">
                <div className="topic-icon">📚</div>
                <div className="topic-name">{topic}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <StatsPanel courses={enrolledCourses} user={user} />
    </div>
  );
};

export default StudentDashboard;

