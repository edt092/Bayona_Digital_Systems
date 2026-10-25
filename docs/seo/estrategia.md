# Estrategia SEO — mapa de intención

**Fecha:** 25/10/2026 · **Estado:** hipótesis de trabajo

> **Importante:** las consultas de este documento son **hipótesis**. No se ha medido su volumen de búsqueda, no hay datos de Search Console y no se ha analizado la SERP de cada una. Están escritas en español neutro y sin país, porque el mercado comercial aún no está confirmado (ver `seguimiento.md`, tarea P2). Se validarán con GSC a las 4–8 semanas del despliegue.

## Principios

- Un tema principal por URL, para evitar canibalización.
- La Home presenta la marca y reparte el tráfico hacia los servicios. No compite con ellos por la misma consulta.
- Los casos de estudio son la **evidencia** de cada servicio. Apoyan su consulta con enlaces internos, pero no intentan posicionar por ella.
- No se crean páginas por ciudad ni contenido de relleno. El blog sigue en `noindex` hasta que tenga artículos útiles.

## Mapa por URL

| URL | Intención | Consulta principal (hipótesis) | Variantes (hipótesis) | Evidencia disponible en la página | Conversión esperada |
|---|---|---|---|---|---|
| `/` | Navegacional / comercial | Bayona Digital Systems | desarrollo web B2B y automatización · estudio de desarrollo web y datos | Hero con flujo real de KS, 3 casos con repositorio, proceso | Clic a un servicio o caso; contacto |
| `/servicios/` | Comercial (comparar) | servicios de desarrollo web B2B | desarrollo de catálogos y automatización de datos · servicios de integración de datos | Resumen de los 2 servicios con casos relacionados | Clic a la página de detalle del servicio |
| `/servicios/productos-web/` | Comercial | desarrollo de catálogo web B2B | desarrollo de plataformas web B2B · catálogo de productos online para empresas · catálogo B2B conectado a inventario · migración de sitio web sin perder SEO | Escenarios, alcance, entregables, criterios de calidad, casos KS y PromoGimmicks | Contacto con `?servicio=productos-web` |
| `/servicios/automatizacion-datos/` | Comercial | automatización de catálogos e integración de datos | pipeline ETL a medida · automatizar actualización de catálogo de proveedores · integración de datos entre sistemas · scraping de catálogo de proveedor | Fuentes automatizadas en los casos (scraping, API Socrata, PostgreSQL), casos ContrataData, PromoGimmicks y KS | Contacto con `?servicio=automatizacion-datos` |
| `/proyectos/` | Investigación (evidencia) | casos de estudio de desarrollo B2B | ejemplos de catálogos B2B automatizados · proyectos de integración de datos | 3 casos con reto y resultado técnico | Apertura de un caso |
| `/proyectos/ks-promocionales/` | Investigación | catálogo B2B automatizado (caso) | generación estática de páginas de producto · enriquecimiento de catálogo con IA | Pipeline paso a paso, decisiones, repositorio público | Servicio relacionado o contacto |
| `/proyectos/promogimmicks/` | Investigación | catálogo actualizado automáticamente a diario (caso) | scraping diario con GitHub Actions · actualización automática de e-commerce | Pipeline, decisiones, repositorio público | Servicio relacionado o contacto |
| `/proyectos/contratadata/` | Investigación | ETL de datos de contratación pública (caso) | API de datos SECOP · pipeline incremental idempotente | Pipeline, decisiones, repositorio público | Servicio relacionado o contacto |
| `/como-trabajamos/` | Confianza | proceso de desarrollo web por fases | quién realiza el trabajo · entregables de un proyecto web | 5 fases con entregables, responsable técnico, GitHub | Contacto |
| `/contacto/` | Transaccional | contacto Bayona Digital Systems | — | Qué ocurre después, uso de datos | Correo enviado (no medible desde el sitio) |
| `/privacidad/`, `/terminos/` | Informativa (legal) | — | — | — | — |
| `/blog/` | — (noindex) | — | — | Sin artículos | — |

## Cambios de contenido aplicados por este mapa

- **Productos web:** el H1 pasa de "Plataformas y catálogos web para vender y operar en B2B" a "Desarrollo de catálogos y plataformas web B2B". Se reescribe el resumen y se añade una FAQ sobre la conexión con el inventario, cuya respuesta se limita a lo demostrado en los casos.
- **Automatización:** el H1 pasa de "Pipelines, integraciones y paneles que eliminan trabajo manual" a "Automatización de catálogos e integración de datos". Se reescribe el resumen y se añade una FAQ con las fuentes reales automatizadas en los casos.
- **Home:** el eyebrow pasa a "Desarrollo web B2B · Automatización · Datos". El H1 de marca no cambia (decisión de la auditoría UX).
- **Cómo trabajamos:** se añade el bloque "Responsable técnico", solo con hechos verificables: los repositorios públicos y el stack que aparece en ellos.

## Pendiente de datos

- Confirmar el mercado y país para decidir si añadir el país a las consultas y textos.
- Validar las consultas con GSC (impresiones reales) antes de reescribir más contenido.
- No reformular el H1 de la Home sin ver primero las consultas de marca y no marca en GSC.
