import { PartialType } from '@nestjs/swagger';
import { CreateParamsDto } from './create-params.dto';

export class UpdateParamsDto extends PartialType(CreateParamsDto) {}
