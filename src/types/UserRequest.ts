import { Role } from 'src/entities/roles.entities';
import { ClassProperties } from 'src/utils/types';

export interface UserPayload {
  sub: number;
  username: string;
  roles: ClassProperties<typeof Role>[];
}

export interface UserRequest extends Request {
  user: UserPayload;
}
