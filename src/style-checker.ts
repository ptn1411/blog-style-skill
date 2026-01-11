/**
 * Style Checker
 * Validates blog content against style rules
 * Requirements: 2.3, 2.5, 2.6
 */

/**
 * Marketing phrases blacklist - phrases to avoid in blog content
 * Based on rules/marketing_blacklist.md
 */
export const MARKETING_BLACKLIST = [
  // Superlatives
  'số 1', 'tốt nhất', 'hoàn hảo', 'đỉnh cao', 'không thể tin được',
  'tuyệt vời nhất', 'xuất sắc nhất', 'hàng đầu', 'duy nhất', 'độc nhất vô nhị',
  // Hype Words
  'cách mạng', 'đột phá', 'siêu việt', 'phi thường', 'thần kỳ',
  'kỳ diệu', 'bùng nổ', 'viral', 'game-changer', 'disruptive',
  // Empty Promises
  'đảm bảo thành công', 'chắc chắn hiệu quả', 'không thể thất bại',
  '100% hiệu quả', 'cam kết kết quả', 'đảm bảo 100%',
  // Urgency Phrases
  'ngay bây giờ', 'đừng bỏ lỡ', 'cơ hội cuối cùng', 'chỉ còn hôm nay',
  'nhanh tay', 'số lượng có hạn', 'ưu đãi đặc biệt',
  // Vague Qualifiers
  'rất nhiều', 'cực kỳ', 'vô cùng', 'siêu', 'mega', 'khủng', 'đỉnh', 'max',
  // Sales Language
  'mua ngay', 'đăng ký ngay', 'click here', 'free trial',
  'giảm giá sốc', 'khuyến mãi khủng', 'deal hot',
  // Overused Tech Buzzwords
  'ai-powered', 'next-gen', 'cutting-edge', 'state-of-the-art',
  'world-class', 'enterprise-grade'
] as const;

export interface MarketingPhraseResult {
  valid: boolean;
  foundPhrases: Array<{
    phrase: string;
    lineNumber: number;
    context: string;
  }>;
}

export interface LanguageCompositionResult {
  valid: boolean;
  vietnameseRatio: number;
  totalChars: number;
  vietnameseChars: number;
}

export interface SentenceLengthResult {
  valid: boolean;
  errors: string[];
  invalidSentences: Array<{
    sentence: string;
    wordCount: number;
    lineNumber: number;
    reason: 'too_short' | 'too_long';
  }>;
}

export interface StyleCheckResult {
  valid: boolean;
  marketingPhrases: MarketingPhraseResult;
  languageComposition: LanguageCompositionResult;
  sentenceLength: SentenceLengthResult;
  errors: string[];
  warnings: string[];
}

/**
 * Minimum and maximum words per sentence
 */
export const MIN_SENTENCE_WORDS = 5;
export const MAX_SENTENCE_WORDS = 50;

/**
 * Minimum Vietnamese character ratio
 */
export const MIN_VIETNAMESE_RATIO = 0.8;


/**
 * Checks content for marketing phrases from the blacklist
 * Requirement: 2.3
 */
export function checkMarketingPhrases(content: string): MarketingPhraseResult {
  const foundPhrases: Array<{
    phrase: string;
    lineNumber: number;
    context: string;
  }> = [];

  const lines = content.split('\n');
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const lowerLine = line.toLowerCase();

    for (const phrase of MARKETING_BLACKLIST) {
      const lowerPhrase = phrase.toLowerCase();
      if (lowerLine.includes(lowerPhrase)) {
        foundPhrases.push({
          phrase,
          lineNumber: i + 1,
          context: line.trim().substring(0, 100) + (line.length > 100 ? '...' : '')
        });
      }
    }
  }

  return {
    valid: foundPhrases.length === 0,
    foundPhrases
  };
}

/**
 * Vietnamese character ranges (including diacritics)
 */
const VIETNAMESE_CHAR_PATTERN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐa-zA-Z]/g;

/**
 * Checks language composition - Vietnamese should be >80%
 * Requirement: 2.5
 */
