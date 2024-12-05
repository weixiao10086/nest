import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Uploads } from './entities/upload.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import R from '../utils/R';
import { User } from '../users/entities/user.entity';
const fs = require('fs');
const path = require('path');

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Uploads)
    private DB: Repository<Uploads>,
  ) {}

  async create(createDto: any, user: User) {
    return this.DB.manager
      .transaction(() => {
        createDto = createDto.map((item) => {
          return {
            createBy: user.id,
            type: item.mimetype,
            // name: Buffer.from(item.originalname, 'latin1').toString('utf8'),
            name: item.originalname,
            ...item,
          };
        });
        return this.DB.save(createDto);
      })
      .catch((e) => {
        // console.log(e);
        return e;
      });
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(query: Partial<Uploads>&Page) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Uploads> = {
      ...(query.name && { name: Like(`%${query.name}%`) }),
      ...(query.type && { type: query.type }),
      ...(query.path && { path: Like(`%${query.path}%`) }),
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

  update(updateDto: UpdateUploadDto) {
    return this.DB.update(updateDto.id, updateDto);
  }

  async remove(id: string) {
    console.log(id);
    
    try {
      let obj = await this.findOne(id);
      console.log(obj);
      
      fs.unlinkSync(obj.path);
      return this.DB.softDelete(id);
    } catch (e) {
      console.log(e);
      
      return R.error({ data: e, msg: '删除失败,文件不存在' });
    }
  }
}
