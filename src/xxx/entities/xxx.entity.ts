// @ts-nocheck
import entityClass from "src/utils/entityClass";
import { Column, Entity } from "typeorm";

@Entity()
export class Xxx extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    name: string;
}
