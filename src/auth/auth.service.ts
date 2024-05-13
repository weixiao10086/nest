import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  tokentime;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('REDIS') private redis: Redis,
  ) {
    this.tokentime = this.configService.get('JWT').time;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (user) {
      if (user.status === '0') {
        return '登录失败,账号已锁定';
      }
      if (user.password === pass) {
        const { password, ...result } = user;
        return result;
      } else {
        return '密码错误';
      }
    } else {
      return '账号不存在';
    }
  }

  async login(user: any) {
    const payload = { username: user.username };
    let token = this.jwtService.sign(payload);
    let redisKey = `token:${token}`;
    //redis保存token 1有效
    this.redis.set(redisKey, 1);
    this.redis.expire(redisKey, this.tokentime);
    return {
      access_token: token,
    };
  }

  async decode(token: any) {
    return this.jwtService.decode(token);
  }
}
