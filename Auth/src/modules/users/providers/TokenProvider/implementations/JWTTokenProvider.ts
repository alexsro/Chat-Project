import IRefreshTokenRepository from "../../../../users/repositories/IRefreshTokenRepository";
import { sign, SignOptions } from "jsonwebtoken";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import authConfig from '../../../../../config/auth';
import ITokenProvider from "../models/iTokenProvider";
import RefreshToken from "../../../../users/infra/prisma/entities/RefreshToken";

@injectable()
class JWTTokenProvider implements ITokenProvider {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  generateToken(options: SignOptions): string {
    const { secret, expiresIn } = authConfig.token;
    const { subject } = options;
    return sign({}, secret, {
      subject,
      expiresIn
    });
  }

  public async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(7, "d").unix()
    const generatedRefreshToken =  await this.refreshTokenRepository.create({
      expiresIn,
      userId
    })
    return generatedRefreshToken
  }

}

export default JWTTokenProvider