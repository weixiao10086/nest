import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Transform } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Router } from "src/router/entities/router.entity";

@Entity()
export class Role extends entityClass {

    @Column({ comment: "角色名称", type: 'varchar', length: 255 })
    name: string;

    @Column({ comment: "权限标识", type: 'varchar', length: 30 })
    powerkey: string;

    @Column({ comment: "备注", type: 'varchar', length: 255, "nullable": true })
    bak: string;

    //菜单权限
    @ManyToMany(()=>Router,Router=>Router.roles,{"cascade": true,"nullable": true})
    @JoinTable()
    routers: Router[];

    //用户权限
    @ManyToMany(() => User, User => User.roles, { "nullable": true })
    users: User[];

    /*  树形
    api文档 这样绑定关系"parent":{"id":"4"}
    @TreeParent()
    parent: Router;
  
    @TreeChildren()
    children: Router[]; */
}
