import { User as UserPrisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements UserPrisma {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;
  created_at: Date;
  updated_at: Date;
}

export default User;
