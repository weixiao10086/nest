import { ApiProperty } from "@nestjs/swagger";

export class CreateUploadDto {
    @ApiProperty({ type: String, description: '字段1', default: 'Upload' })
    name: string;
}
