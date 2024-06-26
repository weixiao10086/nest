import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDictDto {
    @ApiProperty({ type: String, description: '字段key', default: 'key' })
    key: string;
    @ApiProperty({ type: String, description: '字段value', default: 'value' })
    value: string;
}
