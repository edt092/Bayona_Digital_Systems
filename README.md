# Bayona Digital Systems — Portfolio

> Sitio web de portfolio profesional para **Bayona Digital Systems**, construido con Astro 5, Tailwind CSS 4 y un sistema de reservas en tiempo real.

**Live:** [bayonadigitalsystems.com](https://bayonadigitalsystems.com)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com) |
| Reservas | [Supabase](https://supabase.com) (PostgreSQL serverless) |
| Emails | [EmailJS](https://emailjs.com) (client-side, sin servidor) |
| Deploy | Static export — compatible con Netlify / Vercel / Cloudflare Pages |
| Lenguaje | TypeScript |

---

## Funcionalidades

- **Hero animado** con badges flotantes y visual responsive
- **Casos de éxito reales** con páginas de detalle por proyecto: pipeline técnico, stack, features
- **Widget de reservas** — calendario Junio 2026, slots de 20 min (08:00–18:00), prevención de doble reserva cross-device via Supabase, notificación email automática
- **Testimonios** con avatares reales (Pravatar CDN)
- **Blog** listo para contenido Markdown
- **SEO** — meta tags, Open Graph, sitemap.xml automático
- **Modo oscuro / claro** via CSS variables
- **Diseño 100 % responsive** — mobile-first

---

## Proyectos destacados

| Proyecto | Industria | Stack |
|---|---|---|
| [KS Promocionales](https://github.com/edt092/ksp-ecommerce-engine) | E-commerce B2B | Next.js 14, Python, Claude AI, Neon |
| [PromoGimmicks](https://github.com/edt092/promogimmicks-fullstack-commerce) | E-commerce | Next.js 14, GitHub Actions, BeautifulSoup |
| [ContrataData](https://github.com/edt092/contratadata) | GovTech / Data | FastAPI, Next.js 14, ETL Pipeline, PostgreSQL |

---

## Estructura del proyecto

```
/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── bds-logo.png
│   └── images/              # Imágenes de proyectos
├── src/
│   ├── components/
│   │   ├── layout/          # Layout, Navbar, Footer, SEO
│   │   ├── sections/        # Hero, Projects, About, Testimonials, CTAFinal…
│   │   └── ui/
│   │       └── BookingModal.astro   # Widget de reservas
│   ├── data/
│   │   ├── projects.ts      # Datos de proyectos
│   │   └── testimonials.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── proyectos/[slug].astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts
└── .env                     # Variables de entorno (no se sube a Git)
```

---

## Setup local

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/edt092/<repo>.git
cd bayona-digital-systems-portfolio
npm install
```

### 2. Variables de entorno

Crea un archivo `.env` en la raíz con los siguientes valores:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...

# EmailJS
PUBLIC_EMAILJS_SERVICE_ID=service_xxx
PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

### 3. Base de datos (Supabase)

Ejecuta este SQL en el **SQL Editor** de tu proyecto Supabase:

```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time_slot TIME NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, time_slot)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read"   ON bookings FOR SELECT USING (true);
CREATE POLICY "insert" ON bookings FOR INSERT WITH CHECK (true);
```

### 4. Servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321)

---

## Comandos disponibles

```bash
npm run dev       # Servidor de desarrollo (localhost:4321)
npm run build     # Build de producción → dist/
npm run preview   # Preview del build estático
```

---

## Deploy

El proyecto genera un output 100 % estático (`dist/`). Compatible con cualquier CDN:

```bash
npm run build
# Sube el contenido de dist/ a tu proveedor
```

> **Netlify / Vercel:** configura las variables de entorno en el dashboard antes del deploy para que el widget de reservas funcione en producción.

---

## Widget de reservas — cómo funciona

1. El usuario hace clic en cualquier botón **"Agenda una llamada"**
2. Aparece un modal con el calendario de Junio 2026 (días pasados deshabilitados)
3. Elige un slot de 20 minutos disponible (08:00–18:00)
4. Completa el formulario: nombre, país, teléfono, email, notas
5. Al confirmar:
   - La reserva se guarda en Supabase con restricción `UNIQUE(date, time_slot)` — previene colisiones desde cualquier dispositivo
   - Se envía un email de notificación a `info@bayonadigitalsystems.com` vía EmailJS

---

## Licencia

Este proyecto es de uso privado. Todos los derechos reservados © Bayona Digital Systems.
