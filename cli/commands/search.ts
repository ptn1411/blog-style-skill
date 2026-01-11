/**
 * Search command - Search through all data sources
 */

import chalk from 'chalk';
import { loadData, DataType } from '../utils/data-loader';

interface SearchOptions {
  type?: string;
  json?: boolean;
}

interface SearchResult {
  type: DataType;
  id: string;
  name: string;
  nameVi?: string;
  description?: string;
  match: string;
}

export async function search(query: string, options: SearchOptions): Promise<void> {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  const filterType = options.type as DataType | undefined;

  // Search styles
  if (!filterType || filterType === 'style') {
    const styles = await loadData('style');
    for (const style of styles) {
      if (matchesQuery(style, queryLower)) {
        results.push({
          type: 'style',
          id: style.id,
          name: style.name,
          nameVi: style.nameVi,
          description: style.description,
          match: findMatchField(style, queryLower)
        });
      }
    }
  }

  // Search tones
  if (!filterType || filterType === 'tone') {
    const tones = await loadData('tone');
    for (const tone of tones) {
      if (matchesQuery(tone, queryLower)) {
        results.push({
          type: 'tone',
          id: tone.id,
          name: tone.name,
          nameVi: tone.nameVi,
          description: tone.description,
          match: findMatchField(tone, queryLower)
        });
      }
    }
  }

  // Search structures
  if (!filterType || filterType === 'structure') {
    const structures = await loadData('structure');
    for (const structure of structures) {
      if (matchesQuery(structure, queryLower)) {
        results.push({
          type: 'structure',
          id: structure.id,
          name: structure.name,
          nameVi: structure.nameVi,
          match: findMatchField(structure, queryLower)
        });
      }
    }
  }

  // Search industries
  if (!filterType || filterType === 'industry') {
    const industries = await loadData('industry');
    for (const industry of industries) {
      if (matchesQuery(industry, queryLower)) {
        results.push({
          type: 'industry',
          id: industry.id,
          name: industry.name,
          match: findMatchField(industry, queryLower)
        });
      }
    }
  }

  // Output results
  if (options.json) {
    console.log(JSON.stringify({ query, total: results.length, results }, null, 2));
    return;
  }

  if (results.length === 0) {
    console.log(chalk.yellow(`\n❌ No results found for: "${query}"\n`));
    return;
  }

  console.log(chalk.cyan(`\n🔍 Search Results for: "${query}"`));
  console.log(chalk.gray(`   Found ${results.length} matches\n`));

  const grouped = groupByType(results);

  if (grouped.style?.length) {
    console.log(chalk.bold('📝 Writing Styles:'));
    for (const item of grouped.style) {
      console.log(chalk.green(`   • ${item.name}`) + chalk.gray(` (${item.nameVi})`));
      if (item.description) {
        console.log(chalk.gray(`     ${item.description}`));
      }
    }
    console.log();
  }

  if (grouped.tone?.length) {
    console.log(chalk.bold('🎭 Tones:'));
    for (const item of grouped.tone) {
      console.log(chalk.green(`   • ${item.name}`) + chalk.gray(` (${item.nameVi})`));
      if (item.description) {
        console.log(chalk.gray(`     ${item.description}`));
      }
    }
    console.log();
  }

  if (grouped.structure?.length) {
    console.log(chalk.bold('📋 Blog Structures:'));
    for (const item of grouped.structure) {
      console.log(chalk.green(`   • ${item.name}`) + chalk.gray(` (${item.nameVi})`));
    }
    console.log();
  }

  if (grouped.industry?.length) {
    console.log(chalk.bold('🏢 Industries:'));
    for (const item of grouped.industry) {
      console.log(chalk.green(`   • ${item.name}`));
    }
    console.log();
  }
}

function matchesQuery(item: any, query: string): boolean {
  const searchFields = [
    item.id,
    item.name,
    item.nameVi,
    item.description,
    ...(item.characteristics || []),
    ...(item.bestFor || []),
    ...(item.topics || []),
    ...(item.keywords || [])
  ];

  return searchFields.some(field => 
    field && String(field).toLowerCase().includes(query)
  );
}

function findMatchField(item: any, query: string): string {
  const fields = ['name', 'nameVi', 'description', 'id'];
  for (const field of fields) {
    if (item[field] && String(item[field]).toLowerCase().includes(query)) {
      return field;
    }
  }
  return 'other';
}

function groupByType(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);
}
