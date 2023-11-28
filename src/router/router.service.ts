import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/utils/page';
import { Router } from './entities/router.entity';

@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router)
    private repository: Repository<Router>
  ) { }
  create(createDto: CreateRouterDto) {
    return this.repository.save(createDto);
  }
  findAll() {
    return this.repository.find();
  }
  async findList(params: Page) {
    return await this.repository.createQueryBuilder()
      .getMany()
  }
  findOne(id: string) {
    // return this.infoRepository.findOne({ where: { id: id } });
    console.log(id);
    console.log(typeof id);
    return this.repository.createQueryBuilder().where({ id }).getOne()
  }
  update(id: string, updateDto: UpdateRouterDto) {
    return this.repository.update(id, updateDto);
  }
  remove(id: number) {
    return this.repository.softDelete(id);
    // return this.infoRepository.softRemove({id});
  }
}
