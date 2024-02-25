import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NoCache } from 'src/cache/my-cache.interceptor';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  //使用数据权限的接口不缓存
  NoCache()
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
