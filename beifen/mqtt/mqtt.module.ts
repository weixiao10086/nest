import { Global, Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Global()
@Module({
  controllers: [],
  providers: [MqttService],
  exports:[MqttService]
})
export class MqttModule {}
