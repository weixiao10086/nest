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
} from '@nestjs/common';
import { RouterService } from './router.service';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import R from 'src/utils/R';
import { User } from '../utils/user.decorator';

@Controller('Router')
export class RouterController {
  constructor(private readonly RouterService: RouterService) {}

  @Post()
  create(@Body() createRouterDto: CreateRouterDto) {
    return R(this.RouterService.create(createRouterDto));
  }

  @Get('tree')
  async findTree(@Req() req) {
    return R(this.RouterService.findTree());
  }

  //获取用户菜单
  @Get('menu')
  async authMenu(@User() user) {
    return R(this.RouterService.authMenu(user));
  }

  @Get()
  async findAll(@Req() req) {
    return R(this.RouterService.findAll());
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.RouterService.findList(params), params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return R(this.RouterService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRouterDto) {
    return R(this.RouterService.update(id, updateDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return R(this.RouterService.remove(id));
  }
}
