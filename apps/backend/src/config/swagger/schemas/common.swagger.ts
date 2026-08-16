/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorMessage:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: Internal server error
 *     ValidationError:
 *       type: object
 *       required:
 *         - message
 *         - errors
 *       properties:
 *         message:
 *           type: string
 *           example: Validation failed
 *         errors:
 *           type: object
 *           additionalProperties:
 *             type: array
 *             items:
 *               type: string
 *           example:
 *             email:
 *               - Invalid email address
 *             password:
 *               - Password must be at least 8 characters long
 *     HealthStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 */
export {};
