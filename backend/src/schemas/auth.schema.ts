import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const LoginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
