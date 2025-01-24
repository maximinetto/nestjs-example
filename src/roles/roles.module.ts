import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from 'src/entities/roles.entities';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
