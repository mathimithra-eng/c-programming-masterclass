const fs = require('fs');
const file = 'c:/Users/acer/Downloads/C-Enhanced-Updated/C-Enhanced-Updated/src/pages/CCourse.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Grid items (ensure we only apply in CCourse and after line ~1850. Actually, applying everywhere is fine, previous chats show it's standard)
let blocks = content.split('grid md:grid-cols-2 gap-6">');
for(let i=1; i<blocks.length; i++) {
    // We only want to replace if the children are actually <div> (some might be <div className="min-w-0"> already)
    // Find first <div>
    let block = blocks[i];
    block = block.replace(/^\s*<div>/, (m) => m.replace('<div>', '<div className="min-w-0">'));
    
    // Find second <div> after a </div>
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
// We search for `<div className="... overflow-x-auto">` followed by a title `<div>`, followed by `<div className="flex flex-col items-center">`
// Note: Some titles might have different classes.
// This regex matches the container, the title, and the flex container:
const wrapperRgx = /(<div className="mt-\d bg-black\/30 rounded-lg p-[34] overflow-x-auto">\s*<div[^>]*>[^<]*<\/div>\s*)<div className="flex flex-col items-center">/g;

content = content.replace(wrapperRgx, '$1<div className="flex flex-col items-center min-w-max mx-auto px-2">');

fs.writeFileSync(file, content, 'utf8');
console.log('Script completed successfully!');
