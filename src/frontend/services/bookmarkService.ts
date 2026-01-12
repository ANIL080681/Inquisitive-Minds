const BOOKMARKS_KEY = 'homework_bookmarks';

export interface Bookmark {
  id: string;
  problem: string;
  subject: string;
  solution: string;
  explanation: string;
  savedAt: string;
}

export const bookmarkService = {
  // Get all bookmarks
  getBookmarks(): Bookmark[] {
    try {
      const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch {
      return [];
    }
  },

  // Save bookmark
  saveBookmark(problem: string, subject: string, solution: string, explanation: string): Bookmark {
    const bookmarks = this.getBookmarks();
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      problem,
      subject,
      solution,
      explanation,
      savedAt: new Date().toISOString(),
    };
    bookmarks.push(bookmark);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return bookmark;
  },

  // Remove bookmark
  removeBookmark(id: string): void {
    const bookmarks = this.getBookmarks().filter(b => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  },

  // Export bookmarks as JSON
  exportAsJSON(): string {
    const bookmarks = this.getBookmarks();
    return JSON.stringify(bookmarks, null, 2);
  },

  // Export bookmarks as CSV
  exportAsCSV(): string {
    const bookmarks = this.getBookmarks();
    let csv = 'Problem,Subject,Solution,Explanation,SavedAt\n';
    bookmarks.forEach(b => {
      csv += `"${b.problem}","${b.subject}","${b.solution}","${b.explanation}","${b.savedAt}"\n`;
    });
    return csv;
  },

  // Download file
  downloadFile(content: string, filename: string, type: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
};
