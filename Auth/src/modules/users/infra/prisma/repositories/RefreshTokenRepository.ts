
import IRefreshTokenRepository from '@modules/users/repositories/IRefreshTokenRepository';
import { Prisma } from '@prisma/client';
import { client } from '@shared/infra/prisma/client';
import RefreshToken from '@modules/users/infra/prisma/entities/RefreshToken';
class RefreshTokenRepository implements IRefreshTokenRepository {
  public async create(refreshTokenData: Prisma.RefreshTokenCreateManyInput): Promise<RefreshToken> {
    const refreshToken = await client.refreshToken.create({
      data: {
        expiresIn: refreshTokenData.expiresIn,
        userId: refreshTokenData.userId
      }
    });
    return refreshToken;
  }

  public async find(id: string): Promise<RefreshToken> {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id
      }
    });

    return refreshToken;
  }

  public async findByUserId(userId: string): Promise<RefreshToken> {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        userId
      }
    });

    return refreshToken;
  }

  public async delete(id: string): Promise<RefreshToken>{
    const deletedRefreshToken = await client.refreshToken.delete({
      where:{
        id
      }
    });

    return deletedRefreshToken;
  }
}

export default RefreshTokenRepository;