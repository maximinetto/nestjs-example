import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../entities/roles.entities';
import { User } from '../entities/users.entities';
import { Role as RoleEnum } from '../roles/roles.enum';
import { hash } from '../utils/crypto';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      username: 'maximinetto',
      password: await hash('123456'),
      roles: [new Role(RoleEnum.ADMIN)],
    });

    em.create(User, {
      username: 'maria',
      password: await hash('123456'),
      roles: [new Role(RoleEnum.USER)],
    });

    em.create(Role, {
      name: RoleEnum.GUEST,
    });
  }
}
