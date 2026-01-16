import { HomeworkResponse } from '../types/index';
import https from 'https';

export class AIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async solve(problem: string, subject: string, grade: string): Promise<HomeworkResponse> {
    if (!this.apiKey) {
      return {
        solution: 'AI service not configured',
        explanation: 'Please add your Gemini API key to use advanced problem solving.',
        subject,
        confidence: 0
      };
    }

    try {
      let prompt = '';
      
      if (subject.toLowerCase() === 'math') {
        prompt = `You are an expert mathematics tutor helping grade ${grade} students solve problems.

Question: ${problem}

Instructions:
- Solve this math problem completely, showing ALL work
- For equations: Show each algebraic step clearly
- For calculus: Show derivative/integral steps
- For word problems: Set up the equation first
- Use proper mathematical notation
- Break down complex steps into simple ones
- Double-check your final answer

Format your response as:
SOLUTION: [final numeric answer or simplified form]
EXPLANATION: [complete step-by-step solution with all work shown]`;
      } else {
        prompt = `You are a helpful homework tutor for grade ${grade} students.
Subject: ${subject}
Question: ${problem}

Provide:
1. A clear, concise answer/solution
2. A detailed step-by-step explanation appropriate for grade ${grade}

Format your response as:
SOLUTION: [your answer here]
EXPLANATION: [your detailed explanation here]`;
      }

      const postData = JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      });

      const result = await this.makeRequest(postData);
      
      console.log('✅ Gemini API Success');
      
      if (result.candidates && result.candidates[0]) {
        const text = result.candidates[0].content.parts[0].text;
        console.log('AI Response Text:', text);
        
        // Try to parse SOLUTION: and EXPLANATION: format
        const solutionMatch = text.match(/SOLUTION:\s*([\s\S]*?)(?=EXPLANATION:|$)/i);
        const explanationMatch = text.match(/EXPLANATION:\s*([\s\S]*)/i);
        
        let solution = '';
        let explanation = '';
        
        if (solutionMatch && explanationMatch) {
          // Formatted response with SOLUTION: and EXPLANATION:
          solution = solutionMatch[1].trim();
          explanation = explanationMatch[1].trim();
        } else {
          // Response doesn't have the format, split intelligently
          const lines = text.trim().split('\n');
          if (lines.length > 1) {
            solution = lines[0].trim();
            explanation = lines.slice(1).join('\n').trim();
          } else {
            // Single line response
            solution = text.trim();
            explanation = 'The answer is: ' + solution;
          }
        }

        return {
          solution,
          explanation,
          subject,
          confidence: 0.95
        };
      }

      throw new Error('Invalid API response: ' + JSON.stringify(result));
      
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      return {
        solution: 'Unable to solve',
        explanation: 'AI service encountered an error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        subject,
        confidence: 0
      };
    }
  }

  private makeRequest(postData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.apiKey)}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        console.log('Gemini API Status:', res.statusCode);

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          console.log('Gemini API Raw Response:', data);
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode !== 200) {
              reject(new Error(`API Error: ${res.statusCode} - ${data}`));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error('Failed to parse response: ' + data));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  }
}
