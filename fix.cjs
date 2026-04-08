const fs = require('fs');
const file = 'c:/Users/acer/Downloads/C-Enhanced-Updated/C-Enhanced-Updated/src/pages/CCourse.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Grid items
let blocks = content.split('grid md:grid-cols-2 gap-6">');
for(let i=1; i<blocks.length; i++) {
    let block = blocks[i];
    block = block.replace(/^\s*<div>/, (m) => m.replace('<div>', '<div className="min-w-0">'));
    block = block.replace(/<\/div>\s*<div>/, (m) => m.replace('<div>', '<div className="min-w-0">'));
    blocks[i] = block;
}
content = blocks.join('grid md:grid-cols-2 gap-6">');

// 2. Pre tags
content = content.replace(/<pre className="([^"]+)"/g, (match, p1) => {
    if (!p1.includes('overflow-x-auto') && !p1.includes('whitespace-pre-wrap') && !p1.includes('whitespace-pre')) {
        return '<pre className="' + p1 + ' overflow-x-auto"';
    }
    return match;
});

// 3. Flowcharts/visualizations outer wrapper
content = content.replace(/<div className="(mt-\d bg-black\/30 rounded-lg p-[34])">/g, 
    '<div className="$1 overflow-x-auto">');

// 4. Flowcharts inner min-w-max wrapper
const wrapperRgx = /(<div className="mt-\d bg-black\/30 rounded-lg p-[34] overflow-x-auto">\s*<div[^>]*>[^<]*<\/div>\s*)<div className="flex flex-col items-center">/g;

content = content.replace(wrapperRgx, '$1<div className="flex flex-col items-center min-w-max mx-auto px-2">');

fs.writeFileSync(file, content, 'utf8');
console.log('Script completed successfully!');
