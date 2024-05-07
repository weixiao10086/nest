import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import R from 'src/utils/R';
import { Page } from 'src/utils/page';
import { Role } from './entities/role.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';

@Controller('Roles')
export class RolesController {
  constructor(
    private readonly RolesService: RolesService,
    private readonly excelService: ExcelService,
  ) {}

  @Post()
  create(@Body() createRolesDto: Partial<Role>) {
    return R(this.RolesService.create(createRolesDto));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.RolesService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.RolesService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.RolesService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRolesDto) {
    return R(this.RolesService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.RolesService.remove(id));
  }
}
