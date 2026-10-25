// Verifica los pares de color del sistema de diseño frente a WCAG 2.2 AA.
// Uso: node scripts/check-contrast.mjs
const pairs = [
  // [texto, fondo, mínimo, uso]
  ['#F8FAFC', '#0B1220', 4.5, 'text-ink / base'],
  ['#CBD5E1', '#0B1220', 4.5, 'text-soft / base'],
  ['#94A3B8', '#0B1220', 4.5, 'text-muted / base'],
  ['#F8FAFC', '#152238', 4.5, 'text-ink / surface'],
  ['#CBD5E1', '#152238', 4.5, 'text-soft / surface'],
  ['#94A3B8', '#152238', 4.5, 'text-muted / surface'],
  ['#94A3B8', '#1C2B45', 4.5, 'text-muted / raised'],
  ['#0B1220', '#BEF264', 4.5, 'botón primario'],
  ['#0B1220', '#D9F99D', 4.5, 'botón primario hover'],
  ['#BEF264', '#0B1220', 4.5, 'acento (eyebrow, numeración) / base'],
  ['#BEF264', '#152238', 4.5, 'acento / surface'],
  ['#7DD3FC', '#0B1220', 4.5, 'enlaces / base'],
  ['#7DD3FC', '#152238', 4.5, 'enlaces / surface'],
  ['#86EFAC', '#152238', 4.5, 'estado éxito / surface'],
  ['#FDA4AF', '#152238', 4.5, 'estado error / surface'],
  ['#7DD3FC', '#0B1220', 3, 'anillo de foco / base'],
  ['#64748B', '#0B1220', 3, 'borde de controles / base'],
  ['#64748B', '#152238', 3, 'borde de controles / surface'],
];

const lum = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let failed = 0;
for (const [fg, bg, min, use] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}:1 (mín ${min}) ${use}`);
}
process.exit(failed ? 1 : 0);
