import { ApiProperty } from "@nestjs/swagger";
import { DeepPartial } from "typeorm";
import { Router } from "../entities/router.entity";

export class CreateRouterDto {
    @ApiProperty({ type: String, description: '名称', default: 'Router' })
    name: string;

    @ApiProperty({ type: String, description: '路径标识' })
    path: string;

    @ApiProperty({ type: String, description: '类型', default: '1' })
    type: string;

    @ApiProperty({ type: String, description: '图标' })
    icon: string;
}
