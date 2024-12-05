//公共实体基类
import { Excel } from 'src/excel/excel';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

export class entityCommonClass {
  @PrimaryGeneratedColumn({ comment: 'id', type: 'bigint' })
  id: string;
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    // select: false,
    comment: '创建时间',
    update: false,
  })
  // @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
  createTime: String;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    // select: false,
    comment: '更新时间',
  })
  // @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
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
    // select: false,
    update: false,
  })
  createBy: string;

  @Column({
    name: 'update_by',
    comment: '更新人',
    length: 30,
    default: null,
    // select: false,
  })
  updateBy: string;
}

export default class entityClass extends entityCommonClass {
  @Column({
    comment: '权限id', type: 'bigint', nullable: true,
    //不可修改
    update: false,
  })
  deptId: string;
}

export class dtoCommonClass {
  id?: string;
  createBy?: string;
  updateBy?: string;
  deptId?: string;
}
