/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           example: password123
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           minLength: 1
 *           example: password123
 *     LoginResponse:
 *       type: object
 *       required:
 *         - id
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *     MessageResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: Logged out
 *     AuthUser:
 *       type: object
 *       required:
 *         - id
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           example: user
 *     AuthenticatedResponse:
 *       type: object
 *       required:
 *         - message
 *         - user
 *       properties:
 *         message:
 *           type: string
 *           example: Authenticated
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 */
export {};
