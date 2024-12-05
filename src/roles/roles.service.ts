import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import { convertData } from '../utils/tool';
import { Router } from '../router/entities/router.entity';
import { UserInfo } from '../users/entities/user.entity';
import dataauth from '../utils/dataauth';
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
        return e;
      });
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(query: Partial<Role>&Page, user: UserInfo) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Role> = {
      ...(query.id && { id: query.id }),
      ...(query.name && { name: Like(`%${query.name}%`) }),
    };
    return await dataauth(this.DB, user)
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

  update(updateDto: UpdateRolesDto) {
    updateDto.routers = convertData(updateDto.routers, Router);
    return this.DB.save(updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
  findRouters(ids: Array<string>) {
    return this.DB.find({
      where: {
        // id: In(ids),
        ...(ids && { id: In(ids) }),
      },
      relations: ['routers'],
    });
  }
}
