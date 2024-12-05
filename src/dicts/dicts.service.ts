import { Inject, Injectable } from '@nestjs/common';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import Redis from 'ioredis';

@Injectable()
export class DictsService {
  constructor(
    @InjectRepository(Dicts)
    private DB: Repository<Dicts>,
    @Inject('REDIS') private redis: Redis,
  ) {}

  async create(createDto: CreateDictsDto | Array<CreateDictsDto>) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
  }

  findAll() {
    return this.DB.find({ relations: ['dicts'] });
  }

  async findList(query: Partial<Dicts>&Page) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Dicts> = {
      ...(query.id && { id: query.id }),
      ...(query.name && { name: Like(`%${query.name}%`) }),
    };
    return await this.DB.createQueryBuilder('dicts')
      // .innerJoinAndSelect("dicts.dicts", 'bieming')
      // .leftJoinAndSelect("dicts.dicts", 'bieming')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder('dicts')
      .where({ id })
      .innerJoinAndSelect('dicts.dicts', 'bieming')
      .getOne();
  }

  async findKey(key: string) {
    let json = await this.redis.get(`dicts-${key}`);
    if (json != undefined) {
      return JSON.parse(json);
    } else {
      let obj = await this.DB.findOne({ where: { key }, relations: ['dicts'] });
      this.redis.set(`dicts-${key}`, JSON.stringify(obj));
      return obj;
    }
  }

  update(updateDto: UpdateDictsDto) {
    console.log(updateDto, 'updateDto');
    return this.DB.update(updateDto.id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
