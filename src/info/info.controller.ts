import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import  R  from 'src/utils/R';
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @Get()
  findAll() {
    return R({data:this.infoService.findAll()});
  }
  @Get('list')
  findList(@Query()params) {
    // return R({data:this.infoService.findList(params)});
    return R(this.infoService.findList(params),params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return R({data:this.infoService.findOne(+id)});
    return R(this.infoService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
