import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-Crud.dto';
import { UpdateCrudDto } from './dto/update-Crud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud } from './entities/Crud.entity';
import { Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Crud)
    private DB: Repository<Crud>
  ) { }

  create(createDto: CreateCrudDto) {
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
  update(id: string, updateDto: UpdateCrudDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
  }
}
