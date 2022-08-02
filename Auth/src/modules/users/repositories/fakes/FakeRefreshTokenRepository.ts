import { uuid } from "uuidv4";
import RefreshToken from "@modules/users/infra/prisma/entities/RefreshToken";
import { Prisma } from "@prisma/client";
import IRefreshTokenRepository from "../IRefreshTokenRepository";

class FakeRefreshTokenRepository implements IRefreshTokenRepository {
  private refresh_tokens: RefreshToken[] = [];

  public async create(refreshTokenData: Prisma.RefreshTokenCreateManyInput): Promise<RefreshToken> {
    const refresh_token = new RefreshToken();

    Object.assign(refresh_token, {id: uuid()}, refreshTokenData);

    this.refresh_tokens.push(refresh_token);

    return refresh_token;
  }

  public async find(id: string): Promise<RefreshToken> {
    const findRefreshToken = this.refresh_tokens.find(refresh_token => refresh_token.id === id);

    return findRefreshToken;
  }

  public async findByUserId(userId: string): Promise<RefreshToken> {
    const findRefreshToken = this.refresh_tokens.find(refresh_token => refresh_token.userId === userId);

    return findRefreshToken;
  }

  public async delete(id: string): Promise<RefreshToken> {
    this.refresh_tokens = this.refresh_tokens.filter(refresh_token => refresh_token.id !== id);

    return
  }
}

export default FakeRefreshTokenRepository;
