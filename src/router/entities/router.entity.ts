import entityClass from "src/utils/entityClass";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Router extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => Router, Router => Router.children)
    parent: Router;

    @OneToMany(() => Router, Router => Router.parent)
    children: Router[];
}
