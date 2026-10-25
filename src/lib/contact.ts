/**
 * Borrador de correo para /contacto/.
 * El sitio no tiene backend de formularios: abrir un mailto: no envía nada,
 * por lo que la interfaz nunca debe presentar esto como "solicitud enviada".
 */

export interface ContactDraft {
  name: string;
  company?: string;
  service?: string;
  need: string;
}

export type ContactErrors = Partial<Record<'name' | 'need', string>>;

export const NEED_MIN_LENGTH = 20;

export function validateDraft(draft: ContactDraft): ContactErrors {
  const errors: ContactErrors = {};
  if (!draft.name.trim()) {
    errors.name = 'Escribe tu nombre para que sepamos a quién responder.';
  }
  const need = draft.need.trim();
  if (!need) {
    errors.need = 'Cuéntanos qué necesita resolver tu equipo.';
  } else if (need.length < NEED_MIN_LENGTH) {
    errors.need = `Añade un poco más de contexto (mínimo ${NEED_MIN_LENGTH} caracteres).`;
  }
  return errors;
}

export function buildMailto(to: string, draft: ContactDraft): string {
  const name = draft.name.trim();
  const company = draft.company?.trim();
  const service = draft.service?.trim();

  const subject = company ? `Proyecto de ${company}` : `Proyecto: consulta de ${name}`;
  const lines = [
    'Hola,',
    '',
    draft.need.trim(),
    '',
    '---',
    `Nombre: ${name}`,
    ...(company ? [`Empresa: ${company}`] : []),
    ...(service ? [`Servicio de interés: ${service}`] : []),
  ];

  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`;
  return `mailto:${to}?${params}`;
}
