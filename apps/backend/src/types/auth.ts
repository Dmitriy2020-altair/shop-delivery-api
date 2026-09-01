import { UserRole } from "../generated/prisma/enums.js";

export interface RefreshToken {
  id: number;
  userId: number;
  tokenHash: string;
  familyId: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export type AuthActor = {
  id: number;
  role: UserRole;
};
