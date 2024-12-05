import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    //没有标识的接口全部可以访问
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    let isauth =
      user.id === '1' ||
      user.routers.some((item) => {
        item.path === requiredRoles;
      });
    // if (isauth) {
    //   //有接口权限
    //   console.log(`${user.username}有${requiredRoles}权限`);
    // } else {
    //   //无接口权限
    //   console.log('你没有该权限');
    // }
    return isauth;
    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
