import { Prisma } from "@prisma/client";
import RefreshToken from "../infra/prisma/entities/RefreshToken";

export default interface IRefreshTokenRepository {
  create(refreshTokenData: Prisma.RefreshTokenCreateManyInput): Promise<RefreshToken>
  find(id: string): Promise<RefreshToken>
  findByUserId(userId: string): Promise<RefreshToken>
  delete(id: string): Promise<RefreshToken>
}