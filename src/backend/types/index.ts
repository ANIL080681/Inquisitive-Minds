export interface HomeworkResponse {
  solution: string;
  explanation: string;
  subject: string;
  confidence?: number;
}

export interface HomeworkRequest {
  problem: string;
  subject: 'math' | 'english' | 'science';
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}