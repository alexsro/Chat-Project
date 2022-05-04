import { Prisma } from '@prisma/client'
import User from '../infra/prisma/entities/User';
export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  list(): Promise<User[]>;
}
