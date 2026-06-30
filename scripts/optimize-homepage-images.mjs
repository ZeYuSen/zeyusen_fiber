// One-off image optimizer for homepage redesign.
// Source images stay untouched (read-only). Outputs WebP into public/images.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DESKTOP = "/Users/tao/Desktop/zys";
const OUT = path.join(process.cwd(), "public/images");

// [sourceAbsPath, outRelPath, longEdge, quality]
const JOBS = [
  // --- Exclusive showcase shots (warehouse / shipment / equipment) ---
  ["图片/59.JPG", "showcase/warehouse-rolls.webp", 1600, 80],
  ["图片/58.JPG", "showcase/warehouse-stock.webp", 1600, 80],
  ["图片/DSC05801.JPG", "showcase/shipment-ready.webp", 1600, 80],
  ["图片/DSC05802.JPG", "showcase/equipment-slitting.webp", 1200, 80],
  ["图片/DSC05803.JPG", "showcase/equipment-winding.webp", 1200, 80],

  // --- Industry cards (real product photos) ---
  ["website-product-photos/06-carbon-fiber-cloth/01-carbon-glass-hybrid-cloth/carbon-glass-hybrid-cloth-02.jpg", "industries/aerospace.webp", 1000, 78],
  ["website-product-photos/03-fiberglass-composite-mat/01-stitched-composite-900-biaxial-45/900g-composite-biaxial-45-01.jpg", "industries/wind-energy.webp", 1000, 78],
  ["website-product-photos/01-fiberglass-tissue-mat/01-surface-tissue/300g-white-surface-tissue-02.jpg", "industries/construction.webp", 1000, 78],
  ["website-product-photos/02-fiberglass-cloth/02-twill-weave/twill-weave-black-02.jpg", "industries/military-defense.webp", 1000, 78],
  ["website-product-photos/05-carbon-fiber-mat/02-carbon-surface-mat-20g/20g-carbon-surface-mat-02.jpg", "industries/new-energy.webp", 1000, 78],

  // --- DivisionsSplit backgrounds (real product) ---
  ["website-product-photos/05-carbon-fiber-mat/02-carbon-surface-mat-20g/20g-carbon-surface-mat-01.jpg", "carbon-fiber/carbon_division.webp", 1200, 80],
  ["website-product-photos/02-fiberglass-cloth/06-woven-roving/400g-woven-roving-01.jpg", "glass-fiber/glass_division.webp", 1200, 80],
];

// Existing factory jpgs to also convert to webp (smaller, used in FactoryShowcase)
const FACTORY = [
  "factory/production/0_0006_productionprocesses5-1.jpg",
  "factory/production/0_0007_productionprocesses4-1.jpg",
  "factory/production/0_0008_productionprocesses3-1.jpg",
  "factory/inspection/0_0012_inspectionequipment8-1.jpg",
  "factory/inspection/0_0014_inspectionequipment5-1.jpg",
  "factory/testing/0_0018_processtesting4-1.jpg",
  "factory/testing/0_0020_processtesting2-1.jpg",
];

async function run() {
  let ok = 0;
  for (const [src, out, edge, q] of JOBS) {
    const srcPath = path.join(DESKTOP, src);
    if (!existsSync(srcPath)) {
      console.warn("MISSING:", srcPath);
      continue;
    }
    const outPath = path.join(OUT, out);
    await mkdir(path.dirname(outPath), { recursive: true });
    const info = await sharp(srcPath)
      .rotate()
      .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(outPath);
    console.log(`${out}  ${(info.size / 1024).toFixed(0)}KB  ${info.width}x${info.height}`);
    ok++;
  }
  for (const rel of FACTORY) {
    const srcPath = path.join(OUT, rel);
    if (!existsSync(srcPath)) {
      console.warn("MISSING factory:", srcPath);
      continue;
    }
    const outPath = srcPath.replace(/\.jpg$/, ".webp");
    const info = await sharp(srcPath)
      .rotate()
      .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outPath);
    console.log(`${rel.replace(/\.jpg$/, ".webp")}  ${(info.size / 1024).toFixed(0)}KB`);
    ok++;
  }
  console.log(`\nDone: ${ok} images.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
