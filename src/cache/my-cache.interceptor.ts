import { ExecutionContext } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { SetMetadata } from '@nestjs/common';
// @NoCache()装饰器用于跳过缓存
export const NoCache = () => SetMetadata('ignoreCaching', true);

export class MyCacheInterceptor extends CacheInterceptor {
    protected isRequestCacheable(context: ExecutionContext): boolean {
        const http = context.switchToHttp();
        const request = http.getRequest();

        const ignoreCaching: boolean = this.reflector.get(
            'ignoreCaching',
            context.getHandler(),
        );
        //get请求并且不包含@NoCache()装饰器的会被缓存
        return !ignoreCaching && request.method === 'GET';
    }
}
