import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Prisma } from '@prisma/client';
import User from '@modules/users/infra/prisma/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: Prisma.UserCreateInput): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async list(): Promise<User[]> {
    const users = this.users

    return users;
  }
}

export default FakeUsersRepository;
