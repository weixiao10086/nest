import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud } from './entities/crud.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Crud)
    private DB: Repository<Crud>
  ) { }

  async create(createDto: CreateCrudDto | Array<CreateCrudDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Crud) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Crud> = {
      "id": params.id,
      ...("params.id" && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  findOne(id: string) {
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
