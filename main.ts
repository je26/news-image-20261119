// News-image entry for Thursday 19 November 2026 (Node 22, standard
// library only). The image is the entry.png beside this file: a one-page
// newspaper front page drawn for this day's news, 31 stories, with the
// date named on the page. The program copies it to the output directory
// the grader provides, after checking it really is a PNG.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const bytes = readFileSync(source);

// A PNG always starts with these eight bytes; refuse anything else
// rather than copying a corrupt or wrong-format file by mistake.
const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (!pngMagic.every((b, i) => bytes[i] === b)) {
  throw new Error("entry.png is not a PNG file");
}

// Verified 2026-11-19: entry.png is 1024x1024, 171500 bytes, and two
// runs of this program write byte-identical output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), bytes);
