import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject, Res } from '@nestjs/common';
import { DictsService } from './dicts.service';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import R from 'src/utils/R';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('dicts')
export class DictsController {
  constructor(
    private readonly DictsService: DictsService) { }

  @Post()
  create(@Body() createDictsDto: CreateDictsDto | Array<CreateDictsDto>) {
    return R(this.DictsService.create(createDictsDto));
  }

  @CacheTTL(50000)
  @Get()
  async findAll() {
    return R(this.DictsService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.DictsService.findList(params), params);
  }

  @Get('key/:key')
  findKey(@Param() param: any) {
    return R(this.DictsService.findKey(param?.key));
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.DictsService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDictsDto) {
    return R(this.DictsService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.DictsService.remove(id));
  }
}
