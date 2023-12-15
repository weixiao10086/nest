import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>
  ) { }
  async create(createDto: CreateUserDto | Array<CreateUserDto>) {
    console.log(createDto, 'createDto');
    return this.users.createQueryBuilder().insert()
      .values(createDto)
      .execute();
    /*  (树形新增必须用这个)
     return this.DB.save(createDto as CreateXxxDto); */
  }
  async findAll() {
    return this.users.find()
  }
  async findList() {
    return this.users.findAndCount()
  }
  async findOne(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    let obj = await this.users.findOne({ where: { ...findObj } })
    return obj
  }
}
