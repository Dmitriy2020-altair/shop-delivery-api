import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().trim().email('Invalid email address').optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
