import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity({ "name": "dept" })
@Tree("closure-table")
export class Dept extends entityClass {

    @Column({ comment: "部门名称", type: 'varchar', length: 255 })
    name: string;

    @Column({ comment: "编码", type: 'varchar', length: 255,"nullable":true })
    code: string;

    @Column({ comment: "备注", type: 'varchar', length: 255,"nullable":true })
    bak: string;

    @Column({ comment: "状态", type: 'char' })
    status: string;

    @OneToMany(() => User, User => User.dept)
    users: User[];

    @TreeParent()
    parent: Dept;

    @TreeChildren()
    children: Dept[];
}
