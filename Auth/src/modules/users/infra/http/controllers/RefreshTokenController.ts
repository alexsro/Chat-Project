import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenGenerateAccessTokenService from '@modules/users/services/RefreshTokenGenerateAccessTokenService';
import RefreshTokenInvalidateService from '@modules/users/services/RefreshTokenInvalidateService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenGenerateAccessToken = container.resolve(RefreshTokenGenerateAccessTokenService);

    const { access_token } = await refreshTokenGenerateAccessToken.execute({
      refresh_token
    });

    return response.json({access_token});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { refresh_token_id } = request.params

    const refreshTokenInvalidate = container.resolve(RefreshTokenInvalidateService)

    await refreshTokenInvalidate.execute({
      refresh_token_id
    })

    return response.status(204).send();
  }
}
