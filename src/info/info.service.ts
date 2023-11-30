import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { Info } from './entities/info.entity';
import { Repository, getConnection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Faker, zh_CN } from '@faker-js/faker';
import { Page, page } from 'src/utils/page';
const faker = new Faker({
  locale: [zh_CN],
})
@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info)
    private readonly infoRepository: Repository<Info>
  ) { }
  create(createInfoDto: CreateInfoDto) {
    return this.infoRepository.save({ ...createInfoDto, firstName: faker.person.fullName() });
  }

  findAll() {
    return this.infoRepository.find();
  }
  async findList(params: Page) {
    // return this.infoRepository.find({...page(params), relations: ["photos"]});
    const { skip, take } = page(params)
    return await this.infoRepository.createQueryBuilder()
      .leftJoinAndSelect("Info.photos", "photos")
      .leftJoinAndSelect("Info.courses", "courses")
      .skip(skip)
      .take(take)
      .getManyAndCount()
      // .getMany()
  }
  findOne(id: string) {
    // return this.infoRepository.findOne({ where: { id: id } });
    return this.infoRepository.createQueryBuilder().where({ id }).getOne()
  }
  update(id: number, updateInfoDto: UpdateInfoDto) {
    return this.infoRepository.update(id, updateInfoDto);
  }

  remove(id: number) {
    return this.infoRepository.softDelete(id);
    // return this.infoRepository.softRemove({id});
  }
}
