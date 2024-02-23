import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useValue: new Redis({
        port: 6379, // Redis port
        host: 'localhost', // Redis host
        // "password":"",
        // db: 5, // Defaults to 0
      }),
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
// import Redis from 'ioredis';
//     @Inject('REDIS') private redis: Redis,
