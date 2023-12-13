import { IsNotEmpty } from "class-validator";
import { Dicts } from "src/dicts/entities/dicts.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dict extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    key: string;

    @Column({ type: 'varchar', length: 255 })
    value: string;

    @ManyToOne(() => Dicts, Dicts => Dicts.dicts ,{ "cascade": true ,"nullable":false})
    dicts:Dicts
}
