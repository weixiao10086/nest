import { Injectable } from '@nestjs/common';
const Mustache = require("mustache");
@Injectable()
export class TemplateService {
  template(template,data){
    var result = Mustache.render(template, data);
    return result
  }
}
