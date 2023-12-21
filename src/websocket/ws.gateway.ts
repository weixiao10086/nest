import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { UsersService } from 'src/users/users.service';
import * as WebSocket from 'ws';

@WebSocketGateway(9623,{
    cors: {
        origin: '*',
    }
})
export class WsStartGateway {

    @WebSocketServer()
    server: WebSocket;

    @SubscribeMessage('hello')
    hello(@MessageBody() data: string): any {
        // console.log(this.usersService.findAll);
        return data;
    }

    @SubscribeMessage('hello2')
    hello2(
        @MessageBody() data: string,
        @ConnectedSocket() client: WebSocket,
    ): string {
        console.log('收到消息 client:');
        client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
        return data;
    }

    @SubscribeMessage('all')
    all(
        @MessageBody() data: string,
        @ConnectedSocket() client?: WebSocket,
    ): string {
        let set: Set<WebSocket> = this.server.clients;
        for (const socket of set) {
            socket.send(JSON.stringify({ event: 'tmp', data }))
        }
        return data;
    }
}

