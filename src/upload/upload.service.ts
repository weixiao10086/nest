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
            updateBy: user.id,
            type: item.mimetype,
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

  async findList(params: Page & Uploads) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<Uploads> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
      ...(params.type && { type: params.type }),
      ...(params.path && { path: Like(`%${params.path}%`) }),
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

  update(id: string, updateDto: UpdateUploadDto) {
    return this.DB.update(id, updateDto);
  }

  async remove(id: string) {
    try {
      let obj = await this.findOne(id);
      fs.unlinkSync(obj.path);
      return this.DB.softDelete(id);
    } catch (e) {
      return R.error({ data: e, msg: '删除失败,文件不存在' });
    }

    // return this.DB.softDelete(id);
  }
}
