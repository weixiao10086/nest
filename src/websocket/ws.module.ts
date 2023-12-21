import { Global, Module } from '@nestjs/common';
import { WsStartGateway } from './ws.gateway';

@Global()
@Module({
    providers: [WsStartGateway],
    exports:[WsStartGateway]
})
export class WsModule {}
