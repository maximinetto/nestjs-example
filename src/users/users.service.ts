import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/entities/roles.entities';
import { User } from 'src/entities/users.entities';
import { hash } from 'src/utils/crypto';
import { CreateUserDTO } from './createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private em: EntityManager,
  ) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userRepository.findAll({
      populate: ['roles'],
      exclude: ['password'],
    });
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

  async create(userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const user = await this.toEntity(userDTO);
    const savedUser = this.userRepository.create(user);
    await this.userRepository.getEntityManager().flush();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = savedUser;
    return { ...others };
  }

  async toEntity(userDTO: CreateUserDTO): Promise<User> {
    return new User({
      username: userDTO.username,
      password: await hash(userDTO.password),
      roles: userDTO.roles.map((role) => this.em.getReference(Role, role)),
    });
  }
}
