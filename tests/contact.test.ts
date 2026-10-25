import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto, validateDraft, NEED_MIN_LENGTH } from '../src/lib/contact.ts';

const valid = {
  name: 'Ana Pérez',
  company: 'Acme',
  service: 'Productos web B2B',
  need: 'Necesitamos publicar nuestro catálogo conectado al inventario.',
};

test('un borrador completo no tiene errores', () => {
  assert.deepEqual(validateDraft(valid), {});
});

test('nombre y necesidad son obligatorios', () => {
  const errors = validateDraft({ name: '  ', need: '' });
  assert.ok(errors.name);
  assert.ok(errors.need);
});

test('la necesidad exige un mínimo de contexto', () => {
  const errors = validateDraft({ name: 'Ana', need: 'x'.repeat(NEED_MIN_LENGTH - 1) });
  assert.ok(errors.need);
  assert.equal(validateDraft({ name: 'Ana', need: 'x'.repeat(NEED_MIN_LENGTH) }).need, undefined);
});

test('el mailto va a la dirección indicada y codifica asunto y cuerpo', () => {
  const url = buildMailto('hola@example.com', valid);
  assert.ok(url.startsWith('mailto:hola@example.com?subject='));
  const params = new URLSearchParams(url.split('?')[1]);
  assert.equal(params.get('subject'), 'Proyecto de Acme');
  const body = params.get('body') ?? '';
  assert.match(body, /Necesitamos publicar nuestro catálogo/);
  assert.match(body, /Empresa: Acme/);
  assert.match(body, /Servicio de interés: Productos web B2B/);
});

test('los campos opcionales vacíos no aparecen en el cuerpo', () => {
  const url = buildMailto('hola@example.com', { name: 'Ana', need: valid.need, company: '', service: '' });
  const body = new URLSearchParams(url.split('?')[1]).get('body') ?? '';
  assert.doesNotMatch(body, /Empresa:/);
  assert.doesNotMatch(body, /Servicio de interés:/);
});
