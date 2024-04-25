import WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext, Param, Req } from '@nestjs/common';
import { ConnectedSocket, MessageBody, MessageMappingProperties, SubscribeMessage } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
export class WsAdapter implements WebSocketAdapter {
  jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    const configService = app.get(ConfigService<typeof configuration>);
    const JWT_config = configService.get("JWT");
    this.jwtService = new JwtService({
      secret: JWT_config.key,
      //token过期时间
      signOptions: { expiresIn: JWT_config.time ?? '6000s' },
    })
  }

  //创建Websocket
  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }

  //连接
  bindClientConnect(server: WebSocket, callback: Function) {
    server.on('connection', (socket: WebSocket, http) => {
      // let token = http.headers['authorization']
      // let arr = http.headers['authorization'].split('  ')
      // let token = arr[1]

      // console.log(http.headers['x-forwarded-for'], 'http');
      // console.log(http.socket.remoteAddress, 'http');
      // const ip = http.headers['x-real-ip'] || http.connection.remoteAddress
      // console.log(http.connection.remoteAddress, 'http');
      // console.log(ip, 'ip');


      let token = http.headers['sec-websocket-protocol']
      try {
        //验证token
        let user = this.jwtService.verify(token)
        console.log(user, 'user');
        socket.id = Math.random();
        socket.user = user;
        callback(socket)
      } catch (error) {
        socket.send('登录过期')
        this.close(socket)
      }
    });
  }

  //连接成功
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    client.send('连接成功')
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(client, data, handlers, process),
        ),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  //接收消息
  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(buffer.data);
      console.log(message);
    } catch (error) {
      console.log('ws解析json出错', error);
      return EMPTY;
    }

    const messageHandler = handlers.find((handler) => {
      return handler.message === message.event;
    });
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  //断开连接
  bindClientDisconnect(server, callback) {
    server.on('close', ((res, a, b) => {
      console.log(server.id, '断开连接');
    }));
  }
  //关闭
  close(server) {
    console.log('ws server close');
    server.close();
  }
}

