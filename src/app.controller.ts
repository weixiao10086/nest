import { Controller, Get, Post, UseGuards, Body, Req, Res, Session, } from '@nestjs/common';
import { Request, Response } from 'express'
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
  async login(@Body() user: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>) {
    //接收cookie
    // console.log(req.cookies);

    //加密的接收cookie
    // console.log(req.signedCookies);
    //返回cookie
    res.cookie('key', 'value')
    //返回加密的cookie
    res.cookie('signedkey', 'signedvalue', { signed: true })

    //session
    session.visits = session.visits ? session.visits + 1 : 1;
    // console.log(session,'session');
    return R(this.authService.login(user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/userInfo')
  getProfile(@Req() req) {
    return req.user;
  }
}
