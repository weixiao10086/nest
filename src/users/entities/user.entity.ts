import { Exclude } from "class-transformer";
import { Dept } from "src/dept/entities/dept.entity";
import { Role } from "src/roles/entities/role.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class User extends entityClass {
    @Column({ comment: "用户名", type: 'varchar', length: 255, unique: true })
    username: string;

    @Exclude()
    @Column({ comment: "密码", type: 'varchar', length: 255 })
    password: string;

    @Column({ comment: "性别", type: 'char', "nullable": true, })
    gender: number;

    @Column({ comment: "电话", type: 'varchar', length: 30, "nullable": true })
    phone: string;

    @Column({ comment: "邮箱", type: 'varchar', length: 30, "nullable": true })
    email: string;

    @Column({ comment: "账号状态", type: 'char', length: 4, "nullable": true, default: '1' })
    status: string;

    @ManyToOne(() => Dept, Dept => Dept.users, { "cascade": true })
    dept: Dept

    //角色权限
    @ManyToMany(() => Role, Role => Role.users, { "cascade": true, "nullable": false })
    @JoinTable()
    roles: Role[];
}
