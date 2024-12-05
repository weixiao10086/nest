import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateUploadDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '字段1', default: 'Upload' })
  name: string;
}
