import { Inject, Injectable } from '@nestjs/common';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
@Injectable()
export class DictsService {
  constructor(
    @InjectRepository(Dicts)
    private DB: Repository<Dicts>,
  ) {}

  async create(createDto: CreateDictsDto | Array<CreateDictsDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    return this.DB.find({ relations: ["dicts"] });
  }

  async findList(params: Page & Dicts) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Dicts> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder("dicts")
      // .innerJoinAndSelect("dicts.dicts", 'bieming')
      .leftJoinAndSelect("dicts.dicts", 'bieming')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()

  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne()
  }
  findKey(key: string) {
    return this.DB.findOne({ where: { key }, "relations": ['dicts'] })
  }

  update(id: string, updateDto: UpdateDictsDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
