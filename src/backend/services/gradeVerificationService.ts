export class GradeVerificationService {
  private gradeMap: { [key: string]: number } = {
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    'college': 13,
  };

  // Estimate problem difficulty from content (1-13 scale, 1=easiest, 13=hardest)
  private estimateDifficulty(problem: string): number {
    const difficulty = {
      easy: ['basic', 'simple', 'easy', 'add', 'subtract', 'multiply', 'divide', 'spell', 'grammar', 'photosynthesis'],
      medium: ['equation', 'algebra', 'fraction', 'percent', 'geometry', 'vocabulary', 'essay', 'force', 'energy', 'particle'],
      hard: ['calculus', 'derivative', 'integral', 'quadratic', 'polynomial', 'trigonometry', 'complex', 'advanced', 'quantum', 'relativity'],
    };

    const lowerProblem = problem.toLowerCase();
    let score = 6; // Default middle grade

    // Check for easy indicators
    if (difficulty.easy.some(word => lowerProblem.includes(word))) {
      score -= 2;
    }

    // Check for hard indicators
    if (difficulty.hard.some(word => lowerProblem.includes(word))) {
      score += 3;
    }

    // Adjust by problem length and complexity
    if (problem.length > 300) score += 1;
    if (problem.length < 50) score -= 1;

    // Count mathematical symbols
    const mathSymbols = (problem.match(/[×÷±∑∫√π]/g) || []).length;
    score += mathSymbols * 0.5;

    return Math.max(1, Math.min(13, score));
  }

  verifyGrade(problem: string, subject: string, userGrade: string): {
    isAppropriate: boolean;
    difficulty: string;
    message: string;
    estimatedGrade: number;
  } {
    const estimatedDifficulty = this.estimateDifficulty(problem);
    const userGradeLevel = this.gradeMap[userGrade] || 9;

    const difficultyLevels = {
      'elementary': { min: 1, max: 5, label: 'Elementary' },
      'middle-school': { min: 6, max: 8, label: 'Middle School' },
      'high-school': { min: 9, max: 12, label: 'High School' },
      'college': { min: 13, max: 13, label: 'College' },
    };

    let difficultyLabel = 'High School';
    const entries = [
      ['elementary', { min: 1, max: 5, label: 'Elementary' }],
      ['middle-school', { min: 6, max: 8, label: 'Middle School' }],
      ['high-school', { min: 9, max: 12, label: 'High School' }],
      ['college', { min: 13, max: 13, label: 'College' }],
    ];
    
    for (const [key, range] of entries) {
      if (estimatedDifficulty >= (range as any).min && estimatedDifficulty <= (range as any).max) {
        difficultyLabel = (range as any).label;
        break;
      }
    }

    const difference = Math.abs(estimatedDifficulty - userGradeLevel);
    const isAppropriate = difference <= 1.5; // Allow 1.5 grade levels difference

    let message = '';
    if (isAppropriate) {
      message = `✓ Perfect! This problem is appropriate for Grade ${userGrade} level.`;
    } else if (estimatedDifficulty < userGradeLevel - 1.5) {
      message = `This problem appears easier than typical for Grade ${userGrade}. Consider a more challenging one.`;
    } else {
      message = `This problem appears harder than typical for Grade ${userGrade}. You might find it challenging!`;
    }

    return {
      isAppropriate,
      difficulty: difficultyLabel,
      message,
      estimatedGrade: Math.round(estimatedDifficulty * 10) / 10,
    };
  }
}
