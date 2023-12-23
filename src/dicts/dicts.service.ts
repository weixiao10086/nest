import { Inject, Injectable } from '@nestjs/common';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import * as xlsx from 'xlsx';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"
@Injectable()
export class DictsService {
  constructor(
    @InjectRepository(Dicts)
    private DB: Repository<Dicts>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.cacheDicts()
  }

  async create(createDto: CreateDictsDto | Array<CreateDictsDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    // return this.DB.createQueryBuilder().getMany();
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
    //  return this.DB.softRemove({id});
  }

  async cacheDicts() {
    let all = await this.findAll()
    for (let i = 0; i < all.length; i++) {
      this.cacheDict(all[i])
    }
  }
  async cacheDict(obj) {
    let key = obj.key;
    let value = obj.dicts.map(item => {
      return [item.key, item.value]
    })
    //这里类型有问题
    this.cacheManager.set(`dictMap${key}`, value, { ttl: 0 } as unknown as number)
  }
  async initcacheMap(key) {
    try {
      let arr = await this.cacheManager.get(`dictMap${key}`)
      return new Map(arr as Array<any>)
    } catch (error) {
      return new Map()
    }
  }
  async exportExcel(data: any[], fileName: string): Promise<Buffer> {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    return buffer;
  }
}
