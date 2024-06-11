import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  MessageMappingProperties,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';

export class WsAdapter implements WebSocketAdapter {
  authService: AuthService;
  private jwtStrategy: JwtStrategy;

  constructor(private app: INestApplicationContext) {
    this.authService = app.get(AuthService);
    this.jwtStrategy = app.get(JwtStrategy);
  }

  //创建Websocket
  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }

  //连接
  bindClientConnect(server: WebSocket, callback: Function) {
    server.on('connection', async (socket: WebSocket, http) => {
      // console.log(http.headers['x-forwarded-for'], 'http');
      // console.log(http.socket.remoteAddress, 'http');
      // const ip = http.headers['x-real-ip'] || http.connection.remoteAddress
      // console.log(http.connection.remoteAddress, 'http');
      // console.log(ip, 'ip');
      let token = http.headers['sec-websocket-protocol'];
      try {
        //验证token
        let payload = this.authService.decode(token);
        let user: any = await this.jwtStrategy.validate(token, payload);
        user.routers && delete user.routers;
        socket.id = Math.random();
        socket.user = user;
        callback(socket);
      } catch (error) {
        socket.send('登录过期');
        this.close(socket);
      }
    });
  }

  //连接成功
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    client.send('连接成功');
    client.on('message', (data) => {
      this.bindMessageHandler(client, data.toString('utf8'), handlers, process);
    });
    // fromEvent(client, 'message')
    //   .pipe(
    //     mergeMap((data) => {
    //       console.log(data, 'data');
    //       return this.bindMessageHandler(client, data, handlers, process);
    //     }),
    //     filter((result) => result),
    //   )
    //   .subscribe((response) => client.send(JSON.stringify(response)));
  }

  //接收消息
  bindMessageHandler(
    client: WebSocket,
    data,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(data);
    } catch (error) {
      console.log('ws解析json出错', error);
      return;
    }
    const messageHandler = handlers.find((handler) => {
      return handler.message === message.event;
    });
    if (messageHandler) {
      return process(messageHandler.callback(message.data));
    }
  }

  //断开连接
  bindClientDisconnect(server, callback) {
    server.on('close', (res, a, b) => {
      console.log(server.id, '断开连接');
    });
  }

  //关闭
  close(server) {
    console.log('ws server close');
    server.close();
  }
}
