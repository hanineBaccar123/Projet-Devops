import './StatsPanel.css';

const StatsPanel = ({ courses, user }) => {
  const stats = [
    {
      icon: '📚',
      label: 'Cours inscrits',
      value: courses.length || 0,
    },
    {
      icon: '📖',
      label: 'Leçons contenues',
      value: courses.reduce((sum, c) => sum + (c.duration || 0), 0),
    },
    {
      icon: '⭐',
      label: 'Avis reçus',
      value: '12',
    },
    {
      icon: '🎯',
      label: 'Ateliers',
      value: '15',
    },
  ];

  return (
    <aside className="stats-panel">
      <div className="stats-panel-content">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default StatsPanel;

