import entityClass, { entityCommonClass } from 'src/utils/entityClass';
import { Excel } from 'src/excel/excel';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'dept' })
@Tree('closure-table')
export class Dept extends entityClass {
  @Excel({ header: '部门名称', sort: 0 })
  @Column({ comment: '部门名称', type: 'varchar', length: 255 })
  name: string;

  @Column({ comment: '编码', type: 'varchar', length: 255, nullable: true })
  code: string;

  @Column({ comment: '备注', type: 'varchar', length: 255, nullable: true })
  bak: string;

  @Excel({ header: '状态', dict: 'status' })
  @Column({ comment: '状态', type: 'char' })
  status: string;

  @OneToMany(() => User, (User) => User.dept)
  users: User[];

  @Column({ name: 'parentId', comment: '父级', type: 'bigint', nullable: true })
  @TreeParent()
  parent: Dept;

  @TreeChildren()
  children: Dept[];
}
