import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateXxxDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: 'name', default: 'xxx' })
  name: string;

  @ApiProperty({ type: String, description: '字段1', default: 'xxx' })
  ceshi: string;
}
