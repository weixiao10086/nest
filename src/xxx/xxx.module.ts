import { Module } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { XxxController } from './xxx.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Xxx } from './entities/xxx.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Xxx])],
  controllers: [XxxController],
  providers: [XxxService]
})
export class XxxModule { }
