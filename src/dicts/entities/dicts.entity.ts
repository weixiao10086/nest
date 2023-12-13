import { Dict } from "src/dict/entities/dict.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Dicts extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Dict, Dict => Dict.dicts)
    dicts: Dict[];
}
