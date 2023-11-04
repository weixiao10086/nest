import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class entityClass {
    @PrimaryGeneratedColumn({ comment: "id", })
    id: number;

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
    })
    deleteAt: String | null;
}