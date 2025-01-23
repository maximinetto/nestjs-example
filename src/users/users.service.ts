import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOne(
      {
        username,
      },
      {
        populate: ['roles'],
      },
    );
  }
}
