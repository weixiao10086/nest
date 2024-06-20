import { Exclude } from 'class-transformer';
import { Dept } from 'src/dept/entities/dept.entity';
import { Role } from 'src/roles/entities/role.entity';
import entityClass from 'src/utils/entityClass';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Excel } from '../../excel/excel';

@Entity()
export class User extends entityClass {
  @Excel({ header: '用户名' })
  @Column({ comment: '用户名', type: 'varchar', length: 255, unique: true })
  username?: string;

  @Exclude()
  @Column({ comment: '密码', type: 'varchar', length: 255 })
  password?: string;

  @Column({ comment: '头像', type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Excel({ header: '性别' })
  @Column({ comment: '性别', type: 'char', nullable: true })
  gender?: number;

  @Excel({ header: '电话' })
  @Column({ comment: '电话', type: 'varchar', length: 30, nullable: true })
  phone?: string;

  @Excel({ header: '邮箱' })
  @Column({ comment: '邮箱', type: 'varchar', length: 30, nullable: true })
  email?: string;

  @Excel({ header: '账号状态' })
  @Column({
    comment: '账号状态',
    type: 'char',
    length: 4,
    nullable: true,
    default: '1',
  })
  status?: string;
  @ManyToOne(() => Dept, (Dept) => Dept.users, { cascade: true })
  dept?: Dept;

  //角色权限
  @ManyToMany(() => Role, (Role) => Role.users, {
    cascade: true,
    nullable: true,
    //真删除时，自动删除关联表数据
    onDelete: 'CASCADE', //NO ACTION
  })
  @JoinTable()
  roles?: Role[];
}
