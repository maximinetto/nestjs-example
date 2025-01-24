import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { RoleService } from './roles.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.roleService.findAll();
  }
}
