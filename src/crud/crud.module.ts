import { Module } from '@nestjs/common';
import { CrudService } from './Crud.service';
import { CrudController } from './Crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crud } from './entities/Crud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crud])],
  controllers: [CrudController],
  providers: [CrudService]
})
export class CrudModule { }
