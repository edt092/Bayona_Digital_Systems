# Seguimiento SEO — tareas del propietario y medición

**Creado:** 25/10/2026 · **D0** = fecha del despliegue en producción de los cambios de `implementacion.md`

## Tareas del propietario

| ID | Tarea | Responsable | Depende de | Evidencia requerida | Estado |
|---|---|---|---|---|---|
| P1 | Verificar la propiedad de dominio en Google Search Console (registro TXT en DNS), enviar `https://www.bayonadigitalsystems.com/sitemap.xml` e inspeccionar `/`, `/servicios/` y `/proyectos/` con la herramienta de inspección de URLs | Propietario | Acceso a DNS | Captura del informe "Páginas" y del estado del sitemap | Pendiente |
| P2 | Confirmar el país o mercado prioritario, el tipo de cliente y el servicio prioritario | Propietario | — | Decisión escrita | Pendiente |
| P3 | Confirmar el perfil de LinkedIn oficial (el repo tenía dos: `/in/bayonadigital` y `/in/edwin-bayona-dev`) | Propietario | — | URL confirmada → añadir a `leadSameAs` en `SEO.astro` | **Hecho** (25/10/2026): `linkedin.com/in/edwin-johan-bayona-4aa4b5428/` en schema, footer y bio |
| P4 | Aportar año y rol de cada caso, y el permiso para nombrar a cada cliente | Propietario | — | Fecha o documento verificable por caso | Pendiente |
| P5 | Configurar `www` como dominio principal en Netlify (Domain management) para que `http://bayonadigitalsystems.com` redirija a `https://www.` en un solo salto | Propietario | Acceso al panel de Netlify | `curl -sI http://bayonadigitalsystems.com/` devuelve un único 301 directo a `https://www.` | Pendiente |
| P6 | Pasar la CSP de report-only a obligatoria | Propietario + desarrollo | Despliegue | Consola sin avisos `[Report Only]` en Home, un servicio, un caso y contacto → renombrar la cabecera a `Content-Security-Policy` en `netlify.toml` | Pendiente |
| P7 | Medir rendimiento de laboratorio (PageSpeed Insights web o Lighthouse) en móvil y escritorio | Desarrollo | Despliegue | Informe con fecha, URL, dispositivo y versión | Pendiente |

> No se automatizan solicitudes de indexación: la Indexing API de Google es solo para ofertas de empleo y emisiones en directo.

## Línea base (a registrar en D0 + 14 días)

| Métrica | Fuente | Valor D0+14 | D0+4 sem | D0+8 sem |
|---|---|---|---|---|
| URLs en sitemap (inventario del build) | `pnpm run check:seo` | 13 | | |
| URLs indexadas / excluidas (y motivo) | GSC → Páginas | | | |
| Consultas de marca: impresiones / clics | GSC → Rendimiento (filtro "bayona") | | | |
| Consultas sin marca: impresiones / clics / posición | GSC → Rendimiento | | | |
| CTR por página (con posición y dispositivo) | GSC → Rendimiento | | | |
| Correos recibidos y correos cualificados por servicio | Bandeja `info@` (registro manual) | | | |
| LCP / INP / CLS p75 móvil | CrUX o RUM, si hay muestra suficiente | | | |

Notas de interpretación:

- Un clic en `mailto:` o en "Copiar dirección" no demuestra que se haya enviado un correo. Solo cuentan los correos recibidos.
- No atribuir un cambio de CTR solo al cambio de título: comparar con la misma posición, consultas, dispositivo, país y un volumen de impresiones suficiente.
- Es probable que el sitio no tenga datos de campo en CrUX por su volumen de tráfico. En ese caso, informar "sin datos de campo" en lugar de presentar el laboratorio como campo.

## Objetivos de seguimiento

- Resolver toda exclusión de indexación involuntaria que aparezca en GSC.
- Observar impresiones para las consultas hipotéticas de `estrategia.md` y ajustar el mapa según las consultas reales.
- Calidad de los contactos: proporción de correos que encajan con los servicios.
- Cuando haya datos de campo: LCP p75 ≤ 2,5 s, INP p75 ≤ 200 ms y CLS p75 ≤ 0,1.
- No se fija un número de URLs indexadas ni una fecha garantizada.

## Calendario de revisión

| Momento | Revisión |
|---|---|
| D0 | Verificación en producción (lista en `implementacion.md` §5), P5, P6 y P7 |
| D0 + 14 días | Línea base en GSC y estado de indexación |
| D0 + 4 semanas | Consultas reales frente al mapa de intención; CTR por página |
| D0 + 8 semanas | Decidir el siguiente contenido (briefs) y si reabrir el blog |

## Backlog editorial (3 briefs)

Ningún artículo se publica sin evidencia propia, y el blog sigue en `noindex` hasta que haya al menos uno útil. Al publicar el primero: quitar el `noindex` (automático cuando hay artículos) y añadir `/blog/` y los artículos al sitemap.

### B1. Cómo mantener un catálogo de proveedor actualizado sin trabajo manual
- **Intención:** informativa con potencial comercial ("automatizar actualización de catálogo de proveedores").
- **Apoya a:** `/servicios/automatizacion-datos/`.
- **Evidencia necesaria:** el flujo de PromoGimmicks (cron diario, reintentos, commit y rebuild) y las lecciones sobre cambios de formato del proveedor. Comprobar que el uso de los datos del proveedor está permitido antes de recomendarlo.
- **CTA:** contacto con `?servicio=automatizacion-datos`.

### B2. Miles de páginas de producto sin contenido delgado: indexar solo lo que aporta
- **Intención:** informativa / técnica ("noindex en páginas de producto", "SEO de catálogos grandes").
- **Apoya a:** `/servicios/productos-web/`.
- **Evidencia necesaria:** el caso KS (2.096 páginas generadas y 2.008 elegibles por configuración) y el criterio de calidad aplicado. **No** afirmar resultados de indexación ni de tráfico sin datos de GSC del proyecto.
- **CTA:** contacto con `?servicio=productos-web`.

### B3. Pipelines ETL incrementales e idempotentes: lo que evita duplicados y pérdidas
- **Estado:** en espera. Su evidencia es el caso ContrataData, que está en construcción y no se publica por ahora.
- **Intención:** informativa técnica ("ETL incremental", "carga idempotente").
- **Apoya a:** `/servicios/automatizacion-datos/`.
- **Evidencia necesaria:** el diseño de ContrataData (marca de tiempo persistida, `ON CONFLICT DO NOTHING`, tabla de rechazos) con extractos del repositorio público.
- **CTA:** contacto con `?servicio=automatizacion-datos`.
