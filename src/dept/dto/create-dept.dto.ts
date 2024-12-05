import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';
import { Dept } from '../entities/dept.entity';

export class CreateDeptDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '字段1', default: 'Dept' })
  name: string;

  parent: Dept;
}
