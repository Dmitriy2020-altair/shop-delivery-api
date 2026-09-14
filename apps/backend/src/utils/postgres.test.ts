import { describe, expect, it } from 'vitest';

import { isPostgresError } from '../utils/postgres.js';

describe('isPostgresError', () => {
  it('returns true for objects with a string code', () => {
    expect(isPostgresError({ code: '23505' })).toBe(true);
  });

  it('returns false for non-matching values', () => {
    expect(isPostgresError(null)).toBe(false);
    expect(isPostgresError({ code: 123 })).toBe(false);
    expect(isPostgresError(new Error('nope'))).toBe(false);
  });
});
