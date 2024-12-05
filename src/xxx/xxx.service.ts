import { Injectable } from '@nestjs/common';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Xxx } from './entities/xxx.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import dataAuth from 'src/utils/dataauth';
import { UserInfo } from 'src/users/entities/user.entity';
/* import { Reflector } from "@nestjs/core"; */

@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(Xxx)
    private DB: Repository<Xxx> /*//树形
    private DB: TreeRepository<Xxx>
    private reflector: Reflector,*/,
  ) {}

  async create(createDto: CreateXxxDto | Array<CreateXxxDto>) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
    /*  (树形新增必须用这个)
     return this.DB.save(createDto as CreateXxxDto); */
  }

  async findAll(user?: UserInfo) {
    /* return this.DB.find(); */
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(query: Partial<Xxx>&Page, user: UserInfo) {
    /*  relations连表查询
      return this.DB.findAndCount({...page(params), relations: ["photos"]}); */
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Xxx> = {
      ...(query.id && { id: query.id }),
      ...(query.ceshi && { ceshi: query.ceshi }),
      ...(query.name && { name: Like(`%${query.name}%`) }),
    };
    return await dataAuth(this.DB, user)
      /*.innerJoinAndSelect('xxx.dicts', 'bieming')
      .leftJoinAndSelect('xxx.dicts', 'bieming')
      .leftJoinAndSelect(Dept, 'dept', 'dept.id = article.createBy')
      .leftJoinAndMapOne(
        'user.profilePhoto',
        'user.photos',
        'photo',
        'photo.isForProfile = TRUE',
      )*/
      .andWhere(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    /*  return this.DB.findOne({ where: { id: id } }); */
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  update(updateDto: UpdateXxxDto) {
    return this.DB.update(updateDto.id, updateDto);
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
