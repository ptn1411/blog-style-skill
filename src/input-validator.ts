/**
 * Input Validator
 * Validates blog input topics and detects technology keywords
 * Requirements: 1.1, 1.2, 1.3
 */

/**
 * Common technology/programming related keywords
 */
export const TECHNOLOGY_KEYWORDS = [
  // Programming languages
  'javascript', 'typescript', 'python', 'java', 'go', 'rust', 'c++', 'c#',
  'ruby', 'php', 'swift', 'kotlin', 'scala', 'elixir', 'haskell',
  // Frameworks & Libraries
  'react', 'vue', 'angular', 'nextjs', 'nuxt', 'express', 'nestjs', 'fastapi',
  'django', 'flask', 'spring', 'rails', 'laravel', 'svelte',
  // Technologies
  'api', 'rest', 'graphql', 'websocket', 'grpc', 'microservices', 'serverless',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'cloud',
  // Databases
  'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
  // Concepts
  'algorithm', 'data structure', 'design pattern', 'architecture', 'testing',
  'ci/cd', 'devops', 'agile', 'scrum', 'git', 'version control',
  // Vietnamese tech terms
  'lập trình', 'code', 'coding', 'backend', 'frontend', 'fullstack',
  'database', 'server', 'deploy', 'debug', 'refactor'
] as const;

export type InputErrorType = 'EmptyInput' | 'WhitespaceOnly' | 'TooShort';

export interface InputValidationResult {
  valid: boolean;
  error?: {
    type: InputErrorType;
    message: string;
  };
  isTechnical: boolean;
  detectedKeywords: string[];
}

/**
 * Error messages as defined in design document
 */
const ERROR_MESSAGES: Record<InputErrorType, string> = {
  EmptyInput: 'Vui lòng cung cấp chủ đề hoặc tiêu đề cho bài blog',
  WhitespaceOnly: 'Chủ đề không hợp lệ. Vui lòng nhập nội dung cụ thể',
  TooShort: 'Chủ đề quá ngắn. Vui lòng mô tả chi tiết hơn'
};

/**
 * Validates that input is not empty or null
 */
export function isEmptyInput(input: string | null | undefined): boolean {
  return input === null || input === undefined || input === '';
}

/**
 * Validates that input is not whitespace-only
 */
export function isWhitespaceOnly(input: string): boolean {
  return input.trim() === '';
}

/**
 * Validates that input meets minimum length requirement
 */
export function isTooShort(input: string): boolean {
  return input.trim().length < 3;
}

/**
 * Detects technology/programming keywords in input
 */
export function detectTechnologyKeywords(input: string): string[] {
  const lowerInput = input.toLowerCase();
  const detected: string[] = [];

  for (const keyword of TECHNOLOGY_KEYWORDS) {
    // Use word boundary matching for more accurate detection
    const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'i');
    if (regex.test(lowerInput)) {
      detected.push(keyword);
    }
  }

  return detected;
}

/**
 * Checks if input contains technology-related content
 */
export function isTechnicalContent(input: string): boolean {
  return detectTechnologyKeywords(input).length > 0;
}

/**
 * Main validation function for blog input
 * Returns validation result with error details if invalid
 */
export function validateInput(input: string | null | undefined): InputValidationResult {
  // Check for empty/null input
  if (isEmptyInput(input)) {
    return {
      valid: false,
      error: {
        type: 'EmptyInput',
        message: ERROR_MESSAGES.EmptyInput
      },
      isTechnical: false,
      detectedKeywords: []
    };
  }

  const inputStr = input as string;

  // Check for whitespace-only input
  if (isWhitespaceOnly(inputStr)) {
    return {
      valid: false,
      error: {
        type: 'WhitespaceOnly',
        message: ERROR_MESSAGES.WhitespaceOnly
      },
      isTechnical: false,
      detectedKeywords: []
    };
  }

  // Check for too short input
  if (isTooShort(inputStr)) {
    return {
      valid: false,
      error: {
        type: 'TooShort',
        message: ERROR_MESSAGES.TooShort
      },
      isTechnical: false,
      detectedKeywords: []
    };
  }

  // Input is valid - detect technology keywords
  const detectedKeywords = detectTechnologyKeywords(inputStr);

  return {
    valid: true,
    isTechnical: detectedKeywords.length > 0,
    detectedKeywords
  };
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
