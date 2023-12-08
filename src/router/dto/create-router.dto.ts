import { ApiProperty } from "@nestjs/swagger";

export class CreateRouterDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Router' })
    name: string;
}
