import { Global, Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DeptController],
  providers: [DeptService],
  exports:[DeptService]
})
export class DeptModule { }
