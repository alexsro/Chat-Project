import AppError from "@shared/errors/AppError";

import User from "../infra/prisma/entities/User";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/iHashProvider";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}


@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({user_id, name, email, old_password, password}: IRequest): Promise<User>{
    const user = await this.usersRepository.findById(user_id);
    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    if (userWithEmailAlreadyExists && userWithEmailAlreadyExists.id !== user_id) {
      throw new AppError('Email adress alterady used.');
    }

    if (password && !old_password){
      throw new AppError('Old password is required')
    } else if (password && old_password) {
      const passwordMatched = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!passwordMatched) {
        throw new AppError(`Incorrect email/password combination.`, 401);
      }

      if (password != old_password) {
        const hashedPassword = await this.hashProvider.generateHash(password);
        user.password = hashedPassword
      }
    }

    user.name = name;
    user.email = email;

    const updatedUser = await this.usersRepository.save(user)


    return updatedUser
  }

};

export default UpdateUserService;
