import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './auth/JwtAuthGuard';
@Controller()
export class AppController {

  @Public()
  @Get()
  @Render('index')
  root() {
    return { message: 'MVC' };
  }
}
