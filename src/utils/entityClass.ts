//公共实体基类
import { Excel } from "src/excel/excel";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class entityClass {
    @Excel({sort:0,name:"编号"})
    @PrimaryGeneratedColumn({ comment: "id", type: 'bigint' })
    id: string;

    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp',
        select: false,
        comment: "创建时间",
        update: false,
    })
    createTime: String;

    @UpdateDateColumn({
        name: 'update_time',
        type: 'timestamp',
        select: false,
        comment: "更新时间",
    })
    updateTime: String | null;

    @DeleteDateColumn({
        name: 'delete_at',
        type: 'timestamp',
        select: false,
        comment: "删除时间",
        //不可修改
        update: false
    })
    deleteAt: String | null;
}