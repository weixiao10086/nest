import entityClass from "src/utils/entityClass";
import { Column, Entity } from "typeorm";

@Entity()
export class Upload extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    name: string;
}