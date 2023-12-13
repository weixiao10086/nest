import { Module } from '@nestjs/common';
import { DictsService } from './dicts.service';
import { DictsController } from './dicts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dicts])],
  controllers: [DictsController],
  providers: [DictsService]
})
export class DictsModule { }
