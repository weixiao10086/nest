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
  UseInterceptors,
  Inject,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { RouterService } from './router.service';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import R from 'src/utils/R';
import { User } from '../utils/user.decorator';
import { UserInfo } from '../users/entities/user.entity';
import { Roles } from '../roles/roles.decorator';
import { NoCache } from '../cache/my-cache.interceptor';
import { excelResponse } from '../excel/excel';
import { Xxx } from '../xxx/entities/xxx.entity';
import { ExcelService } from '../excel/excel.service';
import { Router } from './entities/router.entity';

@Controller('router')
export class RouterController {
  constructor(
    private readonly RouterService: RouterService,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('router/add')
  create(@Body() createRouterDto: CreateRouterDto, @User() user: UserInfo) {
    createRouterDto.createBy = user.id;
    return R(this.RouterService.create(createRouterDto));
  }

  @Get('tree')
  @Roles('router/tree')
  async findTree(@Req() req) {
    return R(this.RouterService.findTree());
  }

  //获取用户菜单
  @Get('menu')
  @Roles('router/menu')
  async authMenu(@User() user: UserInfo) {
    return R(this.RouterService.authMenu(user));
  }

  @Get('all')
  @Roles('router/all')
  async findAll(@Req() req) {
    return R(this.RouterService.findAll());
  }

  @Get('list')
  @Roles('router/list')
  findList(@Query() query) {
    return R(this.RouterService.findList(query), query);
  }

  @Get('export-excel')
  @Roles('router/export')
  async exportExcel(
    @Query() query,
    @Response({ passthrough: true }) res,
    @User() user: UserInfo,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('菜单.xlsx'));
    const data = await this.RouterService.findList({ ...query, page: null, size: null });
    if (data[1] === 0) return '内容为空';
    let buffer = await this.excelService.exportExcel(data[0], Router);
    return new StreamableFile(buffer);
  }

  @Get('info/:id')
  @Roles('router/list')
  findOne(@Param('id') id: string) {
    return R(this.RouterService.findOne(id));
  }

  @Patch('update')
  @Roles('router/update')
  update(@Body() updateDto: UpdateRouterDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.RouterService.update(updateDto));
  }

  @Delete('remove')
  @Roles('router/remove')
  remove(@Body('id') id: string) {
    return R(this.RouterService.remove(id));
  }
}
