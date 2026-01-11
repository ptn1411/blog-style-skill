/**
 * Validate command - Validate blog posts against style rules
 */

import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { 
  validateBlog, 
  checkStyle, 
  BlogValidationResult, 
  StyleCheckResult 
} from '../../src';

interface ValidateOptions {
  strict?: boolean;
  json?: boolean;
}

interface ValidationReport {
  file: string;
  valid: boolean;
  blog: BlogValidationResult;
  style: StyleCheckResult;
  summary: {
    errors: number;
    warnings: number;
  };
}

export async function validate(file: string, options: ValidateOptions): Promise<void> {
  // Check if file exists
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`\n❌ File not found: ${file}\n`));
    process.exit(1);
  }

  // Read file content
  const content = fs.readFileSync(filePath, 'utf-8');

  // Run validations
  const blogResult = validateBlog(content);
  const styleResult = checkStyle(content);

  const report: ValidationReport = {
    file: file,
    valid: blogResult.valid && styleResult.valid,
    blog: blogResult,
    style: styleResult,
    summary: {
      errors: blogResult.errors.length + styleResult.errors.length,
      warnings: blogResult.warnings.length + styleResult.warnings.length
    }
  };

  // JSON output
  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  // Pretty output
  console.log(chalk.cyan(`\n📄 Validating: ${file}\n`));
  console.log(chalk.gray('─'.repeat(60)));

  // Overall status
  if (report.valid) {
    console.log(chalk.green.bold('\n✅ PASSED - Blog meets all style requirements\n'));
  } else {
    console.log(chalk.red.bold('\n❌ FAILED - Blog has validation issues\n'));
  }

  // Section validation
  console.log(chalk.bold('📋 Section Validation:'));
  if (blogResult.sections.valid) {
    console.log(chalk.green('   ✓ All required sections present'));
  } else {
    console.log(chalk.red('   ✗ Missing sections:'));
    for (const section of blogResult.sections.missingSections) {
      console.log(chalk.red(`     - ${section}`));
    }
  }
  console.log(chalk.gray(`   Present: ${blogResult.sections.presentSections.join(', ')}`));
  console.log();

  // Heading validation
  console.log(chalk.bold('📑 Heading Validation:'));
  if (blogResult.headings.valid) {
    console.log(chalk.green('   ✓ Valid heading structure'));
  } else {
    for (const error of blogResult.headings.errors) {
      console.log(chalk.red(`   ✗ ${error}`));
    }
  }
  for (const warning of blogResult.headings.warnings) {
    console.log(chalk.yellow(`   ⚠ ${warning}`));
  }
  console.log(chalk.gray(`   H1: ${blogResult.headings.hasH1Title ? 'Yes' : 'No'}, H2 count: ${blogResult.headings.h2Count}`));
  console.log();

  // Paragraph validation
  console.log(chalk.bold('📝 Paragraph Validation:'));
  if (blogResult.paragraphs.valid) {
    console.log(chalk.green('   ✓ All paragraphs within 5 lines'));
  } else {
    console.log(chalk.red(`   ✗ ${blogResult.paragraphs.longParagraphs.length} paragraph(s) too long:`));
    for (const p of blogResult.paragraphs.longParagraphs.slice(0, 3)) {
      console.log(chalk.red(`     Line ${p.lineNumber}: ${p.lineCount} lines - "${p.preview}"`));
    }
  }
  console.log();

  // Code block validation
  console.log(chalk.bold('💻 Code Block Validation:'));
  if (blogResult.codeBlocks.valid) {
    console.log(chalk.green('   ✓ All code blocks have language identifiers'));
  } else {
    for (const error of blogResult.codeBlocks.errors) {
      console.log(chalk.red(`   ✗ ${error}`));
    }
  }
  console.log(chalk.gray(`   Code blocks found: ${blogResult.codeBlocks.codeBlocks.length}`));
  console.log();

  // Marketing phrases
  console.log(chalk.bold('🚫 Marketing Phrase Check:'));
  if (styleResult.marketingPhrases.valid) {
    console.log(chalk.green('   ✓ No marketing phrases found'));
  } else {
    console.log(chalk.red(`   ✗ Found ${styleResult.marketingPhrases.foundPhrases.length} marketing phrase(s):`));
    for (const phrase of styleResult.marketingPhrases.foundPhrases.slice(0, 5)) {
      console.log(chalk.red(`     Line ${phrase.lineNumber}: "${phrase.phrase}"`));
    }
  }
  console.log();

  // Language composition
  console.log(chalk.bold('🌐 Language Composition:'));
  const ratio = (styleResult.languageComposition.vietnameseRatio * 100).toFixed(1);
  if (styleResult.languageComposition.valid) {
    console.log(chalk.green(`   ✓ Vietnamese ratio: ${ratio}% (min 80%)`));
  } else {
    console.log(chalk.red(`   ✗ Vietnamese ratio: ${ratio}% (min 80%)`));
  }
  console.log();

  // Sentence length
  console.log(chalk.bold('📏 Sentence Length:'));
  if (styleResult.sentenceLength.valid) {
    console.log(chalk.green('   ✓ All sentences within 5-50 words'));
  } else {
    console.log(chalk.red(`   ✗ ${styleResult.sentenceLength.invalidSentences.length} sentence(s) out of range:`));
    for (const s of styleResult.sentenceLength.invalidSentences.slice(0, 3)) {
      const reason = s.reason === 'too_short' ? 'too short' : 'too long';
      console.log(chalk.red(`     Line ${s.lineNumber}: ${s.wordCount} words (${reason})`));
    }
  }
  console.log();

  // Summary
  console.log(chalk.gray('─'.repeat(60)));
  console.log(chalk.bold('\n📊 Summary:'));
  console.log(chalk.red(`   Errors: ${report.summary.errors}`));
  console.log(chalk.yellow(`   Warnings: ${report.summary.warnings}`));
  console.log();

  // Exit code
  if (!report.valid && options.strict) {
    process.exit(1);
  }
}
