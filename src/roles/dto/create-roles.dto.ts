import { ApiProperty } from "@nestjs/swagger";

export class CreateRolesDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Roles' })
    name: string;
}
