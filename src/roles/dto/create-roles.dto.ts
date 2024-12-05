import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';
import { Router } from '../../router/entities/router.entity';

export class CreateRolesDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '字段1', default: 'Roles' })
  name: string;
  //
  routers: Router[];
}
