import { Injectable } from '@nestjs/common';
const Mustache = require("Mustache");
@Injectable()
export class TemplateService {
  template(template,data){
    var result = Mustache.render(template, data);
    return result
  }
}
