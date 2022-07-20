import { SignOptions } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/iHashProvider';
import User from '../infra/prisma/entities/User';
import ITokenProvider from '../providers/TokenProvider/models/iTokenProvider';
import RefreshToken from '../infra/prisma/entities/RefreshToken';
import IRefreshTokenRepository from '../repositories/IRefreshTokenRepository';
import dayjs from 'dayjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  access_token: string;
  refresh_token: RefreshToken
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError(`Incorrect email/password combination.`, 401);
    }

    const options: SignOptions = {
      subject: user.id
    };

    const access_token = this.tokenProvider.generateToken(options);

    const refreshToken = await this.refreshTokenRepository.findByUserId(user.id);

    let refresh_token;
    if (!refreshToken) {
      refresh_token = await this.tokenProvider.generateRefreshToken(user.id);
    } else{
      const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
      if (refreshTokenExpired) {
        await this.refreshTokenRepository.delete(refreshToken.id)
        refresh_token = await this.tokenProvider.generateRefreshToken(user.id);
      } else {
        refresh_token = refreshToken;
      }
    }

    return {
      user,
      access_token,
      refresh_token
    };
  }
}

export default AuthenticateUserService;
