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
import { User } from '../utils/user.decorator';
import { UserInfo } from '../users/entities/user.entity';
import { NoCache } from '../cache/my-cache.interceptor';
import { excelResponse } from '../excel/excel';
import { Router } from '../router/entities/router.entity';
import { Roles } from './roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly RolesService: RolesService,
    private readonly excelService: ExcelService,
  ) {}

  @Post('add')
  @Roles('roles/add')
  create(@Body() createRolesDto: Partial<Role>,@User() user:UserInfo) {
    createRolesDto.createBy=user.id;
    createRolesDto.deptId=user.deptId;
    return R(this.RolesService.create(createRolesDto));
  }

  @Get('all')
  @Roles('roles/all')
  async findAll(@Req() req) {
    return R(this.RolesService.findAll());
  }

  @Get('list')
  @Roles('roles/list')
  findList(@Query() query, @User() user) {
    return R(this.RolesService.findList(query, user), query);
  }

  @Get('export-excel')
  @Roles('roles/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('角色.xlsx'));
    const data = await this.RolesService.findList(
      {...query, page: null, size: null },
      user,
    );
    if (data[1] === 0) return '内容为空';
    let buffer = await this.excelService.exportExcel(data[0], Role);
    return new StreamableFile(buffer);
  }

  @Get('info/:id')
  @Roles('roles/list')
  findOne(@Param('id') id: string) {
    return R(this.RolesService.findOne(id));
  }

  @Patch('update')
  @Roles('roles/update')
  update(@Body() updateDto: UpdateRolesDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.RolesService.update(updateDto));
  }

  @Delete('remove')
  @Roles('roles/remove')
  remove(@Body('id') id: string) {
    return R(this.RolesService.remove(id));
  }
}
