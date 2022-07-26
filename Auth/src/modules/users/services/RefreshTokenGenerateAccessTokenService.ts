import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";
import { SignOptions } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import ITokenProvider from "@modules/users/providers/TokenProvider/models/iTokenProvider";
import IRefreshTokenRepository from "@modules/users/repositories/IRefreshTokenRepository";

interface IRequest {
  refresh_token: string;
}

interface IResponse {
  access_token: string;
}

@injectable()
class RefreshTokenGenerateAccessTokenService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository
  ){}

  public async execute({refresh_token}: IRequest): Promise<IResponse>{
    const refreshToken = await this.refreshTokenRepository.find(refresh_token)

    if (!refreshToken) {
      throw new AppError ("Refresh token invalid", 401)
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
    if (refreshTokenExpired) {
      throw new AppError ("Refresh token expired. Authenticate your user to receive a new", 401)
    }

    const options: SignOptions = {
      subject: refreshToken.userId
    };  
    const access_token = this.tokenProvider.generateToken(options);

    return { access_token }
  }
}

export default RefreshTokenGenerateAccessTokenService;