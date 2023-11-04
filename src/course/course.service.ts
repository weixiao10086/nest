import { Injectable } from '@nestjs/common';

import { Repository, getConnection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Faker, zh_CN } from '@faker-js/faker';
import { Page, page } from 'src/utils/page';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
const faker = new Faker({
  locale: [zh_CN],
})
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private CourseRepository: Repository<Course>
  ) { }
  create(createCourseDto: CreateCourseDto) {
    return this.CourseRepository.save(createCourseDto);
  }

  findAll() {
    return this.CourseRepository.find();
  }
  async findList (params: Page){
    // return this.CourseRepository.find({...page(params), relations: ["photos"]});
    return await this.CourseRepository.createQueryBuilder()
    .leftJoinAndSelect("Course.photos", "abc")
    .getMany()

  }
  findOne(id: number) {
    // return this.CourseRepository.findOne({ where: { id: id } });
    return this.CourseRepository.createQueryBuilder().where({id}).getOne()
  }
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.CourseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.CourseRepository.softDelete(id);
    // return this.CourseRepository.softRemove({id});
  }
}
