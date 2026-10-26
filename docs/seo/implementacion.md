# Implementación SEO

**Fecha:** 25/10/2026 · **Base:** `auditoria_seo_2026-10-25.md` y `seo-plan.md` · **Commit de partida:** `a4c5828`
**Estado:** implementado en local. **Sin desplegar**: todo lo que depende de producción figura como pendiente.

Stack confirmado: Astro 5.18 (estático), TypeScript, Tailwind CSS 4, pnpm, Sharp 0.34 y Netlify. También hay un `vercel.json`, que se mantiene en paridad, pero el hosting real es Netlify (cabecera `Server: Netlify`).

## 1. Fase 0 — Contraste de la auditoría

| ID auditoría | Hallazgo | Estado | Nota |
|---|---|---|---|
| — | "13 URLs en el sitemap" | **No reproducido** | El sitemap tiene 12 URLs. El build genera 14 HTML: 12 indexables, `/blog/` (noindex) y `404.html` |
| A1 | Indexación no verificable | **Pendiente de acceso** | Requiere GSC (P1 en `seguimiento.md`) |
| A2 | Títulos > 60 caracteres | **Confirmado → resuelto** | La causa era la heurística de `SEO.astro`: añadía el sufijo si el título no contenía el nombre completo exacto |
| A3 | Sin orientación a búsquedas | **Confirmado → parcialmente resuelto** | Mapa de intención como hipótesis; falta validar con GSC y decidir mercado |
| M1 | E-E-A-T débil | **Confirmado → parcialmente resuelto** | Bio con hechos verificables y LinkedIn confirmado por el propietario; años y roles pendientes (P4) |
| M2 | Schema incompleto | **Confirmado → resuelto** | Ver §2.3 |
| M3 | OG de KS de 1 MB | **Confirmado → resuelto** | Ahora 62 KB, 1200×630 |
| M4 | Sin `llms.txt` | **Confirmado → resuelto (opcional)** | Experimental; no afecta a la indexación |
| M5 | Sin `lastmod` | **Confirmado → resuelto** | Solo con la fecha real del cambio |
| B1 | Cadena de 2 redirecciones | **Confirmado en producción → pendiente** | Se configura en el panel de Netlify (P5) |
| B2 | Sin CSP ni Permissions-Policy | **Confirmado → resuelto en report-only** | Permissions-Policy obligatoria; CSP en report-only (P6) |
| B3 | Alt vacío en las tarjetas | **Revisado → se mantiene** | Ver §2.4 |
| B4 | Imágenes antiguas en 404 | **Revisado → se mantiene el 404** | Ver §2.4 |
| B5 | Google Fonts bloquea el render | **Confirmado → resuelto** | Fuentes autoalojadas con preload |
| — | Caché `immutable` en `/assets/*` | **Hallazgo nuevo → resuelto** | Esa ruta no existe; los recursos con hash están en `/_astro/*` |

## 2. Cambios y decisiones

### 2.1 Política de títulos (`src/lib/seo.ts` → `buildTitle`)

- Cada página define su título **sin marca**. `buildTitle` añade ` | Bayona Digital Systems` una sola vez, salvo que se pase `brand={false}`.
- Se elimina la heurística anterior (`title.includes(nombre completo)`), que duplicaba la marca con variantes como "Bayona Digital".
- La longitud se controla editorialmente (objetivo de 45–65 caracteres). No se recorta automáticamente.
- En los tres casos el título total es de 68–69 caracteres. Se aceptó para conservar un título descriptivo; si Google lo trunca, lo que se corta es la marca, al final.

