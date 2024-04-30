import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  FindOptionsWhere,
  In,
  Like,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { page, Page } from 'src/utils/page';
import dataAuth from 'src/utils/dataauth';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private DB: Repository<User>,
  ) {}
  async create(createDto: CreateUserDto | Array<CreateUserDto>) {
    // return this.DB.createQueryBuilder().insert()
    //   .values(createDto)
    //   .execute();
    //  (树形新增必须用这个)
    return this.DB.manager
      .transaction(() => {
        return this.DB.save(createDto as CreateUserDto);
      })
      .catch((e) => {
        // console.log(e);
        return e;
      });
  }
  async findAll(user?: User) {
    let queryBuilde = this.DB.createQueryBuilder();
    return queryBuilde.getMany();
  }
  async findList(params: Page & Partial<User>) {
    const { skip, take } = page(params);
    const where: FindOptionsWhere<User> = {
      ...(params.id && { id: params.id }),
      ...(params.username && { username: Like(`%${params.username}%`) }),
      ...(params.phone && { phone: Like(`%${params.phone}%`) }),
      ...(params.email && { email: Like(`%${params.email}%`) }),
      ...(params.gender && { gender: params.gender }),
      ...(params.status && { status: params.status }),
    };
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
  async findOne(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    let obj = await this.DB.findOne({
      where: { ...findObj },
      relations: ['roles', 'dept'],
    });
    return obj;
  }
  update(id: string, updateDto: UpdateUserDto) {
    return this.DB.update(id, updateDto);
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
