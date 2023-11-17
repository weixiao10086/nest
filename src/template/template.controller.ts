import { Controller, Get, Post, Body, Patch, Param, Delete, Request, All, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateDto } from './dto/template.dto';
const qs = require('qs')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) { }

  @Post()
  create(@Body() templateDto: TemplateDto) {
    return this.templateService.template(templateDto.template, templateDto.data);
  }
  @Get()
  findAll(@Query() query) {
    let { template, data = {} } = query
    let obj = {}
    if (query.data) {
      try {
        data = JSON.parse(query.data)
      } catch (error) {
        let str = query.data.slice(1, query.data.length - 1);
        let arr = []
        try {
          arr = str.split(',');
        } catch (error) {
          arr = str;
        }
        arr?.forEach(element => {
          let kv = element.split(':')
          let key = kv?.at(0);
          let value = kv?.at(1);
          obj[key] = value;
        });
      }
    }
    try {
      if (Object.keys(query).length > 2) {
        let qsobj = qs.parse(query)
        Object.assign(obj, qsobj)
      }
    } catch (error) { }
    return this.templateService.template(template, obj);
  }
}
