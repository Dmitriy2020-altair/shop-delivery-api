import { AppError } from '../errors/AppError.js';
import { UserRole } from '../generated/prisma/enums.js';
import type { AuthActor } from '../types/auth.js';

/**
 * Resource-ownership / RBAC check for user profile access.
 * Admin may access any user; non-admin only their own id.
 */
export function assertCanAccessUser(actor: AuthActor, targetId: number): void {
  if (actor.role === UserRole.admin) {
    return;
  }

  if (actor.id === targetId) {
    return;
  }

  throw new AppError('Forbidden', 403);
}
