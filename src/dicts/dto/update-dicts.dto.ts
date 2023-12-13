import { PartialType } from '@nestjs/swagger';
import { CreateDictsDto } from './create-dicts.dto';

export class UpdateDictsDto extends PartialType(CreateDictsDto) {}
