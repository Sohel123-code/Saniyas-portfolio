import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("public/images");
await mkdir(output, { recursive: true });
const portraits = (await readdir("photos_personal"))
  .filter((f) => /\.png$/i.test(f))
  .sort();
const names = [
  "saniya-clinic",
  "saniya-study",
  "saniya-campus",
  "saniya-professional",
  "saniya-portrait",
];
let inputBytes = 0;
let outputBytes = 0;
for (let i = 0; i < portraits.length; i++) {
  const input = path.join("photos_personal", portraits[i]);
  inputBytes += (await stat(input)).size;
  for (const width of [480, 960]) {
    const dest = path.join(output, `${names[i]}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    outputBytes += (await stat(dest)).size;
  }
}
const activities = [
  ["WhatsApp Image 2026-09-23 at 5.43.25 PM.jpeg", "patient-care"],
  ["WhatsApp Image 2026-09-23 at 5.43.26 PM.jpeg", "restoration-learning"],
  ["WhatsApp Image 2026-09-23 at 5.43.26 PM (1).jpeg", "chairside-learning"],
  ["WhatsApp Image 2026-09-23 at 5.43.27 PM.jpeg", "oral-examination"],
  ["WhatsApp Image 2026-09-23 at 5.43.27 PM (1).jpeg", "clinical-practice"],
  ["WhatsApp Image 2026-09-23 at 5.43.27 PM (2).jpeg", "hands-on-learning"],
];
for (const [file, name] of activities) {
  const input = path.join("activities", file);
  inputBytes += (await stat(input)).size;
  const dest = path.join(output, `${name}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width: 850, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(dest);
  outputBytes += (await stat(dest)).size;
}
console.log(
  `Prepared 16 responsive WebP assets. Source: ${(inputBytes / 1e6).toFixed(2)} MB; web assets: ${(outputBytes / 1e6).toFixed(2)} MB.`,
);
