import AppError from "@shared/errors/AppError";

import UsersRepository from "../infra/prisma/repositories/UsersRepository";
import User from "../infra/prisma/entities/User";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

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
    private usersRepository: IUsersRepository
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

    user.name = name;
    user.email = email;

    if (password && !old_password){
      throw new AppError('Old password is required')
    }



  }

};

export default UpdateUserService;
