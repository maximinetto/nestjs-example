import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import DTO from './DTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() dto: DTO): string {
    console.log(dto);
    return this.appService.getHello();
  }
}
