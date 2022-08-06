import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from '../CreateUserService';
import User from "@modules/users/infra/prisma/entities/User";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('Should be able to create a new user', async() => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    const user = await createUser.execute({
      name,
      email,
      password
    });
    expect(user).toBeInstanceOf(User)
  });

  it('Should not be able to create a new user with an already existent email', async() => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    await createUser.execute({
      name,
      email,
      password
    })

    await expect(createUser.execute({
      name,
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  });

});
