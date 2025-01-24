import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/entities/roles.entities';
import { User } from 'src/entities/users.entities';
import { CreateUserDTO } from './createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private em: EntityManager,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll({ populate: ['roles'] });
  }

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

  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = this.toEntity(userDTO);
    const savedUser = await this.userRepository.create(user);
    await this.userRepository.getEntityManager().flush();
    return savedUser;
  }

  toEntity(userDTO: CreateUserDTO): User {
    return new User({
      username: userDTO.username,
      password: userDTO.password,
      roles: userDTO.roles.map((role) => this.em.getReference(Role, role)),
    });
  }
}
