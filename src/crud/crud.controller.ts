import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import R from 'src/utils/R';

@Controller('Crud')
export class CrudController {
  constructor(private readonly CrudService: CrudService) { }

  @Post()
  create(@Body() createCrudDto: CreateCrudDto|Array<CreateCrudDto>) {
    return R(this.CrudService.create(createCrudDto));
  }

  @Get()
  findAll() {
    return R(this.CrudService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.CrudService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.CrudService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCrudDto) {
    return R(this.CrudService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.CrudService.remove(id));
  }
}
