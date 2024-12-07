import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './auth/JwtAuthGuard';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Public()
  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() };
  }
}
