export interface HomeworkResponse {
  solution: string;
  explanation: string;
  subject: string;
  grade?: string;
  confidence?: number;
  gradeVerification?: {
    isAppropriate: boolean;
    difficulty: string;
    message: string;
  };
  attachments?: string[];
}

export interface HomeworkRequest {
  problem: string;
  subject: 'math' | 'english' | 'science';
  grade?: string;
  attachments?: File[];
}