import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity } from "typeorm";
import { Transform } from "class-transformer";

@Entity()
export class Roles extends entityClass {

    @Column({ comment: "角色名称", type: 'varchar', length: 255 })
    name: string;

    @Column({ comment: "菜单权限", type: 'varchar', length: 255 })
    menu: string;

    @Column({ comment: "备注", type: 'varchar', length: 255 })
    bak: string;
    /*  树形
    api文档 这样绑定关系"parent":{"id":"4"}
    @TreeParent()
    parent: Router;
  
    @TreeChildren()
    children: Router[]; */
}
