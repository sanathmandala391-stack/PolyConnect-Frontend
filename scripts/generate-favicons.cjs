const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFavicons() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const src = path.join(publicDir, 'favicon.png');
  
  if (!fs.existsSync(src)) {
    console.error('Source icon not found at:', src);
    process.exit(1);
  }

  // 1. Generate crisp square PNGs for all standard sizes
  const sizes = [48, 96, 144, 180, 192, 512];
  for (const s of sizes) {
    const filename = s === 180 
      ? path.join(publicDir, 'apple-touch-icon.png')
      : path.join(publicDir, `favicon-${s}x${s}.png`);
    
    await sharp(src)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(filename);
    
    console.log(`Generated: ${path.basename(filename)} (${s}x${s})`);
  }

  // 2. Generate updated square 512x512 for favicon.png and logo.png
  const temp512 = path.join(publicDir, 'temp-512.png');
  await sharp(src)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(temp512);

  fs.copyFileSync(temp512, path.join(publicDir, 'favicon.png'));
  fs.copyFileSync(temp512, path.join(publicDir, 'logo.png'));
  fs.unlinkSync(temp512);
  console.log('Updated: favicon.png & logo.png (512x512 square)');

  // 3. Generate multi-resolution ICO file (16x16, 32x32, 48x48)
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(src)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4);

  let offset = 6 + (16 * count);
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuf = Buffer.concat([header, ...entries, ...pngBuffers.map(x => x.buffer)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log(`Generated: favicon.ico (Multi-res ICO, ${icoBuf.length} bytes)`);
}

buildFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
