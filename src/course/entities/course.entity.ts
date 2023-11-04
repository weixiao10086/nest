import { Info } from "src/info/entities/info.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Course extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    courseName: string;

    @ManyToMany(() => Info, info => info.courses, { "cascade": true })
    @JoinTable()
    infos: Info[];
}
