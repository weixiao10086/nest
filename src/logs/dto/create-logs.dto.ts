import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from '../../utils/entityClass';

export class CreateLogsDto extends dtoCommonClass {
  ip?: string;

  statusCode?: number;

  method?: string;

  query?: string;

  params?: string;

  url?: string;

  body?: string;
}
