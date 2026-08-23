import type { components, paths } from './generated';

/**
 * Convenient aliases derived from the OpenAPI-generated contract.
 * Prefer these over hand-written response types when the schema covers them.
 */

export type HealthResponse =
  paths['/health']['get']['responses'][200]['content']['application/json'];

export type RegisterRequest =
  paths['/api/v1/auth/register']['post']['requestBody']['content']['application/json'];

export type RegisterResponse =
  paths['/api/v1/auth/register']['post']['responses'][201]['content']['application/json'];

export type LoginRequest =
  paths['/api/v1/auth/login']['post']['requestBody']['content']['application/json'];

export type LoginResponse =
  paths['/api/v1/auth/login']['post']['responses'][200]['content']['application/json'];

export type RefreshResponse =
  paths['/api/v1/auth/refresh']['post']['responses'][200]['content']['application/json'];

export type LogoutResponse =
  paths['/api/v1/auth/logout']['post']['responses'][200]['content']['application/json'];

/** Full authenticated user from GET /users/me */
export type User = components['schemas']['UserMe'];

/**
 * Auth store may hold login payload ({ id, email }) until /users/me hydrates
 * the full UserMe profile (role, created_at).
 */
export type AuthUser = User | LoginResponse;
