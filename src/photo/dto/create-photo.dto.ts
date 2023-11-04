import { ApiProperty } from "@nestjs/swagger";
import { Info } from "src/info/entities/info.entity";

export class CreatePhotoDto {
    @ApiProperty({type:String, description: '',})
    url: string;
  
    @ApiProperty({type:String, description: '用户',})
    user: Info;
}
