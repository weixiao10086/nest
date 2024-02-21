import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { FindOptionsWhere, Like, Repository, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class RouterService {
  constructor(
    @InjectRepository(Router)
    //注入树实体
    private DB: TreeRepository<Router>
  ) { }

  async create(createDto: CreateRouterDto | Array<CreateRouterDto>) {
    return this.DB.save(createDto as CreateRouterDto)
  }

  findTree() {
    return this.DB.findTrees();
  }
  findAll() {
    return this.DB.createQueryBuilder("router").getMany();
  }

  async findList(params: Page & Router) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Router> = {
      ...(params.id && { id: params.id }),
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
    return this.DB.save({ ...updateDto, id });
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
