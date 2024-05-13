//公共实体基类
import { Excel } from 'src/excel/excel';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class entityCommonClass {
  // @Excel({sort:8,header:"编号"})
  @PrimaryGeneratedColumn({ comment: 'id', type: 'bigint' })
  id: string;
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    select: false,
    comment: '创建时间',
    update: false,
  })
  createTime: String;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    select: false,
    comment: '更新时间',
  })
  updateTime: String | null;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamp',
    select: false,
    comment: '删除时间',
    //不可修改
    update: false,
  })
  deleteAt: String | null;

  @Column({
    name: 'create_by',
    comment: '创建人',
    length: 30,
    default: null,
    select: false,
    update: false,
  })
  createBy: string;

  @Column({
    name: 'update_by',
    comment: '更新人',
    length: 30,
    default: null,
    select: false,
  })
  updateBy: string;
}
export default class entityClass extends entityCommonClass {
  @Column({ comment: '权限id', type: 'bigint', nullable: true })
  deptId: string;
}

export class dtoCommonClass {
  createBy: string;

  updateBy: string;
}
