import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateDictDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '字段key', default: 'key' })
  key: string;
  @ApiProperty({ type: String, description: '字段value', default: 'value' })
  value: string;
}
