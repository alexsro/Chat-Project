import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';
import User from '../../prisma/entities/User';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, access_token, refresh_token } = await authenticateUser.execute({
      email,
      password,
    });

    const plainUser = plainToInstance(User, user)

    return response.json({ plainUser, access_token, refresh_token });
  }
}
