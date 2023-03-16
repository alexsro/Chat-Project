import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from '../CreateUserService';
import User from "@modules/users/infra/prisma/entities/User";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let user: User;
const name = 'User1';
const email = 'alex000sander@gmail.com'
const password = '123456'

describe('CreateUser', () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    user = await createUser.execute({
      name,
      email,
      password
    });
  });

  it('Should be able to create a new user', async () => {
    expect(user).toBeInstanceOf(User)
  });

  it('Should not be able to create a new user with an already existent email', async () => {
    await expect(createUser.execute({
      name,
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  });

});
