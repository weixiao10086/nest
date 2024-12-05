import { Dict } from 'src/dict/entities/dict.entity';
import entityClass, { entityCommonClass } from 'src/utils/entityClass';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Dicts extends entityCommonClass {
  @Column({ comment: '字典名', type: 'varchar', length: 255 })
  name: string;
  @Column({ comment: '字典key', type: 'varchar', length: 255 })
  key: string;

  @OneToMany(() => Dict, (Dict) => Dict.dicts)
  dicts: Dict[];
}
