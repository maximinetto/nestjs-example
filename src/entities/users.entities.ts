import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { MaxLength } from 'class-validator';
import { Role } from './roles.entities';

@Entity()
export class User {
  @PrimaryKey({
    autoincrement: true,
  })
  id!: number;

  @Property()
  @Unique()
  username!: string;

  @Property({
    length: 50,
  })
  @MaxLength(50)
  password!: string;

  @ManyToMany(() => Role)
  roles = new Collection<Role>(this);

  constructor({
    username,
    password,
    roles,
  }: {
    username: string;
    password: string;
    roles: Role[];
  }) {
    this.username = username;
    this.password = password;
    roles.forEach((role) => this.roles.add(role)); // Agrega roles correctamente
  }
}
