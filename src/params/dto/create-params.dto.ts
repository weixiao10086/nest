import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateParamsDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: 'key', default: 'key' })
  key: string;

  @ApiProperty({ type: String, description: 'value', default: 'value' })
  value: string;
}
