import React, { useState, useEffect } from 'react';
import { Bookmark, bookmarkService } from '../services/bookmarkService';

export const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setBookmarks(bookmarkService.getBookmarks());
  }, []);

  const handleRemoveBookmark = (id: string) => {
    bookmarkService.removeBookmark(id);
    setBookmarks(bookmarkService.getBookmarks());
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleExport = (format: 'json' | 'csv') => {
    const content = format === 'json' ? bookmarkService.exportAsJSON() : bookmarkService.exportAsCSV();
    const filename = `bookmarks.${format}`;
    const mimeType = format === 'json' ? 'application/json' : 'text/csv';
    bookmarkService.downloadFile(content, filename, mimeType);
  };

  const filteredBookmarks = bookmarks.filter(b =>
    b.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bookmarks">
      <h1>🔖 Saved Solutions</h1>

      <div className="bookmarks-header">
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="export-buttons">
          <button onClick={() => handleExport('json')} className="export-btn">
            📥 JSON
          </button>
          <button onClick={() => handleExport('csv')} className="export-btn">
            📊 CSV
          </button>
        </div>
      </div>

      {filteredBookmarks.length === 0 ? (
        <p className="empty-state">No bookmarks yet. Save your first solution!</p>
      ) : (
        <div className="bookmarks-list">
          {filteredBookmarks.map(bookmark => (
            <div key={bookmark.id} className="bookmark-card">
              <div className="bookmark-header">
                <h3>{bookmark.problem}</h3>
                <span className="subject-tag">{bookmark.subject}</span>
              </div>

              <div className="bookmark-content">
                <div className="solution">
                  <p><strong>Solution:</strong> {bookmark.solution}</p>
                </div>
                <div className="explanation">
                  <p><strong>Explanation:</strong> {bookmark.explanation}</p>
                </div>
              </div>

              <div className="bookmark-footer">
                <small>{new Date(bookmark.savedAt).toLocaleDateString()}</small>
                <div className="actions">
                  <button onClick={() => handleCopy(bookmark.solution)} className="action-btn">
                    📋 Copy Solution
                  </button>
                  <button onClick={() => handleRemoveBookmark(bookmark.id)} className="action-btn delete">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .bookmarks {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .bookmarks h1 {
          color: #333;
          margin-bottom: 30px;
        }

        .bookmarks-header {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .export-buttons {
          display: flex;
          gap: 10px;
        }

        .export-btn {
          padding: 10px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .export-btn:hover {
          background: #5568d3;
        }

        .empty-state {
          text-align: center;
          color: #999;
          padding: 40px;
        }

        .bookmarks-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .bookmark-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid #667eea;
        }

        .bookmark-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .bookmark-header h3 {
          margin: 0;
          color: #333;
        }

        .subject-tag {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .bookmark-content {
          margin: 15px 0;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 4px;
        }

        .bookmark-content p {
          margin: 10px 0;
          color: #555;
        }

        .solution {
          margin-bottom: 10px;
        }

        .bookmark-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .bookmark-footer small {
          color: #999;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          padding: 6px 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s;
        }

        .action-btn:hover {
          background: #f5f5f5;
          border-color: #667eea;
          color: #667eea;
        }

        .action-btn.delete:hover {
          background: #ffebee;
          border-color: #d32f2f;
          color: #d32f2f;
        }
      `}</style>
    </div>
  );
};
