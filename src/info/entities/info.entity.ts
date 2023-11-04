import { Course } from "src/course/entities/course.entity";
import { Photo } from "src/photo/entities/photo.entity";
import entityClass from "src/utils/entityClass";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Info extends entityClass {
    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];

    @ManyToMany(() => Course, course => course.infos)
    courses: Course[];
}
