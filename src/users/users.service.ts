import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { page, Page } from 'src/utils/page';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private DB: Repository<User>
  ) { }
  async create(createDto: CreateUserDto | Array<CreateUserDto>) {
    return this.DB.createQueryBuilder().insert()
      .values(createDto)
      .execute();
    /*  (树形新增必须用这个)
     return this.DB.save(createDto as CreateXxxDto); */
  }
  async findAll() {
    return this.DB.find()
  }
  async findList(params: Page & User) {
    const { skip, take } = page(params)
    const where: FindOptionsWhere<User> = {
      ...(params.id && { id: params.id }),
      ...(params.username && { username: Like(`%${params.username}%`) }),
      ...(params.phone && { phone: Like(`%${params.phone}%`) }),
      ...(params.email && { email: Like(`%${params.email}%`) }),
      ...(params.status && { status: params.status }),
    }
    return await this.DB.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }
  async findOne(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    let obj = await this.DB.findOne({ where: { ...findObj } })
    return obj
  }
}
