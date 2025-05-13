const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

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
}

// Build the webview bundle
esbuild.build({
  entryPoints: ['./src/webview.tsx'],
  bundle: true,
  outfile: './out/webview.js',
  platform: 'browser',
  sourcemap: true,
  minify: true,
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  define: { 'process.env.NODE_ENV': '"production"' },
}).then(() => {
  // Copy assets folder to out directory
  console.log('Copying assets to output directory...');
  copyDirectory('./assets', './out/assets');
  console.log('Assets copied successfully!');
}).catch(() => process.exit(1));
