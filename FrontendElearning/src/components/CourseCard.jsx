import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const getCourseImage = () => {
    // Utiliser une image par défaut basée sur le niveau ou générer une couleur
    const images = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    ];
    return images[course._id?.charCodeAt(0) % images.length] || images[0];
  };

  return (
    <div className="course-card-modern">
      <div className="course-card-image">
        <img src={getCourseImage()} alt={course.name} />
        <div className="course-price-badge">{course.prix || 0}€</div>
      </div>
      <div className="course-card-content">
        <h3 className="course-card-title">{course.name}</h3>
        <p className="course-card-description">
          {course.description?.substring(0, 80) || 'Description du cours...'}...
        </p>
        <div className="course-card-tags">
          <span className="course-tag">{course.level || 'Niveau'}</span>
          <span className="course-tag">Cours en ligne</span>
          <span className="course-tag">{course.duration || 0}h</span>
        </div>
        <Link to={`/courses/${course._id}`} className="course-card-btn">
          S'inscrire maintenant
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

