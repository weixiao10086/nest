import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/common/cache';

@Controller('xxx')
@UseInterceptors(CacheInterceptor)
export class XxxController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    private readonly xxxService: XxxService) { }

  @Post()
  create(@Body() createXxxDto: CreateXxxDto | Array<CreateXxxDto>) {
    return R(this.xxxService.create(createXxxDto));
  }

  @Get()
  async findAll(@Req() req) {
    console.log(await this.cacheManager);
    return R(this.xxxService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.xxxService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.xxxService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateXxxDto) {
    return R(this.xxxService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.xxxService.remove(id));
  }
}
