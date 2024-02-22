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
      return true
    }
    const { user } = context.switchToHttp().getRequest();
    if (user.routers.includes(requiredRoles)) {
      console.log(`你有该权限`);
    } else {
      console.log('你没有该权限');
    }
    return user.id==='1'||user.routers.includes(requiredRoles)
    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
