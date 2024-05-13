import entityClass from 'src/utils/entityClass';
import { Column, Entity } from 'typeorm';

@Entity()
export class Uploads extends entityClass {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  size: string;
  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;
}
