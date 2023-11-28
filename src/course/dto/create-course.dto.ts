import { ApiProperty } from "@nestjs/swagger";
import { CreateInfoDto } from "src/info/dto/create-info.dto";
import { Info } from "src/info/entities/info.entity";
export class CreateCourseDto {

    @ApiProperty({type:String, description: '课程名称'})
    courseName: string;

    @ApiProperty({type:Array<CreateInfoDto>,default:[{id:1}]})
    infos: Info[];
}
