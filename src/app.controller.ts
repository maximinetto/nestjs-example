import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import DTO from './DTO';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';
import { RolesGuard } from './roles/roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.ADMIN)
  getHello(@Query() dto: DTO): string {
    console.log(dto);
    return this.appService.getHello();
  }
}
