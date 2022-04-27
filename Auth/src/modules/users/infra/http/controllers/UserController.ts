import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password
    return response.send(user);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const list = container.resolve(ListUserService)

    const users = await list.execute();
  
    users.forEach(user => {delete user.password})
    return response.send(users)
  }

}