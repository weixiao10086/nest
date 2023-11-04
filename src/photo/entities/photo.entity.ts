import { Info } from "src/info/entities/info.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";

@Entity()
export class Photo extends entityClass{

  @Column()
  url: string;

  @ManyToOne(() => Info, user => user.photos)
  // @JoinColumn({name:"photos",referencedColumnName:"id"})
  user: Info;
}