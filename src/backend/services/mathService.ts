import { HomeworkResponse } from '../types/index';

export class MathService {
  private normalizeInput(problem: string): string {
    // Convert natural language to math operators
    let normalized = problem.toLowerCase();
    normalized = normalized.replace(/\bplus\b/g, '+');
    normalized = normalized.replace(/\bminus\b/g, '-');
    normalized = normalized.replace(/\btimes\b/g, '*');
    normalized = normalized.replace(/\bmultiplied by\b/g, '*');
    normalized = normalized.replace(/\bdivided by\b/g, '/');
    normalized = normalized.replace(/\bdiv\b/g, '/');
    normalized = normalized.replace(/\bsquared\b/g, '^2');
    normalized = normalized.replace(/\bcubed\b/g, '^3');
    // Remove common question words
    normalized = normalized.replace(/^(what is|calculate|solve|find|explain)\s+/i, '');
    // Insert * for implicit multiplication (e.g., 9(9+9) => 9*(9+9), (2+3)(4+5) => (2+3)*(4+5))
    normalized = normalized.replace(/(\d)\s*\(/g, '$1*(');
    normalized = normalized.replace(/\)\s*(\d)/g, ')*$1');
    normalized = normalized.replace(/\)\s*\(/g, ')*(');
    return normalized.trim();
  }

