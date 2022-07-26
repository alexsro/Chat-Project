import AppError from "../../../shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import IRefreshTokenRepository from "../repositories/IRefreshTokenRepository";

interface IRequest {
  refresh_token_id: string;
}

@injectable()
class RefreshTokenInvalidateService {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  public async execute({refresh_token_id}: IRequest): Promise<void>{
    const refreshToken = await this.refreshTokenRepository.find(refresh_token_id)

    if (!refreshToken) {
      throw new AppError ("Refresh token invalid", 401)
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
    if (refreshTokenExpired) {
      throw new AppError ("You can't invalidate an expired refresh token", 401)
    }

    await this.refreshTokenRepository.delete(refresh_token_id);
  
    return
  }
}

export default RefreshTokenInvalidateService;