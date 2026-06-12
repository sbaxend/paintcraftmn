import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const EXTS = new Set([".jpg", ".jpeg", ".png"]);
const ROOT = path.join(process.cwd(), "public", "Website Transformations");

let fixed = 0;
let skipped = 0;

async function processDir(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }
    if (!EXTS.has(path.extname(entry.name).toLowerCase())) {
      skipped++;
      continue;
    }
    try {
      const img = sharp(fullPath).rotate(); // auto-rotate from EXIF, then strip tag
      const buf = await img.toBuffer();
      fs.writeFileSync(fullPath, buf);
      console.log(`✓ ${path.relative(process.cwd(), fullPath)}`);
      fixed++;
    } catch (err) {
      console.error(`✗ ${entry.name}: ${err.message}`);
    }
  }
}

await processDir(ROOT);
console.log(`\nDone — ${fixed} image(s) rotated/normalized, ${skipped} non-image file(s) skipped.`);
