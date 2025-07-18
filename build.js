const fs = require('fs');
const path = require('path');

// Create public directory
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir);

// Copy main files
const filesToCopy = ['index.html', 'styles.css', 'script.js'];
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(publicDir, file));
        console.log(`Copied ${file}`);
    }
});

// Copy assets directory
const assetsDir = path.join(__dirname, 'assets');
const publicAssetsDir = path.join(publicDir, 'assets');

function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) return;

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

if (fs.existsSync(assetsDir)) {
    copyDirectory(assetsDir, publicAssetsDir);
    console.log('Copied assets directory');
}

console.log('Build completed successfully!');
