import { sign, SignOptions } from "jsonwebtoken";
import dayjs from "dayjs";
import authConfig from '@config/auth';
import ITokenProvider from "../models/iTokenProvider";
import RefreshToken from "@modules/users/infra/prisma/entities/RefreshToken";
import FakeRefreshTokenRepository from "@modules/users/repositories/fakes/FakeRefreshTokenRepository";

class FakeTokenProvider implements ITokenProvider {
  generateToken(options: SignOptions): string {
    const { secret, expiresIn } = authConfig.token;
    const { subject } = options;
    return sign({}, secret, {
      subject,
      expiresIn
    });
  }

  public async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const refreshTokenRepository = new FakeRefreshTokenRepository
    const expiresIn = dayjs().add(7, "d").unix()
    const generatedRefreshToken =  await refreshTokenRepository.create({
      expiresIn,
      userId
    })
    return generatedRefreshToken
  }

}

export default FakeTokenProvider
