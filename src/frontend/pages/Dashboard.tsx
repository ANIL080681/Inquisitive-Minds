import React, { useState } from 'react';

interface DashboardStats {
  totalSolved: number;
  bySubject: { [key: string]: number };
  thisWeek: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalSolved: 24,
    bySubject: { math: 10, english: 8, science: 6 },
    thisWeek: 5,
  });

  const [history, setHistory] = useState([
    { id: 1, problem: 'Solve 2x + 5 = 13', subject: 'Math', date: '2026-01-10' },
    { id: 2, problem: 'Essay structure tips', subject: 'English', date: '2026-01-09' },
    { id: 3, problem: 'Photosynthesis process', subject: 'Science', date: '2026-01-08' },
  ]);

  return (
    <div className="dashboard">
      <h1>📊 Your Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Solved</h3>
          <p className="stat-number">{stats.totalSolved}</p>
        </div>
        <div className="stat-card">
          <h3>This Week</h3>
          <p className="stat-number">{stats.thisWeek}</p>
        </div>
        <div className="stat-card">
          <h3>Math</h3>
          <p className="stat-number">{stats.bySubject.math}</p>
        </div>
        <div className="stat-card">
          <h3>English</h3>
          <p className="stat-number">{stats.bySubject.english}</p>
        </div>
        <div className="stat-card">
          <h3>Science</h3>
          <p className="stat-number">{stats.bySubject.science}</p>
        </div>
      </div>

      <div className="history-section">
        <h2>Recent History</h2>
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-item">
              <div>
                <p className="problem-text">{item.problem}</p>
                <p className="meta">{item.subject} • {item.date}</p>
              </div>
              <button className="bookmark-btn">🔖</button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dashboard {
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .dashboard h1 {
          color: #333;
          margin-bottom: 30px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 14px;
        }

        .stat-number {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
        }

        .history-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .history-section h2 {
          margin-top: 0;
          color: #333;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 4px;
          border-left: 3px solid #667eea;
        }

        .problem-text {
          margin: 0 0 5px 0;
          color: #333;
          font-weight: 500;
        }

        .meta {
          margin: 0;
          font-size: 12px;
          color: #999;
        }

        .bookmark-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 5px 10px;
        }

        .bookmark-btn:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};
