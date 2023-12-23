import { Injectable } from '@nestjs/common';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Xxx } from './entities/xxx.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import * as xlsx from 'xlsx';
/* import { Reflector } from "@nestjs/core"; */

@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(Xxx)
    private DB: Repository<Xxx>,
    /*树形
     private DB: TreeRepository<Xxx> */
    /*元数据
     private reflector: Reflector */
  ) { }

  async create(createDto: CreateXxxDto | Array<CreateXxxDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
    /*  (树形新增必须用这个)
     return this.DB.save(createDto as CreateXxxDto); */
  }

  findAll() {
    /* return this.DB.find(); */
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Xxx) {
    /*  relations连表查询
      return this.DB.findAndCount({...page(params), relations: ["photos"]}); */
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Xxx> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder('xxx')
      /*  连表 
      // .innerJoinAndSelect("xxx.dicts", 'bieming')
      // .leftJoinAndSelect("xxx.dicts", 'bieming') */
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  findOne(id: string) {
    /*  return this.DB.findOne({ where: { id: id } }); */
    return this.DB.createQueryBuilder().where({ id }).getOne()
  }

  update(id: string, updateDto: UpdateXxxDto) {
    return this.DB.update(id, updateDto);
    /*  return this.DB.createQueryBuilder().update().set(updateDto)
       .where("id = :id", { id })
       .execute(); */
    /*  树形修改
     return this.DB.save({ ...updateDto, id }); */
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /* return this.DB.createQueryBuilder().softDelete()
      .where("id = :id", { id })
      .execute(); */
    /*  return this.DB.softRemove({id}); */
  }
}
