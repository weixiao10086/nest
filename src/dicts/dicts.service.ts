import { Injectable } from '@nestjs/common';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dicts } from './entities/dicts.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import * as xlsx from 'xlsx';
import { Dict } from 'src/dict/entities/dict.entity';
@Injectable()
export class DictsService {
  constructor(
    @InjectRepository(Dicts)
    private DB: Repository<Dicts>,
  ) { }

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

  update(id: string, updateDto: UpdateDictsDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
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
