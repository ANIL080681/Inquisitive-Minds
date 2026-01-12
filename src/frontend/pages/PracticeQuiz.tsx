import React, { useState } from 'react';

interface PracticeProblem {
  id: number;
  question: string;
  subject: string;
  difficulty: string;
  options?: string[];
  correct?: number;
}

export const PracticeQuiz: React.FC = () => {
  const [problems] = useState<PracticeProblem[]>([
    {
      id: 1,
      question: 'What is the derivative of x²?',
      subject: 'Math',
      difficulty: 'Medium',
      options: ['2x', 'x', '2', 'x²'],
      correct: 0,
    },
    {
      id: 2,
      question: 'Which is a metaphor?',
      subject: 'English',
      difficulty: 'Easy',
      options: ['The sky is blue', 'Time is money', 'The cat sat on the mat', 'She walked quickly'],
      correct: 1,
    },
    {
      id: 3,
      question: 'What is photosynthesis?',
      subject: 'Science',
      difficulty: 'Medium',
      options: [
        'Breaking down food for energy',
        'Converting light into chemical energy',
        'Moving cells around',
        'Reproduction process'
      ],
      correct: 1,
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (!answered) {
      setSelected(index);
      setAnswered(true);
      if (index === problems[current].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (current < problems.length - 1) {
      setCurrent(current + 1);
      setAnswered(false);
      setSelected(null);
    }
  };

  const problem = problems[current];

  return (
    <div className="quiz">
      <div className="quiz-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((current + 1) / problems.length) * 100}%` }}></div>
        </div>

        <h2>Practice Quiz</h2>
        <p className="question-number">Question {current + 1} of {problems.length}</p>

        <div className="problem-card">
          <p className="subject-badge">{problem.subject} • {problem.difficulty}</p>
          <h3>{problem.question}</h3>

          <div className="options">
            {problem.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`option ${selected === index ? 'selected' : ''} ${
                  answered && index === problem.correct ? 'correct' : ''
                } ${answered && selected === index && selected !== problem.correct ? 'incorrect' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <div className={`feedback ${selected === problem.correct ? 'correct' : 'incorrect'}`}>
              {selected === problem.correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
          )}
        </div>

        {answered && current < problems.length - 1 && (
          <button onClick={handleNext} className="next-btn">Next Question →</button>
        )}

        {current === problems.length - 1 && answered && (
          <div className="results">
            <h3>Quiz Complete!</h3>
            <p>Your Score: {score} / {problems.length}</p>
            <p className="percentage">{Math.round((score / problems.length) * 100)}%</p>
          </div>
        )}
      </div>

      <style>{`
        .quiz {
          max-width: 600px;
          margin: 20px auto;
        }

        .quiz-container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .progress-bar {
          height: 4px;
          background: #eee;
          border-radius: 2px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: #667eea;
          transition: width 0.3s;
        }

        .question-number {
          color: #999;
          font-size: 14px;
          margin: 0 0 20px 0;
        }

        .problem-card h3 {
          color: #333;
          margin-bottom: 20px;
        }

        .subject-badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
        }

        .option {
          padding: 12px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
        }

        .option:hover:not(:disabled) {
          border-color: #667eea;
          background: #f5f5f5;
        }

        .option.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .option.correct {
          border-color: #4caf50;
          background: #e8f5e9;
          color: #2e7d32;
        }

        .option.incorrect {
          border-color: #f44336;
          background: #ffebee;
          color: #c62828;
        }

        .option:disabled {
          cursor: not-allowed;
        }

        .feedback {
          padding: 15px;
          border-radius: 4px;
          margin-top: 15px;
          font-weight: bold;
        }

        .feedback.correct {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .feedback.incorrect {
          background: #ffebee;
          color: #c62828;
        }

        .next-btn {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 20px;
        }

        .next-btn:hover {
          background: #5568d3;
        }

        .results {
          text-align: center;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 4px;
          margin-top: 20px;
        }

        .results h3 {
          margin: 0 0 10px 0;
        }

        .percentage {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          margin: 10px 0 0 0;
        }
      `}</style>
    </div>
  );
};
