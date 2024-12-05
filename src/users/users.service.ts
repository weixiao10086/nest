import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User, UserInfo } from './entities/user.entity';
import { page, Page } from 'src/utils/page';
import { Role } from '../roles/entities/role.entity';
import { convertData } from '../utils/tool';
import dataAuth from '../utils/dataauth';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private DB: Repository<User>,
  ) {}

  async create(createDto: any) {
    //  (树形新增必须用这个)
    return this.DB.manager
      .transaction(() => {
        createDto.roles = convertData(createDto.roles, Role);
        return this.DB.save(createDto);
      })
      .catch((e) => {
        // console.log(e);
        return e;
      });
  }

  async findAll(user?: UserInfo) {
    return this.DB.createQueryBuilder().getMany();
  }
  async findAuthAll(user?: UserInfo) {
    return await dataAuth(this.DB, user).getMany();
  }

  async findList(query: Partial<User>&Page, user?: UserInfo) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<User> = {
      ...(query.id && { id: query.id }),
      ...(query.username && { username: Like(`%${query.username}%`) }),
      ...(query.phone && { phone: Like(`%${query.phone}%`) }),
      ...(query.email && { email: Like(`%${query.email}%`) }),
      ...(query.gender && { gender: query.gender }),
      ...(query.status && { status: query.status }),
    };
    return await dataAuth(this.DB, user)
      .andWhere(where)
      .orderBy('create_time', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async findOne(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    return await this.DB.findOne({
      where: { ...findObj },
      // relations: ['roles', 'dept'],
      relations: ['roles'],
    });
  }

  async info(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    let obj: any = await this.DB.findOne({
      where: { ...findObj },
      relations: ['roles'],
    });
    obj.roles = convertData(obj.roles, Role);
    return obj;
  }

  async update(updateDto: any) {
    updateDto.roles = convertData(updateDto.roles, Role);
    return this.DB.update(updateDto.id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
}
