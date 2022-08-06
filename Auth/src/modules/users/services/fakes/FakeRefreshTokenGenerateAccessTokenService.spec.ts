import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";

import FakeTokenProvider from "@modules/users/providers/TokenProvider/fakes/FakeTokenProvider";
import FakeRefreshTokenRepository from "@modules/users/repositories/fakes/FakeRefreshTokenRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import CreateUserService from "../CreateUserService";
import RefreshTokenGenerateAccessTokenService from '../RefreshTokenGenerateAccessTokenService'

let fakeTokenProvider: FakeTokenProvider;
let fakeHashProvider: FakeHashProvider;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let refreshTokenGenerateAccessToken: RefreshTokenGenerateAccessTokenService;

describe('RefreshTokenGenerateAccessToken', () => {
  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider;
    fakeHashProvider = new FakeHashProvider;
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository;
    fakeUsersRepository = new FakeUsersRepository;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    refreshTokenGenerateAccessToken = new RefreshTokenGenerateAccessTokenService(
      fakeTokenProvider,
      fakeRefreshTokenRepository
    );
  });

  it('Should not be able to validate an invalid refresh token', async () => {
    await expect(refreshTokenGenerateAccessToken.execute({
      refresh_token: '123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to validate an expired refresh token', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    const user = await createUser.execute({
      name,
      email,
      password
    });

    const expiresIn = dayjs().add(1, "ms").unix()
    const refresh_token = await fakeRefreshTokenRepository.create({
      expiresIn,
      userId: user.id
    });

    await expect(refreshTokenGenerateAccessToken.execute({
      refresh_token: refresh_token.id
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Should be able to validate an valid refresh token and return a new access token', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    const user = await createUser.execute({
      name,
      email,
      password
    });

    const expiresIn = dayjs().add(1, "d").unix()
    const refresh_token = await fakeRefreshTokenRepository.create({
      expiresIn,
      userId: user.id
    });

    const access_token = await refreshTokenGenerateAccessToken.execute({
      refresh_token: refresh_token.id
    });

    expect(access_token).toHaveProperty('access_token');
  });


})
