import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { Page, page } from 'src/utils/page';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private DB: Repository<Role>,
  ) { }

  async create(createDto: CreateRolesDto | Array<CreateRolesDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
  }

  findAll() {
    return this.DB.createQueryBuilder().getMany();
  }

  async findList(params: Page & Role) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<Role> = {
      ...(params.id && { id: params.id }),
      ...(params.name && { name: Like(`%${params.name}%`) }),
    }
    return await this.DB.createQueryBuilder('Role')
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  findOne(id: string) {
    return this.DB.findOne({ where: { id }, "relations": ["routers"] })
  }

  update(id: string, updateDto: UpdateRolesDto) {
    return this.DB.update(id, updateDto);
  }

  remove(id: string) {
    return this.DB.softDelete(id);
  }
  findrouters(ids: Array<string>) {
    return this.DB.find({
      where: {
        // id: In(ids),
        ...(ids && { id: In(ids) })
      }, "relations": ['routers']
    })
  }
}
