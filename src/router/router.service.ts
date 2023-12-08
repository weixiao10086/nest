import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router)
    private DB: Repository<Router>
  ) { }

  async create(createDto: CreateRouterDto | Array<CreateRouterDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Router) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Router> = {
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

  update(id: string, updateDto: UpdateRouterDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
  }
}
