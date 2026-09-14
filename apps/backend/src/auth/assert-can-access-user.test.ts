import { describe, expect, it } from 'vitest';

import { assertCanAccessUser } from '../auth/assert-can-access-user.js';
import { AppError } from '../errors/AppError.js';
import { UserRole } from '../generated/prisma/enums.js';

describe('assertCanAccessUser', () => {
  it('allows admin to access any user id', () => {
    expect(() =>
      assertCanAccessUser({ id: 1, role: UserRole.admin }, 99),
    ).not.toThrow();
  });

  it('allows a user to access their own id', () => {
    expect(() =>
      assertCanAccessUser({ id: 7, role: UserRole.user }, 7),
    ).not.toThrow();
  });

  it('forbids a non-admin from accessing another user', () => {
    expect(() =>
      assertCanAccessUser({ id: 7, role: UserRole.user }, 8),
    ).toThrow(AppError);

    try {
      assertCanAccessUser({ id: 7, role: UserRole.user }, 8);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).statusCode).toBe(403);
      expect((error as AppError).message).toBe('Forbidden');
    }
  });
});
