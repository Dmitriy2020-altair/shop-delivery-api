/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - quantity
 *         - category
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: iPhone 16
 *         price:
 *           type: number
 *           example: 999
 *         quantity:
 *           type: integer
 *           example: 15
 *         category:
 *           type: string
 *           example: Phones
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2026-08-16T20:15:00.000Z'
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: iPhone 16
 *         price:
 *           type: number
 *           exclusiveMinimum: 0
 *           example: 999
 *         quantity:
 *           type: integer
 *           minimum: 0
 *           example: 15
 *         category:
 *           type: string
 *           example: Phones
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: iPhone 16
 *         price:
 *           type: number
 *           exclusiveMinimum: 0
 *           example: 999
 *         quantity:
 *           type: integer
 *           minimum: 0
 *           example: 15
 *         category:
 *           type: string
 *           example: Phones
 */
export {};
