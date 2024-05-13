import { Injectable } from '@nestjs/common';
import { CreateParamsDto } from './dto/create-params.dto';
import { UpdateParamsDto } from './dto/update-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Params } from './entities/params.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { Dept } from 'src/dept/entities/dept.entity';
import dataAuth from 'src/utils/dataauth';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ParamsService {
  constructor(
    @InjectRepository(Params)
    private DB: Repository<Params>,
  ) {}

  async create(createDto: CreateParamsDto | Array<CreateParamsDto>) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
  }

  async findAll(user?: User) {
    return dataAuth(this.DB, user).andWhere({}).getManyAndCount();
  }

  async findList(params: Page & Params, user: User) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<Params> = {
      ...(params.id && { id: params.id }),
      ...(params.key && { key: Like(`%${params.key}%`) }),
      ...(params.value && { value: Like(`%${params.value}%`) }),
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

  findKey(key: string) {
    return this.DB.createQueryBuilder().where({ key }).getOne();
  }

  update(id: string, updateDto: UpdateParamsDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
