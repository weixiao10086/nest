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
import { RolesGuard } from '../roles/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';

@WebSocketGateway(9623,{
  cors: {
    origin: '*',
  },
  // "path":"/自定义路径"
})
@UseGuards(RolesGuard)
export class WsStartGateway {
  timer=null;
  constructor(
    @InjectRepository(User)
    private UserDB: Repository<User>,
  ) {} // private readonly usersService:UsersService

  @WebSocketServer()
  server: WebSocket;

  @SubscribeMessage('hello')
  hello2(@MessageBody() data: string, @ConnectedSocket() client: WebSocket) {
    client.send(
      JSON.stringify({
        event: 'tmp',
        data: '我是服务端的消息',
        id: Date.now().toString(36),
      }),
    );
    return true;
  }

  @SubscribeMessage('onlineNum')
  @Roles('websocket/onlineNum')
  async onlineNum(
    @MessageBody() data: string,
    @ConnectedSocket() client?: WebSocket,
  ) {
    let set: Set<WebSocket> = this.server['clients'];
    if(this.timer){
      clearTimeout(this.timer)
    }
    this.timer=setTimeout(() => {
      for (const socket of set) {
        // socket.send(JSON.stringify({ event: 'onlineNum', data:set.size }));
        socket.send(set.size);
      }
      console.log(`当前在线人数${set.size}`);
    }, 2000);
    return;
  }


  @SubscribeMessage('all')
  @Roles('websocket/all')
  async all(
    @MessageBody() data: string,
    @ConnectedSocket() client?: WebSocket,
  ) {
    let set: Set<WebSocket> = this.server['clients'];
    console.log(
      `当前用户${client['user'].username}-${client['user'].id},推送全部用户`,
    );
    for (const socket of set) {
      //不包含自己
      // if (socket.id == client.user.id) continue;
      socket.send(JSON.stringify({ event: 'all', data }));
    }
    return;
  }
  @SubscribeMessage('authAll')
  @Roles('websocket/authAll')
  async authAll(
    @MessageBody() data: string,
    @ConnectedSocket() client?: WebSocket,
  ) {
    console.log(this.UserDB.target['name'], 'this.UserDB');
    let arr = await dataAuth(this.UserDB, client['user'])
      .select(['User.id'])
      .getMany();
    let authSet = new Set(arr.map((item) => item.id));
    console.log(
      `当前用户${client['user'].username}-${
        client['user'].id
      },可推送用户${Array.from(authSet)}`,
    );
    //不包含自己
    // authSet.delete(client.user.id)
    let set: Set<WebSocket> = this.server['clients'];
    for (const socket of set) {
      if (authSet.has(socket['user'].id)) {
        socket.send(JSON.stringify({ event: 'authAll', data }));
      }
    }
    return;
  }

  @SubscribeMessage('users')
  async users(
    @MessageBody() data: string,
    @ConnectedSocket() client?: WebSocket,
  ) {
    console.log(data);
  }
}
