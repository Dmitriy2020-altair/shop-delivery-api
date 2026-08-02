import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().int().nonnegative('Quantity cannot be negative'),
  category: z.string().trim().min(1, 'Category is required'),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
