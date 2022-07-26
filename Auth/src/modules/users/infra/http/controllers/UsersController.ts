import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { plainToInstance } from 'class-transformer'
import User from '@modules/users/infra/prisma/entities/User';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.send(plainToInstance(User,user));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const list = container.resolve(ListUserService)

    const users = await list.execute();

    return response.send(plainToInstance(User, users))
  }

}

export default UsersController;