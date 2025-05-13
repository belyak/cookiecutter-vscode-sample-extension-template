const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  try {
    // Read source directory
    const files = fs.readdirSync(source);

    // Copy each file/directory
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const destPath = path.join(destination, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirectory(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
    console.log(`Copied assets from ${source} to ${destination}`);
  } catch (err) {
    console.error(`Error copying directory ${source} to ${destination}:`, err);
  }
}

// Ensure output directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Copy assets to output directory
const assetsDir = path.join(__dirname, 'assets');
const outAssetsDir = path.join(outDir, 'assets');

copyDirectory(assetsDir, outAssetsDir);
