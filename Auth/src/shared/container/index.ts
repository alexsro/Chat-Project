import { container } from 'tsyringe';
import '../../modules/users/providers';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/prisma/repositories/UsersRepository';
import IRefreshTokenReposository from '../../modules/users/repositories/IRefreshTokenRepository';
import RefreshTokenRepository from '../../modules/users/infra/prisma/repositories/RefreshTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRefreshTokenReposository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);