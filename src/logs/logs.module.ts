import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  controllers: [LogsController],
  providers: [LogsService],
  exports:[]
})
export class LogsModule { }
