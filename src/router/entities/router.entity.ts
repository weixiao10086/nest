import entityClass from "src/utils/entityClass";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, TreeRepository, UpdateDateColumn } from "typeorm";

@Entity({"name":"router"})
@Tree("closure-table")
export class Router extends entityClass {
    @Column({ comment: "名称", type: 'varchar', length: 30 })
    name: string;

    @Column({ comment: "路径", type: 'varchar', length: 255 })
    path: string;

    @Column({ comment: "类型", type: 'varchar', length: 255 })
    type: string;

    @Column({ comment: "图标", type: 'varchar', length: 255 })
    icon: string;

    @TreeParent()
    parent: Router;

    @TreeChildren()
    children: Router[];
}
