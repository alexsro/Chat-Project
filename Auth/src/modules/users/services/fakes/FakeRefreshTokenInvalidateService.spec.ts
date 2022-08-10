import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";

import FakeTokenProvider from "@modules/users/providers/TokenProvider/fakes/FakeTokenProvider";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import FakeRefreshTokenRepository from "@modules/users/repositories/fakes/FakeRefreshTokenRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";

import CreateUserService from "../CreateUserService";
import RefreshTokenInvalidateService from '../RefreshTokenInvalidateService'

let fakeTokenProvider: FakeTokenProvider;
let fakeHashProvider: FakeHashProvider;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let refreshTokenInvalidade: RefreshTokenInvalidateService;

describe('refreshTokenInvalidade', () => {
  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider;
    fakeHashProvider = new FakeHashProvider;
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository;
    fakeUsersRepository = new FakeUsersRepository;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    refreshTokenInvalidade = new RefreshTokenInvalidateService(
      fakeRefreshTokenRepository
    );
  });

  it('Should not be able to invalidate an invalid refresh token', async () => {
    await expect(refreshTokenInvalidade.execute({
      refresh_token_id: '123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to invalidate an expired refresh token', async () => {
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

    await expect(refreshTokenInvalidade.execute({
      refresh_token_id: refresh_token.id
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Should be able to invalidate an valid refresh token', async () => {
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


    await expect(await refreshTokenInvalidade.execute({
      refresh_token_id: refresh_token.id
    })).toBeTruthy
  });
})
