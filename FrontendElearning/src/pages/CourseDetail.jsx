import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseAPI, commentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCourse();
    loadComments();
  }, [id]);

  const loadCourse = async () => {
    try {
      const response = await courseAPI.getAllCours();
      const foundCourse = response.data.CoursList?.find(c => c._id === id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        setError('Cours non trouvé');
      }
    } catch (err) {
      setError('Erreur lors du chargement du cours');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await commentAPI.getAllComments();
      const courseComments = response.data.CommentaireList?.filter(
        c => c.cour === id
      ) || [];
      setComments(courseComments);
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await commentAPI.addCommentaire({
        description: newComment,
        rating: 5, // Valeur par défaut, vous pouvez ajouter un champ rating si nécessaire
        cour: id,
        student: user._id,
      });
      setNewComment('');
      loadComments();
    } catch (err) {
      setError('Erreur lors de l\'ajout du commentaire');
    }
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;

    try {
      await courseAPI.deleteCours(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error && !course) return <div className="error-message">{error}</div>;
  if (!course) return null;

  return (
    <div className="course-detail">
      <Link to="/dashboard" className="back-link">← Retour</Link>
      
      <div className="course-detail-header">
        <div>
          <h1>{course.name}</h1>
          <div className="course-meta">
            <span className="badge">{course.level}</span>
            <span className="badge">{course.language}</span>
            <span className="badge">{course.duration}h</span>
          </div>
        </div>
        <div className="course-price-large">{course.prix}€</div>
      </div>

      <div className="course-description-full">
        <h2>Description</h2>
        <p>{course.description}</p>
      </div>

      {(user?.role === 'teacher' || user?.role === 'admin') && (
        <div className="course-actions-admin">
          <button onClick={handleDeleteCourse} className="btn-danger">
            Supprimer le cours
          </button>
        </div>
      )}

      <div className="comments-section">
        <h2>Commentaires</h2>
        
        {user && (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              rows="3"
            />
            <button type="submit" className="btn-primary">Publier</button>
          </form>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-state">Aucun commentaire pour le moment</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment-card">
                <p>{comment.description}</p>
                {comment.rating && <div className="comment-rating">Note: {comment.rating}/5</div>}
                <small>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

