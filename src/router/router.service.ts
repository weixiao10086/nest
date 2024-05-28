import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { FindOptionsWhere, Like, Repository, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { User } from '../users/entities/user.entity';
import dataAuth from '../utils/dataauth';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class RouterService {
  constructor(
    //注入树实体
    @InjectRepository(Router)
    private DB: TreeRepository<Router>,
    private readonly rolesService: RolesService,
  ) {}

  async authMenu(user: any) {
    let arr = user.routers;
    console.log(user, 'user');
    let tree = [];
    let map = new Map();
    arr.forEach((item) => {
      map.set(item.id, item);
    });
    arr.forEach((item) => {
      let obj = map.get(item.parent);
      if (obj !== undefined) {
        if (obj.children) {
          obj.children.push(item);
        } else {
          obj.children = [item];
        }
      } else if (item.parent == null) {
        tree.push(item);
      }
    });
    return tree;
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
