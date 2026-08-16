/**
 * Auth-specific reusable OpenAPI responses.
 * Cookie-based auth endpoints share Unauthorized via common.responses.
 *
 * @openapi
 * components:
 *   responses:
 *     RefreshUnauthorized:
 *       description: Missing, invalid, expired, or reused refresh token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           examples:
 *             missing:
 *               value:
 *                 message: Refresh token required
 *             invalid:
 *               value:
 *                 message: Invalid refresh token
 *             reuse:
 *               value:
 *                 message: Refresh token reuse detected
 *             expired:
 *               value:
 *                 message: Refresh token expired
 */
export {};
