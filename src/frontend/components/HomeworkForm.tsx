import React, { useState } from 'react';

interface HomeworkFormProps {
  onSubmit: (problem: string, subject: string, grade: string, attachments: File[]) => void;
  loading: boolean;
}

export const HomeworkForm: React.FC<HomeworkFormProps> = ({ onSubmit, loading }) => {
  const [problem, setProblem] = useState('');
  const [subject, setSubject] = useState<'math' | 'english' | 'science'>('math');
  const [grade, setGrade] = useState<string>('9');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onSubmit(problem, subject, grade, attachments);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="homework-form">
      <h2>Submit Your Problem</h2>

      <div className="form-group">
        <label>Select Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value as any)} disabled={loading}>
          <option value="math">Math</option>
          <option value="english">English</option>
          <option value="science">Science</option>
        </select>
      </div>

      <div className="form-group">
        <label>Grade Level:</label>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} disabled={loading}>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
          <option value="college">College</option>
        </select>
      </div>

      <div className="form-group">
        <label>Problem or Question:</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Type your problem here..."
          disabled={loading}
          rows={5}
        />
      </div>

      <div className="form-group">
        <label htmlFor="file-input">Attach Files (Pictures, Videos, Documents):</label>
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={loading}
          accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
        />
        <p className="file-help-text">Supported: Images, Videos, PDF, Word, Excel</p>
      </div>

      {attachments.length > 0 && (
        <div className="attachments-list">
          <h4>📎 Attachments ({attachments.length})</h4>
          {attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                disabled={loading}
                className="remove-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="submit" disabled={loading || !problem.trim()}>
        {loading ? 'Solving...' : 'Get Solution'}
      </button>

      <style>{`
        .homework-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
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

        .form-group select,
        .form-group textarea {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input[type="file"] {
          padding: 10px;
          border: 2px dashed #667eea;
          border-radius: 4px;
          background: white;
        }

        .file-help-text {
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .attachments-list {
          background: white;
          padding: 15px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .attachments-list h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .attachment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: #f9f9f9;
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .attachment-item:last-child {
          margin-bottom: 0;
        }

        .remove-btn {
          padding: 4px 8px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
          margin-left: 10px;
        }

        .remove-btn:hover {
          background: #ee5a52;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        button {
          padding: 12px 24px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover:not(:disabled) {
          background: #0056b3;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
};