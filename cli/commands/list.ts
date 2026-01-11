/**
 * List command - List all available data
 */

import chalk from 'chalk';
import { loadData, DataType } from '../utils/data-loader';

interface ListOptions {
  json?: boolean;
}

export async function list(type: string | undefined, options: ListOptions): Promise<void> {
  const validTypes: DataType[] = ['style', 'tone', 'structure', 'industry', 'blacklist'];
  
  if (type && !validTypes.includes(type as DataType)) {
    console.log(chalk.red(`\n❌ Invalid type: "${type}"`));
    console.log(chalk.gray(`   Valid types: ${validTypes.join(', ')}\n`));
    return;
  }

  const typesToList = type ? [type as DataType] : validTypes;
  const allData: Record<string, any[]> = {};

  for (const t of typesToList) {
    allData[t] = await loadData(t);
  }

  if (options.json) {
    console.log(JSON.stringify(allData, null, 2));
    return;
  }

  console.log(chalk.cyan('\n📚 AI Blog Style Skill - Available Data\n'));

  // Styles
  if (allData.style?.length) {
    console.log(chalk.bold.blue('📝 Writing Styles') + chalk.gray(` (${allData.style.length})`));
    console.log(chalk.gray('─'.repeat(50)));
    for (const style of allData.style) {
      console.log(chalk.green(`  ${style.id.padEnd(15)}`), chalk.white(style.name), chalk.gray(`(${style.nameVi})`));
      console.log(chalk.gray(`  ${''.padEnd(15)} ${style.description}`));
      console.log(chalk.gray(`  ${''.padEnd(15)} Best for: ${style.bestFor.join(', ')}`));
      console.log();
    }
  }

  // Tones
  if (allData.tone?.length) {
    console.log(chalk.bold.magenta('🎭 Tone Variations') + chalk.gray(` (${allData.tone.length})`));
    console.log(chalk.gray('─'.repeat(50)));
    for (const tone of allData.tone) {
      console.log(chalk.green(`  ${tone.id.padEnd(15)}`), chalk.white(tone.name), chalk.gray(`(${tone.nameVi})`));
      console.log(chalk.gray(`  ${''.padEnd(15)} ${tone.description}`));
      console.log();
    }
  }

  // Structures
  if (allData.structure?.length) {
    console.log(chalk.bold.yellow('📋 Blog Structures') + chalk.gray(` (${allData.structure.length})`));
    console.log(chalk.gray('─'.repeat(50)));
    for (const structure of allData.structure) {
      console.log(chalk.green(`  ${structure.id.padEnd(15)}`), chalk.white(structure.name), chalk.gray(`(${structure.nameVi})`));
      console.log(chalk.gray(`  ${''.padEnd(15)} Sections: ${structure.sectionsVi.join(' → ')}`));
      console.log(chalk.gray(`  ${''.padEnd(15)} Best for: ${structure.bestFor.join(', ')}`));
      console.log();
    }
  }

  // Industries
  if (allData.industry?.length) {
    console.log(chalk.bold.cyan('🏢 Industry Templates') + chalk.gray(` (${allData.industry.length})`));
    console.log(chalk.gray('─'.repeat(50)));
    for (const industry of allData.industry) {
      console.log(chalk.green(`  ${industry.id.padEnd(15)}`), chalk.white(industry.name));
      console.log(chalk.gray(`  ${''.padEnd(15)} Topics: ${industry.topics.slice(0, 3).join(', ')}...`));
      console.log(chalk.gray(`  ${''.padEnd(15)} Tone: ${industry.tone}`));
      console.log();
    }
  }

  // Blacklist
  if (allData.blacklist?.length) {
    console.log(chalk.bold.red('🚫 Marketing Blacklist') + chalk.gray(` (${allData.blacklist.length} categories)`));
    console.log(chalk.gray('─'.repeat(50)));
    for (const category of allData.blacklist) {
      console.log(chalk.red(`  ${category.category.padEnd(20)}`), chalk.gray(category.description));
      console.log(chalk.gray(`  ${''.padEnd(20)} Examples: ${category.phrases.slice(0, 5).join(', ')}...`));
      console.log();
    }
  }

  // Summary
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.bold('\n📊 Summary:'));
  console.log(chalk.gray(`   • ${allData.style?.length || 0} Writing Styles`));
  console.log(chalk.gray(`   • ${allData.tone?.length || 0} Tone Variations`));
  console.log(chalk.gray(`   • ${allData.structure?.length || 0} Blog Structures`));
  console.log(chalk.gray(`   • ${allData.industry?.length || 0} Industry Templates`));
  console.log(chalk.gray(`   • ${allData.blacklist?.length || 0} Blacklist Categories\n`));
}
