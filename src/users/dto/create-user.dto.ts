import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ type: String, description: '账号', default: 'admin' })
    username: string;
    @ApiProperty({ type: String, description: '密码', default: '123456' })
    password: string;
}
