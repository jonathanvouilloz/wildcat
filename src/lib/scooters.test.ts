import test from 'node:test';
import assert from 'node:assert/strict';
import { scooterAvailabilityMap } from './scooters.ts';

test('valid entries map slug to availability boolean', () => {
  assert.deepEqual(
    scooterAvailabilityMap([
      { slug: 'honda-lead', available: true },
      { slug: 'honda-scoopy-i-prestige', available: false },
    ]),
    { 'honda-lead': true, 'honda-scoopy-i-prestige': false },
  );
});

test('non-array or malformed entries are ignored safely', () => {
  assert.deepEqual(scooterAvailabilityMap(null), {});
  assert.deepEqual(scooterAvailabilityMap({}), {});
  assert.deepEqual(
    scooterAvailabilityMap([
      null,
      { slug: '', available: true },
      { slug: 'honda-lead', available: 'yes' },
      { slug: 'honda-scoopy-i-prestige', available: false },
    ]),
    { 'honda-scoopy-i-prestige': false },
  );
});
