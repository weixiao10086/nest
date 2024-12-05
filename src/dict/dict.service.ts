import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { Dicts } from '../dicts/entities/dicts.entity';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private DB: Repository<Dict>,
  ) {}

  async create(createDto: CreateDictDto | Array<CreateDictDto>) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
  }

  findAll(query: Partial<Dict>) {
    return this.DB.createQueryBuilder()
      .where({
        ...(query.dicts && { dicts: query.dicts as any }),
      })
      .getMany();
  }

  async findList(query: Partial<Dict>&Page) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Dict> = {
      ...(query.key && { key: Like(`%${query.key}%`) }),
      ...(query.value && { key: Like(`%${query.value}%`) }),
      ...(query.dicts && { dicts: query.dicts as any }),
    };
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  update(updateDto: UpdateDictDto) {
    return this.DB.update(updateDto.id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
