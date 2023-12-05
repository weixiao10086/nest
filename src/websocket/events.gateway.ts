import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
// import * as WebSocket from 'ws';

@WebSocketGateway(3002, {
    transports: ['websocket']
})
export class WsStartGateway {
    @SubscribeMessage('hello')
    hello(@MessageBody() data: any): any {
        return {
            "event": "hello",
            "data": data,
            "msg": 'rustfisher.com'
        };
    }
}