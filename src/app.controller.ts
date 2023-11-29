import { Controller, Request, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/JwtAuthGuard';
import { CreateUserDto } from './users/dto/create-user.dto';
import R from './utils/R';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService
    ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Public()
  async login(@Body() user:CreateUserDto) {
    return R(this.authService.login(user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/userInfo')
  getProfile(@Request() req) {
    return req.user;
  }
}
