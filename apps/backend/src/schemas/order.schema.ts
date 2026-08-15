import { z } from 'zod';

export const OrderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item'),
});

export type OrderItemDto = z.infer<typeof OrderItemSchema>;
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
