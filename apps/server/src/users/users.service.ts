import {Injectable} from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  listUsers() {
    return this.users;
  }

  findOneUser(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  signIn() {
    return new User();
  }
}
