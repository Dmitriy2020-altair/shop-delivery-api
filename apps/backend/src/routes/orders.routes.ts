import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { CreateOrderSchema } from '../schemas/order.schema.js';
import orderController from '../controllers/orders.controller.js';

const router = Router();

/**
 * @openapi
 * /api/v1/orders:
 *   post:
 *     summary: Create an order
 *     description: >
 *       Creates an order with line items in a DB transaction.
 *       The authenticated user id is not taken from the request body yet
 *       (service currently uses a hardcoded user id).
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       '201':
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOrderResponse'
 *       '400':
 *         description: Validation failed, duplicate products, or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorMessage'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validateBody(CreateOrderSchema), orderController.createOrder);

export default router;
