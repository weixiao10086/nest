import { Global, Module } from '@nestjs/common';
import { WsStartGateway } from './ws.gateway';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
    imports: [UsersModule],
    providers: [WsStartGateway],
    exports: [WsStartGateway]
})
export class WsModule { }
