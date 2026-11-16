import test from 'node:test';
import assert from 'node:assert/strict';
import { closedText } from './closures.ts';

const p = (starts_on: string, ends_on: string) => ({ starts_on, ends_on });

test('empty list gives an empty string', () => {
  assert.equal(closedText([], 'en'), '');
});

test('a same-year range shows the year once', () => {
  const t = closedText([p('2026-12-10', '2026-12-25')], 'en');
  assert.match(t, /10/);
  assert.match(t, /25/);
  assert.equal(t.split('2026').length - 1, 1);
});

test('a range across new year shows both years', () => {
  const t = closedText([p('2026-12-28', '2027-01-04')], 'en');
  assert.match(t, /2026/);
  assert.match(t, /2027/);
});

test('periods are joined with " · "', () => {
  const t = closedText([p('2026-12-10', '2026-12-12'), p('2027-02-01', '2027-02-03')], 'en');
  assert.equal(t.split(' · ').length, 2);
});

test('same start and end day shows a single date', () => {
  assert.equal(closedText([p('2026-12-10', '2026-12-10')], 'en').match(/10/g)?.length, 1);
});

test('an invalid date gives an empty string', () => {
  assert.equal(closedText([p('nope', '2026-12-10')], 'en'), '');
  assert.equal(closedText([p('2026-12-10', '2026-13-45')], 'en'), '');
});

test('fr renders a French month and the year once', () => {
  const t = closedText([p('2026-12-10', '2026-12-25')], 'fr');
  assert.match(t, /déc/);
  assert.equal(t.split('2026').length - 1, 1);
});
