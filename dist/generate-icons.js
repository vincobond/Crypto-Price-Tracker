const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes needed
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple PNG icon using canvas (for development)
const createIcon = (size) => {
  const canvas = require('canvas');
  const c = canvas.createCanvas(size, size);
  const ctx = c.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0EA5E9';
  ctx.fillRect(0, 0, size, size);
  
  // Draw a simple crypto symbol
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₿', size / 2, size / 2);
  
  return c.toBuffer('image/png');
};

// Generate icons
sizes.forEach(size => {
  try {
    const iconBuffer = createIcon(size);
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    fs.writeFileSync(filepath, iconBuffer);
    console.log(`Generated ${filename}`);
  } catch (error) {
    console.log(`Could not generate icon-${size}x${size}.png:`, error.message);
  }
});

console.log('Icon generation complete!');
