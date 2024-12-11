import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { SetMetadata } from '@nestjs/common';
import rxjs from 'rxjs';

//创建@Public装饰器
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext) {
        //带有@Public装饰器的跳过token验证
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}
// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//     constructor(private reflector: Reflector) {
//         super();
//     }
//     canActivate(context: ExecutionContext) {
//         console.log('----------------------');   
//         return super.canActivate(context);
//     }
// }