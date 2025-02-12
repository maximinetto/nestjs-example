import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role as RoleEnum } from 'src/roles/roles.enum';
import { UserRequest } from 'src/types/UserRequest';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest<UserRequest>();

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    return requiredRoles.some((role) =>
      user.roles.some((userRole) => userRole.name === role),
    );
  }
}
