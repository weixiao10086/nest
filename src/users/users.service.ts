import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { page, Page } from 'src/utils/page';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { Dept } from '../dept/entities/dept.entity';
import entityClass from '../utils/entityClass';
import { convertData } from '../utils/tool';
import dataAuth from '../utils/dataauth';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private DB: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createDto: any) {
    // return this.DB.createQueryBuilder().insert()
    //   .values(createDto)
    //   .execute();
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

  async findAll(user?: User) {
    return this.DB.createQueryBuilder().getMany();
  }
  async findAuthAll(user?: User) {
    return dataAuth(this.DB, user).getMany();
  }

  async findList(params: Page & Partial<User>, user?: User) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<User> = {
      ...(params.id && { id: params.id }),
      ...(params.username && { username: Like(`%${params.username}%`) }),
      ...(params.phone && { phone: Like(`%${params.phone}%`) }),
      ...(params.email && { email: Like(`%${params.email}%`) }),
      ...(params.gender && { gender: params.gender }),
      ...(params.status && { status: params.status }),
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

  async update(id: string, updateDto: any) {
    updateDto.roles = convertData(updateDto.roles, Role);
    return this.DB.save(updateDto);
    /*  return this.DB.createQueryBuilder().update().set(updateDto)
       .where("id = :id", { id })
       .execute(); */
    /*  树形修改
     return this.DB.save({ ...updateDto, id }); */
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /* return this.DB.createQueryBuilder().softDelete()
      .where("id = :id", { id })
      .execute(); */
    /*  return this.DB.softRemove({id}); */
  }
}
