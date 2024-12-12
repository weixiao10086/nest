import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './auth/AuthGuard';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  //mvc
  @Public()
  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() };
  }
}
