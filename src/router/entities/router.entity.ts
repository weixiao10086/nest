import { Course } from "src/course/entities/course.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Router extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    path: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    component: string;

    @Column({ type: 'varchar', length: 255 })
    meta: Object;

    @Column({ type: 'bigint' })
    fatherId?: string;
}
