import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Response,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import R from 'src/utils/R';
import { Roles } from 'src/roles/roles.decorator';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { WsStartGateway } from 'src/websocket/ws.gateway';
import { User } from 'src/utils/user.decorator';
import { User as Userentity, UserInfo } from './entities/user.entity';
import { ExcelService } from '../excel/excel.service';
import { excelResponse } from '../excel/excel';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ws: WsStartGateway,
    private readonly excelService: ExcelService,
  ) { }

  @Post('add')
  @Roles('users/add')
  create(@Body() createUserDto: CreateUserDto, @User() user:UserInfo) {
    createUserDto.createBy = user.id;
    createUserDto.deptId=user.deptId;
    return R(this.usersService.create(createUserDto));
  }

  @Get('all')
  @Roles('users/all')
  async findAll(@User() user: UserInfo) {
    return await R(this.usersService.findAll(user));
  }

  @Get('list')
  @Roles('users/list')
  findList(@Query() query, @User() user) {
    return R(this.usersService.findList(query, user), query);
  }

  @Get('export-excel')
  @NoCache()
  @Roles('users/export')
  async exportExcel(
    @Query() query: Partial<Userentity>,
    @Response({ passthrough: true }) res,
    @User() user,
  ): Promise<StreamableFile | string> {
    res.set(excelResponse('用户.xlsx'));
    const data = await this.usersService.findList(
      { ...query, page: null, size: null, },
      user,
    );
    if (data[1] === 0) {
      return '内容为空';
    }
    let buffer = await this.excelService.exportExcel(data[0], Userentity);
    return new StreamableFile(buffer);
  }

  @Get('info/:id')
  @Roles('users/list')
  findOne(@Param('id') id: string) {
    return R(this.usersService.info({ id }));
  }

  @Patch('update')
  @Roles('users/update')
  update(@Body() updateUserDto: UpdateUserDto, @User() user) {
    updateUserDto.updateBy = user.id;
    return R(this.usersService.update(updateUserDto));
  }

  @Delete('remove')
  @Roles('users/remove')
  remove(@Body('id') id: string) {
    return R(this.usersService.remove(id));
  }
}
