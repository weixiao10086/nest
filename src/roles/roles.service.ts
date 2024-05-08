import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { convertData } from '../utils/tool';
import { Router } from '../router/entities/router.entity';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private DB: Repository<Role>,
  ) {}

  async create(createDto: Partial<Role>) {
    return this.DB.manager
      .transaction(() => {
        createDto.routers = convertData(createDto.routers, Role);
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

  async findList(params: Page & Role) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<Role> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    };
    return await this.DB.createQueryBuilder('Role')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async findOne(id: string) {
    let obj = await this.DB.findOne({ where: { id }, relations: ['routers'] });
    obj.routers = convertData(obj.routers, Router);
    return obj;
  }

  update(id: string, updateDto: any) {
    updateDto.routers = convertData(updateDto.routers, Router);
    return this.DB.save(updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
  findrouters(ids: Array<string>) {
    return this.DB.find({
      where: {
        // id: In(ids),
        ...(ids && { id: In(ids) }),
      },
      relations: ['routers'],
    });
  }
  async findIds(ids) {
    // 用在新增使用者时候要回传Role[]
    return await this.DB.find({ where: { id: In(ids) } });
  }
}
