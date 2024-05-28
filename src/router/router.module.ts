import { Module } from '@nestjs/common';
import { RouterService } from './router.service';
import { RouterController } from './router.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Router]), RolesModule],
  controllers: [RouterController],
  providers: [RouterService],
  exports: [RouterService],
})
export class RouterModule {}
