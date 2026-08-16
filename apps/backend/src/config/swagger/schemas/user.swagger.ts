/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2026-08-16T20:15:00.000Z'
 *     UserMe:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - role
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           example: user
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2026-08-16T20:15:00.000Z'
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: new@example.com
 */
export {};
