import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import * as xlsx from 'xlsx';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private DB: Repository<Dict>,
  ) { }

  async create(createDto: CreateDictDto | Array<CreateDictDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Dict) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Dict> = {
      "id": params.id,
      ...("params.id" && { id: params.id }),
      ...(params.key && { name: Like(`%${params.key}%`) }),
    }
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne()
  }

  update(id: string, updateDto: UpdateDictDto) {
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
