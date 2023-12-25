import { Role } from "src/roles/entities/role.entity";
import entityClass from "src/utils/entityClass";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, TreeRepository, UpdateDateColumn } from "typeorm";

@Entity({ "name": "router" })
@Tree("closure-table")
export class Router extends entityClass {
    @Column({ comment: "名称", type: 'varchar', length: 30 })
    name: string;

    @Column({ comment: "路径标识", type: 'varchar', length: 255,"unique":true })
    path: string;

    @Column({ comment: "类型", type: 'varchar', length: 255 })
    type: string;

    @Column({ comment: "图标", type: 'varchar', length: 255 })
    icon: string;

    @ManyToMany(() => Role, Role => Role.routers)
    roles: Role[];

    @TreeParent()
    parent: Router;

    @TreeChildren()
    children: Router[];
}
