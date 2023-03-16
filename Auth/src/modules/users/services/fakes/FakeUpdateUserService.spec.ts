import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import UpdateUserService from "@modules/users/services/UpdateUserService";
import CreateUserService from "../CreateUserService";
import User from "@modules/users/infra/prisma/entities/User";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;
let createUser: CreateUserService;
let user1: User;
let user2: User;
const name = 'User1';
const email = 'alex000sander@gmail.com'
const password = '123456'

describe('UpdateUser', () => {

  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;

    updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    user1 = await createUser.execute({
      name,
      email,
      password
    });

    user2 = await createUser.execute({
      name,
      email: 'teste123@teste.com',
      password
    });
  })

  it('Should not be able to update an invalid user', async () => {
    const user_id = '157091'

    await expect(updateUser.execute({
      user_id,
      name,
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to change the email address to an existing one', async () => {
    await expect(updateUser.execute({
      user_id: user2.id,
      name,
      email
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to change the password without old_password informed', async () => {
    await expect(updateUser.execute({
      user_id: user1.id,
      name,
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to change the password if old_password informed is incorrect', async () => {
    await expect(updateUser.execute({
      user_id: user1.id,
      name,
      email,
      password: '123456',
      old_password: '12'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to update user but not update password if old_password and password are equal', async () => {
    const user = await updateUser.execute({
      user_id: user1.id,
      name,
      email,
      password: '123456',
      old_password: user1.password
    })
    expect(user).toBeInstanceOf(User)
  })

  it('Should be able to update user', async () => {
    const user = await updateUser.execute({
      user_id: user1.id,
      name,
      email,
      password: '123',
      old_password: user1.password
    })
    expect(user).toBeInstanceOf(User)
  })
});
