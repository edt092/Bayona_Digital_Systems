import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND,
  buildSitemap,
  buildTitle,
  caseStudyNode,
  organizationGraph,
  serializeJsonLd,
  serviceNode,
  websiteNode,
} from '../src/lib/seo.ts';

const SITE = 'https://www.bayonadigitalsystems.com';

test('buildTitle añade la marca una sola vez', () => {
  assert.equal(buildTitle('Contacto: cuéntanos tu proyecto'), `Contacto: cuéntanos tu proyecto | ${BRAND}`);
});

test('buildTitle respeta brand: false y no recorta', () => {
  const long = 'Un título editorial deliberadamente largo que no debe recortarse automáticamente';
  assert.equal(buildTitle(long, { brand: false }), long);
  assert.equal(buildTitle(`  ${long}  `, { brand: false }), long);
});

test('buildTitle no depende de que el texto contenga la marca', () => {
  // La heurística anterior añadía el sufijo si faltaba el nombre exacto, duplicando "Bayona".
  assert.equal(buildTitle('Bayona Digital: servicios'), `Bayona Digital: servicios | ${BRAND}`);
});

test('serializeJsonLd no permite cerrar la etiqueta script', () => {
  const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
  assert.doesNotMatch(out, /<\/script>/i);
  assert.deepEqual(JSON.parse(out), { name: '</script><script>alert(1)</script>' });
});

test('las entidades se enlazan por @id estable', () => {
  const [org, person] = organizationGraph({
    siteUrl: SITE,
    name: BRAND,
    description: 'd',
    email: 'hola@example.com',
    logoUrl: `${SITE}/logo-512.png`,
    lead: 'Edwin Bayona',
    leadSameAs: ['https://github.com/edt092'],
  }) as Array<Record<string, any>>;
  assert.equal(org['@type'], 'Organization');
  assert.equal(org.founder['@id'], person['@id']);
  assert.equal(person.worksFor['@id'], org['@id']);
  assert.equal(websiteNode(SITE, BRAND).publisher['@id'], org['@id']);
  const service = serviceNode(SITE, { name: 'S', description: 'd', url: `${SITE}/servicios/x/`, serviceType: 't' });
  assert.equal(service.provider['@id'], org['@id']);
});

test('el repositorio de un caso va en SoftwareSourceCode.codeRepository, no en sameAs', () => {
  const node = caseStudyNode(SITE, {
    name: 'Caso',
    headline: 'h',
    description: 'd',
    url: `${SITE}/proyectos/caso/`,
    image: `${SITE}/og/caso.jpg`,
    about: ['Servicio'],
    repository: 'https://github.com/edt092/caso',
  }) as Record<string, any>;
  assert.equal(node.sameAs, undefined);
  assert.equal(node.isBasedOn['@type'], 'SoftwareSourceCode');
  assert.equal(node.isBasedOn.codeRepository, 'https://github.com/edt092/caso');
  const withoutRepo = caseStudyNode(SITE, { ...node, about: [], repository: undefined } as any) as Record<string, any>;
  assert.equal(withoutRepo.isBasedOn, undefined);
});

test('el sitemap incluye lastmod solo cuando existe y deduplica rutas', () => {
  const xml = buildSitemap(SITE, [{ path: '/', lastmod: '2026-10-25' }, { path: '/a/' }, { path: '/' }]);
  assert.equal(xml.match(/<url>/g)?.length, 2);
  assert.match(xml, /<loc>https:\/\/www\.bayonadigitalsystems\.com\/<\/loc>\s*<lastmod>2026-10-25<\/lastmod>/);
  assert.match(xml, /<loc>https:\/\/www\.bayonadigitalsystems\.com\/a\/<\/loc>\s*<\/url>/);
  assert.doesNotMatch(xml, /priority|changefreq/);
});

test('el sitemap rechaza fechas con formato inválido', () => {
  assert.throws(() => buildSitemap(SITE, [{ path: '/', lastmod: '25/10/2026' }]));
});
