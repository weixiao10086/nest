import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseInterceptors, Inject } from '@nestjs/common';
import { RouterService } from './router.service';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import R from 'src/utils/R';

@Controller('Router')
export class RouterController {
  constructor(
    private readonly RouterService: RouterService) { }

  @Post()
  create(@Body() createRouterDto: CreateRouterDto | Array<CreateRouterDto>) {
    return R(this.RouterService.create(createRouterDto));
  }

  @Get('tree')
  async findTree(@Req() req) {
    return R(this.RouterService.findTree());
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.RouterService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.RouterService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.RouterService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRouterDto) {
    return R(this.RouterService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.RouterService.remove(id));
  }
}
