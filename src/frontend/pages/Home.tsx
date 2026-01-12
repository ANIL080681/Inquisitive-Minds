import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>📚 Homework Assistant</h1>
        <p>Get help with Math, English, and Science problems instantly</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>🧮 Math</h3>
          <p>Solve equations, algebra problems, and more with step-by-step explanations</p>
        </div>

        <div className="feature-card">
          <h3>📖 English</h3>
          <p>Get grammar help, essay feedback, and vocabulary assistance</p>
        </div>

        <div className="feature-card">
          <h3>🔬 Science</h3>
          <p>Understand physics, chemistry, biology concepts with clear explanations</p>
        </div>
      </section>

      <style>{`
        .home-page {
          text-align: center;
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          margin-bottom: 40px;
        }

        .hero h1 {
          font-size: 48px;
          margin: 0 0 10px 0;
        }

        .hero p {
          font-size: 20px;
          margin: 0;
          opacity: 0.9;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 40px 20px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .feature-card h3 {
          font-size: 24px;
          margin-top: 0;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};