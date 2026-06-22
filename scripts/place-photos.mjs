import sharp from 'sharp';
import { statSync } from 'node:fs';

const SRC = 'for rayen/For Bechir/photos/';
const OUT = 'public/images/';

// dest ← source. w/h define the target crop aspect. pos: cover crop anchor.
// Real GSS photos selected to replace AI/stock and fill empty slots.
const jobs = [
  // Hero + share (CREATE) ---------------------------------------------------
  // NOTE: hero-poster.jpg is owned by the hero video composition (teammate) — do not regenerate it here.
  { src: 'GSS (113 of 139).JPG', dest: 'og-default.jpg',       w: 1200, h: 630,  pos: 'attention', q: 82 }, // formation saluting
  { src: 'GSS (127 of 139).JPG', dest: 'hero-atmosphere.jpg',  w: 1280, h: 1280, pos: 'centre',    q: 80 }, // fleet line-up
  { src: 'GSS (113 of 139).JPG', dest: 'banner1.jpg',          w: 1920, h: 1080, pos: 'centre',    q: 80 }, // formation (stats band bg + about hero)
  { src: 'GSS (61 of 100).JPG',  dest: 'services-hero.jpg',    w: 1920, h: 1080, pos: 'centre',    q: 80 }, // long line-up — services hub header
  { src: 'GSS (72 of 100).JPG',  dest: 'careers-hero.jpg',     w: 1920, h: 1080, pos: 'centre',    q: 80 }, // welcoming mixed team — careers header
  { src: 'GSS (113 of 139).JPG', dest: 'hero-mobile.jpg',      w: 1280, h: 1600, pos: 'centre',    q: 82 }, // formation saluting — phone/tablet hero still (no video on mobile)

  // Services (16:10) — replace stock/weak fits, keep gardiennage/video-surveillance/fumigation
  { src: 'GSS (81 of 100).JPG',  dest: 'services/parking.jpg',       w: 1600, h: 1000, pos: 'centre', q: 80 }, // PARKING sign + SUV at entrance
  { src: 'GSS (82 of 139).JPG',  dest: 'services/escorte.jpg',       w: 1600, h: 1000, pos: 'centre', q: 80 }, // convoy on road
  { src: 'GSS (41 of 139).JPG',  dest: 'services/industrielle.jpg',  w: 1600, h: 1000, pos: 'centre', q: 80 }, // agent at site gate
  { src: 'GSS (92 of 139).JPG',  dest: 'services/elite.jpg',         w: 1600, h: 1000, pos: 'attention', q: 80 }, // sharp agent, sunglasses
  { src: 'GSS (45 of 100).JPG',  dest: 'services/residentielle.jpg', w: 1600, h: 1000, pos: 'top', q: 80 }, // calm single guard at upscale entrance
  { src: 'GSS (98 of 100).JPG',  dest: 'services/cameras.jpg',       w: 1600, h: 1000, pos: 'top', q: 80 }, // agent at CCTV / surveillance signage board

  // Sectors (4:5 portrait) — replace all 6 AI tiles
  { src: 'GSS (48 of 139).JPG',  dest: 'sectors/sector-01-industries.jpg',   w: 1080, h: 1350, pos: 'attention', q: 78 }, // team at pickup, container wall
  { src: 'GSS (69 of 100).JPG',  dest: 'sectors/sector-02-embassies.jpg',    w: 1080, h: 1350, pos: 'attention', q: 78 }, // supervisors, formal
  { src: 'GSS (80 of 100).JPG',  dest: 'sectors/sector-03-hospitality.jpg',  w: 1080, h: 1350, pos: 'attention', q: 78 }, // agents at venue entrance
  { src: 'GSS (30 of 139).JPG',  dest: 'sectors/sector-04-construction.jpg', w: 1080, h: 1350, pos: 'attention', q: 78 }, // agent + branded pickup, lot
  { src: 'GSS (46 of 100).JPG',  dest: 'sectors/sector-05-residences.jpg',   w: 1080, h: 1350, pos: 'attention', q: 78 }, // guard at entrance
  { src: 'GSS (43 of 100).JPG',  dest: 'sectors/sector-06-retail.jpg',       w: 1080, h: 1350, pos: 'attention', q: 78 }, // guard at CityMarket

  // Method (4:5 portrait) — replace all 4 AI steps
  { src: 'GSS (120 of 139).JPG', dest: 'method/method-01-audit.jpg',      w: 1080, h: 1350, pos: 'attention', q: 78 }, // site walk with client
  { src: 'GSS (105 of 139).JPG', dest: 'method/method-02-plan.jpg',       w: 1080, h: 1350, pos: 'attention', q: 78 }, // team briefing circle
  { src: 'GSS (91 of 139).JPG',  dest: 'method/method-03-deploy.jpg',     w: 1080, h: 1350, pos: 'attention', q: 78 }, // team deploying in truck
  { src: 'GSS (39 of 100).JPG',  dest: 'method/method-04-supervise.jpg',  w: 1080, h: 1350, pos: 'attention', q: 78 }, // agent on radio, supervision
];

const posOf = (p) => (p === 'attention' ? sharp.strategy.attention : p);

let total = 0;
for (const j of jobs) {
  await sharp(SRC + j.src)
    .rotate() // honour EXIF orientation
    .resize(j.w, j.h, { fit: 'cover', position: posOf(j.pos) })
    .jpeg({ quality: j.q, mozjpeg: true })
    .toFile(OUT + j.dest);
  const kb = Math.round(statSync(OUT + j.dest).size / 1024);
  total += kb;
  console.log(`${j.dest.padEnd(40)} ${j.w}x${j.h}  ${kb} KB   <= ${j.src}`);
}
console.log(`\n${jobs.length} images written, ${total} KB total`);
