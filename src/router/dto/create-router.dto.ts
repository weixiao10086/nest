import { ApiProperty } from "@nestjs/swagger";
export class CreateRouterDto {
    @ApiProperty({ type: String, description: '菜单路径',default: '/main' })
    path: string;
    @ApiProperty({ type: String, description: '菜单1', })
    name: string;

    @ApiProperty({ type: String, description: '组件路径', })
    component: string;

    @ApiProperty({ type: String, description: '路由元信息', })
    meta: Object;

    @ApiProperty({ type: String, description: '父路由', })
    fatherId?: string;
}
