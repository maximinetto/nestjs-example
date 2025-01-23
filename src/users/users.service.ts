import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/roles.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'maximinetto',
      password: '1234',
      roles: [Role.ADMIN],
    },
    {
      userId: 2,
      username: 'maria',
      password: '1234',
      roles: [Role.USER],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
