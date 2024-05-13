import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Params } from './entities/params.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Params])],
  controllers: [ParamsController],
  providers: [ParamsService]
})
export class ParamsModule { }
