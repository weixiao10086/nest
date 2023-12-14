import entityClass from "src/utils/entityClass";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, TreeRepository, UpdateDateColumn } from "typeorm";

@Entity()
@Tree("closure-table")
export class Router extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @TreeParent()
    parent: Router;

    @TreeChildren()
    children: Router[];
}
