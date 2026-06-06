import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content
    .replace(/red-500/g, 'teal-400')
    .replace(/red-400/g, 'teal-300')
    .replace(/red-600/g, 'teal-500')
    .replace(/red-900/g, 'teal-900')
    .replace(/red-950/g, 'teal-950')
    .replace(/red-800/g, 'teal-800')
    .replace(/bg-\[#0a0a0a\]/g, 'bg-[#020b12]')
    .replace(/bg-\[#111\]/g, 'bg-[#06141c]')
    .replace(/bg-\[#111827\]/g, 'bg-[#06141c]')
    .replace(/bg-\[#222\]/g, 'bg-[#0a1e28]')
    .replace(/border-white\/5/g, 'border-teal-500\/10')
    .replace(/border-white\/10/g, 'border-teal-500\/20');
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./src');
console.log('Done replacing colors.');
