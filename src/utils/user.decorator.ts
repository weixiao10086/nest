import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NoCache } from 'src/cache/my-cache.interceptor';
import { UserInfo } from '../users/entities/user.entity';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInfo => {
    //使用数据权限的接口不缓存
    // NoCache();
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
