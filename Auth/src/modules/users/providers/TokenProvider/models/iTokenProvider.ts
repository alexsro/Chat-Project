import RefreshToken from "../../../../users/infra/prisma/entities/RefreshToken";
import { SignOptions } from "jsonwebtoken";

export default interface ITokenProvider {
  generateToken(options: SignOptions): string;
  generateRefreshToken(userId: string): Promise<RefreshToken>;
}