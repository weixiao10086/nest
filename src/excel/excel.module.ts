import { Global, Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { DictsModule } from 'src/dicts/dicts.module';

@Global()
@Module({
  imports:[DictsModule],
  providers: [ExcelService],
  exports:[ExcelService]
})
export class ExcelModule {}
