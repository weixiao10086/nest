import entityClass, { entityCommonClass } from 'src/utils/entityClass';
import { Column, Entity } from 'typeorm';
import { Excel } from '../../excel/excel';

@Entity()
export class Uploads extends entityCommonClass {
  @Excel({ header: '文件名' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Excel({ header: '文件大小' })
  @Column({ type: 'varchar', length: 255 })
  size: string;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Excel({ header: '文件类型', dict: 'filetype' })
  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255, update: false })
  path: string;
}
