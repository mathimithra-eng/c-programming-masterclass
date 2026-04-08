const fs = require('fs');
const content = fs.readFileSync('c:/Users/acer/Downloads/C-Enhanced-Updated/C-Enhanced-Updated/src/pages/CCourse.jsx', 'utf8');
const lines = content.split('\n');

const findings = [];

lines.forEach((line, index) => {
    // 1. Flex items that might need stacking (specifically those with gap and side-by-side elements)
    if (line.includes('flex') && line.includes('gap-') && !line.includes('flex-col') && !line.includes('flex-wrap') && !line.includes('justify-center')) {
        findings.push({ line: index + 1, content: line.trim(), type: 'Flex Row' });
    }
    // 2. Diagrams with fixed or large min-width
    if (line.includes('min-w-[')) {
        findings.push({ line: index + 1, content: line.trim(), type: 'Large Min-Width' });
    }
    // 3. Grid items without min-w-0
    if (line.includes('grid md:grid-cols-2')) {
        let i = index + 1;
        while (i < index + 5 && i < lines.length) {
            if (lines[i].includes('<div>')) {
                findings.push({ line: i + 1, content: lines[i].trim(), type: 'Grid Item missing min-w-0' });
            }
            i++;
        }
    }
});

fs.writeFileSync('c:/Users/acer/Downloads/C-Enhanced-Updated/C-Enhanced-Updated/audit_results.json', JSON.stringify(findings, null, 2));
console.log('Audit complete. Found ' + findings.length + ' potential issues.');
