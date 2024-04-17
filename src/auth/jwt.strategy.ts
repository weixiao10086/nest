import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { DeptService } from 'src/dept/dept.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly deptService: DeptService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT").key
    });
  }
  async validate(payload: any) {
    let userobj = await this.usersService.findOne({ username: payload.username })
    let roles = await this.rolesService.findrouters(userobj.roles.map(item => item.id))
    let routers: Set<any> = roles.reduce((pre, item, index, arr) => {
      item.routers.forEach(element => {
        pre.add(element.path)
      });
      return pre
    }, new Set())
    // const getDataScope=async ()=>{
    //   let deprChildren = await this.deptService.findchildrenId(userobj.deptId)
    //   let deptarr = deprChildren.map(item => item.id)
    //   return deptarr
    // }
    // return { ...userobj, password: undefined, routers: [...routers] ,getDataScope};
    return { ...userobj, password: undefined, routers: [...routers]};
  }
}
