import entityClass from 'src/utils/entityClass';
import { Excel } from 'src/excel/excel';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Router } from 'src/router/entities/router.entity';

@Entity()
export class Role extends entityClass {
  @Column({ comment: '角色名称', type: 'varchar', length: 255 })
  name: string;

  @Column({
    comment: '权限标识(1:全部数据,2:自定义数据,3:本级及子级,4:本级,5:本人数据)',
    type: 'enum',
    enum: ['1', '2', '3', '4', '5'],
    default: '5',
  })
  powerkey: string;

  @Column({
    comment: '自定义数据:部门id数组',
    type: 'simple-array',
    nullable: true,
  })
  deptArr: string[];

  @Column({ comment: '备注', type: 'varchar', length: 255, nullable: true })
  bak: string;

  //菜单权限
  @ManyToMany(() => Router, (Router) => Router.roles, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  routers: Router[];

  //用户权限
  @ManyToMany(() => User, (User) => User.roles, { nullable: true })
  users: User[];

  /*  树形
    api文档 这样绑定关系"parent":{"id":"4"}
    @TreeParent()
    parent: Router;
  
    @TreeChildren()
    children: Router[]; */
}
