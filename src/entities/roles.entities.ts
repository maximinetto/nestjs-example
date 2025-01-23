import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Role as RoleEnum } from '../roles/roles.enum';

@Entity()
export class Role {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  @Unique()
  name!: string;

  constructor(name: RoleEnum) {
    this.name = name;
  }
}
