import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenUserService from '../../../services/RefreshTokenUserService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshToken = container.resolve(RefreshTokenUserService);

    const { access_token } = await refreshToken.execute({
      refresh_token
    });

    return response.json({access_token});
  }
}