| URL | Antes | Después | Desc. | Robots | Schema | OG |
|---|---|---|---:|---|---|---|
| `/` | Bayona Digital Systems — Productos web y automatización para operaciones B2B (76) | Desarrollo web B2B y automatización \| Bayona Digital Systems (60) | 141 | index | Organization+Person+WebSite | `/og-image.png` |
| `/servicios/` | Servicios: productos web B2B y automatización de datos \| … (79) | Servicios: catálogos web B2B y datos \| … (61) | 145 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/servicios/productos-web/` | Plataformas y catálogos web para vender y operar en B2B \| … (80) | Desarrollo de catálogos web B2B \| … (56) | 147 | index | Org+Person+Service, Breadcrumb | `/og-image.png` |
| `/servicios/automatizacion-datos/` | Pipelines, integraciones y paneles que eliminan trabajo manual \| … (87) | Automatización e integración de datos \| … (62) | 143 | index | Org+Person+Service, Breadcrumb | `/og-image.png` |
| `/proyectos/` | Casos de estudio: catálogos B2B, automatización y datos \| … (80) | Casos de estudio de desarrollo B2B \| … (59) | 136 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/proyectos/ks-promocionales/` | KS Promocionales: Un catálogo B2B automatizado con generación estática de páginas \| … (106) | KS Promocionales: catálogo B2B automatizado \| … (68) | 163 | index | Org+Person+CreativeWork, Breadcrumb | `/og/ks-promocionales.jpg` |
| `/proyectos/promogimmicks/` | PromoGimmicks: Un catálogo de e-commerce que se actualiza a diario sin pasos manuales \| … (110) | PromoGimmicks: catálogo actualizado a diario \| … (69) | 162 | index | Org+Person+CreativeWork, Breadcrumb | `/og/promogimmicks.jpg` |
| `/proyectos/contratadata/` | ContrataData: Contratación pública consolidada en una API y un panel analítico \| … (103) | ContrataData: datos de contratación pública \| … (68) | 163 | index | Org+Person+CreativeWork, Breadcrumb | `/og/contratadata.jpg` |
| `/como-trabajamos/` | Cómo trabajamos: proceso, colaboración y entregables \| … (77) | Cómo trabajamos: proceso y entregables \| … (63) | 154 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/contacto/` | Contacto: cuéntanos qué necesita resolver tu equipo \| … (76) | Contacto: cuéntanos tu proyecto \| … (56) | 151 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/privacidad/` | Política de privacidad \| … (47) | sin cambio (47) | 150 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/terminos/` | Términos de uso \| … (40) | sin cambio (40) | 144 | index | Org+Person, Breadcrumb | `/og-image.png` |
| `/blog/` | Blog: productos web, automatización y datos \| … (68) | Blog: productos web y datos \| … (52) | 109 | noindex | Org+Person, Breadcrumb | `/og-image.png` |
| `/404.html` | Página no encontrada \| … (45) | sin cambio | 58 | noindex | Org+Person | `/og-image.png` |

En la tabla, "…" sustituye a "Bayona Digital Systems". Las cifras entre paréntesis son la longitud total del título. Open Graph y Twitter usan el mismo título final.

### 2.2 Contenido y enlaces
Detalle en `estrategia.md`.
- **Servicios:** nuevos H1, resúmenes y una FAQ por servicio basada en la evidencia de los casos. Se mantiene un H1 por página y las FAQ siguen visibles, **sin** `FAQPage`.
- **Home:** el eyebrow pasa a "Desarrollo web B2B · Automatización · Datos". Nueva descripción.
- **`/como-trabajamos/`:** nuevo bloque "Responsable técnico" con hechos verificables, enlaces a los 3 casos y a GitHub. No incluye años de experiencia, cargos ni clientes no verificados.
- **Enlaces:** se conservan los que ya existían (servicio → casos, caso → servicio y contacto con `?servicio=`, footer completo). No se crean páginas nuevas.

### 2.3 Datos estructurados (`src/lib/seo.ts`)
- Un único `@graph` por página con entidades de `@id` estable: `/#organization`, `/#edwin-bayona` y `/#website`.
- **`ProfessionalService` → `Organization`.** `ProfessionalService` es un subtipo de `LocalBusiness` y daría a entender que hay un local físico con dirección, que no existe. No se inventan dirección ni teléfono.
- `Person` (Edwin Bayona) con `sameAs` de LinkedIn (confirmado por el propietario el 25/10/2026) y GitHub. El LinkedIn también figura en el footer y en la bio.
- `WebSite` en la Home. `Service` en cada página de servicio, con `provider` enlazado por `@id`.
- Los casos son `CreativeWork` con `about`, `creator`, `publisher` e `image`. El repositorio se declara en `isBasedOn` → `SoftwareSourceCode.codeRepository`, no en `sameAs`, porque `sameAs` significa "es la misma entidad que".
- `BreadcrumbList` se conserva en su propio bloque, sin duplicar.
- JSON-LD serializado con escape de `<`, `>` y `&` (`serializeJsonLd`).
- Logo de la organización: nuevo `public/logo-512.png` (512×512), generado a partir de `favicon.svg`.
- **Alcance de la validación:** el JSON es correcto y las referencias `@id` se resuelven (comprobado con `check:seo`). Que el marcado sea válido según Schema.org no significa que pueda generar resultados enriquecidos: `Service` y `CreativeWork` no tienen informe propio en GSC. **No se ha pasado el Rich Results Test.**

