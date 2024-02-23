import { Injectable, Logger } from '@nestjs/common';
import mqtt, { IClientPublishOptions, MqttClient } from 'mqtt'
@Injectable()
export class MqttService {
  client: mqtt.MqttClient;
  dingyuearr: Array<string> = [];
  private readonly logger = new Logger('mqtt')
  constructor() {
    return
    this.client = mqtt.connect('mqtt://82.156.136.205:1883', {
      connectTimeout: 10000, // 超时时间
      clientId: 'node-mq' + Math.random(),	//客户端ID
      username: 'admin', 
      password: '123456',//连接密码，
      // 心跳时间
      keepalive: 60,
      // reconnectPeriod: 3000,
      // clean:true
    });
    this.client.on('connect', () => {
      //连接mq
    })
    // this.client.on('reconnect', () => {
    //   // console.log("客户端正在重连.....请稍后")
    // });
    //生产者
    // this.client.on('connect', () => {
    //   console.log('mqtt连接成功');
    //   this.push('ceshi', 'Hello mqtt', {})
    //   //订阅内容
    //   // this.client.subscribe(this.dingyuearr,  (err, abc)=> {
    //   //   if (!err) {
    //   //     //发送消息
    //   //   }
    //   // })
    // })
    // //消费者
    // this.client.on('message', (topic, message, packet) => {
    //   console.log(topic, 'topic');
    //   if (topic === dingyue) {
    //     // message is Buffer需要tosring
    //     console.log(message.toString(), 'message');
    //     console.log(packet, 'packet');

    //     // callback()
    //   }
    //   //# ts-ignore
    //   // client.end()
    // })
  }
  //   主题           消息                             消息设置
  push(topic: string, message: string | Buffer, options: IClientPublishOptions={"qos":2}) {
    try {
      this.client.publish(topic, message, options)
      this.logger.warn(`mqtt发送成功,主题：${topic}`)
      return true
    } catch (error) {
      console.log(error);
      this.logger.error(`mqtt发送失败`)
      return false
    }
  }
  pull(topic, message, packet) {

  }
}
