import { ApiProperty } from "@nestjs/swagger";

export class CreateXxxDto {
    @ApiProperty({ type: String, description: '字段1', default: 'xxx' })
    name: string;
}