### 2.4 Recursos y rastreo
- **OG de los casos:** el endpoint `src/pages/og/[slug].jpg.ts` genera en el build un JPG de 1200×630 con Sharp, en una URL estable (`/og/<slug>.jpg`). Si la captura tiene alto suficiente, se recorta por arriba; si no, se encaja sin ampliar y se rellena con el color de fondo (es el caso de PromoGimmicks, cuya captura mide 613 px de alto). Pesos: 47–62 KB. Las capturas originales no se tocan.
- **Alt de las tarjetas:** se mantiene `alt=""`. La captura está junto al encabezado enlazado con el nombre del proyecto y no aporta información adicional, así que un alt descriptivo sería redundante para el lector de pantalla. La versión descriptiva se usa en la página de cada caso, donde la imagen es contenido.
- **Sitemap:** solo URLs canónicas indexables. `lastmod` = 2026-10-25, la fecha real de este cambio de contenido. Se quitaron `priority` y `changefreq`. Mantenimiento: actualizar `updated` en `services.ts`/`projects.ts` o en `sitemap.xml.ts` cuando cambie una página de forma sustancial. No se usa la fecha de build.
- **Robots:** sin cambios. El blog sigue en `noindex, follow` y es rastreable.
- **Imágenes antiguas `/images/project-*.png`:** se mantiene el 404. No hay evidencia de enlaces entrantes ni de indexación (sin GSC ni backlinks), y el recurso equivalente vive en `/_astro/` con un hash que cambia en cada build. Redirigir una imagen a HTML no corresponde.
- **`llms.txt`:** se genera desde los mismos datos que las páginas. Es experimental: no es un requisito de indexación ni hay evidencia de que mejore rankings o menciones.

