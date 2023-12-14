import { Exclude } from "class-transformer";
import entityClass from "src/utils/entityClass";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends entityClass {
    @Column({ comment: "用户名", type: 'varchar', length: 255 })
    username: string;

    @Exclude()
    @Column({ comment: "密码", type: 'varchar', length: 255 })
    password: string;
}
