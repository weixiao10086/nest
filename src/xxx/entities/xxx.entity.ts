import entityClass from "src/utils/entityClass";
import { Excel } from "src/excel/excel";
import { Column, Entity } from "typeorm";

@Entity()
/* @Tree("closure-table") */
export class Xxx extends entityClass {
    @Excel({ name: '姓名', sort: 5 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    name: string;

    @Excel({ name: '测试', dict: 'gender', sort: 4 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    ceshi: string;

    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    ceshi2: string;

    @Excel({ name: '测试3', dict: 'gender', sort: 6 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    ceshi3: string;

    @Excel({ name: '测试4', dict: 'gender', sort: 1 })
    @Column({ comment: "数据库注释", type: 'varchar', length: 255 })
    ceshi4: string;

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
