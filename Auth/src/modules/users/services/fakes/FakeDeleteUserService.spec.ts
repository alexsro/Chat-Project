import AppError from "@shared/errors/AppError";

import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";

import DeleteUserService from "../DeleteUserService";
import CreateUserService from "../CreateUserService";
import User from "@modules/users/infra/prisma/entities/User";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let deleteUser: DeleteUserService;
let createUser: CreateUserService;
let user: User;
const name = 'User1';
const email = 'alex000sander@gmail.com'
const password = '123456'

describe('DeleteUser', () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    deleteUser = new DeleteUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    user = await createUser.execute({
      name,
      email,
      password
    });
  })

  it('Should not be able to delete an user that no exists', async () => {
    await expect(deleteUser.execute('123')).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to delete an existant user', async () => {
    await deleteUser.execute(user.id)
    await expect(fakeUsersRepository.findById(user.id)).resolves.toBe(undefined)
  })



})
