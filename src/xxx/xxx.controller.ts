import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create-xxx.dto';
import { UpdateXxxDto } from './dto/update-xxx.dto';
import R from 'src/utils/R';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { Page } from 'src/utils/page';
import { Xxx } from './entities/xxx.entity';
import 'reflect-metadata';
import { ExcelService } from 'src/excel/excel.service';
import { Roles } from 'src/roles/roles.decorator';
import { User } from 'src/utils/user.decorator';

@Controller('xxx')
export class XxxController {
  constructor(
    private readonly xxxService: XxxService,
    private readonly excelService: ExcelService,
  ) {}

  @Post()
  @Roles('xxx/add')
  create(@Body() createXxxDto: CreateXxxDto | Array<CreateXxxDto>) {
    return R(this.xxxService.create(createXxxDto));
  }

  @Get()
  @Roles('xxx/all')
  @NoCache()
  async findAll(@User() user) {
    return R(this.xxxService.findAll(user));
  }

  @Get('list')
  @Roles('xxx/list')
  findList(@Query() params,@User() user) {
    return R(this.xxxService.findList(params,user), params);
  }

  @Get('export-excel')
  @NoCache()
  // @Roles('xxx/export')
  async exportExcel(
    @Query() params: Page & Xxx,
    @Response({ passthrough: true }) res,
    @User() user
  ): Promise<StreamableFile|string> {
    const fileName = 'xxx.xlsx';
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const data = await this.xxxService.findList({ ...params, page: null, size: null },user);
    if(data[1]===0){
      return '内容为空'
    }
    let buffer=await this.excelService.exportExcel(data[0],Xxx)
    return new StreamableFile(buffer);
  }
  @Get(':id')
  @Roles('xxx/list')
  findOne(@Param('id') id: string) {
    return R(this.xxxService.findOne(id));
  }

  @Patch(':id')
  @Roles('xxx/update')
  update(@Param('id') id: string, @Body() updateDto: UpdateXxxDto) {
    return R(this.xxxService.update(id, updateDto));
  }

  @Delete(':id')
  @Roles('xxx/delete')
  remove(@Param('id') id: string) {
    return R(this.xxxService.remove(id));
  }
}
