import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { instanceToPlain } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.send(instanceToPlain(user));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const list = container.resolve(ListUserService)

    const users = await list.execute();

    return response.send(instanceToPlain(users))
  }

}