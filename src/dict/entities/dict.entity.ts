import { IsNotEmpty } from "class-validator";
import { Dicts } from "src/dicts/entities/dicts.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne,  } from "typeorm";

@Entity()
export class Dict extends entityClass {
    @Column({ comment: "字典key", type: 'varchar', length: 255 })
    key: string;

    @Column({ comment: "字典value", type: 'varchar', length: 255 })
    value: string;

    @ManyToOne(() => Dicts, Dicts => Dicts.dicts, { "cascade": true, "nullable": false, onDelete: 'CASCADE' })
    dicts: Dicts

    @Column({ comment: "对应字典", type: 'varchar', length: 255 })
    dictskey: string
}
