import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MathService } from '../services/mathService';
import { EnglishService } from '../services/englishService';
import { ScienceService } from '../services/scienceService';
import { AIService } from '../services/aiService';
import { ImageVisionService } from '../services/imageVisionService';
import { GradeVerificationService } from '../services/gradeVerificationService';
import { validateHomeworkInput } from '../../shared/validators/input';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Simple in-memory user store (in production, use a database)
interface User {
  username: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

const users: User[] = [
  { username: 'demo', password: 'demo', role: 'student' },
  { username: 'teacher', password: 'teacher', role: 'teacher' },
  { username: 'admin', password: 'admin', role: 'admin' },
];

const mathService = new MathService();
const englishService = new EnglishService();
const scienceService = new ScienceService();
const aiService = new AIService();
const imageVisionService = new ImageVisionService();
const gradeVerificationService = new GradeVerificationService();

// Authentication endpoints
export const signIn = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        username,
      },
    });
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};

export const signUp = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    if (password.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 3 characters',
      });
    }

    // Check if user exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }

    // Add user with student role by default
    users.push({ username, password, role: 'student' });

    // Generate JWT token
    const token = jwt.sign({ username, role: 'student' }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        username,
        role: 'student',
      },
    });
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).json({
      success: false,
      error: 'Sign up failed',
    });
  }
};

// Homework endpoints
export const solveHomework = async (req: Request, res: Response) => {
  try {
    const { problem, subject, grade } = req.body;
    const files = (req as any).files || [];

    // Validate input
    if (!validateHomeworkInput(problem) || !subject) {
      return res.status(400).json({
        success: false,
        error: 'Problem and subject are required',
      });
    }

    let response;

    // Route to appropriate service
    switch (subject.toLowerCase()) {
      case 'math':
        response = mathService.solve(problem);
        break;
      case 'english':
        response = englishService.solve(problem);
        break;
      case 'science':
        response = scienceService.solve(problem);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid subject',
        });
    }

    // Check if pattern matching failed (low confidence or generic response)
    const needsAI = response.confidence < 0.6 || 
                    response.solution.includes('I can help') ||
                    response.solution === 'Unable to solve';

    // Use AI as fallback for complex problems
    if (needsAI && process.env.GEMINI_API_KEY) {
      try {
        response = await aiService.solve(problem, subject, grade || '5');
        response.usedAI = true;
      } catch (aiError) {
        console.error('AI fallback failed:', aiError);
        // Keep the original pattern-matched response
      }
    }

    // Add grade information if provided
    if (grade) {
      response.grade = grade;
      const verification = gradeVerificationService.verifyGrade(problem, subject, grade);
      response.gradeVerification = {
        isAppropriate: verification.isAppropriate,
        difficulty: verification.difficulty,
        message: verification.message,
      };
    }

    // Add attachment information if files were uploaded
    if (files.length > 0) {
      response.attachments = files.map((file: any) => file.originalname);
    }

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const solveHomeworkWithImage = async (req: Request, res: Response) => {
  try {
    const { subject, grade, image, mimeType, question } = req.body;

    if (!subject || !image || !mimeType) {
      return res.status(400).json({
        success: false,
        error: 'Subject, image data, and mime type are required',
      });
    }

    console.log(`📸 Image homework request: ${subject}, Grade: ${grade || 'N/A'}`);
    console.log(`Image type: ${mimeType}, Additional context: ${question || 'None'}`);

    // Use AI vision service to analyze the image
    const response = await imageVisionService.analyzeImage(
      image,
      mimeType,
      subject,
      grade || '5',
      question
    );

    // Add grade verification
    if (grade) {
      const gradeNum = parseInt(grade);
      const verification = gradeVerificationService.verifyGrade(
        'Image-based homework',
        subject,
        grade
      );
      (response as any).gradeVerification = verification;
      (response as any).grade = gradeNum;
    }

    (response as any).usedAI = true;
    (response as any).usedVision = true;

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error processing image homework:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error processing image',
    });
  }
};

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Homework assistant is running',
  });
};