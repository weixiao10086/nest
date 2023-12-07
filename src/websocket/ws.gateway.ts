import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';

@WebSocketGateway(9623,{
    cors: '*'
})
export class WsStartGateway {
    @SubscribeMessage('hello')
    hello(@MessageBody() data: string): string {
        return data;
    }

    @SubscribeMessage('hello2')
    hello2(
        @MessageBody() data: string,
        @ConnectedSocket() client: WebSocket,
    ): string {
        console.log('收到消息 client:', client);
        // client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
        return data;
    }
}

