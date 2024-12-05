import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity';
import { FindOptionsWhere, Like, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import dataAuth from '../utils/dataauth';
import { UserInfo } from '../users/entities/user.entity';
import { convertData } from '../utils/tool';
@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private DB: TreeRepository<Dept>,
  ) /*元数据
     private reflector: Reflector */ {}

  async create(createDto: CreateDeptDto) {
    createDto.parent = convertData(createDto.parent, Dept);
    return this.DB.save(createDto as CreateDeptDto);
  }

  findTree() {
    return this.DB.findTrees();
  }

  findChildrenId(id) {
    return this.DB.findDescendants({ id } as Dept);
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(query: Partial<Dept>&Page, user?: UserInfo) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Dept> = {
      ...(query.name && { name: Like(`%${query.name}%`) }),
    };
    return await dataAuth(this.DB, user)
      .andWhere(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  update(updateDto: UpdateDeptDto) {
    updateDto.parent = convertData(updateDto.parent, Dept);
    //  树形修改
    return this.DB.save(updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
