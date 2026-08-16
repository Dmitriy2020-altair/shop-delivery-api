/**
 * @openapi
 * components:
 *   responses:
 *     ValidationError:
 *       description: Validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidationError'
 *     Unauthorized:
 *       description: Authentication required or invalid credentials/token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *     Forbidden:
 *       description: Authenticated but not allowed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: Forbidden
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *     InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: Internal server error
 */
export {};
