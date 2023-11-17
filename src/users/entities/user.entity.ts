import entityClass from "src/utils/entityClass";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}
