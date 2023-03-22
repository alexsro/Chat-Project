import AppError from "@shared/errors/AppError";

import User from "../infra/prisma/entities/User";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/iHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    try {
      await this.usersRepository.delete(user.id);
    } catch (error) {
      throw new AppError(String(error))
    }

    return
  }
}

export default DeleteUserService
