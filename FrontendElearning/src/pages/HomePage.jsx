import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeStudents: 16500,
    onlineCourses: 7500,
    totalCourses: 30000,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseAPI.getAllCours();
      setCourses(response.data.CoursList || []);
    } catch (err) {
      console.error('Erreur lors du chargement des cours', err);
    } finally {
      setLoading(false);
    }
  };

  const popularCourses = courses.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Online Education Feels Like Real Classroom
            </h1>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="check-icon">✓</span>
                <span>Get Certified</span>
              </div>
              <div className="hero-feature">
                <span className="check-icon">✓</span>
                <span>Gain Job-ready Skills</span>
              </div>
              <div className="hero-feature">
                <span className="check-icon">✓</span>
                <span>Great Life</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/login" className="btn-hero-primary">
                GET STARTED
              </Link>
              <Link to="/dashboard" className="btn-hero-secondary">
                VIEW COURSES
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-badge blue">
                <div className="stat-number">16,500+</div>
                <div className="stat-label">Active Students</div>
              </div>
              <div className="stat-badge red">
                <div className="stat-number">7,500+</div>
                <div className="stat-label">Online Video Courses</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="hero-graphic">📚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <div className="feature-text">30k+ Online Courses</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">♾️</div>
            <div className="feature-text">Lifetime Access</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div className="feature-text">Value For Money</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <div className="feature-text">Lifetime Support</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <div className="feature-text">Community Support</div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="courses-section">
        <div className="courses-container">
          <div className="section-header-modern">
            <div className="section-label">POPULAR COURSES</div>
            <h2 className="section-title">Our Popular Online Courses</h2>
          </div>

          <div className="course-categories">
            <button className="category-btn active">Digital Marketing <span>38k Courses</span></button>
            <button className="category-btn">UI/UX Design <span>14k Courses</span></button>
            <button className="category-btn">Graphic Design <span>24k Courses</span></button>
            <button className="category-btn">Web Development <span>38k Courses</span></button>
          </div>

          {loading ? (
            <div className="loading-state">Chargement...</div>
          ) : (
            <div className="courses-grid-modern">
              {popularCourses.map((course, index) => (
                <div key={course._id || index} className="course-card-modern">
                  <div className="course-image-wrapper">
                    <div className="course-image-placeholder">
                      <span className="course-image-icon">📖</span>
                    </div>
                    <div className="course-badge">BEST SELLER</div>
                    <div className="course-rating">
                      <span className="stars">★★★★★</span>
                    </div>
                  </div>
                  <div className="course-card-content-modern">
                    <h3 className="course-title-modern">{course.name || 'Course Title'}</h3>
                    <p className="course-instructor">by {user?.firstname || 'Instructor'}</p>
                    <div className="course-footer-modern">
                      <span className="course-price-modern">FREE</span>
                      <Link to={`/courses/${course._id}`} className="course-link-btn">
                        View Course →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all-container">
            <Link to="/dashboard" className="btn-view-all">
              VIEW ALL COURSES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

