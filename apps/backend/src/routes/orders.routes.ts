import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { CreateOrderSchema } from '../schemas/order.schema.js';
import orderController from '../controllers/orders.controller.js';

const router = Router();

router.post('/', validateBody(CreateOrderSchema), orderController.createOrder);

export default router;
