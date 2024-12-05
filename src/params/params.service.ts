import { Injectable } from '@nestjs/common';
import { CreateParamsDto } from './dto/create-params.dto';
import { UpdateParamsDto } from './dto/update-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Params } from './entities/params.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { Dept } from 'src/dept/entities/dept.entity';
import dataAuth from 'src/utils/dataauth';
import { User, UserInfo } from 'src/users/entities/user.entity';

@Injectable()
export class ParamsService {
  constructor(
    @InjectRepository(Params)
    private DB: Repository<Params>,
  ) {}

  async create(createDto: CreateParamsDto | Array<CreateParamsDto>) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
  }

  async findAll(user?: UserInfo) {
    return await dataAuth(this.DB, user).andWhere({}).getMany();
  }

  async findList(query: Partial<Params>&Page) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Params> = {
      ...(query.id && { id: query.id }),
      ...(query.key && { key: Like(`%${query.key}%`) }),
      ...(query.value && { value: Like(`%${query.value}%`) }),
    };
    return this.DB.createQueryBuilder()
      .andWhere(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  findKey(key: string) {
    return this.DB.createQueryBuilder().where({ key }).getOne();
  }

  update(updateDto: UpdateParamsDto) {
    return this.DB.update(updateDto.id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
