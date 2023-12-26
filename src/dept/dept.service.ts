import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity';
import { FindOptionsWhere, Like, TreeRepository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import * as xlsx from 'xlsx';
@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private DB: TreeRepository<Dept>,
    /*元数据
     private reflector: Reflector */
  ) { }

  async create(createDto: CreateDeptDto | Array<CreateDeptDto>) {
    return this.DB.save(createDto as CreateDeptDto)
  }

  findTree() {
    return this.DB.findTrees();
  }
  findchildrenId(id) {
    return this.DB.findDescendants({ id } as Dept);
  }
  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Dept) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Dept> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder('Dept')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne()
  }

  update(id: string, updateDto: UpdateDeptDto) {
    //  树形修改
    return this.DB.save({ ...updateDto, id });
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
  }
}