export function checkLanguageComposition(content: string): LanguageCompositionResult {
  // Remove code blocks from analysis
  const contentWithoutCode = removeCodeBlocks(content);
  
  // Remove markdown syntax, URLs, and special characters
  const cleanContent = contentWithoutCode
    .replace(/```[\s\S]*?```/g, '') // Remove any remaining code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text, remove URL
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/[#*_\-\[\](){}|>]/g, '') // Remove markdown syntax
    .replace(/\d+/g, ''); // Remove numbers

  // Count Vietnamese characters (including basic Latin used in Vietnamese)
  const vietnameseMatches = cleanContent.match(VIETNAMESE_CHAR_PATTERN);
  const vietnameseChars = vietnameseMatches ? vietnameseMatches.length : 0;

  // Count total alphabetic characters
  const totalAlphaMatches = cleanContent.match(/[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/g);
  const totalChars = totalAlphaMatches ? totalAlphaMatches.length : 0;

  if (totalChars === 0) {
    return {
      valid: true, // No text to validate
      vietnameseRatio: 1,
      totalChars: 0,
      vietnameseChars: 0
    };
  }

  const vietnameseRatio = vietnameseChars / totalChars;

  return {
    valid: vietnameseRatio >= MIN_VIETNAMESE_RATIO,
    vietnameseRatio,
    totalChars,
    vietnameseChars
  };
}


/**
 * Splits text into sentences
 * Handles Vietnamese and English sentence endings
 */
export function splitIntoSentences(text: string): Array<{ sentence: string; lineNumber: number }> {
  const sentences: Array<{ sentence: string; lineNumber: number }> = [];
  const lines = text.split('\n');
  let inCodeBlock = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];

    // Skip code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Skip headings, list items, and empty lines
    const trimmedLine = line.trim();
    if (trimmedLine === '' || 
        trimmedLine.startsWith('#') || 
        /^[-*+]\s/.test(trimmedLine) ||
        /^\d+\.\s/.test(trimmedLine)) {
      continue;
    }

    // Split by sentence-ending punctuation
    // Handle: . ! ? and Vietnamese sentence endings
    const sentencePattern = /[^.!?]+[.!?]+/g;
    const matches = trimmedLine.match(sentencePattern);

    if (matches) {
      for (const match of matches) {
        const cleaned = match.trim();
        if (cleaned.length > 0) {
          sentences.push({
            sentence: cleaned,
            lineNumber: lineIdx + 1
          });
        }
      }
    } else if (trimmedLine.length > 0) {
      // Line without sentence-ending punctuation - treat as single sentence
      sentences.push({
        sentence: trimmedLine,
        lineNumber: lineIdx + 1
      });
    }
  }

  return sentences;
}

/**
 * Counts words in a sentence
 */
export function countWords(sentence: string): number {
  // Remove punctuation and split by whitespace
  const cleaned = sentence
    .replace(/[.!?,;:'"()[\]{}]/g, ' ')
    .trim();
  
  if (cleaned === '') return 0;
  
  const words = cleaned.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Checks sentence length - should be between 5 and 50 words
 * Requirement: 2.6
 */
export function checkSentenceLength(content: string): SentenceLengthResult {
  const errors: string[] = [];
  const invalidSentences: Array<{
    sentence: string;
    wordCount: number;
    lineNumber: number;
    reason: 'too_short' | 'too_long';
  }> = [];

  const sentences = splitIntoSentences(content);

  for (const { sentence, lineNumber } of sentences) {
    const wordCount = countWords(sentence);

    // Skip very short fragments that might be titles or labels
    if (wordCount === 0) continue;

    if (wordCount < MIN_SENTENCE_WORDS) {
      invalidSentences.push({
        sentence: sentence.substring(0, 80) + (sentence.length > 80 ? '...' : ''),
        wordCount,
        lineNumber,
        reason: 'too_short'
      });
      errors.push(
        `Sentence at line ${lineNumber} has ${wordCount} words (min ${MIN_SENTENCE_WORDS}): "${sentence.substring(0, 50)}..."`
      );
    } else if (wordCount > MAX_SENTENCE_WORDS) {
      invalidSentences.push({
        sentence: sentence.substring(0, 80) + (sentence.length > 80 ? '...' : ''),
        wordCount,
        lineNumber,
        reason: 'too_long'
      });
      errors.push(
        `Sentence at line ${lineNumber} has ${wordCount} words (max ${MAX_SENTENCE_WORDS}): "${sentence.substring(0, 50)}..."`
      );
    }
  }

  return {
    valid: invalidSentences.length === 0,
    errors,
    invalidSentences
  };
}

/**
 * Removes code blocks from content for text analysis
 */
function removeCodeBlocks(content: string): string {
  return content.replace(/```[\s\S]*?```/g, '');
}

/**
 * Full style check combining all validations
 */
export function checkStyle(content: string): StyleCheckResult {
  const marketingPhrases = checkMarketingPhrases(content);
  const languageComposition = checkLanguageComposition(content);
  const sentenceLength = checkSentenceLength(content);

  const errors: string[] = [];
  const warnings: string[] = [];

  if (!marketingPhrases.valid) {
    for (const found of marketingPhrases.foundPhrases) {
      errors.push(`Marketing phrase "${found.phrase}" found at line ${found.lineNumber}`);
    }
  }

  if (!languageComposition.valid) {
    errors.push(
      `Vietnamese content ratio is ${(languageComposition.vietnameseRatio * 100).toFixed(1)}% (minimum ${MIN_VIETNAMESE_RATIO * 100}%)`
    );
  }

  if (!sentenceLength.valid) {
    errors.push(...sentenceLength.errors);
  }

  return {
    valid: marketingPhrases.valid && languageComposition.valid && sentenceLength.valid,
    marketingPhrases,
    languageComposition,
    sentenceLength,
    errors,
    warnings
  };
}
