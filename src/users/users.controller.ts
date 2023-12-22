import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import R from 'src/utils/R';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { WsStartGateway } from 'src/websocket/ws.gateway';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService,
    // private cacheService: CacheService,
    private readonly ws: WsStartGateway,
    //读写redis
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @NoCache()
  async findAll() {
    // console.log(this.ws.server.clients,'154');
    // console.log(this.ws.all('111'), '154');
    // console.log(await this.cacheManager.get('aaa'));
    // console.log(await this.cacheManager.set('aaa',111));
    let obj = await R(this.usersService.findAll())
    return obj;
  }

  @Get('list')
  findList(@Query() params) {
    return R(this.usersService.findList(params), params);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
