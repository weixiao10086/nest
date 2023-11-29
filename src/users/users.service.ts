import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>
  ) { }
  async findAll() {
    return this.users.findAndCount()
  }
  async findOne(findObj: FindOptionsWhere<User>): Promise<User | undefined> {
    let obj = await this.users.findOne({ where: { ...findObj } })
    return obj
  }
}
