import { HomeworkResponse } from '../types/index';
import https from 'https';

export class ImageVisionService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async analyzeImage(imageData: string, mimeType: string, subject: string, grade: string, additionalContext?: string): Promise<HomeworkResponse> {
    if (!this.apiKey) {
      return {
        solution: 'Image analysis not configured',
        explanation: 'Please add your Gemini API key to use image analysis.',
        subject,
        confidence: 0
      };
    }

    try {
      const prompt = `You are a helpful homework tutor for grade ${grade} students.

The student has uploaded an image of their homework for the subject: ${subject}
${additionalContext ? `Additional context from student: ${additionalContext}` : ''}

Please:
1. Carefully read and understand the question/problem in the image
2. Provide a clear, step-by-step solution appropriate for grade ${grade}
3. Explain your reasoning in a way that helps the student learn

Format your response as:
SOLUTION: [your answer here]
EXPLANATION: [your detailed step-by-step explanation here]`;

      const postData = JSON.stringify({
        contents: [{
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageData
              }
            }
          ]
        }]
      });

      const result = await this.makeRequest(postData);
      
      console.log('✅ Gemini Vision API Success');
      
      if (result.candidates && result.candidates[0]) {
        const text = result.candidates[0].content.parts[0].text;
        console.log('AI Vision Response Text:', text);
        
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
            explanation = 'See the solution above for details.';
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
      console.error('❌ Gemini Vision API Error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      return {
        solution: 'Unable to analyze image',
        explanation: 'Image analysis encountered an error: ' + (error instanceof Error ? error.message : 'Unknown error'),
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
        
        console.log('Gemini Vision API Status:', res.statusCode);

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          console.log('Gemini Vision API Raw Response:', data.substring(0, 500));
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
