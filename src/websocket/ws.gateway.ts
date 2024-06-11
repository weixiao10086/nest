import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsersService } from 'src/users/users.service';
import * as WebSocket from 'ws';
import dataAuth from '../utils/dataauth';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebSocketGateway(9623, {
  cors: {
    origin: '*',
  },
})
export class WsStartGateway {
  constructor(
    @InjectRepository(User)
    private User: Repository<User>,
  ) {} // private readonly usersService:UsersService

  @WebSocketServer()
  server: WebSocket;

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: string, @ConnectedSocket() client: WebSocket) {
    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    return true;
  }

  @SubscribeMessage('all')
  async all(
    @MessageBody() data: string,
    @ConnectedSocket() client?: WebSocket,
  ) {
    // console.log(this.usersService,'usersService');
    console.log(client.user, 'client');
    console.log(await dataAuth(this.User, client.user).getMany());
    let set: Set<WebSocket> = this.server.clients;
    for (const socket of set) {
      socket.send(JSON.stringify({ event: 'all', data }));
    }
    return;
  }
}
