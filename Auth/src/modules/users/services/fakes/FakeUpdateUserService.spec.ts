import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import UpdateUserService from "@modules/users/services/UpdateUserService";
import User from "@modules/users/infra/prisma/entities/User";

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;

    updateUser = new UpdateUserService(
      fakeUsersRepository
    );
  });

  it('Should not be able to update an invalid user', async () => {
    const name = 'User1';
    const email = 'alex000sander@gmail.com'
    const password = '123456'
    const user_id = '157091'

    await expect(updateUser.execute({
      user_id,
      name,
      email,
      password
    })).rejects.toBeInstanceOf(AppError)
  });
});