### 2.5 Fuentes, rendimiento y seguridad
- **Fuentes:** Inter y Space Grotesk, ambas variables con licencia OFL y subconjunto latino (que incluye los caracteres del español), se descargaron del CDN oficial de Google Fonts a `src/assets/fonts/`. Vite les añade hash y pesan 47 KB + 22 KB. Se precargan las dos porque se usan en el primer viewport (H1 y cuerpo). `font-display: swap`. Se eliminan las peticiones a `fonts.googleapis.com` y `fonts.gstatic.com`, y la política de privacidad se actualizó en consecuencia.
- **Scripts:** `vite.build.assetsInlineLimit: 0` saca los scripts de Astro a archivos externos. Así la CSP no necesita `'unsafe-inline'` en `script-src`.
- **Caché:** la regla `immutable` pasa de `/assets/*` (inexistente) a `/_astro/*` (solo recursos con hash). El HTML, `/og/*` y otras rutas estables conservan la caché por defecto de Netlify.
- **Permissions-Policy (obligatoria):** `camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
- **CSP (report-only):** `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`.
  - `'unsafe-inline'` en `style-src` hace falta por los `<style>` y atributos `style` que genera Astro.
  - `data:` en `img-src` es para la flecha SVG del `<select>`.
  - Los bloques JSON-LD son datos, no código ejecutable, y la CSP no los bloquea.
  - Se dejó en report-only porque no se ha verificado con las cabeceras reales de Netlify (P6).
- **Dominio principal:** sin cambios en la configuración (P5).

## 3. Archivos

- **Nuevos:** `src/lib/seo.ts`, `src/pages/og/[slug].jpg.ts`, `src/pages/llms.txt.ts`, `src/assets/fonts/*` (2 woff2 + `LICENSE.md`), `public/logo-512.png`, `tests/seo.test.ts`, `scripts/check-seo.mjs`, `docs/seo/{estrategia,seguimiento,implementacion}.md`.
- **Modificados:**
  - `src/components/layout/{SEO,Layout}.astro`, `src/components/ui/PageHeader.astro`, `src/components/home/Hero.astro`
  - `src/types/index.ts`, `src/data/{services,projects}.ts`
  - Páginas: `index`, `servicios/*`, `proyectos/*`, `como-trabajamos`, `contacto`, `privacidad`, `terminos`, `blog/index`, `sitemap.xml.ts`
  - `src/styles/global.css`, `astro.config.mjs`, `netlify.toml`, `vercel.json`, `package.json` (script `check:seo`)
- **Sin tocar:** el cambio previo y ajeno en `pnpm-workspace.yaml`, y `README.md`, que sigue mencionando reservas, Supabase y EmailJS (está desactualizado).

## 4. Validación

| Comprobación | Resultado |
|---|---|
| `pnpm run build` | **Pasada.** 14 páginas + 3 OG + `sitemap.xml` + `llms.txt`. El aviso de colección `blog` vacía ya existía |
| `pnpm test` | **Pasada.** 13/13 (5 de contacto + 8 de la política SEO: títulos, JSON-LD, `@id`, `codeRepository`, sitemap) |
| `pnpm run check:contrast` | **Pasada.** 18/18 |
| `pnpm run check:seo` sobre `dist/` | **Pasada.** Títulos y descripciones únicos, marca no duplicada, 1 H1, canonical correcto, JSON-LD parseable con `@id` resueltos, sitemap = indexables, robots correcto, 4 OG de 1200×630 y menos de 200 KB. Se comprobó que detecta errores inyectando un H1 duplicado y un `@id` roto |
| Compatibilidad de la CSP | **Pasada en local.** Servidor local con la política **aplicada**, Chrome: Home, un caso y contacto sin violaciones ni errores de consola; el JS de contacto funciona (preselección de servicio, botón de copiar) y las fuentes autoalojadas cargan. Análisis estático de `dist/`: 0 scripts inline ejecutables, 0 manejadores `on*`, 0 recursos externos. La directiva `frame-ancestors 'none'` bloqueó como se esperaba un intento de cargar el sitio en un iframe |
| Visual | **Pasada.** Home en escritorio con las fuentes autoalojadas: render idéntico al anterior |
| Rich Results Test / validador de Schema.org | **Pendiente.** No ejecutado |
| Lighthouse / PageSpeed | **Pendiente.** Lighthouse no está instalado; PSI sin clave dio límite de cuota en la auditoría (P7) |
| Producción: HTTP, redirecciones, cabeceras, OG, consola con CSP real | **Pendiente.** Requiere despliegue autorizado (§5) |

## 5. Verificación en producción tras el despliegue

```bash
B=https://www.bayonadigitalsystems.com
curl -sI $B/ | grep -iE "permissions-policy|content-security-policy"
curl -sI $B/_astro/$(curl -s $B/ | grep -o 'inter-latin-var[^"]*woff2' | head -1) | grep -i cache-control   # immutable
curl -s $B/sitemap.xml | grep -c "<lastmod>"        # 12
curl -sI $B/og/promogimmicks.jpg | grep -i content-type  # image/jpeg
curl -s $B/llms.txt | head -3
curl -sI http://bayonadigitalsystems.com/           # tras P5: un solo 301 a https://www.
```

Después, abrir Home, un servicio, un caso y contacto en Chrome y revisar que la consola no muestre avisos `[Report Only]` de la CSP. Por último, comprobar la vista previa de un caso en el Post Inspector de LinkedIn.

## 6. Riesgos concretos

- **CSP:** si en producción aparecen violaciones, ajustar la política antes de pasarla a obligatoria. En report-only no rompe nada.
- **Títulos de casos (68–69 caracteres):** pueden truncarse en la SERP, perdiendo solo la marca al final. Google también puede reescribirlos.
- **Consultas hipotéticas:** si GSC muestra otras consultas, hay que rehacer el mapa y los H1 de los servicios.
- **`lastmod` manual:** si no se actualiza al cambiar contenido, pierde fiabilidad. Está documentado en el código.
- **Fuentes autoalojadas:** no se actualizan solas. Si Google publica versiones nuevas, hay que sustituir los archivos a mano (poco crítico).

## 7. Próximos pasos por responsable

- **Propietario:** P1 (GSC), P2 (mercado), P4 (años y roles de los casos), P5 (dominio principal en Netlify). P3 (LinkedIn) ya está resuelto.
- **Desarrollo, tras el despliegue:** §5, P6 (pasar la CSP a obligatoria), P7 (laboratorio de rendimiento), Rich Results Test.
- **Contenido, a D0 + 8 semanas:** revisar el mapa de intención con datos reales y elegir el primer brief del backlog.

## 8. Actualización — casos de estudio (25/10/2026)

- **Nuevos casos:** `/proyectos/kspromocionales-co/` (KS Promocionales Colombia, destacado en la Home en lugar de ContrataData) y `/proyectos/promocionalesjj/` (Promocionales J&J). Su contenido sale de los repositorios públicos y del código local de cada proyecto (recuentos de `data/*.json`, políticas y scripts versionados). Las capturas son de las portadas en producción del 25/10/2026.
- **ContrataData:** oculto con `published: false` (los datos se conservan). Sale del sitemap, del `llms.txt`, de los servicios y de la bio. `/proyectos/contratadata/` redirige con **302** (temporal) a `/proyectos/` en `netlify.toml` y `vercel.json`. Al publicarlo: quitar `published: false` y las dos redirecciones.
- **Campo nuevo `liveUrl`:** enlace "Ver sitio publicado" en el resumen de los casos que lo tienen.
- **Inventario:** 15 HTML, 13 URLs indexables en el sitemap y 5 imágenes OG (incluida la general).

