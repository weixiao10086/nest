import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RouterService } from '../router/router.service';
import { RolesService } from '../roles/roles.service';
import { User, UserInfo } from '../users/entities/user.entity';
import { payloadType } from './auth.type';

@Injectable()
export class AuthService {
  tokentime;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly routerService: RouterService,
    private readonly rolesService: RolesService,
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

  async login(user: UserInfo) {
    const payload: payloadType = { username: user.username, sub: user.id };
    let token = this.jwtService.sign(payload);
    let redisKey = `token:${token}`;
    //redis保存token 1有效
    await this.redis.set(redisKey, '1');
    await this.redis.expire(redisKey, this.tokentime);
    await this.redis.del(`userInfo:${payload.sub}`)
    return {
      access_token: token,
    };
  }
  async loginout(token: string) {
    let redisKey = `token:${token}`;
    let ttl = await this.redis.ttl(redisKey);
    this.redis.set(redisKey, '0');
    this.redis.expire(redisKey, ttl);
    return '退出登录';
  }
  decode(token: any) {
    return this.jwtService.decode(token);
  }
  async getUser(user: payloadType): Promise<UserInfo> {
    let userobj = await this.usersService.findOne({ "id": user.sub, "username": user.username });
    let routers: Array<any> = [];
    if (userobj.id === '1') {
      routers = await this.routerService.findAll();
    } else {
      let roles = await this.rolesService.findRouters(
        userobj.roles?.map((item) => item.id),
      );
      let set = new Set();
      routers = roles.reduce((pre, item, index, arr) => {
        item.routers.forEach((element) => {
          if (!set.has(element.path)) {
            pre.push(element);
          }
          set.add(element.path);
        });
        return pre;
      }, []);
    }
    return { ...userobj, password: undefined, routers };
  }
}
