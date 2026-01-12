import React, { useState } from 'react';
import { HomeworkForm } from '../components/HomeworkForm';
import { Solver } from '../components/Solver';
import { apiService } from '../services/api';
import { HomeworkResponse } from '../types/index';

export const Homework: React.FC = () => {
  const [result, setResult] = useState<HomeworkResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async (problem: string, subject: string, grade: string, attachments: File[]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('problem', problem);
      formData.append('subject', subject);
      formData.append('grade', grade);
      
      // Add attachments
      attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      const response = await apiService.solveHomeworkWithFiles(formData);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homework-page">
      <h1>Get Homework Help</h1>

      <div className="homework-container">
        <div className="form-section">
          <HomeworkForm onSubmit={handleSolve} loading={loading} />
        </div>

        <div className="result-section">
          <Solver result={result} loading={loading} error={error} />
        </div>
      </div>

      <style>{`
        .homework-page {
          padding: 20px;
        }

        .homework-page h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .homework-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .homework-container {
            grid-template-columns: 1fr;
          }
        }

        .form-section,
        .result-section {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};