import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }
  async validate(payload: any) {
    let userobj = await this.usersService.findOne({ username: payload.username })
    let roles = await this.rolesService.findrouters(userobj.roles.map(item => item.id))
    // let set = new Set();
    // let routers: Array<any> = roles.reduce((pre, item, index, arr) => {
    //   item.routers.forEach(element => {
    //     if (!set.has(element.id)) {
    //       pre.push(element)
    //     }
    //   });
    //   return pre
    // }, [])
    let routers: Set<any> = roles.reduce((pre, item, index, arr) => {
      item.routers.forEach(element => {
        pre.add(element.path)
      });
      return pre
    }, new Set())
    return { ...userobj, password: undefined, routers: [...routers] };
  }
}
