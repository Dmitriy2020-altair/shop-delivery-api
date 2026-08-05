import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password_hash: z.string().trim().min(8, 'Password must be at least 8 characters long'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
