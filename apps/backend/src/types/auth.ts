export interface RefreshToken {
  id: number;
  userId: number;
  tokenHash: string;
  familyId: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}
