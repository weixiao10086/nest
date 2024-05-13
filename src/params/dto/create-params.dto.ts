import { ApiProperty } from '@nestjs/swagger';

export class CreateParamsDto {
  @ApiProperty({ type: String, description: 'key', default: 'key' })
  key: string;

  @ApiProperty({ type: String, description: 'value', default: 'value' })
  value: string;
}
