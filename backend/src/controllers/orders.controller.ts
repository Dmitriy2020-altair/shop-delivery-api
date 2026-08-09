import type { Request, Response } from 'express';

import ordersService from '../services/orders.service.js';
import type { CreateOrderDto } from '../schemas/order.schema.js';

class OrdersController {
  async createOrder(req: Request, res: Response): Promise<void> {
    const order = await ordersService.createOrder(
      req.body as CreateOrderDto
    );

    res.status(201).json(order);
  }
}

export default new OrdersController();