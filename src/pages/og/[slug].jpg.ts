import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { projects } from '@/data/projects';

/**
 * Imagen Open Graph 1200×630 (JPG) de cada caso, generada en build a partir de su captura.
 * - Si la captura tiene alto suficiente: recorte superior (cabecera y titular del proyecto).
 * - Si es más baja: se encaja sin ampliar y se extiende el lienzo con el color de fondo del sitio.
 */
const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = '#0B1220';

export const getStaticPaths = (() =>
  projects.map(p => ({ params: { slug: p.slug }, props: { slug: p.slug } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const source = await readFile(path.join(process.cwd(), 'src/assets/projects', `${props.slug}.png`));
  const { width = 0, height = 0 } = await sharp(source).metadata();
  const canCover = width >= WIDTH && height >= HEIGHT && height * (WIDTH / width) >= HEIGHT;

  const pipeline = canCover
    ? sharp(source).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' })
    : sharp(source)
        .resize({ width: WIDTH, height: HEIGHT, fit: 'inside', withoutEnlargement: true })
        .flatten({ background: BACKGROUND });

  let image = await pipeline.toBuffer({ resolveWithObject: true });
  if (!canCover) {
    const padX = WIDTH - image.info.width;
    const padY = HEIGHT - image.info.height;
    image = await sharp(image.data)
      .extend({
        left: Math.floor(padX / 2),
        right: Math.ceil(padX / 2),
        top: Math.floor(padY / 2),
        bottom: Math.ceil(padY / 2),
        background: BACKGROUND,
      })
      .toBuffer({ resolveWithObject: true });
  }

  const jpg = await sharp(image.data).flatten({ background: BACKGROUND }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
