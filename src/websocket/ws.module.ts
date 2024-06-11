import { Global, Module } from '@nestjs/common';
import { WsStartGateway } from './ws.gateway';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
@Global()
@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [WsStartGateway],
  exports: [WsStartGateway],
})
export class WsModule {}
