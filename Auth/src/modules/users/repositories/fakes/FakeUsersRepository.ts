import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { client } from 'shared/infra/prisma/client';
import { User, Prisma } from '@prisma/client';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await client.user.findUnique(
      {where: {id}}
    );

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await client.user.findUnique(
      {where: {email}}
    );

    return findUser;
  }

  public async create(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await client.user.create({
      data: { 
        email: userData.email,
        name: userData.name,
        passwword: userData.passwword,
       },
    });

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
