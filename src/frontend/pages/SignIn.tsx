import React, { useState } from 'react';

interface SignInProps {
  onSignIn: (username: string, password: string) => void;
  onSignUp?: (username: string, password: string, dob: string) => void;
  loading: boolean;
  error?: string | null;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn, onSignUp, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const calculateAge = (dateString: string) => {
    const birth = new Date(dateString);
    if (Number.isNaN(birth.getTime())) return null;
    const diff = Date.now() - birth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim() || !password.trim()) {
      setLocalError('Username and password are required');
      return;
    }

    if (isSignup) {
      if (!dob) {
        setLocalError('Please enter your date of birth');
        return;
      }
      const age = calculateAge(dob);
      if (age === null) {
        setLocalError('Invalid date of birth');
        return;
      }
      if (age < 5) {
        setLocalError('You must be at least 5 years old to sign up');
        return;
      }

      if (onSignUp) onSignUp(username, password, dob);
    } else {
      onSignIn(username, password);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1>📚 Homework Helper</h1>
        <p className="tagline">Get help with Math, English, and Science</p>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {(error || localError) && <div className="error-message">{localError || error}</div>}

          <button type="submit" disabled={loading || !username.trim() || !password.trim() || (isSignup && !dob)}>
            {loading ? (isSignup ? 'Creating account...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button onClick={() => { setIsSignup(!isSignup); setLocalError(null); }} disabled={loading} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer' }}>
            {isSignup ? 'Have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>

        <div className="demo-info">
          <p>Demo credentials: username: <strong>demo</strong>, password: <strong>demo</strong></p>
        </div>
      </div>

      <style>{`
        .signin-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .signin-container {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .signin-container h1 {
          text-align: center;
          font-size: 32px;
          margin-bottom: 10px;
          color: #333;
        }

        .tagline {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }

        .signin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: bold;
          color: #333;
        }

        .form-group input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled {
          background-color: #f5f5f5;
        }

        button {
          padding: 12px 24px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover:not(:disabled) {
          background: #5568d3;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 12px;
          border-radius: 4px;
          font-size: 14px;
        }

        .demo-info {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};
