import { PartialType } from '@nestjs/swagger';
import { CreateCrudDto } from './create-Crud.dto';

export class UpdateCrudDto extends PartialType(CreateCrudDto) {}
