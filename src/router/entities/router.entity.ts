import { Role } from 'src/roles/entities/role.entity';
import entityClass from 'src/utils/entityClass';
import {
  Column,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'router' })
@Tree('closure-table')
export class Router extends entityClass {
  @Column({ comment: '名称', type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ comment: '路径标识', type: 'varchar', length: 255, unique: true })
  path: string;

  @Column({
    comment: '类型{1:菜单,2:按钮}',
    type: 'varchar',
    length: 255,
    default: '1',
  })
  type: string;

  @Column({ comment: '图标', type: 'varchar', length: 255, nullable: true })
  icon: string;

  @Column({ comment: '組件地址', type: 'varchar', length: 255, nullable: true })
  component: string;

  @Column({ comment: '路由元信息', type: 'json', nullable: true })
  meta: Object;

  @ManyToMany(() => Role, (Role) => Role.routers)
  roles: Role[];

  @Column({ name: 'parentId', comment: '父级', type: 'bigint', nullable: true })
  @TreeParent()
  parent: Router;

  @TreeChildren()
  children: Router[];
}
