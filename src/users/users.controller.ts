import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Inject,
  Req,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import R from 'src/utils/R';
import { Roles } from 'src/roles/roles.decorator';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { WsStartGateway } from 'src/websocket/ws.gateway';
import { User } from 'src/utils/user.decorator';
import { User as Userentity } from './entities/user.entity';
import { Page } from '../utils/page';
import { ExcelService } from '../excel/excel.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ws: WsStartGateway,
    private readonly excelService: ExcelService,
  ) {}

  @Post()
  @Roles('/add')
  create(@Body() createUserDto: CreateUserDto, @User() user) {
    createUserDto.createBy = user.id;
    return R(this.usersService.create(createUserDto));
  }

  @Get()
  // @NoCache()
  async findAll(@Req() req) {
    // console.log(req.sqlString, 'sqlString');
    // console.log(this.ws.server.clients,'154');
    // console.log(this.ws.all('111'), '154');
    let obj = await R(this.usersService.findAll(req.user));
    return obj;
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.usersService.findList(params), params);
  }

  @Get('export-excel')
  @NoCache()
  // @Roles('xxx/export')
  async exportExcel(
    @Query() params: Page & Partial<Userentity>,
    @Response({ passthrough: true }) res,
    @User() user,
  ): Promise<StreamableFile | string> {
    const fileName = '导出.xlsx';
    res.set({
      'Content-Disposition': `attachment; filename=${encodeURIComponent(
        fileName,
      )}`,
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const data = await this.usersService.findList({
      ...params,
      page: null,
      size: null,
    });
    console.log(data, 'data');
    if (data[1] === 0) {
      return '内容为空';
    }
    let buffer = await this.excelService.exportExcel(data[0], Userentity);
    return new StreamableFile(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.usersService.info({ id }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return R(this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.usersService.remove(id));
  }
}
