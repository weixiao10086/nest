import { Global, Module } from '@nestjs/common';
import { DictsService } from './dicts.service';
import { DictsController } from './dicts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Dicts])],
  controllers: [DictsController],
  providers: [DictsService],
  exports:[DictsService]
})
export class DictsModule { }
