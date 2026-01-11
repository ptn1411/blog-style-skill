/**
 * Data Loader - Load JSON data files
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export type DataType = 'style' | 'tone' | 'structure' | 'industry' | 'blacklist';

const DATA_FILES: Record<DataType, string> = {
  style: 'writing-styles.json',
  tone: 'tone-variations.json',
  structure: 'blog-structures.json',
  industry: 'industry-templates.json',
  blacklist: 'marketing-blacklist.json'
};

const DATA_KEYS: Record<DataType, string> = {
  style: 'styles',
  tone: 'tones',
  structure: 'structures',
  industry: 'industries',
  blacklist: 'categories'
};

function getDataDir(): string {
  // Try multiple locations
  const locations = [
    path.resolve(__dirname, '../../.shared/data'),
    path.resolve(process.cwd(), '.shared/data'),
    path.resolve(__dirname, '../../../.shared/data')
  ];

  for (const loc of locations) {
    if (fs.existsSync(loc)) {
      return loc;
    }
  }

  return locations[0];
}

export async function loadData(type: DataType): Promise<any[]> {
  const dataDir = getDataDir();
  const filePath = path.join(dataDir, DATA_FILES[type]);

  if (!fs.existsSync(filePath)) {
    console.warn(`Data file not found: ${filePath}`);
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Handle blacklist differently (it's an object, not array)
    if (type === 'blacklist') {
      const categories = data[DATA_KEYS[type]] || data;
      return Object.entries(categories).map(([key, value]: [string, any]) => ({
        category: key,
        ...value
      }));
    }

    return data[DATA_KEYS[type]] || [];
  } catch (error) {
    console.error(`Error loading ${type} data:`, error);
    return [];
  }
}

export async function loadAllData(): Promise<Record<DataType, any[]>> {
  const result: Record<DataType, any[]> = {
    style: [],
    tone: [],
    structure: [],
    industry: [],
    blacklist: []
  };

  for (const type of Object.keys(DATA_FILES) as DataType[]) {
    result[type] = await loadData(type);
  }

  return result;
}
