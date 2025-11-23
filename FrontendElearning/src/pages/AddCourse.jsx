import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import './AddCourse.css';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    prix: '',
    description: '',
    level: 'beginner',
    language: 'français',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        prix: parseFloat(formData.prix),
        duration: parseInt(formData.duration),
      };
      await courseAPI.addCours(courseData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout du cours');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course">
      <h1>Ajouter un nouveau cours</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Nom du cours</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Introduction à React"
          />
        </div>

        <div className="form-group">
          <label>Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Description détaillée du cours..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Niveau</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>

          <div className="form-group">
            <label>Langue</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="français">Français</option>
              <option value="anglais">Anglais</option>
              <option value="arabe">Arabe</option>
            </select>
          </div>

          <div className="form-group">
            <label>Durée (heures)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              placeholder="10"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Annuler
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Ajout...' : 'Ajouter le cours'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;

