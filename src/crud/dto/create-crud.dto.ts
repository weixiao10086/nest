import { ApiProperty } from "@nestjs/swagger";

export class CreateCrudDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Crud' })
    name: string;
}
