import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import DTO from './DTO';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  @Roles(Role.ADMIN)
  getHello(@Query() dto: DTO): { message: string } {
    console.log(dto);
    return { message: this.appService.getHello() };
  }
}
