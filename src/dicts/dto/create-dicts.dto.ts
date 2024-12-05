import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateDictsDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '字段1', default: 'Dicts' })
  name: string;
}
