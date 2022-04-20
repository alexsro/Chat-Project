import { User, Prisma } from '@prisma/client'

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
