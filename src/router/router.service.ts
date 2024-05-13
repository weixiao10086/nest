import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { FindOptionsWhere, Like, Repository, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RouterService {
  constructor(
    //注入树实体
    @InjectRepository(Router)
    private DB: TreeRepository<Router>,
  ) {}
  async authMenu(user: any) {
    console.log(user, 'user');
    let tree = await this.DB.findTrees();
    let router = user.routers;
    let set: Set<string> = new Set(router.map((item) => item.path));
    console.log(set, 'set');
    let digui = (node) => {
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          digui(node.children[i]);
        }
      }
      return;
    };
    digui(tree);
    return { data: tree };
  }

  async create(createDto: CreateRouterDto) {
    return this.DB.save(createDto);
  }

  findTree() {
    return this.DB.findTrees();
  }
  findAll() {
    return this.DB.createQueryBuilder('router').getMany();
  }

  async findList(params: Page & Router) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<Router> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    };
    return await this.DB.createQueryBuilder()
      .where(where, {})
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id, eager: true }).getOne();
  }

  update(id: string, updateDto: UpdateRouterDto) {
    return this.DB.save({ ...updateDto, id });
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
