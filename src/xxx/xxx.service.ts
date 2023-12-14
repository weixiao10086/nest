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
    /* private DB: TreeRepository<Xxx> */
    /* private reflector: Reflector */
  ) { }

  async create(createDto: CreateXxxDto | Array<CreateXxxDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
    /*  return this.DB.save(createDto as CreateXxxDto); */
  }

  findAll() {
    /* return this.DB.find(); */
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Xxx) {
    /*  return this.DB.findAndCount({...page(params), relations: ["photos"]}); */
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Xxx> = {
      "id": params.id,
      ...("params.id" && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
    /*       .leftJoinAndSelect("Info.photos", "photos")
          .leftJoinAndSelect("Info.courses", "courses") */
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
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /* return this.DB.createQueryBuilder().softDelete()
      .where("id = :id", { id })
      .execute(); */
    /*  return this.DB.softRemove({id}); */
  }

  async exportExcel(data: any[], fileName: string): Promise<Buffer> {
    /* const worksheet = xlsx.utils.json_to_sheet(data,{header:['name','id'],"skipHeader":true}); */
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