  private evaluateExpression(expr: string): number {
    try {
      expr = expr.replace(/\s/g, '');
      while (expr.includes('^')) {
        const match = expr.match(/(\d+\.?\d*)\^(\d+\.?\d*)/);
        if (match) {
          const base = parseFloat(match[1]);
          const exp = parseFloat(match[2]);
          const result = Math.pow(base, exp);
          expr = expr.replace(match[0], result.toString());
        } else break;
      }
      return Function('"use strict"; return (' + expr + ')')();
    } catch {
      return NaN;
    }
  }

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  solve(problem: string): HomeworkResponse {
    const normalized = this.normalizeInput(problem);
    let solution = '';
    let explanation = '';

    // Square root: √16, square root of 16
    const sqrtMatch = normalized.match(/(?:square root of|sqrt|√)\s*(\d+\.?\d*)/i);
    if (sqrtMatch) {
      const num = parseFloat(sqrtMatch[1]);
      const result = Math.sqrt(num);
      solution = result.toString();
      explanation = `The square root of ${num} is ${result}.\n`;
      if (Number.isInteger(result)) {
        explanation += `This is a perfect square because ${result} × ${result} = ${num}`;
      } else {
        explanation += `This is approximately ${result.toFixed(4)}`;
      }
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Cube root
    const cubeRootMatch = normalized.match(/(?:cube root of|cbrt|∛)\s*(\d+\.?\d*)/i);
    if (cubeRootMatch) {
      const num = parseFloat(cubeRootMatch[1]);
      const result = Math.cbrt(num);
      solution = result.toFixed(4);
      explanation = `The cube root of ${num} is approximately ${result.toFixed(4)}.\n`;
      if (Number.isInteger(result)) {
        explanation += `This is a perfect cube because ${result} × ${result} × ${result} = ${num}`;
      }
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Area of rectangle/square
    if (normalized.match(/area.*rectangle|rectangle.*area/i)) {
      const dimensions = normalized.match(/(\d+\.?\d*).*?(\d+\.?\d*)/);
      if (dimensions) {
        const length = parseFloat(dimensions[1]);
        const width = parseFloat(dimensions[2]);
        const area = length * width;
        solution = area.toString();
        explanation = `Area of rectangle = length × width\nArea = ${length} × ${width} = ${area}`;
        return { solution, explanation, subject: 'math', confidence: 0.9 };
      }
    }

    // Area of circle
    if (normalized.match(/area.*circle|circle.*area/i)) {
      const radiusMatch = normalized.match(/(\d+\.?\d*)/);
      if (radiusMatch) {
        const radius = parseFloat(radiusMatch[1]);
        const area = Math.PI * radius * radius;
        solution = area.toFixed(2);
        explanation = `Area of circle = π × r²\nArea = π × ${radius}² = ${area.toFixed(2)}`;
        return { solution, explanation, subject: 'math', confidence: 0.9 };
      }
    }

    // Perimeter of rectangle
    if (normalized.match(/perimeter.*rectangle|rectangle.*perimeter/i)) {
      const dimensions = normalized.match(/(\d+\.?\d*).*?(\d+\.?\d*)/);
      if (dimensions) {
        const length = parseFloat(dimensions[1]);
        const width = parseFloat(dimensions[2]);
        const perimeter = 2 * (length + width);
        solution = perimeter.toString();
        explanation = `Perimeter = 2 × (length + width)\nPerimeter = 2 × (${length} + ${width}) = ${perimeter}`;
        return { solution, explanation, subject: 'math', confidence: 0.9 };
      }
    }

    // Circumference of circle
    if (normalized.match(/circumference/i)) {
      const radiusMatch = normalized.match(/(\d+\.?\d*)/);
      if (radiusMatch) {
        const radius = parseFloat(radiusMatch[1]);
        const circumference = 2 * Math.PI * radius;
        solution = circumference.toFixed(2);
        explanation = `Circumference = 2 × π × r\nCircumference = 2 × π × ${radius} = ${circumference.toFixed(2)}`;
        return { solution, explanation, subject: 'math', confidence: 0.9 };
      }
    }

    // Algebra: various forms
    // Form 1: ax + b = c (e.g., 2x + 5 = 13)
    let algebraMatch = normalized.match(/(\d*\.?\d*)x\s*([+\-])\s*(\d+\.?\d*)\s*=\s*(\d+\.?\d*)/);
    if (algebraMatch) {
      const a = parseFloat(algebraMatch[1] || '1');
      const op = algebraMatch[2];
      const b = parseFloat(algebraMatch[3]);
      const c = parseFloat(algebraMatch[4]);
      let x: number;
      if (op === '+') {
        x = (c - b) / a;
      } else {
        x = (c + b) / a;
      }
      solution = `x = ${x}`;
      explanation = `To solve ${algebraMatch[0]}:
Step 1: Subtract ${op === '+' ? b : '-' + b} from both sides: ${a}x = ${op === '+' ? c - b : c + b}
Step 2: Divide by ${a}: x = ${x}
Verification: ${a}(${x}) ${op} ${b} = ${c} ✓`;
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Form 2: ax = c (e.g., 2x = 10, x = 5)
    algebraMatch = normalized.match(/(\d*\.?\d*)x\s*=\s*(\d+\.?\d*)/);
    if (algebraMatch) {
      const a = parseFloat(algebraMatch[1] || '1');
      const c = parseFloat(algebraMatch[2]);
      const x = c / a;
      solution = `x = ${x}`;
      explanation = `To solve ${algebraMatch[0]}:
Divide both sides by ${a}: x = ${c}/${a} = ${x}`;
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Form 3: c = ax + b (reversed, e.g., 13 = 2x + 5)
    algebraMatch = normalized.match(/(\d+\.?\d*)\s*=\s*(\d*\.?\d*)x\s*([+\-])\s*(\d+\.?\d*)/);
    if (algebraMatch) {
      const c = parseFloat(algebraMatch[1]);
      const a = parseFloat(algebraMatch[2] || '1');
      const op = algebraMatch[3];
      const b = parseFloat(algebraMatch[4]);
      let x: number;
      if (op === '+') {
        x = (c - b) / a;
      } else {
        x = (c + b) / a;
      }
      solution = `x = ${x}`;
      explanation = `To solve ${algebraMatch[0]}:
Rewrite as: ${a}x ${op} ${b} = ${c}
Step 1: Isolate x: ${a}x = ${op === '+' ? c - b : c + b}
Step 2: Divide by ${a}: x = ${x}`;
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Form 4: Just "x" or asking to solve (extract from problem)
    if (normalized.match(/solve|find x|what is x/i)) {
      // Try to extract equation parts
      const simpleEq = normalized.match(/(\d+\.?\d*)\s*=\s*(\d+\.?\d*)/);
      if (simpleEq) {
        solution = `x = ${simpleEq[2]}`;
        explanation = `The equation simplifies to x = ${simpleEq[2]}`;
        return { solution, explanation, subject: 'math', confidence: 0.85 };
      }
    }

    // Fractions: 1/2 + 1/3
    const fractionMatch = normalized.match(/(\d+)\/(\d+)\s*([+\-*\/])\s*(\d+)\/(\d+)/);
    if (fractionMatch) {
      const num1 = parseInt(fractionMatch[1]);
      const den1 = parseInt(fractionMatch[2]);
      const op = fractionMatch[3];
      const num2 = parseInt(fractionMatch[4]);
      const den2 = parseInt(fractionMatch[5]);
      let resultNum: number, resultDen: number;
      if (op === '+' || op === '-') {
        const lcm = (den1 * den2) / this.gcd(den1, den2);
        const adjustedNum1 = num1 * (lcm / den1);
        const adjustedNum2 = num2 * (lcm / den2);
        resultNum = op === '+' ? adjustedNum1 + adjustedNum2 : adjustedNum1 - adjustedNum2;
        resultDen = lcm;
      } else if (op === '*') {
        resultNum = num1 * num2;
        resultDen = den1 * den2;
      } else {
        resultNum = num1 * den2;
        resultDen = den1 * num2;
      }
      const gcd = this.gcd(Math.abs(resultNum), Math.abs(resultDen));
      resultNum /= gcd;
      resultDen /= gcd;
      solution = `${resultNum}/${resultDen}`;
      explanation = `${num1}/${den1} ${op} ${num2}/${den2} = ${resultNum}/${resultDen} (simplified)`;
      return { solution, explanation, subject: 'math', confidence: 0.92 };
    }

    // Percentages: 20% of 50
    const percentMatch = normalized.match(/(\d+\.?\d*)%\s*of\s*(\d+\.?\d*)/);
    if (percentMatch) {
      const percent = parseFloat(percentMatch[1]);
      const number = parseFloat(percentMatch[2]);
      const result = (percent / 100) * number;
      solution = result.toString();
      explanation = `${percent}% of ${number} = ${percent / 100} × ${number} = ${result}`;
      return { solution, explanation, subject: 'math', confidence: 0.95 };
    }

    // Complex expressions: (5 + 3) * 2, 9(9+9), etc.
    const complexMatch = normalized.match(/^[\d\s+\-*\/()^.]+$/);
    if (complexMatch) {
      const result = this.evaluateExpression(normalized);
      if (!isNaN(result)) {
        solution = result.toString();
        explanation = `Following order of operations (PEMDAS):
${normalized} = ${result}`;
        return { solution, explanation, subject: 'math', confidence: 0.88 };
      }
    }

    // Check for addition
    const addMatch = normalized.match(/([0-9]+)\s*\+\s*([0-9]+)/);
    if (addMatch) {
      const num1 = parseInt(addMatch[1]);
      const num2 = parseInt(addMatch[2]);
      const result = num1 + num2;
      solution = result.toString();
      explanation = `${num1} + ${num2} = ${result}`;
    }
    // Check for subtraction
    else if (normalized.match(/([0-9]+)\s*-\s*([0-9]+)/)) {
      const match = normalized.match(/([0-9]+)\s*-\s*([0-9]+)/);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const result = num1 - num2;
        solution = result.toString();
        explanation = `${num1} - ${num2} = ${result}`;
      }
    }
    // Check for multiplication
    else if (normalized.match(/([0-9]+)\s*\*\s*([0-9]+)/)) {
      const match = normalized.match(/([0-9]+)\s*\*\s*([0-9]+)/);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const result = num1 * num2;
        solution = result.toString();
        explanation = `${num1} × ${num2} = ${result}`;
      }
    }
    // Check for division
    else if (normalized.match(/([0-9]+)\s*\/\s*([0-9]+)/)) {
      const match = normalized.match(/([0-9]+)\s*\/\s*([0-9]+)/);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        if (num2 === 0) {
          solution = 'Cannot divide by zero';
          explanation = 'Division by zero is undefined.';
        } else {
          const result = (num1 / num2).toFixed(2);
          solution = result;
          explanation = `${num1} ÷ ${num2} = ${result}`;
        }
      }
    }
    else {
      solution = 'I can help with math!';
      explanation = `Try asking:
✓ Basic: "10 plus 5", "20 minus 8"
✓ Algebra: "2x + 5 = 13"
✓ Fractions: "1/2 + 1/3"
✓ Percentages: "20% of 50"
✓ Square roots: "√16", "square root of 144"
✓ Complex: "(5 + 3) * 2"
✓ Decimals, Ratios, Exponents`;
    }

    return {
      solution,
      explanation: explanation.trim(),
      subject: 'math',
      confidence: 0.9,
    };
  }
