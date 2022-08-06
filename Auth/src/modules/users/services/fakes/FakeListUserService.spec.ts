import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "../CreateUserService";
import ListUserService from "../ListUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let listUsers: ListUserService


describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    listUsers = new ListUserService(
      fakeUsersRepository
    );
  });

  it('Should be able to list all users', async () => {
    const name = 'User1'
    const email = 'alex000sander@gmail.com'
    const password = '123456'

    await createUser.execute({
      name,
      email,
      password
    });

    const users = await listUsers.execute();

    expect(users).toHaveLength(1)
  })

  it('Should be able to return an empty list', async () => {
    const users = await listUsers.execute();

    expect(users).toHaveLength(0)
  })
})
