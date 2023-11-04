import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from './create-info.dto';

// export class UpdateInfoDto extends PartialType(CreateInfoDto) {}
export class UpdateInfoDto extends (CreateInfoDto) {}
