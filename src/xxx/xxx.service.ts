import { Injectable } from '@nestjs/common';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Xxx } from './entities/xxx.entity';
import { Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(Xxx)
    private DB: Repository<Xxx>
  ) { }

  create(createDto: CreateXxxDto) {
    return this.DB.save(createDto);
  }

  findAll() {
    return this.DB.find();
  }
  async findList(params: Page) {
    return this.DB.find(page(params));
    /* return await this.DB.createQueryBuilder().getMany() */
  }
  findOne(id: string) {
    /*  return this.DB.findOne({ where: { id: id } }); */
    return this.DB.createQueryBuilder().where({ id }).getOne()
  }
  update(id: string, updateDto: UpdateXxxDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
  }
}
