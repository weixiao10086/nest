import { ApiProperty } from "@nestjs/swagger";

export class CreateDictsDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Dicts' })
    name: string;
}
