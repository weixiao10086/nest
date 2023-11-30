import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrudService } from './Crud.service';
import { CreateCrudDto } from './dto/create-Crud.dto';
import { UpdateCrudDto } from './dto/update-Crud.dto';
import R from 'src/utils/R';

@Controller('Crud')
export class CrudController {
  constructor(private readonly CrudService: CrudService) { }

  @Post()
  create(@Body() createCrudDto: CreateCrudDto) {
    return R(this.CrudService.create(createCrudDto));
  }

  @Get()
  findAll() {
    return R(this.CrudService.findAll());
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
