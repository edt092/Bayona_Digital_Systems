// Verifica el SEO del build en dist/ (ejecutar después de `pnpm run build`).
// Uso: node scripts/check-seo.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';

const DIST = 'dist';
const SITE = 'https://www.bayonadigitalsystems.com';
const BRAND = 'Bayona Digital Systems';
const errors = [];
const warnings = [];

const walk = dir => readdirSync(dir).flatMap(f => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const pick = (html, re) => (html.match(re) ?? [])[1]?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') ?? '';

const pages = walk(DIST).filter(f => f.endsWith('.html')).map(file => {
  const html = readFileSync(file, 'utf8');
  const path = '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
  return {
    path,
    html,
    title: pick(html, /<title>(.*?)<\/title>/s),
    description: pick(html, /<meta name="description" content="([^"]*)"/),
    canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
    robots: pick(html, /<meta name="robots" content="([^"]*)"/),
    ogImage: pick(html, /<meta property="og:image" content="([^"]*)"/),
    h1: (html.match(/<h1[\s>]/g) ?? []).length,
  };
});

const indexable = pages.filter(p => p.robots.startsWith('index'));

for (const p of pages) {
  if (p.h1 !== 1) errors.push(`${p.path}: ${p.h1} H1`);
  if (!p.title) errors.push(`${p.path}: sin <title>`);
  if ((p.title.match(new RegExp(BRAND, 'g')) ?? []).length > 1) errors.push(`${p.path}: marca duplicada en el título`);
  if (!p.description) errors.push(`${p.path}: sin meta description`);
  if (p.path !== '/404.html' && p.canonical !== SITE + p.path) errors.push(`${p.path}: canonical ${p.canonical}`);
  if (p.title.length > 70) warnings.push(`${p.path}: título de ${p.title.length} caracteres`);
  const blocks = [...p.html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => m[1]);
  const defined = new Set();
  const referenced = [];
  for (const json of blocks) {
    try {
      const data = JSON.parse(json);
      for (const n of data['@graph'] ?? [data]) if (n['@id']) defined.add(n['@id']);
      for (const ref of json.matchAll(/\{"@id":"([^"]+)"\}/g)) referenced.push(ref[1]);
    } catch (e) {
      errors.push(`${p.path}: JSON-LD no parseable (${e.message})`);
    }
  }
  for (const ref of referenced) if (!defined.has(ref)) errors.push(`${p.path}: referencia @id sin definir ${ref}`);
  if (p.ogImage) {
    const local = join(DIST, decodeURIComponent(new URL(p.ogImage).pathname));
    if (!existsSync(local)) errors.push(`${p.path}: og:image inexistente ${p.ogImage}`);
  } else errors.push(`${p.path}: sin og:image`);
}

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const p of indexable) seen.set(p[key], [...(seen.get(p[key]) ?? []), p.path]);
  for (const [value, paths] of seen) if (paths.length > 1) errors.push(`${key} duplicado (${value}): ${paths.join(', ')}`);
}

// Sitemap: solo URLs indexables existentes, y todas las indexables presentes
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace(SITE, ''));
for (const loc of locs) {
  const page = pages.find(p => p.path === loc);
  if (!page) errors.push(`sitemap: ${loc} no existe en dist`);
  else if (!page.robots.startsWith('index')) errors.push(`sitemap: ${loc} es noindex`);
}
for (const p of indexable) if (!locs.includes(p.path)) errors.push(`sitemap: falta ${p.path}`);
if (/priority|changefreq/.test(sitemap)) warnings.push('sitemap: contiene priority/changefreq');

// robots.txt
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) errors.push('robots.txt: no declara el sitemap canónico');
if (/Disallow:\s*\/\s*$/m.test(robots)) errors.push('robots.txt: bloquea todo el sitio');

// Imágenes OG: 1200×630 y < 200 KB
const ogFiles = [...new Set(pages.map(p => p.ogImage).filter(Boolean))];
for (const url of ogFiles) {
  const local = join(DIST, decodeURIComponent(new URL(url).pathname));
  if (!existsSync(local)) continue;
  const { width, height } = await sharp(local).metadata();
  const kb = Math.round(statSync(local).size / 1024);
  if (width !== 1200 || height !== 630) errors.push(`og ${url}: ${width}×${height}`);
  if (kb > 200) errors.push(`og ${url}: ${kb} KB`);
}

console.log(`${pages.length} páginas (${indexable.length} indexables), ${locs.length} URLs en sitemap, ${ogFiles.length} imágenes OG`);
warnings.forEach(w => console.log(`AVISO ${w}`));
errors.forEach(e => console.log(`ERROR ${e}`));
console.log(errors.length ? `${errors.length} errores` : 'Sin errores');
process.exit(errors.length ? 1 : 0);
