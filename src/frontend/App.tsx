import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Homework } from './pages/Homework';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { PracticeQuiz } from './pages/PracticeQuiz';
import { Bookmarks } from './pages/Bookmarks';
import { authService } from './services/authService';

type Page = 'home' | 'homework' | 'dashboard' | 'practice' | 'bookmarks';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    setIsAuthenticated(authService.isAuthenticated());
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const handleSignIn = async (username: string, password: string) => {
    setLoading(true);
    setAuthError(null);

    try {
      const { token } = await authService.signIn(username, password);
      authService.setToken(token);
      setIsAuthenticated(true);
      setCurrentPage('home');
      showNotification('Welcome! Signed in successfully.', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      setAuthError(message);
      showNotification(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (username: string, password: string, dob: string) => {
    setLoading(true);
    setAuthError(null);

    try {
      const { token } = await authService.signUp(username, password, dob);
      authService.setToken(token);
      setIsAuthenticated(true);
      setCurrentPage('home');
      showNotification('Account created and signed in.', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      setAuthError(message);
      showNotification(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    authService.clearToken();
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} onSignUp={handleSignUp} loading={loading} error={authError} />;
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">📚 Homework Helper</h1>
          <ul className="nav-links">
            <li>
              <button
                onClick={() => setCurrentPage('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('homework')}
                className={currentPage === 'homework' ? 'active' : ''}
              >
                Get Help
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={currentPage === 'dashboard' ? 'active' : ''}
              >
                📊 Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('practice')}
                className={currentPage === 'practice' ? 'active' : ''}
              >
                ✏️ Practice
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('bookmarks')}
                className={currentPage === 'bookmarks' ? 'active' : ''}
              >
                🔖 Bookmarks
              </button>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className="theme-btn"
                title="Toggle Dark Mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="signout-btn"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
            <button onClick={() => setNotification(null)}>✕</button>
          </div>
        )}
        {currentPage === 'home' && <Home />}
        {currentPage === 'homework' && <Homework />}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'practice' && <PracticeQuiz />}
        {currentPage === 'bookmarks' && <Bookmarks />}
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
            'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background-color: #f5f5f5;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f5f5f5;
          color: #333;
          transition: background-color 0.3s, color 0.3s;
        }

        .app.dark-mode {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }

        .app.dark-mode .navbar {
          background: #2d2d2d;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .app.dark-mode .main-content {
          background-color: #1e1e1e;
        }

        .navbar {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background 0.3s;
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .logo {
          font-size: 24px;
          color: #333;
          margin: 0;
        }

        .app.dark-mode .logo {
          color: #f5f5f5;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .nav-links button {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #666;
          padding: 8px 16px;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .app.dark-mode .nav-links button {
          color: #bbb;
        }

        .nav-links button:hover {
          background: #f0f0f0;
          color: #333;
        }

        .app.dark-mode .nav-links button:hover {
          background: #3d3d3d;
          color: #fff;
        }

        .nav-links button.active {
          background: #667eea;
          color: white;
        }

        .nav-links button.theme-btn {
          font-size: 20px;
          padding: 8px 12px;
        }

        .nav-links button.signout-btn {
          background: #d32f2f;
          color: white;
          margin-left: 10px;
        }

        .nav-links button.signout-btn:hover {
          background: #b71c1c;
          color: white;
        }
  position: relative;
        }

        .notification {
          position: fixed;
          top: 90px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          z-index: 1000;
          animation: slideIn 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .notification.success {
          background: #4caf50;
          color: white;
        }

        .notification.error {
          background: #f44336;
          color: white;
        }

        .notification button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
        
        .main-content {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default App;