
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Prisma } from '@prisma/client';
import { client } from '@shared/infra/prisma/client';
import User from '../entities/User';
class UsersRepository implements IUsersRepository {

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await client.user.findUnique({
      where: { id },
    });

    return findUser || null;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await client.user.findUnique({
      where: { email },
    });

    return findUser || null;
  }

  public async create(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await client.user.create({
      data: { 
        email: userData.email,
        name: userData.name,
        password: userData.password,
       },
    });

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await client.user.findMany()

    return users;
  }
}

export default UsersRepository;