import { UserRole } from "../generated/prisma/client.js";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  created_at: Date;
}

export interface UserWithPassword {
  id: number;
  email: string;
  passwordHash: string;
  role: UserRole;
}
