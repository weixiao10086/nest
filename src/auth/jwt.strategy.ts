import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { DeptService } from 'src/dept/dept.service';
import { RouterService } from 'src/router/router.service';
import { Request } from 'express';
import Redis from 'ioredis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly routerService: RouterService,
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

  async validate(req: Request, payload: any) {
    let token = req.headers['authorization'].split('  ').at(1);
    let redistoken = `token:${token}`;
    let isvalid = await this.redis.get(redistoken);
    if (isvalid !== '1') {
      throw new UnauthorizedException('您已被强制下线，请重新登录');
    }
    let userobj = await this.usersService.findOne({
      username: payload.username,
    });
    let routers: Array<any>;
    if (userobj.id === '1') {
      routers = await this.routerService.findAll();
    } else {
      let roles = await this.rolesService.findrouters(
        userobj.roles?.map((item) => item.id),
      );
      let set = roles.reduce((pre, item, index, arr) => {
        item.routers.forEach((element) => {
          pre.add(element.path);
        });
        return pre;
      }, new Set());
      routers = [...set];
    }
    return { ...userobj, password: undefined, routers };
  }
}
