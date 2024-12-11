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
  Res,
} from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import R from 'src/utils/R';
import { User } from '../utils/user.decorator';
import { UserInfo } from '../users/entities/user.entity';
import { Roles } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('字典项')
@Controller('dict')
export class DictController {
  constructor(private readonly DictService: DictService) {}

  @Post('add')
  @Roles('dict/add')
  create(@Body() createDictDto: CreateDictDto | Array<CreateDictDto>) {
    return R(this.DictService.create(createDictDto));
  }

  @Get('all')
  @Roles('dict/all')
  async findAll(@Query() query) {
    return R(this.DictService.findAll(query));
  }

  @Get('list')
  @Roles('dict/list')
  findList(@Query() query, @User() user) {
    return R(this.DictService.findList(query), query);
  }

  @Get('info/:id')
  @Roles('dict/list')
  findOne(@Param('id') id: string) {
    return R(this.DictService.findOne(id));
  }

  @Patch('update')
  @Roles('dict/update')
  update(@Body() updateDto: UpdateDictDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.DictService.update(updateDto));
  }

  @Delete('remove')
  @Roles('dict/remove')
  remove(@Body('id') id: string) {
    return R(this.DictService.remove(id));
  }
}
