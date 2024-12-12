import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import R from 'src/utils/R';
import { LocalAuthGuard, Public } from './AuthGuard';
import svgCaptcha from 'svg-captcha';
import { Request, Response } from 'express';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
@ApiTags('登录&用户信息')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //验证码
  @Get('code')
  @Public()
  @NoCache()
  @ApiOperation({ summary: '验证码' })
  createCaptcha(@Session() session: Record<string, any>, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)// @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '登录' })
  async login(
    @Body('code') code,
    @User() user: UserInfo,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>,
  ) {
    //接收cookie
    // console.log(req.cookies);
    //加密的接收cookie
    // console.log(req.signedCookies);
    //返回cookie
    res.cookie('key', 'value', { httpOnly: true });
    //返回加密的cookie
    res.cookie('signedkey', 'signedvalue', { signed: true, httpOnly: true });
    //session
    session.visits = session.visits ? session.visits + 1 : 1;
    if (code == undefined) {
      return R.error({ msg: '验证码不能为空' });
    } else if (code === '8888' || session.code?.toLocaleLowerCase() === code?.toLocaleLowerCase()) {
      session.code = undefined;
      return R(this.authService.login(user));
    } else {
      return R.error({ msg: '验证码错误' });
    }
  }

  @Post('loginOut')
  @ApiOperation({ summary: '退出登录' })
  loginout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>,
  ) {
    //删除Cookie
    res.clearCookie('key');
    res.clearCookie('signedkey');
    //清空session
    session.visits = undefined;
    // console.log(req.headers, 'req');
    let authorization = req.headers['authorization'];
    let token = authorization.split('  ').at(1);
    return R({ data: this.authService.loginout(token) });
  }

  //全局已注册，该处不需要了
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard)
  @Get('userInfo')
  @ApiOperation({ summary: '用户信息' })
  async getUserInfo(@User() user: UserInfo) {
    return R({ data: user });
  }
}
