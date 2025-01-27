import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Role } from 'src/entities/roles.entities';
import { RoleController } from './roles.controller';
import { RolesGuard } from './roles.guard';
import { RoleService } from './roles.service';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [
    RoleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
