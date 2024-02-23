import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private readonly logger = new Logger('Rabbitmq')
  constructor(
    private readonly amqp: AmqpConnection
  ) { }

  /**
   * onModuleInit 是 NestJS 中一个生命周期钩子方法，
   * 它是 @nestjs/common 模块提供的 OnModuleInit 接口的一部分。
   * 实现了该接口并实现了 onModuleInit 方法的类，在模块加载时会自动执行该方法
   */
  async onModuleInit() {
    // 启动监听
    this.monitorConn();
  }

  /**
   * rabbitmq连接监听
   */
  monitorConn() {
    const conn = this.amqp.managedConnection;
    if (conn) {
      conn.on('connect', () => {
        this.logger.debug('rabbitmq连接成功');
      });
      conn.on('disconnect', () => {
        this.logger.error('rabbitmq断开连接');
      });
    }
    const chan = this.amqp.managedChannel;
    if (chan) {
      chan.on('connect', () => {
        this.logger.debug('rabbitmq连接成功');
      });
      chan.on('error', () => {
        this.logger.error('rabbitmq连接错误');
      });
      chan.on('close', () => {
        this.logger.error('rabbitmq连接取消');
      });
    }
  }
  /**
   * rabbitmq发送消息
   * @param message
   */
  async push(queue, ex, routingKey, message: string): Promise<void> {
    const messageProperties = {
      priority: 0,
      deliveryMode: 2,
      // headers:	"",
      contentEncoding: 'UTF-8',
      contentType: 'text/plain',
    };
    // Buffer.from(message).toString('base64')
    // await this.amqp.publish(ex, routingKey, message);
    // await this.amqp.publish(ex, routingKey, Uint8Array(message));
    await this.amqp.publish(ex, routingKey, Buffer.from(message), messageProperties);
  }
}

