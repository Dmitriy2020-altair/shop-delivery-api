export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

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
