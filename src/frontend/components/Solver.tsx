import React from 'react';
import { HomeworkResponse } from '../types/index';

interface SolverProps {
  result: HomeworkResponse | null;
  loading: boolean;
  error: string | null;
}

export const Solver: React.FC<SolverProps> = ({ result, loading, error }) => {
  if (loading) {
    return <div className="solver-container loading">Solving your problem... 🤔</div>;
  }

  if (error) {
    return <div className="solver-container error">Error: {error}</div>;
  }

  if (!result) {
    return <div className="solver-container placeholder">Submit a problem to get started!</div>;
  }

  return (
    <div className="solver-container">
      <div className="result-section">
        <h3>Subject: {result.subject.toUpperCase()} {result.grade && `(Grade ${result.grade})`}</h3>

        {result.gradeVerification && (
          <div className={`grade-verification ${result.gradeVerification.isAppropriate ? 'appropriate' : 'warning'}`}>
            <h4>📋 Grade Verification</h4>
            <p><strong>Difficulty:</strong> {result.gradeVerification.difficulty}</p>
            <p><strong>Status:</strong> {result.gradeVerification.message}</p>
            {!result.gradeVerification.isAppropriate && (
              <p className="warning-text">⚠️ This problem may be above or below the expected difficulty for your grade level.</p>
            )}
          </div>
        )}

        {result.attachments && result.attachments.length > 0 && (
          <div className="attachments-section">
            <h4>📎 Attachments Provided</h4>
            <ul>
              {result.attachments.map((attachment, index) => (
                <li key={index}>{attachment}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="solution">
          <h4>Solution:</h4>
          <p className="solution-text">{result.solution}</p>
        </div>

        <div className="explanation">
          <h4>Explanation:</h4>
          <p className="explanation-text">{result.explanation}</p>
        </div>

        {result.confidence && (
          <div className="confidence">
            <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
          </div>
        )}
      </div>

      <style>{`
        .solver-container {
          padding: 20px;
          background: white;
          border-radius: 8px;
          border-left: 5px solid #007bff;
        }

        .solver-container.loading {
          text-align: center;
          color: #666;
          font-size: 18px;
          padding: 40px;
        }

        .solver-container.error {
          background: #fee;
          border-left-color: #d32f2f;
          color: #d32f2f;
          padding: 20px;
        }

        .solver-container.placeholder {
          text-align: center;
          color: #999;
          padding: 40px;
          font-style: italic;
        }

        .result-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .result-section h3 {
          margin: 0;
          color: #333;
        }

        .grade-verification {
          padding: 15px;
          background: #e8f5e9;
          border-left: 3px solid #4caf50;
          border-radius: 4px;
        }

        .grade-verification.warning {
          background: #fff3e0;
          border-left-color: #ff9800;
        }

        .grade-verification h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .grade-verification p {
          margin: 5px 0;
          color: #555;
          font-size: 14px;
        }

        .warning-text {
          color: #ff9800;
          font-weight: bold;
        }

        .attachments-section {
          padding: 15px;
          background: #f5f5f5;
          border-left: 3px solid #2196f3;
          border-radius: 4px;
        }

        .attachments-section h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .attachments-section ul {
          margin: 0;
          padding-left: 20px;
          color: #555;
        }

        .attachments-section li {
          margin: 5px 0;
          font-size: 14px;
        }

        .solution,
        .explanation {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 4px;
        }

        .solution {
          border-left: 3px solid #4caf50;
        }

        .explanation {
          border-left: 3px solid #ff9800;
        }

        .solution h4,
        .explanation h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .solution-text,
        .explanation-text {
          margin: 0;
          color: #555;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .confidence {
          text-align: right;
          font-size: 12px;
          color: #999;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};