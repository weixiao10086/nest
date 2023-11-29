import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouterService } from './router.service';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import R from 'src/utils/R';

@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Post()
  create(@Body() createRouterDto: CreateRouterDto) {
    return this.routerService.create(createRouterDto);
  }

  @Get()
  findAll() {
    return R(this.routerService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouterDto: UpdateRouterDto) {
    return this.routerService.update(id, updateRouterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routerService.remove(+id);
  }
}
