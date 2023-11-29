import { PartialType } from '@nestjs/swagger';
import { CreateXxxDto } from './create-xxx.dto';

export class UpdateXxxDto extends PartialType(CreateXxxDto) {}
