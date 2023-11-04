import { ApiProperty } from "@nestjs/swagger";
export class CreateInfoDto {
    @ApiProperty({type:String, description: '姓',})
    firstName: string;

    @ApiProperty({type:String,description: '名',})
    lastName: string;

    @ApiProperty({ default: true })
    isActive: boolean;
}
