/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItemInput:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: integer
 *           exclusiveMinimum: 0
 *           example: 1
 *         quantity:
 *           type: integer
 *           exclusiveMinimum: 0
 *           example: 2
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/OrderItemInput'
 *     CreateOrderResponse:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 */
export {};
