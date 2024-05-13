import entityClass from 'src/utils/entityClass';
import { Excel } from 'src/excel/excel';
import { Column, Entity } from 'typeorm';

@Entity()
export class Params extends entityClass {
  @Excel({ header: '参数key', sort: 1 })
  @Column({ comment: '参数key', type: 'varchar', length: 255, unique: true })
  key: string;

  @Excel({ header: '参数value', sort: 2 })
  @Column({
    comment: '参数value',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  value: string;

  @Column({ comment: '类型', type: 'varchar', length: 255 })
  type: string;

  @Column({ comment: '所属分组', type: 'varchar', length: 255 })
  group: string;
}
