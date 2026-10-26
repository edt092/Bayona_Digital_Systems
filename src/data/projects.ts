import type { Project } from '@/types';
import ksImage from '@/assets/projects/ks-promocionales.png';
import promogimmicksImage from '@/assets/projects/promogimmicks.png';
import contratadataImage from '@/assets/projects/contratadata.png';
import ksColombiaImage from '@/assets/projects/kspromocionales-co.png';
import jjImage from '@/assets/projects/promocionalesjj.png';

const allProjects: Project[] = [
  {
    slug: 'ks-promocionales',
    title: 'KS Promocionales',
    seoTitle: 'KS Promocionales: catálogo B2B automatizado',
    updated: '2026-10-25',
    headline: 'Un catálogo B2B automatizado con generación estática de páginas',
    sector: 'Comercio B2B · Productos promocionales (Ecuador)',
    services: ['productos-web', 'automatizacion-datos'],
    summary:
      'Tienda B2B de artículos promocionales cuyo catálogo de más de 2.000 productos se extrae del proveedor, se enriquece con IA y se publica como sitio estático en CDN.',
    problem:
      'El catálogo del proveedor estaba disperso y no tenía una presencia digital escalable: mantener a mano una ficha útil para cada producto no era viable con miles de referencias.',
    solution:
      'Un pipeline separa la extracción de datos, el enriquecimiento de contenido y la publicación. El sitio se genera en build-time a partir de una base de datos Postgres serverless y se despliega en CDN sin servidor en runtime.',
    scope: [
      'Scraper del catálogo del proveedor',
      'Modelo de datos en Postgres serverless (Neon)',
      'Enriquecimiento de fichas con Claude Haiku',
      'Sitio estático con Next.js 14',
      'Despliegue continuo y cabeceras de seguridad en Netlify',
    ],
    output: '2.096 páginas de producto generadas; 2.008 elegibles para indexación según la configuración del proyecto.',
    decisions: [
      {
        title: 'Desacoplar extracción y despliegue',
        description:
          'Los productos se guardan primero en Postgres. Un fallo del scraper no rompe el sitio publicado y el build trabaja siempre sobre datos ya validados.',
      },
      {
        title: 'Controlar la calidad antes de indexar',
        description:
          'Solo las fichas marcadas como enriquecidas son elegibles para indexación; las demás reciben noindex para no publicar contenido delgado.',
      },
      {
        title: 'Reducir el peso que llega al navegador',
        description:
          'El catálogo se divide en archivos JSON ligeros por categoría en lugar de un único archivo de 469 KB cargado en cliente.',
      },
    ],
    outputs: [
      '2.096 páginas de producto y 34 categorías generadas de forma estática',
      'Variantes duplicadas resueltas con canonical y noindex',
      'Redirecciones 301 declarativas para cambios de URL',
      'Cabeceras HSTS, CSP y X-Frame-Options configuradas en la CDN',
    ],
    limitations:
      'Las cifras describen la configuración del proyecto (páginas generadas y elegibles), no la indexación efectiva en buscadores ni resultados comerciales.',
    techStack: [
      { name: 'Next.js 14', role: 'Generación estática del sitio' },
      { name: 'Neon (Postgres)', role: 'Base de datos serverless' },
      { name: 'Claude Haiku', role: 'Enriquecimiento de fichas de producto' },
      { name: 'Python 3', role: 'Extracción del catálogo del proveedor' },
      { name: 'Netlify', role: 'CDN, CI/CD y cabeceras de seguridad' },
      { name: 'next-sitemap', role: 'Sitemap XML' },
    ],
    pipeline: [
      'Un scraper en Python recorre el catálogo del proveedor y extrae nombres, descripciones, imágenes y categorías.',
      'Los productos se almacenan en Neon (Postgres serverless), separando la extracción del despliegue.',
      'Un script de sincronización envía lotes de 5 productos a Claude Haiku para generar títulos, descripciones, características y casos de uso.',
      'Solo los productos marcados como optimizados (2.008) son elegibles para indexación; los 88 restantes reciben noindex.',
      'Un paso de prebuild divide el catálogo en JSON ligeros por categoría (6 campos, máximo 80 ítems).',
      'Next.js genera el export estático: 2.096 páginas de producto, 34 categorías, blog y landing pages.',
      'Cada commit dispara un rebuild automático en Netlify.',
    ],
    image: ksImage,
    imageAlt: 'Página de inicio de KS Promocionales con el catálogo de artículos promocionales',
    githubUrl: 'https://github.com/edt092/ksp-ecommerce-engine',
    featured: true,
  },
  {
    slug: 'promogimmicks',
    title: 'PromoGimmicks',
    seoTitle: 'PromoGimmicks: catálogo actualizado a diario',
    updated: '2026-10-25',
    headline: 'Un catálogo de e-commerce que se actualiza a diario sin pasos manuales',
    sector: 'Comercio electrónico · Productos promocionales (Ecuador)',
    services: ['automatizacion-datos', 'productos-web'],
    summary:
      'Plataforma de productos promocionales con más de 1.000 páginas estáticas, alimentada por una extracción diaria programada que termina en un despliegue automático.',
    problem:
      'Las fichas debían reflejar a diario los datos del proveedor (precios, imágenes, categorías). Actualizarlas a mano era lento y propenso a errores.',
    solution:
      'Un flujo programado en GitHub Actions extrae los datos del proveedor, actualiza el catálogo en el repositorio y dispara la reconstrucción del sitio en Netlify.',
    scope: [
      'Scraper diario con BeautifulSoup y reintentos',
      'Automatización programada con GitHub Actions',
      'Sitio estático con Next.js 14 (App Router)',
      'SEO técnico: datos estructurados, sitemap y redirecciones',
    ],
    output: 'Más de 1.000 páginas de producto regeneradas por un flujo diario programado, sin pasos manuales en la publicación.',
    decisions: [
      {
        title: 'El repositorio como fuente de verdad',
        description:
          'El scraper escribe el catálogo en un archivo versionado. Cada actualización queda registrada como commit y puede revisarse o revertirse.',
      },
      {
        title: 'Reintentos ante límites del proveedor',
        description:
          'El procesamiento por lotes con reintentos automáticos evita que un límite temporal del proveedor deje el catálogo incompleto.',
      },
      {
        title: 'Sitemap con fechas reales',
        description:
          'El sitemap se regenera con las fechas de modificación reales en cada build, sin enviar señales de cambio falsas a los buscadores.',
      },
    ],
    outputs: [
      'Ejecución diaria programada (07:00 UTC) de extracción y despliegue',
      'Landing pages por ciudad: Quito, Guayaquil, Cuenca y Manta',
      'Más de 1.000 redirecciones 301 generadas para cambios de slug',
      'Datos estructurados Product, Organization y BreadcrumbList en cada ficha',
    ],
    limitations:
      'El resultado describe el funcionamiento del sistema; no se publican métricas de tráfico ni de ventas.',
    techStack: [
      { name: 'Next.js 14 (App Router)', role: 'Generación estática del sitio' },
      { name: 'TypeScript', role: 'Tipado estático' },
      { name: 'Python + BeautifulSoup', role: 'Extracción de datos del proveedor' },
      { name: 'GitHub Actions', role: 'Ejecución programada diaria' },
      { name: 'Netlify', role: 'CDN y despliegue continuo' },
      { name: 'Tailwind CSS', role: 'Estilos' },
    ],
    pipeline: [
      'GitHub Actions ejecuta el flujo cada día a las 07:00 UTC.',
      'El scraper recorre el sitio del proveedor y extrae nombres, descripciones, precios, imágenes y categorías.',
      'El procesamiento por lotes reintenta automáticamente cuando el proveedor limita las peticiones.',
      'El catálogo actualizado se guarda en el repositorio mediante un commit automático.',
      'Netlify detecta el commit y reconstruye el sitio.',
      'Next.js genera más de 1.000 páginas de producto, categorías y landing pages por ciudad.',
      'El sitemap se regenera con fechas de modificación reales.',
    ],
    image: promogimmicksImage,
    imageAlt: 'Página de inicio de PromoGimmicks con el titular «Artículos promocionales con tu logo, en Ecuador» y el botón Cotizar ahora',
    githubUrl: 'https://github.com/edt092/promogimmicks-fullstack-commerce',
    featured: true,
  },
  {
    slug: 'kspromocionales-co',
    title: 'KS Promocionales Colombia',
    seoTitle: 'KS Promocionales Colombia: catálogo B2B',
    updated: '2026-10-25',
    headline: 'Un catálogo B2B de 2.097 productos para Colombia con cotización por WhatsApp',
    sector: 'Comercio B2B · Productos promocionales (Colombia)',
    services: ['productos-web', 'automatizacion-datos'],
    summary:
      'Sitio de productos promocionales para Colombia en Astro: 2.097 fichas en 37 categorías, buscador propio y una lista de cotización que se envía por WhatsApp.',
    problem:
      'Había que abrir el canal en Colombia sin rehacer el catálogo desde cero: reutilizar los datos del sitio de Ecuador, adaptarlos al mercado colombiano y evitar fichas duplicadas o vacías a gran escala.',
    solution:
      'Un script adapta una sola vez el catálogo del motor de Ecuador. Astro genera el sitio estático y una política de indexabilidad única decide qué fichas se indexan, qué entra en el sitemap y qué revisa la auditoría que se ejecuta antes de cada build.',
    scope: [
      'Sitio estático con Astro 4 y Tailwind CSS',
      'Adaptación del catálogo semilla desde el caso de Ecuador',
      'Política de indexabilidad compartida por fichas, sitemap y auditoría',
      'Buscador del catálogo con sinónimos locales',
      'Lista «Mi cotización» con envío por WhatsApp',
    ],
    output: '2.097 fichas de producto en 37 categorías; 2.094 indexables según la política del proyecto y 88 duplicados resueltos con redirección 301.',
    decisions: [
      {
        title: 'Una sola política de indexabilidad',
        description:
          'La misma función decide el noindex de cada ficha, el filtro del sitemap y la auditoría que detiene el build si hay errores en los datos.',
      },
      {
        title: 'Duplicados con 301, no con noindex',
        description:
          'Las fichas duplicadas se consolidan en un producto principal (88 alias) con redirecciones permanentes generadas en el build.',
      },
      {
        title: 'Cotización sin datos personales',
        description:
          'La lista guarda solo referencias y cantidades en el navegador, caduca a los 30 días sin uso y la solicitud se envía por WhatsApp.',
      },
    ],
    outputs: [
      'Buscador que ignora tildes y plurales y entiende sinónimos locales (lapicero/esfero, mug/taza)',
      'Redirecciones de dominios antiguos resueltas en un solo salto',
      'Fechas del sitemap solo con cambios editoriales reales',
      'Pruebas automáticas de la política de indexación y del buscador',
    ],
    limitations:
      'Las cifras describen la configuración del catálogo (fichas generadas e indexables), no la indexación efectiva en buscadores ni resultados comerciales.',
    techStack: [
      { name: 'Astro 4', role: 'Generación estática del sitio' },
      { name: 'Tailwind CSS', role: 'Estilos' },
      { name: '@astrojs/sitemap', role: 'Sitemap filtrado por la política de indexación' },
      { name: 'Node.js', role: 'Scripts de adaptación, corrección y auditoría del catálogo' },
      { name: 'GSAP', role: 'Animación de la cabecera' },
      { name: 'Netlify', role: 'CDN, redirecciones y cabeceras de seguridad' },
    ],
    pipeline: [
      'Un script adapta una vez el catálogo del motor de Ecuador: ciudades y país, con reemplazo por palabra completa.',
      'Scripts de corrección consolidan productos duplicados y reparan textos del catálogo.',
      'Una auditoría de los datos se ejecuta en modo estricto y detiene el build si encuentra errores.',
      'Astro genera las fichas, 37 categorías con paginación, el blog y las páginas por intención de búsqueda.',
      'La política de indexabilidad aplica noindex a las fichas sin contenido propio y las deja fuera del sitemap.',
      'El build genera las redirecciones 301 de los alias y de los dominios antiguos.',
      'Netlify publica el sitio con cabeceras de seguridad (CSP y HSTS).',
    ],
    image: ksColombiaImage,
    imageAlt: 'Página de inicio de KS Promocionales Colombia con el titular «Productos promocionales para que tu marca se haga notar» y el botón Cotizar por WhatsApp',
    githubUrl: 'https://github.com/edt092/kspromocionales',
    liveUrl: 'https://www.kspromocionales.co/',
    featured: true,
  },
  {
    slug: 'promocionalesjj',
    title: 'Promocionales J&J',
    seoTitle: 'Promocionales J&J: catálogo y cotización',
    updated: '2026-10-25',
    headline: 'Un catálogo de 840 productos con buscador y cotización guiada por WhatsApp',
    sector: 'Comercio B2B · Productos promocionales (Colombia)',
    services: ['productos-web'],
    summary:
      'Tienda de productos promocionales para Colombia en Next.js: 840 productos en 39 categorías, buscador con filtros y cotización guiada que se envía por WhatsApp.',
    problem:
      'El catálogo de 840 productos tenía categorías vacías y no todos los productos eran alcanzables mediante enlaces rastreables. Hacía falta ordenar la taxonomía y facilitar que el cliente encontrara productos y armara su solicitud.',
    solution:
      'Exportación estática de Next.js con paginación rastreable, una reclasificación del catálogo reproducible por script, un buscador por nombre, referencia y filtros reales, y una cotización multiproducto que genera un mensaje editable para WhatsApp.',
    scope: [
      'Sitio estático con Next.js 14 (exportación estática) y Tailwind CSS',
      'Reclasificación del catálogo con un script reproducible',
      'Buscador con sinónimos y filtros por categoría, material y técnica',
      'Cotización guiada multiproducto con mensaje editable',
      'Datos estructurados factuales y verificación SEO del build',
    ],
    output: '840 productos en 39 categorías, todos alcanzables mediante enlaces HTML gracias a la paginación estática.',
    decisions: [
      {
        title: 'Datos estructurados factuales',
        description:
          'Fichas Product sin precios ni marcas inventados, y Service por ciudad en lugar de un negocio local ficticio.',
      },
      {
        title: 'Taxonomía reproducible',
        description:
          'La reclasificación se hace con un script versionado: se poblaron 8 categorías vacías con productos reales y se retiraron 5 sin oferta.',
      },
      {
        title: 'Estado de búsqueda en la URL',
        description:
          'La consulta y los filtros viven en la URL, se conserva la posición y hay estados para «sin resultados» y reintento ante un fallo.',
      },
    ],
    outputs: [
      'Imágenes servidas por Netlify Image CDN mediante un loader propio',
      'Analítica de uso sin datos personales (búsqueda, ficha, cotización y clic a WhatsApp)',
      'Pruebas automáticas de las reglas de cotización y del buscador',
      'Comprobaciones de UX automatizadas en 9 anchos de pantalla',
    ],
    limitations:
      'El caso describe la arquitectura y las funciones del sitio; no se publican métricas de tráfico ni de ventas.',
    techStack: [
      { name: 'Next.js 14', role: 'Exportación estática del sitio' },
      { name: 'React 18 + TypeScript', role: 'Interfaz y tipado' },
      { name: 'Tailwind CSS', role: 'Estilos' },
      { name: 'GSAP', role: 'Animaciones' },
      { name: 'Netlify Image CDN', role: 'Optimización de imágenes' },
      { name: 'Netlify', role: 'Despliegue y cabeceras' },
    ],
    pipeline: [
      'El catálogo vive en JSON versionado: productos, categorías y artículos del blog.',
      'Un script reclasifica el catálogo de forma reproducible antes de publicar.',
      'Next.js genera en el build las fichas, la tienda y las categorías con paginación estática.',
      'El índice de búsqueda se publica como un JSON estático que consulta el buscador en el navegador.',
      'La cotización guiada valida las cantidades por producto y compone un mensaje editable para WhatsApp.',
      'Un script de verificación SEO revisa el sitio exportado en modo estricto.',
      'Netlify publica el sitio y optimiza las imágenes con su Image CDN.',
    ],
    image: jjImage,
    imageAlt: 'Página de inicio de Promocionales J&J con el titular «Merchandising que deja marca en Colombia» y los botones Explorar catálogo y Cotizar por WhatsApp',
    githubUrl: 'https://github.com/edt092/promocionalesjj',
    liveUrl: 'https://www.promocionalesjj.co/',
    featured: false,
  },
  {
    slug: 'contratadata',
    title: 'ContrataData',
    seoTitle: 'ContrataData: datos de contratación pública',
    updated: '2026-10-25',
    headline: 'Contratación pública consolidada en una API y un panel analítico',
    sector: 'Datos abiertos · Sector público (Colombia)',
    services: ['automatizacion-datos'],
    summary:
      'Plataforma que extrae, normaliza y expone los contratos públicos de SECOP y datos.gov.co mediante un pipeline ETL incremental, una API REST y un panel de análisis.',
    problem:
      'Los datos de contratación pública estaban repartidos entre fuentes con formatos heterogéneos y no había una forma unificada de consultarlos y analizarlos.',
    solution:
      'Un pipeline ETL incremental consulta la API Socrata, valida y normaliza los registros en PostgreSQL y los expone mediante una API con FastAPI y un panel en Next.js.',
    scope: [
      'Pipeline ETL incremental en Python',
      'Modelo de datos normalizado en PostgreSQL',
      'API REST con FastAPI y validación Pydantic',
      'Panel analítico con filtros en Next.js',
    ],
    output: 'Pipeline incremental e idempotente con registro de rechazos, API documentada y panel con filtros combinables.',
    decisions: [
      {
        title: 'Carga incremental',
        description:
          'El pipeline guarda la marca de tiempo de la última ejecución y solo extrae registros nuevos o modificados, reduciendo el consumo de cuota de la API.',
      },
      {
        title: 'Rechazos auditables',
        description:
          'Los registros que no superan la validación se guardan con su contenido original y el motivo del error, en lugar de descartarse en silencio.',
      },
      {
        title: 'Re-ejecuciones seguras',
        description:
          'La carga es idempotente: volver a ejecutar el pipeline tras un fallo no genera duplicados.',
      },
    ],
    outputs: [
      'Detección automática de carga completa o incremental',
      'Cinco modelos de datos: entidad, proveedor, contrato, rechazo y metadatos del pipeline',
      'API paginada con filtros por fecha, entidad, proveedor y estado',
      'Documentación interactiva de la API generada automáticamente',
    ],
    limitations:
      'Los volúmenes de datos dependen de las fuentes públicas en cada momento; el caso describe la arquitectura, no un indicador de uso.',
    techStack: [
      { name: 'Python 3.12 + SQLAlchemy 2.0', role: 'Pipeline ETL' },
      { name: 'Socrata API (SODA)', role: 'Extracción de datos abiertos' },
      { name: 'PostgreSQL / Neon', role: 'Base de datos normalizada' },
      { name: 'FastAPI + Pydantic v2', role: 'API REST con validación de tipos' },
      { name: 'Next.js 14 + TypeScript', role: 'Panel de análisis' },
      { name: 'TanStack Query v5', role: 'Caché y consultas en cliente' },
    ],
    pipeline: [
      'El extractor consulta SECOP / datos.gov.co mediante la API Socrata.',
      'Una tabla de metadatos guarda la última ejecución para filtrar solo registros nuevos o modificados.',
      'La primera ejecución hace una carga completa; las siguientes son incrementales.',
      'Los registros se normalizan en cinco modelos SQLAlchemy.',
      'Pydantic valida cada registro; los inválidos se guardan con su payload y el error para auditoría.',
      'La carga usa ON CONFLICT DO NOTHING, segura ante re-ejecuciones.',
      'Una variable de entorno permite reprocesar rangos históricos concretos.',
    ],
    image: contratadataImage,
    imageAlt: 'Panel de ContrataData con indicadores de contratación pública, filtros y tabla de contratos',
    githubUrl: 'https://github.com/edt092/contratadata',
    featured: false,
    // En construcción: no se muestra hasta que esté listo (su URL redirige con 302 a /proyectos/)
    published: false,
  },
];

/** Casos visibles en el sitio */
export const projects = allProjects.filter(p => p.published !== false);

export const featuredProjects = projects.filter(p => p.featured);

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
