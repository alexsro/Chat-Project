import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/iHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import ITokenProvider from './TokenProvider/models/iTokenProvider';
import JWTTokenProvider from './TokenProvider/implementations/JWTTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);