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
import { DictsService } from './dicts.service';
import { CreateDictsDto } from './dto/create-dicts.dto';
import { UpdateDictsDto } from './dto/update-dicts.dto';
import R from 'src/utils/R';
import { CacheTTL } from '@nestjs/cache-manager';
import { User } from '../utils/user.decorator';
import { UserInfo } from '../users/entities/user.entity';
import { Roles } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('字典')
@Controller('dicts')
export class DictsController {
  constructor(private readonly DictsService: DictsService) {}

  @Post('add')
  @Roles('dicts/add')
  create(@Body() createDictsDto: CreateDictsDto,@User() user:UserInfo) {
    createDictsDto.createBy = user.id;
    return R(this.DictsService.create(createDictsDto));
  }

  @CacheTTL(50000)
  @Get('all')
  @Roles('dicts/all')
  async findAll() {
    return R(this.DictsService.findAll());
  }

  @Get('list')
  @Roles('dicts/list')
  findList(@Query() query, @User() user) {
    return R(this.DictsService.findList(query), query);
  }

  @Get('key/:key')
  @Roles('dicts/list')
  findKey(@Param() param: any) {
    return R(this.DictsService.findKey(param?.key));
  }
  @Get('info/:id')
  @Roles('dicts/list')
  findOne(@Param('id') id: string) {
    return R(this.DictsService.findOne(id));
  }

  @Patch('update')
  @Roles('dicts/update')
  update(@Body() updateDto: UpdateDictsDto, @User() user: UserInfo) {
    updateDto.updateBy = user.id;
    return R(this.DictsService.update(updateDto));
  }

  @Delete('remove')
  @Roles('dicts/remove')
  remove(@Body('id') id: string) {
    return R(this.DictsService.remove(id));
  }
}
