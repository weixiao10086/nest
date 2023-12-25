import { ApiProperty } from "@nestjs/swagger";

export class CreateDeptDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Dept' })
    name: string;
}
