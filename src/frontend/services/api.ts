import { HomeworkRequest, HomeworkResponse } from '../types/index';

const API_BASE_URL = '/api';

export const apiService = {
  async solveHomework(request: HomeworkRequest): Promise<HomeworkResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to solve homework');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async solveHomeworkWithFiles(formData: FormData): Promise<HomeworkResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/solve`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to solve homework');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};