import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeTokenProvider from "@modules/users/providers/TokenProvider/fakes/FakeTokenProvider";
import FakeRefreshTokenRepository from "@modules/users/repositories/fakes/FakeRefreshTokenRepository";
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService'
import dayjs from "dayjs";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;


describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;
    fakeTokenProvider = new FakeTokenProvider;
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository;
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
      fakeRefreshTokenRepository
    );
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  });

  it('Should be able to authenticate a valid user and generate a new refresh_token', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    await createUser.execute({
      name,
      email,
      password
    });

    const authenticatedUser = await authenticateUser.execute({
      email,
      password
    });

    expect(authenticatedUser).toHaveProperty("access_token")
  });

  it('Should be able to authenticate a valid user and return a existent refresh token', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    const user = await createUser.execute({
      name,
      email,
      password
    });

    const expiresIn = dayjs().add(7, "d").unix()
    await fakeRefreshTokenRepository.create({
      expiresIn,
      userId: user.id
    });

    const authenticatedUser = await authenticateUser.execute({
      email,
      password
    });

    expect(authenticatedUser).toHaveProperty("access_token")
  });

  it('Should be able to authenticate a valid user, delete an expired refresh token and generate a new one', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    const user = await createUser.execute({
      name,
      email,
      password
    });

    const expiresIn = dayjs().add(1, "ms").unix()
    await fakeRefreshTokenRepository.create({
      expiresIn,
      userId: user.id
    });

    const authenticatedUser = await authenticateUser.execute({
      email,
      password
    });

    expect(authenticatedUser).toHaveProperty("access_token")
  });


  it('Should be able to authenticate a valid user', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    await createUser.execute({
      name,
      email,
      password
    });

    const authenticatedUser = await authenticateUser.execute({
      email,
      password
    });

    expect(authenticatedUser).toHaveProperty("access_token")
  });

  it("Should not be able to authenticate a invalid email", async () => {
    await expect(authenticateUser.execute({
      email: 'teste',
      password: '1'
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a valid email but invalid password", async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    await createUser.execute({
      name,
      email,
      password
    });

    await expect(authenticateUser.execute({
      email,
      password: '1'
    })).rejects.toBeInstanceOf(AppError);
  });
});
