import { Injectable } from '@nestjs/common';
import { CreateLogsDto } from './dto/create-logs.dto';
import { UpdateLogsDto } from './dto/update-logs.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
import dataAuth from 'src/utils/dataauth';
import { UserInfo } from 'src/users/entities/user.entity';
@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs)
    private DB: Repository<Logs> /*//树形
    private DB: TreeRepository<Logs>
    private reflector: Reflector,*/,
  ) { }

  async create(createDto: CreateLogsDto) {
    return this.DB.createQueryBuilder().insert().values(createDto).execute();
  }

  async findAll(user?: UserInfo) {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(query: Partial<Logs> & Page, user: UserInfo) {
    const { skip, take } = page(query);
    const where: FindOptionsWhere<Logs> = {
      ...(query.id && { id: query.id }),
    };
    return await dataAuth(this.DB, user)
      .andWhere(where)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.DB.createQueryBuilder().where({ id }).getOne();
  }

  update(updateDto: UpdateLogsDto) {
    return this.DB.update(updateDto.id, updateDto);
    /*  树形修改
     return this.DB.save({ ...updateDto, id }); */
  }

  remove(id: string) {
    return this.DB.softDelete(id);
    /*  return this.DB.softRemove({id}); */
  }
}
