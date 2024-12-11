import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from 'src/utils/entityClass';
import { Role } from '../../roles/entities/role.entity';
import { IsEmail } from 'class-validator';

export class CreateUserDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '账号', default: 'admin' })
  username: string;

  @ApiProperty({ type: String, description: '密码', default: '123456' })
  password: string;

  // @IsEmail({}, { message: '数据类型错误' })
  @ApiProperty({ type: Array, description: '角色权限', default: [] })
  roles?: Role[];
}
