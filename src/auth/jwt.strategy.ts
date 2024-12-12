import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Redis from 'ioredis';
import { AuthService } from './auth.service';
import { payloadType } from './auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
    @Inject('REDIS') private redis: Redis,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT').key,
      //获取原始Request(从中可以获取原始token)
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: payloadType) {
    let token;
    if (typeof req == 'string') {
      token = req;
    } else {
      token = req.headers['authorization'].split('  ').at(1);
    }
    let redisToken = `token:${token}`;
    let isvalid = await this.redis.get(redisToken);
    if (isvalid === null) {
      throw new UnauthorizedException('无效的token令牌');
    } else if (isvalid === '0') {
      throw new UnauthorizedException('该令牌已退出登录');
    }
    let user;
    let redisUserInfoKey = `userInfo:${payload.sub}`;
    let redisUserInfo = await this.redis.get(redisUserInfoKey);
    if (redisUserInfo !== null) {
      try {
        user = JSON.parse(redisUserInfo);
      } catch (e) {
        user = await this.authService.getUser(payload);
        let ttl = await this.redis.ttl(redisUserInfoKey);
        await this.redis.set(redisUserInfoKey, JSON.stringify(user));
        this.redis.expire(redisUserInfoKey, ttl);
      }
    } else {
      user = await this.authService.getUser(payload);
      await this.redis.set(redisUserInfoKey, JSON.stringify(user));
      this.redis.expire(redisUserInfoKey, this.configService.get('JWT').time);
    }
    return user;
  }
}
