const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'pages', 'student', 'DoubtsPage.jsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

// Find the line that has the real import
let startIdx = -1;
for (let i = 100; i < lines.length; i++) {
  if (lines[i].trim().startsWith('import { useEffect, useState, useRef }')) {
    startIdx = i;
    break;
  }
}

if (startIdx !== -1) {
  const newContent = lines.slice(startIdx).join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Cleaned DoubtsPage.jsx! Removed ${startIdx} lines. Remaining: ${lines.length - startIdx} lines.`);
} else {
  console.error('Could not locate import line after line 100');
}
