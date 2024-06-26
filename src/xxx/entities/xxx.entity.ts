import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity } from "typeorm";

@Entity()
/* @Tree("closure-table") */
export class Xxx extends entityClass {

    @Excel({ header: '名称', sort: 8 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    name: string;

    @Excel({ header: '测试', dict: 'status', sort: 8 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255,nullable: true})
    ceshi: string;

    /*  连表
    @OneToMany(() => Xxx2, Xxx2 => Xxx2.xxx2list)
    xxx2list: xxx2[]; 
        另一个实体xxx2:
            @ManyToOne(() => Xxx, Xxx => Xxx.xxx2list ,{ "cascade": true ,"nullable":false})
            xxx2list:Xxx
        */

    /*  树形
    api文档 这样绑定关系"parent":{"id":"4"}
    @TreeParent()
    parent: Router;
  
    @TreeChildren()
    children: Router[]; */
}
