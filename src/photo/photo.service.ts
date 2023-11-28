import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, page } from 'src/utils/page';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private Repository: Repository<Photo>
  ) { }
  create(createInfoDto: CreatePhotoDto) {
    return this.Repository.save(createInfoDto);
  }

  findAll() {
    return this.Repository.find();
  }
  findList(params: Page) {
    return this.Repository.find({...page(params), relations: ["photos"]});
  }
  findOne(id: string) {
    return this.Repository.findOne({ where: { id: id } });
  }
  update(id: number, updateInfoDto: UpdatePhotoDto) {
    return this.Repository.update(id, updateInfoDto);
  }

  remove(id: number) {
    return this.Repository.softDelete(id);
  }
}
