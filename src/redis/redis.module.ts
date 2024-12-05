import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const REDIS_config = configService.get('REDIS')
        return new Redis({
          port: REDIS_config.port, // Redis port
          host: REDIS_config.host, // Redis host
          password: REDIS_config.password,
          db: REDIS_config.database, // Defaults to 0
        })
      },
      provide: 'REDIS',
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule { }
// 用法
// import Redis from 'ioredis';
//     @Inject('REDIS') private redis: Redis,
