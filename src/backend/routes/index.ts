import { Router, Request, Response } from 'express';
import { solveHomework, solveHomeworkWithImage, healthCheck } from '../controllers/authController';
import { signIn, signUp } from '../controllers/authController';

const router = Router();

// Middleware to handle file uploads
const getUploadMiddleware = (req: Request, res: Response, next: Function) => {
  const upload = (req as any).upload;
  if (upload) {
    upload.array('attachments', 10)(req, res, next);
  } else {
    next();
  }
};

// Health check endpoint
router.get('/health', healthCheck);

// Auth endpoints
router.post('/auth/signin', signIn);
router.post('/auth/signup', signUp);

// Homework solving endpoints
router.post('/solve', getUploadMiddleware, solveHomework);
router.post('/solve-image', solveHomeworkWithImage);

export default router;