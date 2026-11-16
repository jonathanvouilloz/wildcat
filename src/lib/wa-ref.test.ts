import test from 'node:test';
import assert from 'node:assert/strict';
import { newCode, isCampLink, codeIn, withRef, topicOf, pageOf } from './wa-ref.ts';

const CAMP = 'https://wa.me/66857209620';

test('newCode matches the code format', () => {
  for (let i = 0; i < 200; i++) assert.match(newCode(), /^WC-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/);
});

test('isCampLink only matches the camp number', () => {
  assert.equal(isCampLink(CAMP, CAMP), true);
  assert.equal(isCampLink(`${CAMP}?text=Hi`, CAMP), true);
  assert.equal(isCampLink('https://wa.me/?text=post', CAMP), false);
  assert.equal(isCampLink('https://example.com/66857209620', CAMP), false);
});

test('withRef adds the code to the text', () => {
  const t = (u: string) => new URL(u).searchParams.get('text');
  assert.equal(t(withRef(`${CAMP}?text=Hi`, 'WC-7K2P')), 'Hi (ref WC-7K2P)');
  assert.equal(t(withRef(CAMP, 'WC-7K2P')), '(ref WC-7K2P)');
  assert.equal(withRef('::not a url', 'WC-7K2P'), '::not a url');
});

test('ref already present is kept', () => {
  const u = withRef(`${CAMP}?text=Hi`, 'WC-7K2P');
  const again = withRef(u, 'WC-AAAA');
  assert.equal(again, u);
  assert.equal(codeIn(again), 'WC-7K2P');
  assert.equal(codeIn(CAMP), null);
});

test('topicOf maps page paths', () => {
  assert.equal(topicOf('/en/stay-train/scooter-rental'), 'scooter');
  assert.equal(topicOf('/fr/stay-train'), 'stay');
  assert.equal(topicOf('/en/dtv-visa/faq'), 'dtv');
  assert.equal(topicOf('/en/classes/beginners'), 'class');
  assert.equal(topicOf('/en/blog/x'), 'general');
  assert.equal(topicOf('/'), 'general');
});

test('pageOf keeps only paths the app accepts', () => {
  assert.equal(pageOf('/en/stay-train'), '/en/stay-train');
  assert.equal(pageOf('/' + 'a'.repeat(149)).length, 101);
  assert.equal(pageOf('/en/Blog%20x'), '/');
});
