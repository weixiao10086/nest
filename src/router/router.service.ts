import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Router } from './entities/router.entity';
import { FindOptionsWhere, Like, Repository, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { User, UserInfo } from '../users/entities/user.entity';
import dataAuth from '../utils/dataauth';
import { RolesService } from '../roles/roles.service';
import { convertData } from '../utils/tool';
import { Dept } from '../dept/entities/dept.entity';

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
    console.log(createDto);
    // createDto.parent = convertData(createDto.parent, Router);
    console.log(createDto);
    return this.DB.save(createDto);
  }

  findTree() {
    return this.DB.findTrees();
  }

  findAll() {
    return this.DB.createQueryBuilder('router').getMany();
  }

  async findList(query: Partial<Router>&Page) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Router> = {
      ...(query.id && { id: query.id }),
      ...(query.name && { name: Like(`%${query.name}%`) }),
    };
    return this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  update(updateDto: UpdateRouterDto) {
    updateDto.parent = convertData(updateDto.parent, Router);
    return this.DB.save(updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
