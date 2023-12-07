import WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext, Param } from '@nestjs/common';
import { ConnectedSocket, MessageBody, MessageMappingProperties, SubscribeMessage } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { Request } from 'express';

export class WsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) { }
  arr: Array<WebSocket> = []

  //创建Websocket
  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }

  //连接
  bindClientConnect(server, callback: Function) {
    server.on('connection', (socket, http) => {
      console.log(http.headers);
      socket.id = Math.random();
      callback(socket)
    });
  }


  //连接成功
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    console.log(client.id, '连接成功');

    this.arr.push(client)
    console.log(this.arr.length, 'arr');

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

