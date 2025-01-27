import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Role as RoleEnum } from '../roles/roles.enum';

@Entity()
export class Role {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  @Unique()
  name!: RoleEnum;

  constructor({ id, name }: { id?: number; name?: RoleEnum }) {
    if (id) this.id = id;
    if (name) this.name = name;
  }
}
