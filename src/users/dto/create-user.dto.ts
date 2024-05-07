import { ApiProperty } from '@nestjs/swagger';
import { dtoCommonClass } from 'src/utils/entityClass';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto extends dtoCommonClass {
  @ApiProperty({ type: String, description: '账号', default: 'admin' })
  username: string;

  @ApiProperty({ type: String, description: '密码', default: '123456' })
  password: string;

  @ApiProperty({ type: Array, description: '角色权限', default: [] })
  roles?: Role[];
}
