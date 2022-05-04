import { inject, injectable } from 'tsyringe';

import User from '../infra/prisma/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return users;
  }
}

export default ListUserService;
